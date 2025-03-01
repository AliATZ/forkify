import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import 'core-js/stable';
import 'regenerator-runtime/runtime'
const recipeContainer = document.querySelector('.recipe');



// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////



async function controlRecipe() {
  try {
    const id =window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner()
    //loading
    await model.loadRecipe(id)

    // const res = await fetch('https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886')
    //rendering

    recipeView.render(model.state.recipe)
  }catch (err){
    alert(err)
  }
}

// showRecipe()
['hashchange', 'load'].forEach(ev => {
  window.addEventListener(ev , controlRecipe)
})
//
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load',showRecipe)