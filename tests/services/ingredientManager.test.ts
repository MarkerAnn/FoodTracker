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
})
