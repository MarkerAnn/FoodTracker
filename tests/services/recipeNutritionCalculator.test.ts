import { Unit } from '../../src/enums/Unit'
import { RecipeNutritionCalculator } from '../../src/services/RecipeNutritionCalculator'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Recipe } from '../../src/models/Recipe'
import { mockNutrition } from '../mockData/ingredients.mockData'
import { setupIngredientFromMock, setupRecipe } from '../utils/testHelpers'

describe('RecipeNutritionCalculator', () => {
  let calculator: RecipeNutritionCalculator
  let ingredientManager: IngredientManager

  beforeEach(() => {
    ingredientManager = new IngredientManager()
    calculator = new RecipeNutritionCalculator(ingredientManager)
  })

  describe('Basic Recipe Nutrition Calculation', () => {
    it('should calculate calories for a recipe', () => {
      // REQ-018 - Calculate calories for a recipe
      const recipe = setupRecipe(ingredientManager)
      const caloriesPerPortion = calculator.getCaloriesPerPortion(recipe)

      // EGG: 155 cal per 100g -> 60g = 155 * 0.6 = 93
      // MILK: 42 cal per 100g -> 100g = 42 * 1 = 42
      // OMELETTE: 2 eggs + 1 dl milk = (93*2) + 42 = 228
      expect(caloriesPerPortion).toBe(228)
    })

    describe('Detailed Nutrition Calculation', () => {
      it('should calculate detailed nutrition for a recipe', () => {
        const recipe = setupRecipe(ingredientManager)
        const detailedNutrition =
          calculator.getDetailedNutritionPerPortion(recipe)

        // Calculate per ingredient:

        // Egg (per 100g has 13g protein, 11g fat, 1g carb)
        // Each egg is 60g, so multiply values by 0.6
        // For 2 eggs: multiply by 2
        // Milk (per 100g has 3.4g protein, 0.1g fat, 4.7g carb)
        // 1 dl milk is 100g, so use values as is
        // For 1 dl: multiply by 1

        // Sum up totals:
        // Proteins: (13 * 0.6 * 2) + (3.4 * 1) = 15.6 + 3.4 = 19
        // Fats: (11 * 0.6 * 2) + (0.1 * 1) = 13.2 + 0.1 = 13.3
        // Carbs: (1 * 0.6 * 2) + (4.7 * 1) = 1.2 + 4.7 = 5.9
        expect(detailedNutrition.proteins).toBeCloseTo(19.0, 1)
        expect(detailedNutrition.fats).toBeCloseTo(13.3, 1)
        expect(detailedNutrition.carbs).toBeCloseTo(5.9, 1)
      })
    })

    describe('Detailed Nutrition Calculation', () => {
      it('should throw an error when calculating detailed nutrition without ingredient details', () => {
        const egg = ingredientManager.createIngredient('Egg', 155)
        const milk = ingredientManager.createIngredient('Milk', 42)
        ingredientManager.setUnitAndWeight(egg.id, Unit.PCS, 60)
        ingredientManager.setUnitAndWeight(milk.id, Unit.DL, 100)

        const recipe = new Recipe(
          'Omelette',
          [
            { ingredientId: egg.id, amount: 2 },
            { ingredientId: milk.id, amount: 1 },
          ],
          'Cook it',
          1,
        )

        expect(() => calculator.getDetailedNutritionPerPortion(recipe)).toThrow(
          'Nutrition per 100 gram must be defined',
        )
      })
    })
  })
})
