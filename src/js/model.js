import { async } from 'regenerator-runtime'
import { API_URL } from "./config";
import {getJSON} from "./helpers";

export const state ={
    recipe: {

    }
}

export async function loadRecipe(id){

    try {
        const data = await getJSON(`${API_URL}/${id}`);


        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`);
        }
        // console.log(data);
        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }
        console.log(state.recipe)
    }catch (error) {
        alert(error)
    }
}