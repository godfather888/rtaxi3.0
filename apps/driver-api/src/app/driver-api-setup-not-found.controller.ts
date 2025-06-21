import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class DriverApiSetupNotFoundController {
  @Get('/')
  main(@Res() res: Response) {
    return res.redirect('/admin', 301);
  }

  @Get('/restart')
  restart(@Res() res: Response) {
    res.send('✅ Restarting...');
    process.exit(1);
  }
}
