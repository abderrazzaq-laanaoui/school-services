import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AddAbsenceDto } from './dto/add-absence.dto';

@Controller('absence')
export class AbsenceController {
  @Post()
  addAbsence(@Body(ValidationPipe) addAbsenceDto: AddAbsenceDto) {

  }
}
