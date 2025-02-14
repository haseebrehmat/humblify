import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheroes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addSuperhero(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.appService.addSuperhero(createSuperheroDto);
  }

  @Get()
  getSuperheroes() {
    return this.appService.getSuperheroes();
  }
}
