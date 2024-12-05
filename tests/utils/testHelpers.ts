import { IngredientManager } from '../../src/services/IngredientManager'
import { Recipe } from '../../src/models/Recipe'
import { Unit } from '../../src/enums/Unit'
import { mockNutrition } from '../mockData/ingredients.mockData'

/**
 * A helper function to setup an ingredient from the mock data
 * @param name
 * @param ingredientManager
 * @returns
 */
export const setupIngredientFromMock = (
  name: keyof typeof mockNutrition,
  ingredientManager: IngredientManager,
) => {
  const { calories, proteins, fats, carbs, gramPerUnit, unit } =
    mockNutrition[name]
  const ingredient = ingredientManager.createIngredient(name, calories)
  ingredientManager.setUnitAndWeight(ingredient.id, unit, gramPerUnit)
  ingredientManager.setDetailedNutritions(ingredient.id, {
    proteins,
    fats,
    carbs,
  })
  return ingredient
}

/**
 * A helper function to setup a omelette recipe with the ingredients from the mock data
 * @param ingredientManager
 * @returns
 */
export const setupRecipe = (ingredientManager: IngredientManager): Recipe => {
  const egg = setupIngredientFromMock('egg', ingredientManager)
  const milk = setupIngredientFromMock('milk', ingredientManager)

  return new Recipe(
    'Omelette',
    [
      { ingredientId: egg.id, amount: 2 },
      { ingredientId: milk.id, amount: 1 },
    ],
    'Cook it',
    1,
  )
}
