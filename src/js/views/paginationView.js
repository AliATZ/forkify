import View from "./view.js";
import icons from 'url:../../img/icons.svg'

export class PaginationView extends View {
    parentElement = document.querySelector('.pagination')

    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', function (e){
            const btn = e.target.closest('.btn--inline')
            if (!btn){return}
            const gotoPage = +btn.dataset.goto;

            handler(gotoPage);
        })
    }

    generateMarkup(){
        const curPage = this.data.page;
        const numPages = Math.ceil(this.data.results.length/ this.data.resultsPerPage);

        if (curPage === 1 && numPages > 1){
            return `<button data-goto="${curPage +1}" class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }


        if (curPage === numPages && numPages > 1){
            return `<button data-goto="${curPage -1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage-1}</span>
          </button>
          `
        }

        if (curPage < numPages ){
            return `<button data-goto="${curPage -1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage-1}</span>
          </button>
          <button data-goto="${curPage +1}" class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }

        return ''

    }


}

export default new PaginationView()