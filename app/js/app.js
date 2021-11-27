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

})
