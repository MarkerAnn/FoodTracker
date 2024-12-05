import { Unit } from '../../src/enums/Unit'
import { RecipeNutritionCalculator } from '../../src/services/RecipeNutritionCalculator'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Recipe } from '../../src/models/Recipe'

describe('RecipeNutritionCalculator', () => {
  let calculator: RecipeNutritionCalculator
  let ingredientManager: IngredientManager

  beforeEach(() => {
    ingredientManager = new IngredientManager()
    calculator = new RecipeNutritionCalculator(ingredientManager)
  })

  describe('Basic Recipe Nutrition Calculation', () => {
    it('should calculate calories for a recipe', () => {
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

      const caloriesPerPortion = calculator.getCaloriesPerPortion(recipe)

      // EGG: 155 cal per 100g -> 60g = 155 * 0.6 = 93
      // MILK: 42 cal per 100g -> 100g = 42 * 1 = 42
      // OMELETTE: 2 eggs + 1 dl milk = (93*2) + 42 = 228
      expect(caloriesPerPortion).toBe(228)
    })
  })
})
