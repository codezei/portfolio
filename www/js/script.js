window.addEventListener('DOMContentLoaded', ()=>{
    document.addEventListener('click', toggleArticles);
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
