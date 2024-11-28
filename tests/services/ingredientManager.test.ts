import { IngredientManager } from '../../src/services/IngredientManager'
import { ingredientEgg } from '../mockData/ingredients.mockData'
import { Unit } from '../../src/enums/Unit'

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

  it('should update detailed nutrition data even if it already exists', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    manager.setDtailedNutritions(ingredient.id, {
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    manager.setDtailedNutritions(ingredient.id, {
      proteins: 15,
      fats: 12,
      carbs: 2,
    })

    expect(manager.getIngredients()).toContainEqual(
      expect.objectContaining({
        name: ingredientEgg.name,
        caloriePerHundredGram: ingredientEgg.caloriePerHundredGram,
        nutritionPer100Gram: { proteins: 15, fats: 12, carbs: 2 },
      }),
    )
  })

  it('should set unit and weight to an ingredient', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    manager.setUnitAndWeight(ingredient.id, Unit.PCS, 50)

    expect(manager.getIngredients()).toContainEqual(
      expect.objectContaining({
        name: ingredientEgg.name,
        caloriePerHundredGram: ingredientEgg.caloriePerHundredGram,
        unit: 'pcs',
        gramPerUnit: 50,
      }),
    )
  })

  it('should update unit and weight even if it already exists', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    manager.setUnitAndWeight(ingredient.id, Unit.PCS, 50)
    manager.setUnitAndWeight(ingredient.id, Unit.G, 100)

    expect(manager.getIngredients()).toContainEqual(
      expect.objectContaining({
        name: ingredientEgg.name,
        caloriePerHundredGram: ingredientEgg.caloriePerHundredGram,
        unit: 'g',
        gramPerUnit: 100,
      }),
    )
  })

  it('Should calculate the calories per unit', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    manager.setUnitAndWeight(ingredient.id, Unit.PCS, 50)
    manager.calculateCaloriesPerUnit(ingredient.id)

    expect(manager.calculateCaloriesPerUnit(ingredient.id)).toBe(77.5)
  })

  it('should throw error if unit and weight are not defined', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    expect(() => manager.calculateCaloriesPerUnit(ingredient.id)).toThrow(
      'Unit and gramPerUnit must be defined.',
    )
  })

  it('should calculate detailed nutrition per unit', () => {
    const ingredient = manager.createIngredient(
      ingredientEgg.name,
      ingredientEgg.caloriePerHundredGram,
    )

    manager.setUnitAndWeight(ingredient.id, Unit.PCS, 50)
    manager.setDtailedNutritions(ingredient.id, {
      proteins: 13,
      fats: 11,
      carbs: 1,
    })

    expect(
      manager.calculateDetailedNutritionPerUnit(ingredient.id),
    ).toStrictEqual({
      proteins: 6.5,
      fats: 5.5,
      carbs: 0.5,
    })
  })
})
