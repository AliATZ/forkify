import View from "./view.js";
import icons from 'url:../../img/icons.svg'

export class AddRecipeView extends View {
    parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    btnOpen = document.querySelector('.nav__btn--add-recipe');
    btnClose = document.querySelector('.btn--close-modal');
    constructor() {
        super();
        this.addHandlerShowWindow()
        this.addHandlerHideWindow()
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    addHandlerShowWindow(){
        this.btnOpen.addEventListener('click',this.toggleWindow.bind(this));
    }

    addHandlerHideWindow(){
        this.btnClose.addEventListener('click',this.toggleWindow.bind(this));
        this._overlay.addEventListener('click',this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this.parentElement.addEventListener('submit',function (e){
            e.preventDefault()
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data)
        });
    }

    generateMarkup(){


    }


}

export default new AddRecipeView()