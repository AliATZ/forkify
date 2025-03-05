import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView  from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarks  from "./views/bookmarks.js";

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import {state} from "./model.js";

// if (module.hot) {
//   module.hot.accept()
// }

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io


async function controlRecipe() {
  try {

    const id =window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner()
    //loading

    resultsView.update(model.getResultsPage())
    bookmarks.update(model.state.bookmark)

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
    resultsView.render(model.getResultsPage())

    paginationView.render(model.state.search)
  }catch (error) {
    console.error(error)
  }
}

function controlPagination(gotoPage){
  resultsView.render(model.getResultsPage(gotoPage))

  paginationView.render(model.state.search)
}

function controlServings(servings){
  model.updateServings(servings)

  recipeView.render(model.state.recipes)
  recipeView.update(model.state.recipes)
}

function controlAddBookmark(){
  if (!model.state.recipes.bookmarked) {
    model.addBookmark(model.state.recipes)
  }
  else{
    model.removeBookmark(model.state.recipes.id)
  }
  recipeView.update(model.state.recipes)

  bookmarks.render(model.state.bookmark)
}

// showRecipe()
function init(){
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()