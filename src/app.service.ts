import { Injectable, BadRequestException } from '@nestjs/common';
import { Superhero } from './models/superhero.model';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class AppService {
  private superheroes: Superhero[] = [];

  addSuperhero(createSuperheroDto: CreateSuperheroDto): Superhero {
    // The validation is now handled by the DTO decorators
    const superhero: Superhero = {
      name: createSuperheroDto.name,
      superpower: createSuperheroDto.superpower,
      humilityScore: createSuperheroDto.humilityScore
    };
    
    this.superheroes.push(superhero);
    return superhero;
  }

  getSuperheroes(): Superhero[] {
    return [...this.superheroes].sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
