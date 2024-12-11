import * as readlineSync from 'readline-sync'
import { MainMenuOption } from '../enums/MainMenu'
import { IngredientMenuOption } from '../enums/IngredientMenu'
import { Ingredient } from '../models/Ingredient'

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

  handleIngredientMenuSelection(): IngredientMenuOption {
    const selection = readlineSync.questionInt('Select an option: ')

    if (!this.isValidIngredientSelection(selection)) {
      throw new Error('Invalid menu selection. Please select a valid option.')
    }

    return selection as IngredientMenuOption
  }

  handleIngredientMenuAction(option: IngredientMenuOption): void {
    switch (option) {
      case IngredientMenuOption.AddIngredient:
        // implement this
        console.log('Add ingredient selected')
        break
      case IngredientMenuOption.ListIngredients:
        // Implement this
        console.log('List ingredients selected')
        break
      case IngredientMenuOption.DeleteIngredient:
        // IImplement this
        console.log('Delete ingredient selected')
        break
      case IngredientMenuOption.Back:
        console.log('Returning to main menu')
        break
      default:
        throw new Error('Invalid option')
    }
  }

  private isValidIngredientSelection(selection: number): boolean {
    return Object.values(IngredientMenuOption).includes(selection)
  }

  private isValidSelection(selection: number): boolean {
    return Object.values(MainMenuOption).includes(selection)
  }
}
