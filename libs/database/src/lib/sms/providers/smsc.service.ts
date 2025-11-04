import { Injectable, Logger } from "@nestjs/common";
import { SMSProviderInterface } from "./sms-provider.interface";
import { SMSProviderEntity } from "../../entities/sms-provider.entity";
import axios from "axios";
import { ForbiddenError } from "@nestjs/apollo";
import * as qs from "qs";

@Injectable()
export class SMSCService implements SMSProviderInterface {
  private readonly logger = new Logger(SMSCService.name);

  async sendOTP(input: {
    providerEntity: SMSProviderEntity;
    phoneNumber: string;
    message: string;
  }): Promise<void> {
    try {
      this.logger.log("=== SMSC SMS Service ===");
      const login = input.providerEntity.accountId!;
      const password = input.providerEntity.authToken!;
      const sender = input.providerEntity.fromNumber!;

      this.logger.log(`Sending SMS to: ${input.phoneNumber}`);
      this.logger.log(`Sender: ${sender}`);
      this.logger.log(`Login: ${login}`);
      this.logger.log(`Message: ${input.message}`);

      const params = {
        login,
        psw: password,
        phones: input.phoneNumber,
        mes: input.message,
        sender,
        fmt: 3, // JSON
      };

      const url = `https://smsc.kz/sys/send.php?${qs.stringify(params)}`;
      const urlWithoutPassword = url.replace(password, '***');
      this.logger.log(`Request URL: ${urlWithoutPassword}`);

      const response = await axios.get(url);
      
      this.logger.log(`SMSC Response status: ${response.status}`);
      this.logger.log(`SMSC Response data: ${JSON.stringify(response.data)}`);

      if (response.data.error) {
        const errorMsg = response.data.error;
        const errorCode = response.data.error_code;
        this.logger.error(`SMSC Error: ${errorMsg} (code: ${errorCode})`);
        throw new Error(`SMSC API Error: ${errorMsg} (code: ${errorCode})`);
      }

      this.logger.log("SMS sent successfully via SMSC");
    } catch (error) {
      this.logger.error(`SMSC Service Error: ${(error as Error).message}`);
      throw new ForbiddenError((error as Error).message);
    }
  }
}
