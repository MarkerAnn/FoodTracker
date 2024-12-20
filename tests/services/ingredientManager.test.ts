import { IngredientManager } from '../../src/services/IngredientManager'
import { ingredientEgg } from '../mockData/ingredients.mockData'
import { Unit } from '../../src/enums/Unit'

describe('IngredientManager', () => {
  let manager: IngredientManager
  let testIngredientId: string

  beforeEach(() => {
    manager = new IngredientManager()
  })

  describe('Basic Ingredient Operations', () => {
    it('should add a new ingredient', () => {
      // REQ-009 - Add a new ingredient
      manager.createIngredient(
        ingredientEgg.name,
        ingredientEgg.caloriePerHundredGram,
      )

      expect(manager.getIngredients()).toContainEqual(
        expect.objectContaining({
          name: ingredientEgg.name,
          caloriePerHundredGram: ingredientEgg.caloriePerHundredGram,
        }),
      )
    })

    it('should delete an existing ingredient', () => {
      const ingredient = manager.createIngredient(
        // REQ-012 - Delete an existing ingredient
        ingredientEgg.name,
        ingredientEgg.caloriePerHundredGram,
      )

      manager.deleteIngredient(ingredient.id)

      expect(manager.getIngredients()).not.toContainEqual(ingredient)
    })

    it('should return an ingredient by ID', () => {
      const ingredient = manager.createIngredient(
        ingredientEgg.name,
        ingredientEgg.caloriePerHundredGram,
      )

      expect(manager.getIngredientById(ingredient.id)).toEqual(ingredient)
    })

    it('should throw error when deleting non-existent ingredient', () => {
      expect(() => manager.deleteIngredient('123')).toThrow(
        'Ingredient does not exist.',
      )
    })
  })

  describe('Nutrition Management', () => {
    beforeEach(() => {
      const ingredient = manager.createIngredient(
        ingredientEgg.name,
        ingredientEgg.caloriePerHundredGram,
      )
      testIngredientId = ingredient.id
    })

    describe('Detailed Nutrition', () => {
      it('should add detailed nutrition information', () => {
        manager.setDetailedNutritions(testIngredientId, {
          proteins: 13,
          fats: 11,
          carbs: 1,
        })

        expect(manager.getIngredients()).toContainEqual(
          expect.objectContaining({
            nutritionPer100Gram: { proteins: 13, fats: 11, carbs: 1 },
          }),
        )
      })

      it('should update existing nutrition information', () => {
        manager.setDetailedNutritions(testIngredientId, {
          // REQ-011 - Update detailed nutrition information
          proteins: 13,
          fats: 11,
          carbs: 1,
        })

        manager.setDetailedNutritions(testIngredientId, {
          proteins: 15,
          fats: 12,
          carbs: 2,
        })

        expect(manager.getIngredients()).toContainEqual(
          expect.objectContaining({
            nutritionPer100Gram: { proteins: 15, fats: 12, carbs: 2 },
          }),
        )
      })
    })

    describe('Unit and Weight Management', () => {
      it('should set unit and weight', () => {
        manager.setUnitAndWeight(testIngredientId, Unit.PCS, 50)

        expect(manager.getIngredients()).toContainEqual(
          expect.objectContaining({
            unit: 'pcs',
            gramPerUnit: 50,
          }),
        )
      })

      it('should update existing unit and weight', () => {
        manager.setUnitAndWeight(testIngredientId, Unit.PCS, 50)
        manager.setUnitAndWeight(testIngredientId, Unit.G, 100)

        expect(manager.getIngredients()).toContainEqual(
          expect.objectContaining({
            unit: 'g',
            gramPerUnit: 100,
          }),
        )
      })
    })
  })

  describe('Calculations', () => {
    beforeEach(() => {
      const ingredient = manager.createIngredient(
        ingredientEgg.name,
        ingredientEgg.caloriePerHundredGram,
      )
      testIngredientId = ingredient.id
    })

    describe('Calorie Calculations', () => {
      it('should calculate calories per unit correctly', () => {
        manager.setUnitAndWeight(testIngredientId, Unit.PCS, 50)

        expect(manager.calculateCaloriesPerUnit(testIngredientId)).toBe(77.5)
      })

      it('should throw error when calculating calories without unit and weight', () => {
        expect(() =>
          manager.calculateCaloriesPerUnit(testIngredientId),
        ).toThrow('Unit and gramPerUnit must be defined.')
      })
    })

    describe('Detailed Nutrition Calculations', () => {
      it('should calculate detailed nutrition per unit correctly', () => {
        manager.setUnitAndWeight(testIngredientId, Unit.PCS, 50)
        manager.setDetailedNutritions(testIngredientId, {
          proteins: 13,
          fats: 11,
          carbs: 1,
        })

        expect(
          manager.calculateDetailedNutritionPerUnit(testIngredientId),
        ).toStrictEqual({
          proteins: 6.5,
          fats: 5.5,
          carbs: 0.5,
        })
      })

      it('should throw error when calculating nutrition without unit and weight', () => {
        expect(() =>
          manager.calculateDetailedNutritionPerUnit(testIngredientId),
        ).toThrow('Unit and gramPerUnit must be defined.')
      })

      it('should throw error when calculating nutrition without nutrition values', () => {
        manager.setUnitAndWeight(testIngredientId, Unit.PCS, 50)

        expect(() =>
          manager.calculateDetailedNutritionPerUnit(testIngredientId),
        ).toThrow('Nutrition per 100 gram must be defined.')
      })

      it('should throw error when all nutrition values are 0 or missing', () => {
        manager.setUnitAndWeight(testIngredientId, Unit.PCS, 50)

        manager.setDetailedNutritions(testIngredientId, {
          proteins: 0,
          fats: 0,
          carbs: 0,
        })

        expect(() =>
          manager.calculateDetailedNutritionPerUnit(testIngredientId),
        ).toThrow('Nutrition per 100 gram must be defined.')
      })

      it('should handle undefined values in nutrition calculations', () => {
        manager.setUnitAndWeight(testIngredientId, Unit.PCS, 50)

        manager.setDetailedNutritions(testIngredientId, {
          proteins: 13,
          fats: undefined as any, // Force `undefined`
          carbs: 1,
        })

        expect(
          manager.calculateDetailedNutritionPerUnit(testIngredientId),
        ).toStrictEqual({
          proteins: 6.5,
          fats: 0,
          carbs: 0.5,
        })
      })
    })
  })
})
