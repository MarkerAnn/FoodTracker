import { describe, it, expect } from 'vitest'

import { IngredientManager } from '../../src/models/ingredientManager'

describe('IngredientManager', () => {
  it('should add an ingredient', () => {
    const manager = new IngredientManager()
    const ingredient = {
      id: '1',
      name: 'Egg',
      amount: 6,
      unit: 'unit',
      caloriesPerUnit: 70,
    }

    manager.add(ingredient)

    expect(manager.getIngredients()).toContainEqual(ingredient)
  })
})
