import * as readlineSync from 'readline-sync'
import { MainMenuOption } from '../enums/MainMenu'

export class ConsoleMenu {
  displayMainMenu(): void {
    console.log('================')
    console.log('Main Menu')
    console.log('================')
    console.log('1 - Ingredient operations')
    console.log('2 - Recipe operations')
    console.log('3 - Meal Plan operations')
  }

  handleMenuSelection(): number {
    const selection = readlineSync.questionInt('Select an option: ')

    if (!this.isValidSelection(selection)) {
      throw new Error('Invalid menu selection. Please select a valid option.')
    }
    return selection as MainMenuOption
  }

  private isValidSelection(selection: number): boolean {
    return Object.values(MainMenuOption).includes(selection)
  }
}
