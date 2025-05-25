import { useState } from "react";
import IngredientsList from "./IngredientsList";
import Recipe from "./Recipe.jsx";
import {getRecipeFromGPT} from '../ai_chatgpt.js'

export default function Main() {
    const [ingredients, setIngredients] = useState([]);

    const [recipe, setRecipe] = useState("");

    const [loading, setLoading]= useState(false)

 
    function handleSubmit(e) {
        e.preventDefault();

        // Way 1: 
        // const formData = new FormData(e.currentTarget);
        // const newIngredient= formData.get("ingredient");
        // console.log(newIngredient)

        // console.dir(e.target[0].value); //cumin
        // ingredients.push(e.target[0].value);
        const newIngredient = e.target[0].value;

        setIngredients(prevIngredients => {
            if(prevIngredients.includes(newIngredient)){
                return [...prevIngredients]
            }
            else{
                return [...prevIngredients, newIngredient];
            }
            
        })
        e.target[0].value = "";
    }

    async function getRecipe(){
        setLoading(true)
        try{
            const recipeMarkdown= await getRecipeFromGPT(ingredients);
            setRecipe(recipeMarkdown);
   
        }
        catch (error) {
            setRecipe(`Something went wrong. Please try again later. ${error}`);
    } finally {
      setLoading(false);
    }
     
    }
    
    return (
        <main className="main">
            <p>Smart cooking starts here. Add ingredients to begin.</p>
            <form action="" className="add-ingredient-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id=""
                    placeholder="e.g. oregano"
                    name="ingredient"
                    aria-label= "Add ingredient"
                    required
                />
                <button>Add Ingredient</button>
            </form>


            {ingredients.length > 0 && <IngredientsList ingredients={ingredients}  getRecipe={getRecipe}/>}

            {loading && <div className="loader"></div>}
            {recipe && <Recipe recipe={recipe}/>}
        </main>
    )
}