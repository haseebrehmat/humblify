import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

import { AppService } from '@services/app.service'
import { CreateSuperheroDto } from '@dto/create-superhero.dto'

@ApiTags('superheroes')
@Controller('superheroes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addSuperhero(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.appService.addSuperhero(createSuperheroDto)
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of items per page' })
  getSuperheroes(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.appService.getSuperheroes(parseInt(page, 10) || 1, parseInt(limit, 10) || 10)
  }
}
