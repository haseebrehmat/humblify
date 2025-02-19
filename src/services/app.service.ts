import { Injectable } from '@nestjs/common'

import { Superhero } from '@models/superhero.model'
import { CreateSuperheroDto } from '@dto/create-superhero.dto'
import { PaginationService, PaginatedResult } from '@services/pagination.service'

@Injectable()
export class AppService {
  private superheroes: Superhero[] = []

  constructor(private readonly paginationService: PaginationService) {}

  addSuperhero(createSuperheroDto: CreateSuperheroDto): Superhero {
    // The validation is now handled by the DTO decorators
    const superhero: Superhero = {
      name: createSuperheroDto.name,
      superpower: createSuperheroDto.superpower,
      humilityScore: createSuperheroDto.humilityScore,
    }

    this.superheroes.push(superhero)
    return superhero
  }

  getSuperheroes(page: number, limit: number): PaginatedResult<Superhero> {
    const sortedHeroes = [...this.superheroes].sort((a, b) => b.humilityScore - a.humilityScore)
    return this.paginationService.paginate(sortedHeroes, page, limit)
  }
}
