// import { Test, TestingModule } from '@nestjs/testing'
// import { INestApplication } from '@nestjs/common'
// import * as request from 'supertest'
// import { AppModule } from '@/app.module'

// describe('AppController (e2e)', () => {
//   let app: INestApplication

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile()

//     app = moduleFixture.createNestApplication()
//     await app.init()
//   })

//   it('/ (GET)', () => {
//     return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
//   })
// })

import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { CreateSuperheroDto } from '@/dto/create-superhero.dto'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('POST /superheroes (should create a superhero)', async () => {
    const superhero: CreateSuperheroDto = {
      name: 'Test Hero',
      superpower: 'Testing',
      humilityScore: 8,
    }

    const response = await request(app.getHttpServer()).post('/superheroes').send(superhero).expect(201)

    expect(response.body).toMatchObject(superhero)
  })

  it('POST /superheroes (should return 400 for invalid humility score)', async () => {
    const invalidSuperhero: CreateSuperheroDto = {
      name: 'Bad Hero',
      superpower: 'Cheating',
      humilityScore: 15, // Invalid (should be between 1 and 10)
    }

    const response = await request(app.getHttpServer()).post('/superheroes').send(invalidSuperhero)
    expect(response.status).toBe(400)
    expect(response.body.message).toContain('humilityScore must not be greater than 10')
  })

  it('GET /superheroes (should return paginated superheroes)', async () => {
    const response = await request(app.getHttpServer()).get('/superheroes')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
  })
})
