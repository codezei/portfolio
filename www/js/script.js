window.addEventListener('DOMContentLoaded', ()=>{
    let filters = document.querySelector('.filters');
    let filterBtns = document.querySelectorAll('.filter-btn');
    let filterItems = document.querySelectorAll('.filter-item');
    document.addEventListener('click', toggleArticles);
    filters.addEventListener('click', (e)=>{
        toggleFilterBtn(e.target, filterBtns);
        filteringItems(filterItems);
    })
})

function toggleArticles (e) {
    if (e.target.classList.contains('nav-item')) {
        let target = e.target.dataset.target;
        let toggle = document.getElementById(target);
        let header = document.querySelector('header');
        toggle.classList.add('active');
        header.classList.add('active');
    } else if (e.target.classList.contains('close-article')) {
        let header = document.querySelector('header');
        let activeArticle = document.querySelector('article.active');
        activeArticle.classList.remove('active');
        header.classList.remove('active');
    }
}


function toggleFilterBtn (target, arrBtns) {

    arrBtns.forEach((elem)=>{
        if (elem === target) {
            elem.classList.add('active');
        } else {
            elem.classList.remove('active');
        }
    });
}
function filteringItems (items) {
    let activeBtn = document.querySelector('.filter-btn.active');
    let valueBtn = activeBtn.dataset.target;

    items.forEach(elem=>{
        if (elem.dataset.category !== valueBtn) {
            elem.classList.add('hide');

        } 
        else {
            elem.classList.remove('hide');
        }
    })
    if (valueBtn === 'all') {
        console.log('hello')
        items.forEach(elem=>{
            elem.classList.remove('hide');
        })
    }
}