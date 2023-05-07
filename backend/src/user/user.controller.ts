import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Header,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, CreateUserDto, UpdateUserDto, Login } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../utils';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @ApiOkResponse({ type: [User] })
  // @Get()
  // findAll(@Query() query: FindAllQuery) {
  //   return this.userService.findAll(query);
  // }

  // @ApiOkResponse({ type: User })
  // @Get(':id')
  // findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
  //   return this.userService.findOne(+id, query);
  // }

  // @ApiOkResponse({ type: User })
  // @Get('/file/download')
  // @Header('Content-type', 'application/xlsx')
  // async download(@Res() res) {
  //   const file = await this.userService.download();
  //   return res.download(file);
  // }

  // @ApiCreatedResponse({ type: User })
  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage,
  //   }),
  // )
  // async create(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() data: CreateUserDto,
  // ) {
  //   return this.userService.create(file, data);
  // }

  // @ApiCreatedResponse({ type: User })
  // @Post('/login')
  // login(@Body() data: Login) {
  //   return this.userService.login(data);
  // }

  // @ApiOkResponse({ type: User })
  // @Patch(':id')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage,
  //   }),
  // )
  // update(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() data: UpdateUserDto,
  // ) {
  //   return this.userService.update(id, data, file);
  // }

  // @ApiOkResponse({ type: User })
  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.remove(id);
  // }
}
