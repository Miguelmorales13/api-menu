import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModuleService } from './module.service';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller modules
 */
@ApiTags('Modules')
@Controller('modules')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ModuleController {
  constructor(private readonly modules: ModuleService) {}

  @Get()
  async getByAdmins(@Headers('accept-language') lang: string) {
    // async getAll(@Req() req: Request) {

    let data = await this.modules.getAll();

    return data;
  }
}
