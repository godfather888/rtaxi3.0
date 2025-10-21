import { Resolver, Mutation, Args, CONTEXT, Query, Int } from "@nestjs/graphql";
import { DriverService } from "./driver.service";
import { QrCodeOutput } from "./dto/qr-code.output.dto";
import { ParkDriverOutput } from "./dto/park-driver.output.dto";
import { Inject, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/jwt-gql-auth.guard";
import { UserContext } from "../auth/authenticated-user";
import { DriverStatus, DriverEntity } from "@ridy/database";

@Resolver(() => DriverEntity)
@UseGuards(GqlAuthGuard)
export class DriverResolver {
  constructor(
    private driverService: DriverService,
    @Inject(CONTEXT) private context: UserContext
  ) {}

  @Mutation(() => QrCodeOutput)
  async getQrCode(): Promise<QrCodeOutput> {
    console.log("hit the route");
    return this.driverService.generateQrCode(this.context.req.user.id);
  }
    
  @Mutation(() => ParkDriverOutput)
  @UseGuards(GqlAuthGuard)
  async parkDriver(
    @Args('lat') lat: number,
    @Args('lng') lng: number
  ): Promise<ParkDriverOutput> {
    const driver = await this.driverService.setStatusAndLocation(
      this.context.req.user.id,
      DriverStatus.Parked,
      lat,
      lng
    );

    return {
      success: driver.status === DriverStatus.Parked,
      driverId: driver.id,
      status: driver.status
    };
  }
}
