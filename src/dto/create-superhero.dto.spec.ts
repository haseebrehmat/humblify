import { validate } from 'class-validator'

import { CreateSuperheroDto } from '@dto/create-superhero.dto'

describe('CreateSuperheroDto', () => {
  it('should validate a valid superhero', async () => {
    const dto = new CreateSuperheroDto()
    dto.name = 'Test Hero'
    dto.superpower = 'Testing'
    dto.humilityScore = 8

    const errors = await validate(dto)
    expect(errors).toHaveLength(0)
  })

  it('should fail validation with invalid humility score (greater than max)', async () => {
    const dto = new CreateSuperheroDto()
    dto.name = 'Test Hero'
    dto.superpower = 'Testing'
    dto.humilityScore = 11 // Invalid: greater than max (10)

    const errors = await validate(dto)
    expect(errors).toHaveLength(1)
    expect(errors[0].property).toBe('humilityScore')
  })

  it('should fail validation with invalid humility score (less than min)', async () => {
    const dto = new CreateSuperheroDto()
    dto.name = 'Test Hero'
    dto.superpower = 'Testing'
    dto.humilityScore = 0 // Invalid: less than min (1)

    const errors = await validate(dto)
    expect(errors).toHaveLength(1)
    expect(errors[0].property).toBe('humilityScore')
  })

  it('should fail validation with empty name', async () => {
    const dto = new CreateSuperheroDto()
    dto.name = '' // Invalid: empty
    dto.superpower = 'Testing'
    dto.humilityScore = 8

    const errors = await validate(dto)
    expect(errors).toHaveLength(1)
    expect(errors[0].property).toBe('name')
  })

  it('should fail validation with missing superpower', async () => {
    const dto = new CreateSuperheroDto()
    dto.name = 'Test Hero'
    dto.superpower = '' // Invalid: empty
    dto.humilityScore = 8

    const errors = await validate(dto)
    expect(errors).toHaveLength(1)
    expect(errors[0].property).toBe('superpower')
  })

  it('should fail validation if any field is missing', async () => {
    const dto = new CreateSuperheroDto()
    dto.name = 'Test Hero'
    dto.superpower = undefined as any // Invalid: missing
    dto.humilityScore = 8

    const errors = await validate(dto)
    expect(errors).toHaveLength(1)
    expect(errors[0].property).toBe('superpower')
  })
})
