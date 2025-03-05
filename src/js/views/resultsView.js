import View from "./view.js";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView";

export class ResultsView extends View {
    parentElement = document.querySelector('.results')
    errorMessage = 'no recipes found';
    message =''

    generateMarkup(){
        return this.data.map(result => previewView.render(result, false)).join('')

    }

}

export default new ResultsView;