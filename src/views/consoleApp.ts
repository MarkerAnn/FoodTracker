import readlineSync from 'readline-sync'
import { Unit } from '../enums/Unit'
import { Ingredient } from '../models/Ingredient'
import { IngredientManager } from '../services/IngredientManager'

function promptForIngredient(): Ingredient {
  const name = readlineSync.question('Enter ingredient name: ')
  const amount = parseFloat(readlineSync.question('Enter amount: '))
  const unit = readlineSync.question('Enter unit (e.g., pcs, g, ml): ') as Unit
  const gramPerUnit = parseFloat(
    readlineSync.question('Enter grams per unit: '),
  )
  const calories = parseFloat(
    readlineSync.question('Enter calories per 100 grams: '),
  )

  return new Ingredient(name, amount, unit, gramPerUnit, { calories })
}

export function main(ingredientManager: IngredientManager): void {
  console.log('Welcome to the Food Tracker Console App')
  while (true) {
    console.log('\nMenu:')
    console.log('1. Add Ingredient')
    console.log('2. List Ingredients')
    console.log('3. Exit')

    const choice = readlineSync.question('Choose an option: ')

    switch (choice) {
      case '1':
        const ingredient = promptForIngredient()
        ingredientManager.addIngredient(ingredient)
        console.log('Ingredient added successfully!')
        break
      case '2':
        console.log('Ingredients:')
        console.log(ingredientManager.getIngredients())
        break
      case '3':
        console.log('Goodbye!')
        process.exit(0)
      default:
        console.log('Invalid choice, please try again.')
    }
  }
}

// TODO: Save ingredient to json file
// TODO: Recipe Classes
