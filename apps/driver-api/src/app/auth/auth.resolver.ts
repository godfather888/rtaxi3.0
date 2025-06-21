import { Args, CONTEXT, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

import { DriverService } from '../driver/driver.service';
import { LoginDTO } from './dto/login.dto';
import { LoginInput } from './dto/login.input';
import { VersionStatus } from '@ridy/database';
import { DriverDTO } from '../driver/dto/driver.dto';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './jwt-gql-auth.guard';
import { UserContext } from './authenticated-user';
import { SharedDriverService } from '@ridy/database';
import { ForbiddenError } from '@nestjs/apollo';
import { auth } from 'firebase-admin';
import { VerificationDto } from './dto/verification.dto';
import { VerifyNumberDto } from './dto/verify-number.dto';
import { AuthService } from './auth.service';
import { DriverDocumentDTO } from './dto/driver-document.dto';
import { Repository } from 'typeorm';
import { DriverDocumentEntity } from '@ridy/database';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver()
export class AuthResolver {
  constructor(
    private driverService: DriverService,
    private sharedDriverService: SharedDriverService,
    @InjectRepository(DriverDocumentEntity)
    private driverDocumentRepository: Repository<DriverDocumentEntity>,
    private jwtService: JwtService,
    @Inject(CONTEXT)
    private userContext: UserContext,
    private authService: AuthService,
  ) {}

  @Mutation(() => LoginDTO)
  async login(
    @Args('input', { type: () => LoginInput }) input: LoginInput,
  ): Promise<LoginDTO> {
    const decodedToken = await auth().verifyIdToken(input.firebaseToken);
    const number = (
      decodedToken.firebase.identities.phone[0] as string
    ).substring(1);
    const user = await this.driverService.findOrCreateUserWithMobileNumber({
      mobileNumber: number,
      countryIso: undefined,
    });
    const payload = { id: user.id };
    return {
      jwtToken: this.jwtService.sign(payload),
    };
  }

  @Query(() => VersionStatus)
  async requireUpdate(
    @Args('versionCode', { type: () => Int }) versionCode: number,
  ) {
    if (
      process.env.MANDATORY_VERSION_CODE != null &&
      versionCode < parseInt(process.env.MANDATORY_VERSION_CODE)
    ) {
      return VersionStatus.MandatoryUpdate;
    }
    if (
      process.env.OPTIONAL_VERSION_CODE != null &&
      versionCode < parseInt(process.env.OPTIONAL_VERSION_CODE)
    ) {
      return VersionStatus.OptionalUpdate;
    }
    return VersionStatus.Latest;
  }

  @Mutation(() => DriverDTO)
  @UseGuards(GqlAuthGuard)
  async deleteUser() {
    return this.sharedDriverService.deleteById(this.userContext.req.user.id);
  }

  @Query(() => [DriverDocumentDTO])
  @UseGuards(GqlAuthGuard)
  async driverRequiredDocuments(): Promise<DriverDocumentDTO[]> {
    return this.driverDocumentRepository.find({
      where: {
        isEnabled: true,
      },
    });
  }

  @Mutation(() => LoginDTO)
  async skipVerification(@Args('mobileNumber') mobileNumber: string) {
    if (process.env.DEMO_MODE !== 'true') {
      throw new ForbiddenError('Not in demo mode');
    }
    if (mobileNumber.startsWith('+')) {
      mobileNumber = mobileNumber.substring(1);
    }
    const user = await this.driverService.findOrCreateUserWithMobileNumber({
      mobileNumber,
    });
    const payload = { id: user.id };
    return {
      jwtToken: this.jwtService.sign(payload),
    };
  }

  @Mutation(() => VerifyNumberDto, {
    description:
      'Returns a hash that will need to be passed in subsequent verify code call in order for match and verifcation to happen. Real sms is not sent in demo mode. It is 123456 by default.',
  })
  async verifyNumber(
    @Args('mobileNumber') mobileNumber: string,
    @Args('countryIso', { nullable: true }) countryIso?: string,
    @Args('forceSendOtp', { nullable: true }) forceSendOtp?: boolean,
  ): Promise<VerifyNumberDto> {
    if (mobileNumber.startsWith('+')) {
      mobileNumber = mobileNumber.substring(1);
    }
    const rider = await this.driverService.findWithDeleted({ mobileNumber });
    if (rider != null && rider.password != null && forceSendOtp !== true) {
      return {
        isExistingUser: true,
      };
    }
    const { hash } = await this.authService.sendVerificationCode({
      mobileNumber,
      countryIso,
    });
    return { isExistingUser: false, hash };
  }

  @Mutation(() => VerificationDto, {
    description:
      'Returns a JWT token if the code matches the hash. In demo mode the OTP is not sent. It is 123456 by default.',
  })
  async verifyOtp(
    @Args('hash') hash: string,
    @Args('code') code: string,
  ): Promise<VerificationDto> {
    const verifyCoderesult = await this.authService.verifyCode(hash, code);
    const user = await this.driverService.findOrCreateUserWithMobileNumber({
      ...verifyCoderesult,
    });
    const payload = { id: user.id };
    return {
      jwtToken: this.jwtService.sign(payload),
      user: { ...user, isWalletHidden: false },
      hasName: user.firstName != null && user.lastName != null,
      hasPassword: user.password != null,
    };
  }

  @Mutation(() => VerificationDto)
  async verifyPassword(
    @Args('mobileNumber') mobileNumber: string,
    @Args('password') password: string,
  ): Promise<VerificationDto> {
    const user = await this.driverService.findWithDeleted({ mobileNumber });
    if (user == null || user.password !== password) {
      throw new ForbiddenError('Wrong password');
    }
    if (user?.deletedAt != null) {
      await this.driverService.restore(user.id);
    }
    const payload = { id: user.id };
    return {
      jwtToken: this.jwtService.sign(payload),
      user: { ...user, isWalletHidden: false },
      hasName: user.firstName != null && user.lastName != null,
      hasPassword: user.password != null,
    };
  }

  @Mutation(() => VerificationDto)
  @UseGuards(GqlAuthGuard)
  async setPassword(@Args('password') password: string) {
    const user = await this.driverService.setPassword({
      driverId: this.userContext.req.user.id,
      password,
    });
    const payload = { id: user.id };
    return {
      jwtToken: this.jwtService.sign(payload),
      user: { ...user, isWalletHidden: false },
      hasName: user.firstName != null && user.lastName != null,
      hasPassword: user.password != null,
    };
  }
}
