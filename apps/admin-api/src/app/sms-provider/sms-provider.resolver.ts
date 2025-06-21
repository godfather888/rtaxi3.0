import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { SMSProviderService } from './sms-provider.service';
import { SMSProviderDTO } from './dto/sms-provider.dto';

@Resolver()
export class SMSProviderResolver {
  constructor(private smsProviderService: SMSProviderService) {}

  @Mutation(() => SMSProviderDTO)
  async markSMSProviderAsDefault(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<SMSProviderDTO> {
    return await this.smsProviderService.markAsDefault(id);
  }
}
