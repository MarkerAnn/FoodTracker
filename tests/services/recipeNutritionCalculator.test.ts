import { Unit } from '../../src/enums/Unit'
import { RecipeNutritionCalculator } from '../../src/services/RecipeNutritionCalculator'
import { IngredientManager } from '../../src/services/IngredientManager'

describe('RecipeNutritionCalculator', () => {
  let calculator: RecipeNutritionCalculator
  let ingredientManager: IngredientManager

  beforeEach(() => {
    calculator = new RecipeNutritionCalculator()
    ingredientManager = new IngredientManager()
  })

  describe('Basic Recipe Nutrition Calculation', () => {
    it('should calculate calories for a recipe', () => {
      const egg = ingredientManager.createIngredient('Egg', 155)
      const milk = ingredientManager.createIngredient('Milk', 42)
      ingredientManager.setUnitAndWeight(egg.id, Unit.PCS, 60)

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

      // (155 calories per 100g * 60g * 2) + (42 calories per 100g * 100g) = 570
      expect(caloriesPerPortion).toBe(570)
    })
  })
})
