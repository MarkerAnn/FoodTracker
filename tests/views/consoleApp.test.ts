import { ConsoleMenu } from '../../src/views/consoleApp'
import { MainMenuOption } from '../../src/enums/MainMenu'
import * as readlineSync from 'readline-sync'

// Mock the readline-sync to simulate user input
jest.mock('readline-sync', () => ({
  questionInt: jest.fn().mockReturnValue(1),
}))

describe('Console Menu', () => {
  let menu: ConsoleMenu

  beforeEach(() => {
    menu = new ConsoleMenu()
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
})
