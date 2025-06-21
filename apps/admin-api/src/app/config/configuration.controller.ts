import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('config')
export class ConfigurationController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Directory to save files
        filename: (req: Request, file: Express.Multer.File, cb) => {
          // Generating a unique filename
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB limit
      },
      // fileFilter: (
      //   req: Request,
      //   file,
      //   cb: (error: Error | null, accept: boolean) => void,
      // ) => {
      //   // Only allow images
      //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      //     return cb(new Error('Only image files are allowed!'), false);
      //   }
      //   cb(null, true);
      // },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    res.send({ address: file.filename });
  }
}
