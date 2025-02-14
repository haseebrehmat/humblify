import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('addSuperhero', () => {
    it('should successfully add a valid superhero', () => {
      const superhero = {
        name: 'Test Hero',
        superpower: 'Testing',
        humilityScore: 8
      };
      
      const result = controller.addSuperhero(superhero);
      
      expect(result).toEqual(superhero);
      expect(service.getSuperheroes()).toContainEqual(superhero);
    });

    it('should add multiple superheroes and maintain sort order', () => {
      const superhero1 = {
        name: 'Less Humble Hero',
        superpower: 'Testing',
        humilityScore: 5
      };
      
      const superhero2 = {
        name: 'More Humble Hero',
        superpower: 'Testing',
        humilityScore: 9
      };
      
      controller.addSuperhero(superhero1);
      controller.addSuperhero(superhero2);
      
      const result = controller.getSuperheroes();
      
      expect(result[0]).toEqual(superhero2); // More humble hero should be first
      expect(result[1]).toEqual(superhero1); // Less humble hero should be second
    });

    it('should throw BadRequestException for invalid humility score', () => {
      const invalidSuperhero = {
        name: 'Invalid Hero',
        superpower: 'Testing',
        humilityScore: 11 // Invalid score > 10
      };
      
      expect(() => {
        controller.addSuperhero(invalidSuperhero);
      }).toThrow(BadRequestException);
    });
  });

  describe('getSuperheroes', () => {
    it('should return empty array when no superheroes exist', () => {
      const result = controller.getSuperheroes();
      expect(result).toEqual([]);
    });

    it('should return superheroes sorted by humility score', () => {
      const heroes = [
        { name: 'Hero 1', superpower: 'Power 1', humilityScore: 3 },
        { name: 'Hero 2', superpower: 'Power 2', humilityScore: 7 },
        { name: 'Hero 3', superpower: 'Power 3', humilityScore: 5 }
      ];
      
      heroes.forEach(hero => controller.addSuperhero(hero));
      
      const result = controller.getSuperheroes();
      
      expect(result[0].humilityScore).toBe(7);
      expect(result[1].humilityScore).toBe(5);
      expect(result[2].humilityScore).toBe(3);
    });
  });
});
