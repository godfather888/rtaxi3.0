import { Injectable } from "@nestjs/common";
import { SMSProviderInterface } from "./sms-provider.interface";
import { SMSProviderEntity } from "../../entities/sms-provider.entity";
import axios from "axios";
import { ForbiddenError } from "@nestjs/apollo";
import * as qs from "qs";

@Injectable()
export class SMSCService implements SMSProviderInterface {
  async sendOTP(input: {
    providerEntity: SMSProviderEntity;
    phoneNumber: string;
    message: string;
  }): Promise<void> {
    try {
      console.log("HIT SMSC");
      const login = input.providerEntity.accountId!;
      const password = input.providerEntity.authToken!;
      const sender = input.providerEntity.fromNumber!;

      const params = {
        login,
        psw: password,
        phones: input.phoneNumber,
        mes: input.message,
        sender,
        fmt: 3, // JSON
      };

      const url = `https://smsc.kz/sys/send.php?${qs.stringify(params)}`;

      const response = await axios.get(url);

      if (response.data.error) {
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw new ForbiddenError((error as Error).message);
    }
  }
}
