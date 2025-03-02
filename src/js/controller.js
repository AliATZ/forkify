import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView  from "./views/resultsView.js";

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import {state} from "./model.js";

if (module.hot) {
  module.hot.accept()
}

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io


async function controlRecipe() {
  try {

    const id =window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner()
    //loading
    await model.loadRecipe(id)

    // const res = await fetch('https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886')
    //rendering

    recipeView.render(model.state.recipes)

  }catch (err){
    console.error(err)
    recipeView.renderError();
  }
}
async function controlSearchResults(){
  try {
    resultsView.renderSpinner()
    const query = searchView.getQuery()
    if (!query) return;
    await model.loadSearchResults(query)
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getResultsPage(1))
  }catch (error) {
    console.error(error)
  }
}

// showRecipe()
function init(){
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
}
init()