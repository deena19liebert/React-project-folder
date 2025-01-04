import React, { useState } from 'react';
import ClaudeRecipe from './components/ClaudeRecipe';
import IngredientsList from './components/IngredientsList';
import './App.css';
import { getRecipeFromMistral } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
       const recipeMarkdown = getRecipeFromMistral(ingredients)
    }

    function addIngredient(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient")
        if(newIngredient.trim() === "") return;
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
        event.target.reset();
    }

    function deleteIngredient(index) {
        setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index))
    }
   
    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g.oregano"
                    aria-label="Add ingredient" 
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 && ( <IngredientsList 
            ingredients={ingredients}
            getRecipe={getRecipe}
            deleteIngredient={deleteIngredient}
            /> )
            }

            {recipe && <ClaudeRecipe recipe = {recipe}/>}
         
        </main>
    )
}