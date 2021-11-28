// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {
	let homePage = document.querySelector('.home')
	let openPage
	// Custom JS

	function togglePage () {
		let menuLinks = document.querySelectorAll('.menu__item')
		
		for(let i = 0; i < menuLinks.length; i++) {
			menuLinks[i].addEventListener('click', function(e) {
				e.preventDefault();
				let page = document.querySelector(`.${e.currentTarget.dataset.page}`)
				page.classList.add('page--open')
				openPage = page
				homePage.classList.add('home--open')
				
				setTimeout(function() {
					homePage.style.display = "none"
				}, 1000)

			})
		}
	}

	togglePage ()

	function closePage () {
		document.addEventListener('click', function(e){
			if (e.target.classList.contains('page__close')) {
				homePage.classList.add('home--close')
				homePage.style.display = ""
				setTimeout(function(){
					homePage.classList.remove('home--open')
					homePage.classList.remove('home--close')
					
					openPage.classList.remove('page--open')
					
				}, 1000)
				
			}
		})

		
	}
	closePage ()



	function togglePopup () {
		let portfolioWrap = document.querySelector('.portfolio__list')
		let openPopup
		portfolioWrap.addEventListener('click', function(e) {
			if (e.target.classList.contains('portfolio__item')) {

				openPopup = e.target.querySelector('.popup')
				openPopup.classList.add('popup--open')

			} 
			if (e.target === openPopup) {
				openPopup.classList.remove('popup--open')
			}

		})
	}

	togglePopup()


	function filterCategory () {
		let categories = document.querySelectorAll('.portfolio__category')
		let items = document.querySelectorAll('.portfolio__item')
		let list = document.querySelector('.portfolio__list')

		for(let i = 0; i < categories.length; i++) {
			categories[i].addEventListener('click', function(e) {
				if (e.target === e.currentTarget) {
					document.querySelector('.portfolio__category--active').classList.remove('portfolio__category--active')
					e.target.classList.add('portfolio__category--active')


					for(let j = 0; j < items.length; j ++) {
						if (items[j].dataset.category !== e.target.dataset.filter && e.target.dataset.filter !== 'all') {
							list.classList.add('portfolio__list--hide')
							setTimeout(function(){
								list.classList.remove('portfolio__list--hide')
								items[j].classList.add('portfolio__item--hide')
							}, 500) 
							
						} else {
							list.classList.add('portfolio__list--hide')
							
							setTimeout(function(){
								items[j].classList.remove('portfolio__item--hide')
								list.classList.remove('portfolio__list--hide')
							}, 500) 
						}
					}

				} 
			})
		}
	}

	filterCategory ()

})
