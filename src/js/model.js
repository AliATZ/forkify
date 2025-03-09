import { async } from 'regenerator-runtime'
import {API_URL, RESULTS_PER_PAGE,KEY} from "./config";
import {AJAX} from "./helpers";

export const state ={
    recipes: {},
    search: {
        query: '',
        results:[],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE,
    },
    bookmark: [],
}

function creatRecipeObject(data){
    const {recipe} = data.data;
    return  {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {kye: recipe.key}),
    }
}

export async function loadRecipe(id){

    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
        state.recipes =creatRecipeObject(data);
        // if (!res.ok) {
        //     throw new Error(`${data.message} (${res.status})`);
        // }
        // console.log(data);

        if (state.bookmark.some(bookmark => bookmark.id ===  id)){
            state.recipes.bookmarked = true
        }else {
            state.recipes.bookmarked = false
        }
        console.log(state.recipes)
    }catch (error) {
        console.error(error)
        throw error;
    }
}

export async function loadSearchResults(query){
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        console.log(data)

        state.search.results = data.data.recipes.map(function (rec) {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {kye: rec.key}),
            }
        });
        state.search.page =1;
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

export function updateServings(servings){
    state.recipes.ingredients.forEach(ingredient =>{
        ingredient.quantity = (ingredient.quantity * servings) / state.recipes.servings
    })

    state.recipes.servings = servings;
}

function persistBookmarks() {
    localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
}

export function addBookmark(recipe){
    state.bookmark.push(recipe)

    if (recipe.id=== state.recipes.id) state.recipes.bookmarked = true;
    persistBookmarks()
}

export function removeBookmark(id){
    const index = state.bookmark.findIndex(book => book.id === id);
    state.bookmark.splice(index, 1)

    if (id === state.recipes.id){
        state.recipes.bookmarked = false
    }
    persistBookmarks()
}

function init(){
    const storage =localStorage.getItem('bookmark')
    if (storage){
        state.bookmark = JSON.parse(storage);
    }
}
init()

function clearBookmark(){
    localStorage.clear('bookmark')
}
// clearBookmark()

export async function uploadRecipe(newRecipe){
    try {
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient')&& entry[1] !=='' ).map(ing => {
        const ingArr = ing[1].split(',').map(el=> el.trim())
        if (ingArr.length !==3) {throw new Error('wrong ingredient format')}
        const [quantity,unit, description]= ingArr
        return {quantity: quantity ? +quantity:null, unit, description};
    })

        const recipe ={
            title: newRecipe.title,
            source_Url: newRecipe.sourceUrl,
            image_Url: newRecipe.image,
            publisher: newRecipe.publisher,
            cookingTime: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
    };
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        state.recipes = creatRecipeObject(data)
        addBookmark(state.recipes)

    }catch (error) {
        throw error;
    }
}