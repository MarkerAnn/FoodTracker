import { IngredientManager } from '../../src/services/IngredientManager'
import { ingredientEgg } from '../mockData/ingredients.mockData'

describe('IngredientManager', () => {
  let manager: IngredientManager

  beforeEach(() => {
    manager = new IngredientManager()
  })

  it('should add an ingredient', () => {
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

  it('should delete an ingredient', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    manager.deleteIngredient(ingredient.id)

    expect(manager.getIngredients()).not.toContainEqual(ingredient)
  })

  it('should throw error if ingredient does not exist', () => {
    const ingredient = { id: '123', name: 'Egg', caloriePerHundredGram: 155 }

    expect(() => manager.deleteIngredient(ingredient.id)).toThrow(
      'Ingredient does not exist.',
    )
  })

  it('should add detailed nutrition information to an ingredient', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    manager.setDtailedNutritions(ingredient.id, {
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    expect(manager.getIngredients()).toContainEqual(
      expect.objectContaining({
        name: ingredientEgg.name,
        caloriePerHundredGram: ingredientEgg.caloriePerHundredGram,
        nutritionPer100Gram: { proteins: 13, fats: 11, carbs: 1 },
      }),
    )
  })

  //   it('should update an ingredient', () => {
  //     const manager = new IngredientManager()
  //     const ingredient = ingredientEgg

  //     manager.addIngredient(ingredient)
  //     manager.updateIngredient(ingredient.id, { name: 'Egg White' })

  //     const updatedIngredient = manager
  //       .getIngredients()
  //       .find((ing) => ing.id === ingredient.id)

  //     expect(updatedIngredient?.name).toBe('Egg White')
  //   })

  //   it('should throw error if ingredient you want to update does not exist', () => {
  //     const manager = new IngredientManager()
  //     const ingredient = ingredientEgg

  //     expect(() =>
  //       manager.updateIngredient(ingredient.id, { name: 'Egg White' }),
  //     ).toThrow('Ingredient does not exist.')
  //   })
})
