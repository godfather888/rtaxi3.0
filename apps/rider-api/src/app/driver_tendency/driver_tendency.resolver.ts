import { Args, CONTEXT, ID, Mutation, Resolver } from '@nestjs/graphql';
import { DriverTendencyService } from './driver_tendeny.service';
import { Inject, UseGuards } from '@nestjs/common';
import { UserContext } from '../auth/authenticated-user';
import { GqlAuthGuard } from '../auth/access-token.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class DriverTendencyResolver {
  constructor(
    private driverTendencyService: DriverTendencyService,
    @Inject(CONTEXT) private context: UserContext,
  ) {}

  @Mutation(() => Boolean)
  async deleteFavoriteDriver(
    @Args('driverId', { type: () => ID }) driverId: number,
  ): Promise<boolean> {
    await this.driverTendencyService.deleteFavoriteDriver(
      this.context.req.user.id,
      driverId,
    );
    return true;
  }
}
