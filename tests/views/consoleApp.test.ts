import { consoleMenu } from '../../src/views/consoleApp'

describe('Console Menu', () => {
  let consoleMenu: consoleMenu

  beforeEach(() => {
    consoleMenu = new consoleMenu()
  })

  it('should display the main menu', () => {
    // Spy on console.log to check if it's called
    const consoleSpy = jest.spyOn(console, 'log')

    consoleMenu.displayMainMenu()

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
})
