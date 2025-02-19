import { Module } from '@nestjs/common'

import { AppController } from '@controllers/app.controller'
import { AppService } from '@services/app.service'
import { PaginationService } from '@services/pagination.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PaginationService],
  exports: [PaginationService],
})
export class AppModule {}
