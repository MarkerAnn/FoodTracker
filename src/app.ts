import { main } from './views/consoleApp.js'
import { IngredientManager } from './services/IngredientManager.js'

const ingredientManager = new IngredientManager()
main(ingredientManager)
