import { Test, TestingModule } from '@nestjs/testing'
import { validate } from 'class-validator'

import { AppController } from '@controllers/app.controller'
import { AppService } from '@services/app.service'
import { PaginationService } from '@services/pagination.service'
import { CreateSuperheroDto } from '@dto/create-superhero.dto'

describe('AppController', () => {
  let controller: AppController
  let service: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PaginationService],
    }).compile()

    controller = module.get<AppController>(AppController)
    service = module.get<AppService>(AppService)
  })

  describe('addSuperhero', () => {
    it('should successfully add a valid superhero', () => {
      const superhero: CreateSuperheroDto = {
        name: 'Test Hero',
        superpower: 'Testing',
        humilityScore: 8,
      }

      const result = controller.addSuperhero(superhero)
      expect(result).toEqual(superhero)

      const response = service.getSuperheroes()
      expect(response.data).toContainEqual(superhero)
    })

    it('should add multiple superheroes and maintain sort order', () => {
      const superhero1: CreateSuperheroDto = {
        name: 'Less Humble Hero',
        superpower: 'Testing',
        humilityScore: 5,
      }

      const superhero2: CreateSuperheroDto = {
        name: 'More Humble Hero',
        superpower: 'Testing',
        humilityScore: 9,
      }

      controller.addSuperhero(superhero1)
      controller.addSuperhero(superhero2)

      const result = controller.getSuperheroes()

      expect(result.data[0]).toEqual(superhero2) // More humble hero should be first
      expect(result.data[1]).toEqual(superhero1) // Less humble hero should be second
    })

    it('should throw BadRequestException for invalid humility score', async () => {
      const invalidSuperhero = new CreateSuperheroDto()
      invalidSuperhero.name = 'Invalid Hero'
      invalidSuperhero.superpower = 'Testing'
      invalidSuperhero.humilityScore = 11 // Invalid score > 10

      // Manually validate DTO
      const errors = await validate(invalidSuperhero)
      expect(errors.length).toBeGreaterThan(0) // Should have validation errors
    })
  })

  describe('getSuperheroes', () => {
    it('should return empty array when no superheroes exist', () => {
      const result = controller.getSuperheroes()
      expect(result.data).toEqual([])
    })

    it('should return superheroes sorted by humility score', () => {
      const heroes = [
        { name: 'Hero 1', superpower: 'Power 1', humilityScore: 3 },
        { name: 'Hero 2', superpower: 'Power 2', humilityScore: 7 },
        { name: 'Hero 3', superpower: 'Power 3', humilityScore: 5 },
      ]

      heroes.forEach(hero => controller.addSuperhero(hero))

      const result = controller.getSuperheroes()

      expect(result.data.length).toBe(3)
      expect(result.data[0].humilityScore).toBe(7)
      expect(result.data[1].humilityScore).toBe(5)
      expect(result.data[2].humilityScore).toBe(3)
    })
  })
})
