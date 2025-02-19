import { Superhero } from '@models/superhero.model'

describe('Superhero Model', () => {
  it('should create a superhero instance with valid properties', () => {
    const superhero: Superhero = {
      name: 'Spider-Man',
      superpower: 'Web-slinging',
      humilityScore: 9,
    }

    expect(superhero).toBeDefined()
    expect(superhero.name).toBe('Spider-Man')
    expect(superhero.superpower).toBe('Web-slinging')
    expect(superhero.humilityScore).toBe(9)
  })

  it('should allow modifying properties of a superhero instance', () => {
    const superhero: Superhero = {
      name: 'Iron Man',
      superpower: 'Genius intellect',
      humilityScore: 5,
    }

    superhero.name = 'Tony Stark'
    superhero.superpower = 'Engineering'
    superhero.humilityScore = 4

    expect(superhero.name).toBe('Tony Stark')
    expect(superhero.superpower).toBe('Engineering')
    expect(superhero.humilityScore).toBe(4)
  })

  it('should handle default object creation', () => {
    const superhero = new Superhero()
    expect(superhero).toBeDefined()
    expect(superhero.name).toBeUndefined()
    expect(superhero.superpower).toBeUndefined()
    expect(superhero.humilityScore).toBeUndefined()
  })
})
