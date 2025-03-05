import View from "./view.js";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView.js";

export class Bookmarks extends View {
    parentElement = document.querySelector('.bookmarks__list')
    errorMessage = 'no book marks yet';
    message =''

    generateMarkup(){
        return this.data.map(result => previewView.render(result, false)).join('')

    }

}

export default new Bookmarks;