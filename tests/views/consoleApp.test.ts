import { ConsoleMenu } from '../../src/views/consoleApp'

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

  it('should handle valid menu selection', () => {
    // Mock the readline-sync to simulate user input
    jest.mock('readline-sync', () => ({
      questionInt: jest.fn().mockReturnValue(1),
    }))

    const result = menu.handleMenuSelection()

    expect(result).toBe(1)
  })
})
