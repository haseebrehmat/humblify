import { Test } from '@nestjs/testing'

import { AppModule } from '@/app.module'
import { AppController } from '@controllers/app.controller'
import { AppService } from '@services/app.service'
import { PaginationService } from '@services/pagination.service'

describe('AppModule', () => {
  let moduleRef

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
  })

  it('should compile the module', () => {
    expect(moduleRef).toBeDefined()
  })

  it('should provide AppController', () => {
    expect(moduleRef.get(AppController)).toBeInstanceOf(AppController)
  })

  it('should provide AppService', () => {
    expect(moduleRef.get(AppService)).toBeInstanceOf(AppService)
  })

  it('should provide PaginationService', () => {
    expect(moduleRef.get(PaginationService)).toBeInstanceOf(PaginationService)
  })

  it('should export PaginationService', () => {
    const exportedProvider = moduleRef.get(PaginationService, { strict: false })
    expect(exportedProvider).toBeInstanceOf(PaginationService)
  })
})
