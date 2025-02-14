import { validate } from 'class-validator';
import { CreateSuperheroDto } from './create-superhero.dto';

describe('CreateSuperheroDto', () => {
  it('should validate a valid superhero', async () => {
    const dto = new CreateSuperheroDto();
    dto.name = 'Test Hero';
    dto.superpower = 'Testing';
    dto.humilityScore = 8;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with invalid humility score', async () => {
    const dto = new CreateSuperheroDto();
    dto.name = 'Test Hero';
    dto.superpower = 'Testing';
    dto.humilityScore = 11;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with empty name', async () => {
    const dto = new CreateSuperheroDto();
    dto.name = '';
    dto.superpower = 'Testing';
    dto.humilityScore = 8;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
}); 