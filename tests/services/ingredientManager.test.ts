import { describe, it, expect } from 'vitest'
import { IngredientManager } from '../../src/services/IngredientManager'
import { Ingredient } from '../../src/models/Ingredient'

describe('IngredientManager', () => {
  it('should add an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      calories: 155,
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    manager.addIngredient(ingredient)

    expect(manager.getIngredients()).toContainEqual(ingredient)
  })

  it('should delete an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      calories: 155,
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    manager.addIngredient(ingredient)
    manager.deleteIngredient(ingredient.id)

    expect(manager.getIngredients()).not.toContainEqual(ingredient)
  })

  it('should throw error if ingredient does not exist', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      calories: 155,
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    expect(() => manager.deleteIngredient(ingredient.id)).toThrowError(
      'Ingredient does not exist.',
    )
  })

  it('should update an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      calories: 155,
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    manager.addIngredient(ingredient)
    manager.updateIngredient(ingredient.id, { name: 'Egg White' })

    const updatedIngredient = manager
      .getIngredients()
      .find((ing) => ing.id === ingredient.id)

    expect(updatedIngredient?.name).toBe('Egg White')
  })

  it('should throw error if ingredient you want to update does not exist', () => {
    const manager = new IngredientManager()
    const ingredient = new Ingredient('Egg', 6, 'pcs', 50, {
      calories: 155,
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    expect(() =>
      manager.updateIngredient(ingredient.id, { name: 'Egg White' }),
    ).toThrowError('Ingredient does not exist.')
  })
})
