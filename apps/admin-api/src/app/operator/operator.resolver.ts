import { Inject, UseGuards } from '@nestjs/common';
import { Args, CONTEXT, ID, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ForbiddenError } from '@nestjs/apollo';
import type { UserContext } from '../auth/authenticated-admin';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OperatorDTO } from './dto/operator.dto';
import { UpdatePasswordInput } from './input/update-password.input';
import { OperatorService } from './operator.service';
import { UpdateProfileInput } from './input/update-profile.input';
import { OperatorSessionDTO } from './dto/operator-session.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class OperatorResolver {
  constructor(
    private service: OperatorService,
    @Inject(CONTEXT)
    private context: UserContext,
  ) {}

  @Mutation(() => OperatorDTO)
  async updatePassword(
    @Args('input', { type: () => UpdatePasswordInput })
    input: UpdatePasswordInput,
  ) {
    if (process.env.DEMO_MODE != null) {
      throw new ForbiddenError('Action not allowed in demo mode.');
    }
    const operator = await this.service.getById(this.context.req.user.id);
    if (operator.password != input.oldPassword) {
      throw new ForbiddenError("Old password don't match");
    }
    await this.service.repo.update(operator.id, { password: input.newPasswod });
    operator.password = input.newPasswod;
    return operator;
  }

  @Mutation(() => Boolean)
  async terminateStaffSession(@Args('id', { type: () => ID }) id: string) {
    if (process.env.DEMO_MODE != null) {
      throw new ForbiddenError('Action not allowed in demo mode.');
    }
    const result = await this.service.terminateSession(id);
    return result.affected > 0;
  }

  @Mutation(() => OperatorDTO)
  async updateProfile(
    @Args('input', { type: () => UpdateProfileInput })
    input: UpdateProfileInput,
  ): Promise<OperatorDTO> {
    if (process.env.DEMO_MODE != null) {
      throw new ForbiddenError('Action not allowed in demo mode.');
    }
    return this.service.updateProfile({
      id: this.context.req.user.id,
      update: input,
    });
  }

  @Query(() => [OperatorSessionDTO])
  async currentUserSessions(): Promise<OperatorSessionDTO[]> {
    if (process.env.DEMO_MODE != null) {
      return [];
    }
    const result = await this.service.currentUserSessions(
      this.context.req.user.id,
    );
    return result;
  }
}
