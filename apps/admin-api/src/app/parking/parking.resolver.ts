import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParkingService } from './parking.service';
import { CreateParkSpotInput } from './dto/create-park-spot.input';
import { ParkSpotDTO } from './dto/park-spot.dto';
import { ForbiddenError } from '@nestjs/apollo';
import { ParkingLoginSessionService } from './parking-login-session.service';
import { ParkSpotFilterInput } from './dto/park-shop-filter.input';

@Resolver()
export class ParkingResolver {
  constructor(
    private readonly parkingService: ParkingService,
    private readonly parkingLoginSessionService: ParkingLoginSessionService,
  ) {}

  @Query(() => [ParkSpotDTO])
  async parkings(
    @Args('input', { type: () => ParkSpotFilterInput })
    input: ParkSpotFilterInput,
  ): Promise<ParkSpotDTO[]> {
    return this.parkingService.getSpots(input);
  }

  @Mutation(() => ParkSpotDTO)
  async createParkingSpot(
    @Args('input', { type: () => CreateParkSpotInput })
    input: CreateParkSpotInput,
  ): Promise<ParkSpotDTO> {
    return this.parkingService.createSpot(input);
  }

  @Mutation(() => Boolean)
  async terminateParkingLoginSession(
    @Args('sessionId', { type: () => ID }) sessionId: string,
  ) {
    if (process.env.DEMO_MODE != null) {
      throw new ForbiddenError('Action not allowed in demo mode.');
    }
    const result =
      await this.parkingLoginSessionService.terminateParkingLoginSession(
        sessionId,
      );
    return result.affected > 0;
  }
}
