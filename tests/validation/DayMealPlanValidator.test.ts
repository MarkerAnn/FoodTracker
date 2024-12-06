import { DayMealPlanManager } from '../../src/services/DayMealPlanManager'
import { Meal as MealType } from '../../src/enums/Meal'
import { RecipeManager } from '../../src/services/RecipeManager'

describe('Day Meal Plan Validation', () => {
  let mockRecipeManager: jest.Mocked<RecipeManager>
  let manager: DayMealPlanManager

  beforeEach(() => {
    mockRecipeManager = {
      getRecipes: jest.fn().mockReturnValue([
        {
          id: 'recipe_1234',
          name: 'Test Recipe',
          ingredients: [],
          instructions: 'Test Instructions',
          servings: 1,
        },
      ]),
    } as unknown as jest.Mocked<RecipeManager>

    manager = new DayMealPlanManager(mockRecipeManager)
  })

  it('should throw an error when adding meal with invalid meal type', () => {
    const date = new Date('2024-12-04')
    expect(() =>
      manager.addMeal(date, 'InvalidMealType' as MealType, 'recipe_1234'),
    ).toThrow('Meal type is not valid.')
  })

  it('it should throw an error when adding meal with empty recipe id', () => {
    const date = new Date('2024-12-04')
    expect(() => manager.addMeal(date, MealType.Breakfast, '')).toThrow(
      'Recipe ID must be a non-empty string.',
    )
  })

  it('should thrwow an error when recipe cant be found', () => {
    const date = new Date('2024-12-04')
    const recipeId = 'recipe_non_existent'
    expect(() => manager.addMeal(date, MealType.Breakfast, recipeId)).toThrow(
      `Recipe with ID ${recipeId} does not exist.`,
    )
  })

  it('should throw an error when adding meal with invalid date', () => {
    const date = new Date('invalid-date')
    expect(() =>
      manager.addMeal(date, MealType.Breakfast, 'recipe_1234'),
    ).toThrow(
      'Date is not valid, please use the format YYYY-MM-DD, e.g. 2024-12-04',
    )
  })

  it('should throw an error when date is formatted incorrectly', () => {
    const date = new Date('24-09-12')
    expect(() =>
      manager.addMeal(date, MealType.Breakfast, 'recipe_1234'),
    ).toThrow(
      'Date is not valid, please use the format YYYY-MM-DD, e.g. 2024-12-04',
    )
  })
})
