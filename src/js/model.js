import { async } from 'regenerator-runtime'
import {API_URL, RESULTS_PER_PAGE} from "./config";
import {getJSON} from "./helpers";

export const state ={
    recipes: {},
    search: {
        query: '',
        results:[],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE,
    }
}

export async function loadRecipe(id){

    try {
        const data = await getJSON(`${API_URL}${id}`);


        // if (!res.ok) {
        //     throw new Error(`${data.message} (${res.status})`);
        // }
        // console.log(data);
        const {recipe} = data.data;
        state.recipes = {
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
        console.error(error)
        throw error;
    }
}

export async function loadSearchResults(query){
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data)

        state.search.results = data.data.recipes.map(function (rec) {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        });
        console.log(state.search.results)
    }catch (error) {
        console.error(error)
        throw error;
    }
}

export function getResultsPage(page =state.search.page){
    state.search.page = page;
    const start =(page-1 ) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return  state.search.results.slice(start , end)
}