import * as readlineSync from 'readline-sync'

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

    return selection
  }
}
