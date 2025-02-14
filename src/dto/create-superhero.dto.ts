import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  superpower: string;

  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
} 