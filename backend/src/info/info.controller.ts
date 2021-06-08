import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { Admin } from 'src/user/user.entity';
import { AddInfoDto } from './dto/add-info.dto';
import { Info } from './info.entity';
import { InfoService } from './info.service';

@Controller('infos')
@UseGuards(AuthGuard())
export class InfoController {
  constructor(private _infoService: InfoService){}

  @Get()
  getInfos():Promise<Info[]>{
    return this._infoService.getInfos();
  }

   
  @Post()
  addInfo( @Body() addInfoDto: AddInfoDto, @GetUser() user: Admin):Promise<Info>{
    return this._infoService.addInfo(addInfoDto, user);
  }

}
