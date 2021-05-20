import { Injectable } from '@nestjs/common';
// import { config, v2 } from 'cloudinary';
import { ConfigService } from '../../config/config.service';

/**
 * Cloudinary service
 */
@Injectable()
export class CloudinaryService {
  /**
   * Creates an instance of cloudinary service.
   * @param _config
   */
  constructor(private readonly _config: ConfigService) {
    // config({
    // 	cloud_name: _config.get('CLOUDINARY_NAME'),
    // 	api_key: _config.get('CLOUDINARY_API_KEY'),
    // 	api_secret: _config.get('CLOUDINARY_API_SECRET'),
    // });
  }

  /**
   * Uploads image
   * @param path
   * @returns
   */
  async uploadImage(path: string) {
    // return await v2.uploader.upload(path);
  }
}
