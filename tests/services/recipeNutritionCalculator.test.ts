import { Unit } from '../../src/enums/Unit'
import { RecipeNutritionCalculator } from '../../src/services/RecipeNutritionCalculator'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Recipe } from '../../src/models/Recipe'
import exp from 'constants'

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

    describe('Detailed Nutrition Calculation', () => {
      it('should calculate detailed nutrition for a recipe', () => {
        const egg = ingredientManager.createIngredient('Egg', 155)
        const milk = ingredientManager.createIngredient('Milk', 42)
        ingredientManager.setUnitAndWeight(egg.id, Unit.PCS, 60)
        ingredientManager.setUnitAndWeight(milk.id, Unit.DL, 100)
        ingredientManager.setDtailedNutritions(egg.id, {
          proteins: 13,
          fats: 11,
          carbs: 1,
        })
        ingredientManager.setDtailedNutritions(milk.id, {
          proteins: 3.4,
          fats: 0.1,
          carbs: 4.7,
        })

        const recipe = new Recipe(
          'Omelette',
          [
            { ingredientId: egg.id, amount: 2 },
            { ingredientId: milk.id, amount: 1 },
          ],
          'Cook it',
          1,
        )

        const detailedNutritionPerPortion =
          calculator.getDetailedNutritionPerPortion(recipe)

        // EGG: 155 cal per 100g -> 60g = 155 * 0.6 = 93
        // MILK: 42 cal per 100g -> 100g = 42 * 1 = 42
        // OMELETTE: 2 eggs + 1 dl milk = (93*2) + 42 = 228
        // EGG: 13g proteins, 11g fats, 1g carbs
        // MILK: 3.4g proteins, 0.1g fats, 4.7g carbs
        // OMELETTE: 13*2 + 3.4 = 29.4g proteins, 11*2 + 0.1 = 22.2g fats, 1*2 + 4.7 = 6.7g carbs
        expect(detailedNutritionPerPortion).toStrictEqual({
          proteins: 29.4,
          fats: 22.2,
          carbs: 6.7,
        })
      })
    })
  })
})
