import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSuperheroDto {
  @ApiProperty({ example: 'Superman', description: 'Name of the superhero' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'Flying', description: 'Superpower of the superhero' })
  @IsString()
  @IsNotEmpty()
  superpower: string

  @ApiProperty({ example: 5, description: 'Humility score of the superhero' })
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number
}
