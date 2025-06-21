// import { BadRequestException, HttpException, Injectable } from '@nestjs/common';

// import * as fs from 'fs';
// import stream = require('stream');
// import * as util from 'util';
// import { join } from 'path';
// import { Request, Response } from 'express';
// import urlJoin from 'proper-url-join';

// @Injectable()
// export class UploadService {
//   // upload file
//   async uploadFile(req, res: Response): Promise<void> {
//     //Check request is multipart
//     if (!req.isMultipart()) {
//       res.send(new BadRequestException());
//       return;
//     }
//     let _fileName = '';
//     const mp = await req.multipart(
//       async (field: string, file, filename: string): Promise<void> => {
//         const pipeline = util.promisify(stream.pipeline);
//         await fs.promises.mkdir('uploads', { recursive: true });
//         _fileName = join('uploads', `${new Date().getTime()}-${filename}`);
//         //_fileName = `${new Date().getTime()}-${filename}`;
//         const writeStream = fs.createWriteStream(
//           join(process.cwd(), _fileName),
//         );
//         try {
//           await pipeline(file, writeStream);
//         } catch (err) {
//           console.error('Pipeline failed', err);
//         }
//       },
//       (err) => {
//         if (err) {
//           res.send(new HttpException('Internal server error', 500));
//           return;
//         }
//         res
//           .code(200)
//           .send({ address: urlJoin(process.env.CDN_URL, _fileName) });
//       },
//     );
//     // for key value pairs in request
//     mp.on('field', function () {
//       //console.log('form-data', key, value);
//     });
//   }
// }
