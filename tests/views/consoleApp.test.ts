import { ConsoleMenu } from '../../src/views/consoleApp'
import { MainMenuOption } from '../../src/enums/MainMenu'
import { IngredientMenuOption } from '../../src/enums/IngredientMenu'
import * as readlineSync from 'readline-sync'
import { IngredientManager } from '../../src/services/IngredientManager'

// Mock the readline-sync to simulate user input
jest.mock('readline-sync', () => ({
  questionInt: jest.fn().mockReturnValue(1),
  question: jest.fn(),
  questionFloat: jest.fn(),
}))

describe('Console Menu', () => {
  let menu: ConsoleMenu
  let ingredientManager: IngredientManager

  beforeEach(() => {
    ingredientManager = new IngredientManager()
    menu = new ConsoleMenu(ingredientManager)
    jest.clearAllMocks()
  })

  it('should display the main menu', () => {
    // Spy on console.log to check if it's called
    const consoleSpy = jest.spyOn(console, 'log')

    menu.displayMainMenu()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Main Menu'),
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('1 - Ingredient operations'),
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('2 - Recipe operations'),
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('3 - Meal Plan operations'),
    )
  })

  it('should handle valid enum menu selection', () => {
    ;(readlineSync.questionInt as jest.Mock).mockReturnValue(
      MainMenuOption.Ingredients,
    )
    const result = menu.handleMenuSelection()
    expect(result).toBe(MainMenuOption.Ingredients)
  })

  it('should check if selection is valid', () => {
    const isValid = menu['isValidSelection'](MainMenuOption.Ingredients)
    expect(isValid).toBe(true)
  })

  it('should handle invalid enum menu selection', () => {
    ;(readlineSync.questionInt as jest.Mock).mockReturnValue(4)
    expect(() => menu.handleMenuSelection()).toThrow(
      'Invalid menu selection. Please select a valid option.',
    )
  })

  it('should handle 0 as invalid enum menu selection', () => {
    ;(readlineSync.questionInt as jest.Mock).mockReturnValue(0)
    expect(() => menu.handleMenuSelection()).toThrow(
      'Invalid menu selection. Please select a valid option.',
    )
  })

  describe('Ingredient Submenu', () => {
    it('should display ingredient submenu when that option is selected', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      ;(readlineSync.questionInt as jest.Mock).mockReturnValue(
        MainMenuOption.Ingredients,
      )

      menu.handleMenuAction(MainMenuOption.Ingredients)

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Ingredient Menu'),
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('1 - Add Ingredient'),
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('2 - List Ingredients'),
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('3 - Delete Ingredient'),
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('0 - Back to Main Menu'),
      )
    })
    it('should handle valid ingredient menu selection', () => {
      ;(readlineSync.questionInt as jest.Mock).mockReturnValue(
        IngredientMenuOption.AddIngredient,
      )

      const result = menu.handleIngredientMenuSelection()
      expect(result).toBe(IngredientMenuOption.AddIngredient)
    })
  })

  describe('Ingredient Submenu Actions', () => {
    it('should handle Add Ingredient when selected', () => {
      // Mock the user input for name and calorie
      ;(readlineSync.question as jest.Mock).mockReturnValueOnce('Banana')
      ;(readlineSync.questionFloat as jest.Mock).mockReturnValueOnce(89)

      const spy = jest.spyOn(ingredientManager, 'createIngredient')

      menu.handleAddIngredient()

      // Verify that the method was called with the correct arguments
      expect(spy).toHaveBeenCalledWith('Banana', 89)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should throw error when calories is not a positive number', () => {
      ;(readlineSync.question as jest.Mock).mockReturnValueOnce('Banana')
      ;(readlineSync.questionFloat as jest.Mock).mockReturnValueOnce(-5)

      expect(() => menu.handleAddIngredient()).toThrow(
        'Ingredient must have calories as a positive number greater than 0 and of the type Number.',
      )
    })

    it('should validate ingredient name is not empty', () => {
      ;(readlineSync.question as jest.Mock).mockReturnValueOnce('')

      expect(() => menu.handleAddIngredient()).toThrow(
        'Ingredient must have a valid name as a non-empty string.',
      )
    })

    it('should validate calories are positive', () => {
      ;(readlineSync.question as jest.Mock).mockReturnValueOnce('Banana')
      ;(readlineSync.questionFloat as jest.Mock).mockReturnValueOnce(-5)

      expect(() => menu.handleAddIngredient()).toThrow(
        'Ingredient must have calories as a positive number greater than 0 and of the type Number.',
      )
    })
  })
})
