import { IngredientManager } from '../../src/services/IngredientManager'
import { Recipe } from '../../src/models/Recipe'
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
export const setupRecipeOmelette = (
  ingredientManager: IngredientManager,
): Recipe => {
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

/**
 * A helper function to setup a pancakes recipe with the ingredients from the mock data
 * @param ingredientManager
 * @returns
 */
export const setupRecipePanncakes = (
  ingredientManager: IngredientManager,
): Recipe => {
  const egg = setupIngredientFromMock('egg', ingredientManager)
  const milk = setupIngredientFromMock('milk', ingredientManager)
  const wheat = setupIngredientFromMock('wheat', ingredientManager)

  return new Recipe(
    'Pancakes',
    [
      { ingredientId: egg.id, amount: 1 },
      { ingredientId: milk.id, amount: 2.5 },
      { ingredientId: wheat.id, amount: 1 },
    ],
    'Cook it',
    1,
  )
}

/**
 * A helper function to setup a porridge recipe with the ingredients from the mock data
 * @param ingredientManager
 * @returns
 */
export const setupRecipePorridge = (
  ingredientManager: IngredientManager,
): Recipe => {
  const oats = setupIngredientFromMock('oats', ingredientManager)
  const milk = setupIngredientFromMock('milk', ingredientManager)
  const banana = setupIngredientFromMock('banana', ingredientManager)

  return new Recipe(
    'Oatmeal Porridge',
    [
      { ingredientId: oats.id, amount: 1 },
      { ingredientId: milk.id, amount: 2 },
      { ingredientId: banana.id, amount: 1 },
    ],
    'Cook oats with milk, top with sliced banana',
    1,
  )
}

/**
 * A helper function to setup a banana pancakes recipe with the ingredients from the mock data
 * @param ingredientManager
 * @returns
 */
export const setupRecipeBananaPancakes = (
  ingredientManager: IngredientManager,
): Recipe => {
  const egg = setupIngredientFromMock('egg', ingredientManager)
  const milk = setupIngredientFromMock('milk', ingredientManager)
  const wheat = setupIngredientFromMock('wheat', ingredientManager)
  const banana = setupIngredientFromMock('banana', ingredientManager)
  const butter = setupIngredientFromMock('butter', ingredientManager)

  return new Recipe(
    'Banana Pancakes',
    [
      { ingredientId: egg.id, amount: 2 },
      { ingredientId: milk.id, amount: 2 },
      { ingredientId: wheat.id, amount: 1.5 },
      { ingredientId: banana.id, amount: 2 },
      { ingredientId: butter.id, amount: 2 },
    ],
    'Mix all ingredients. Fry in butter until golden brown.',
    2,
  )
}

/**
 * A helper function to setup a french toast recipe with the ingredients from the mock data
 * @param ingredientManager
 * @returns
 */
export const setupRecipeFrenchToast = (
  ingredientManager: IngredientManager,
): Recipe => {
  const egg = setupIngredientFromMock('egg', ingredientManager)
  const milk = setupIngredientFromMock('milk', ingredientManager)
  const butter = setupIngredientFromMock('butter', ingredientManager)
  const sugar = setupIngredientFromMock('sugar', ingredientManager)

  return new Recipe(
    'French Toast',
    [
      { ingredientId: egg.id, amount: 2 },
      { ingredientId: milk.id, amount: 1 },
      { ingredientId: butter.id, amount: 1 },
      { ingredientId: sugar.id, amount: 1 },
    ],
    'Whisk eggs and milk. Dip bread, fry in butter, top with sugar.',
    2,
  )
}
