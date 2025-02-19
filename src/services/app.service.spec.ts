import { Test, TestingModule } from '@nestjs/testing'

import { AppService } from '@services/app.service'
import { Superhero } from '@models/superhero.model'
import { CreateSuperheroDto } from '@dto/create-superhero.dto'
import { PaginationService, PaginatedResult } from '@services/pagination.service'

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, PaginationService],
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  describe('addSuperhero', () => {
    it('should add a superhero and return it', () => {
      const superheroDto: CreateSuperheroDto = {
        name: 'Superman',
        superpower: 'Flying',
        humilityScore: 10,
      }

      const result = appService.addSuperhero(superheroDto)

      expect(result).toEqual(expect.objectContaining(superheroDto))
      expect(appService.getSuperheroes().data).toContainEqual(expect.objectContaining(superheroDto))
    })
  })

  describe('getSuperheroes', () => {
    it('should return an empty paginated result if no superheroes exist', () => {
      const result: PaginatedResult<Superhero> = appService.getSuperheroes()
      expect(result.data).toEqual([])
      expect(result.totalItems).toBe(0)
      expect(result.totalPages).toBe(0)
    })

    it('should return superheroes sorted by humility score in descending order', () => {
      const heroes: CreateSuperheroDto[] = [
        { name: 'Hero 1', superpower: 'Power 1', humilityScore: 3 },
        { name: 'Hero 2', superpower: 'Power 2', humilityScore: 7 },
        { name: 'Hero 3', superpower: 'Power 3', humilityScore: 5 },
      ]

      heroes.forEach(hero => appService.addSuperhero(hero))

      const result = appService.getSuperheroes()

      expect(result.data[0].humilityScore).toBe(7)
      expect(result.data[1].humilityScore).toBe(5)
      expect(result.data[2].humilityScore).toBe(3)
    })

    it('should apply pagination correctly', () => {
      const heroes: CreateSuperheroDto[] = [
        { name: 'Hero A', superpower: 'Speed', humilityScore: 5 },
        { name: 'Hero B', superpower: 'Strength', humilityScore: 6 },
        { name: 'Hero C', superpower: 'Invisibility', humilityScore: 7 },
      ]

      heroes.forEach(hero => appService.addSuperhero(hero))

      const paginatedResult = appService.getSuperheroes(1, 2)

      expect(paginatedResult.data.length).toBe(2)
      expect(paginatedResult.page.current).toBe(1)
      expect(paginatedResult.page.next).toBe(2)
    })
  })
})
