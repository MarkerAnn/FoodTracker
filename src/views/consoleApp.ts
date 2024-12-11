import * as readlineSync from 'readline-sync'
import { MainMenuOption } from '../enums/MainMenu'
import { Ingredient } from '../models/Ingredient'

export enum IngredientMenuOption {
  AddIngredient = 1,
  ListIngredients = 2,
  DeleteIngredient = 3,
  Back = 0,
}

export class ConsoleMenu {
  displayMainMenu(): void {
    console.log('================')
    console.log('Main Menu')
    console.log('================')
    console.log('1 - Ingredient operations')
    console.log('2 - Recipe operations')
    console.log('3 - Meal Plan operations')
  }

  handleMenuAction(option: MainMenuOption): void {
    switch (option) {
      case MainMenuOption.Ingredients:
        this.displayIngredientMenu()
        break

      default:
        throw new Error('Not yet implemented')
    }
  }

  handleMenuSelection(): MainMenuOption {
    const selection = readlineSync.questionInt('Select an option: ')

    if (!this.isValidSelection(selection)) {
      throw new Error('Invalid menu selection. Please select a valid option.')
    }
    return selection as MainMenuOption
  }

  displayIngredientMenu(): void {
    console.log('================')
    console.log('Ingredient Menu')
    console.log('================')
    console.log('1 - Add Ingredient')
    console.log('2 - List Ingredients')
    console.log('3 - Delete Ingredient')
    console.log('0 - Back to Main Menu')
  }

  handleIngredientMenuAction(option: number): IngredientMenuOption {
    const selection = readlineSync.questionInt('Select an option: ')

    if (!this.isValidIngredientSelection(selection)) {
      throw new Error('Invalid menu selection. Please select a valid option.')
    }

    return selection as IngredientMenuOption
  }

  private isValidIngredientSelection(selection: number): boolean {
    return Object.values(IngredientMenuOption).includes(selection)
  }

  private isValidSelection(selection: number): boolean {
    return Object.values(MainMenuOption).includes(selection)
  }
}
