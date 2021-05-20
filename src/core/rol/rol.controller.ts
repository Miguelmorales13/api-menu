import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ErrorResponse } from '../general.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolDTO, RolResponseDTO } from './rol.dto';
import { RolService } from './rol.service';
import { AuthGuard } from '@nestjs/passport';
import { HeadersGlobals } from '../../config/constants';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))

@ApiTags('Roles')
@Controller('roles')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RolController {
  constructor(readonly rols: RolService) {}
  /**
   * Gets rol controller
   * @param [companyId]
   * @returns
   */
  @Get()
  @ApiHeader(HeadersGlobals)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: RolResponseDTO,
    isArray: true,
  })
  @ApiResponse({
    description: 'error response structure',
    type: ErrorResponse,
  })
  async getAll() {
    return await this.rols.getAll();
  }
  /**
   * Gets rol controller
   * @param id
   * @param lang
   * @returns
   */
  @Get(':id')
  @ApiHeader(HeadersGlobals)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: RolResponseDTO,
  })
  @ApiResponse({
    description: 'error response structure',
    type: ErrorResponse,
  })
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Headers('accept-language') lang: any,
  ) {
    let data = await this.rols.getOne(id, null, lang);
    return data;
  }

  /**
   * Posts rol controller
   * @param rol
   * @returns
   */
  @Post()
  @ApiHeader(HeadersGlobals)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: RolResponseDTO,
  })
  @ApiResponse({ description: 'error response structure', type: ErrorResponse })
  async create(@Body() rol: RolDTO) {
    let data = await this.rols.create(rol);
    return data;
  }
  @Put(':id')
  @ApiHeader(HeadersGlobals)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: RolResponseDTO,
  })
  @ApiResponse({ description: 'error response structure', type: ErrorResponse })
  async update(@Body() rol: RolDTO, @Param('id', ParseIntPipe) id: number) {
    let data = await this.rols.update(rol, id);
    return data;
  }
  @Delete(':id')
  @ApiHeader(HeadersGlobals)
  async delete(@Param('id', ParseIntPipe) id: number) {
    let rol = await this.rols.getOneUser(id);
    if (rol.users && rol.users.length && rol.users.length > 0) {
      throw new HttpException(
        'errors.roles.rol_not_eliminated',
        HttpStatus.BAD_REQUEST,
      );
    }
    let data = await this.rols.delete(id);
    return data;
  }
}
