import { IngredientManager } from '../../src/services/IngredientManager'
import { Ingredient } from '../../src/models/Ingredient'
import { ingredientEgg } from '../mockData/ingredients.mockData'

describe('IngredientManager', () => {
  it('should add an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = ingredientEgg

    manager.addIngredient(ingredient)

    expect(manager.getIngredients()).toContainEqual(ingredient)
  })

  it('should delete an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = ingredientEgg

    manager.addIngredient(ingredient)
    manager.deleteIngredient(ingredient.id)

    expect(manager.getIngredients()).not.toContainEqual(ingredient)
  })

  it('should throw error if ingredient does not exist', () => {
    const manager = new IngredientManager()
    const ingredient = ingredientEgg

    expect(() => manager.deleteIngredient(ingredient.id)).toThrowError(
      'Ingredient does not exist.',
    )
  })

  it('should update an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = ingredientEgg

    manager.addIngredient(ingredient)
    manager.updateIngredient(ingredient.id, { name: 'Egg White' })

    const updatedIngredient = manager
      .getIngredients()
      .find((ing) => ing.id === ingredient.id)

    expect(updatedIngredient?.name).toBe('Egg White')
  })

  it('should throw error if ingredient you want to update does not exist', () => {
    const manager = new IngredientManager()
    const ingredient = ingredientEgg

    expect(() =>
      manager.updateIngredient(ingredient.id, { name: 'Egg White' }),
    ).toThrow('Ingredient does not exist.')
  })
})
