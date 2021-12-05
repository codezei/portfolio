// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {
	let homePage = document.querySelector('.home')
	let openPage
	// Custom JS

	function togglePage() {
		let menuLinks = document.querySelectorAll('.menu__item')
		for (let i = 0; i < menuLinks.length; i++) {
			menuLinks[i].addEventListener('click', function (e) {
				e.preventDefault();

				let page = document.querySelector(`.${e.currentTarget.dataset.page}`)
				page.classList.add('page--open')
				openPage = page
				homePage.classList.add('home--open')

				setTimeout(function () {
					homePage.style.display = "none"
				}, 1000)

			})
		}
	}

	togglePage()

	function closePage() {
		document.addEventListener('click', function (e) {
			if (e.target.classList.contains('page__close')) {
				homePage.classList.add('home--close')
				homePage.style.display = ""
				setTimeout(function () {
					homePage.classList.remove('home--open')
					homePage.classList.remove('home--close')

					openPage.classList.remove('page--open')

				}, 1000)

			}
		})


	}
	closePage()



	function togglePopup() {
		let portfolioWrap = document.querySelector('.works__list')
		let openPopup
		portfolioWrap.addEventListener('click', function (e) {
			if (e.target.classList.contains('works__item')) {

				openPopup = e.target.querySelector('.popup')
				openPopup.classList.add('popup--open')

			}
			if (e.target === openPopup) {
				openPopup.classList.remove('popup--open')
			}
			if (e.target.classList.contains('popup__close')) {
				openPopup.classList.remove('popup--open')
			}

		})
	}

	togglePopup()


	function filterCategory() {
		let categories = document.querySelectorAll('.works__category')
		let items = document.querySelectorAll('.works__item')
		let list = document.querySelector('.works__list')

		for (let i = 0; i < categories.length; i++) {
			categories[i].addEventListener('click', function (e) {
				if (e.target === e.currentTarget) {
					document.querySelector('.works__category--active').classList.remove('works__category--active')
					e.target.classList.add('works__category--active')


					for (let j = 0; j < items.length; j++) {
						if (items[j].dataset.category !== e.target.dataset.filter && e.target.dataset.filter !== 'all') {
							list.classList.add('works__list--hide')
							setTimeout(function () {
								list.classList.remove('works__list--hide')
								items[j].classList.add('works__item--hide')
							}, 500)

						} else {
							list.classList.add('works__list--hide')

							setTimeout(function () {
								items[j].classList.remove('works__item--hide')
								list.classList.remove('works__list--hide')
							}, 500)
						}
					}

				}
			})
		}
	}

	filterCategory()

})


function sendMessage() {
	let form = document.querySelector('.form')
	let link = document.querySelector('.form__link')

	form.addEventListener('submit', function (e) {
		e.preventDefault()
		link.click()
		form.reset()
	})

	link.addEventListener('click', function () {
		link.href = `mailto:e.develop@i.ua?subject=Question from ${form.name.value}&body=${form.message.value}`
	})

}
sendMessage()

window.addEventListener('load', function() {
	let script = document.createElement('script')
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js'
	script.setAttribute('type', 'text/javascript')
	document.body.append(script)
	script.onload = function() {
		drawAnimate ()
	}
})


function drawAnimate () {
	// (function() {
		let wrapper = document.querySelector('.introduction')
		var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

		// Main
		initHeader();
		initAnimation();
		addListeners();
		
	
		function initHeader() {

			
			// width = window.innerWidth;
			// height = window.innerHeight;
			width = wrapper.getBoundingClientRect().width;
			height = wrapper.getBoundingClientRect().height;
			target = {x: width/2, y: height/2};
	
			// largeHeader = document.getElementById('large-header');
			// largeHeader.style.height = height+'px';
	
			canvas = document.getElementById('demo-canvas');
			canvas.width = width;
			canvas.height = height;
			ctx = canvas.getContext('2d');
	
			// create points
			points = [];
			for(var x = 0; x < width; x = x + width/20) {
				for(var y = 0; y < height; y = y + height/20) {
					var px = x + Math.random()*width/20;
					var py = y + Math.random()*height/20;
					var p = {x: px, originX: px, y: py, originY: py };
					points.push(p);
				}
			}
	
			// for each point find the 5 closest points
			for(var i = 0; i < points.length; i++) {
				var closest = [];
				var p1 = points[i];
				for(var j = 0; j < points.length; j++) {
					var p2 = points[j]
					if(!(p1 == p2)) {
						var placed = false;
						for(var k = 0; k < 5; k++) {
							if(!placed) {
								if(closest[k] == undefined) {
									closest[k] = p2;
									placed = true;
								}
							}
						}
	
						for(var k = 0; k < 5; k++) {
							if(!placed) {
								if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
									closest[k] = p2;
									placed = true;
								}
							}
						}
					}
				}
				p1.closest = closest;
			}
	
			// assign a circle to each point
			for(var i in points) {
				var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
				points[i].circle = c;
			}
		}
	
		// Event handling
		function addListeners() {
			if(!('ontouchstart' in window)) {
				window.addEventListener('mousemove', mouseMove);
			}
			window.addEventListener('scroll', scrollCheck);
			window.addEventListener('resize', resize);
		}
	
		function mouseMove(e) {
			var posx, posy = 0;
			if (e.pageX || e.pageY) {
				posx = e.pageX;
				posy = e.pageY;
			}
			else if (e.clientX || e.clientY)    {
				posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			if (posx > wrapper.getBoundingClientRect().width) return
			target.x = posx;
			target.y = posy;
			
		}
	
		function scrollCheck() {
			if(document.body.scrollTop > height) animateHeader = false;
			else animateHeader = true;
		}
	
		function resize() {
			// width = window.innerWidth;
			// height = window.innerHeight;
			width = wrapper.getBoundingClientRect().width;
			height = wrapper.getBoundingClientRect().height;
			// largeHeader.style.height = height+'px';
			canvas.width = width;
			canvas.height = height;
		}
	
		// animation
		function initAnimation() {
			animate();
			for(var i in points) {
				shiftPoint(points[i]);
			}
		}
	
		function animate() {
			if(animateHeader) {
				ctx.clearRect(0,0,width,height);
				for(var i in points) {
					// detect points in range
					if(Math.abs(getDistance(target, points[i])) < 4000) {
						points[i].active = 0.3;
						points[i].circle.active = 0.6;
					} else if(Math.abs(getDistance(target, points[i])) < 20000) {
						points[i].active = 0.1;
						points[i].circle.active = 0.3;
					} else if(Math.abs(getDistance(target, points[i])) < 40000) {
						points[i].active = 0.02;
						points[i].circle.active = 0.1;
					} else {
						points[i].active = 0;
						points[i].circle.active = 0;
					}
	
					drawLines(points[i]);
					points[i].circle.draw();
				}
			}
			requestAnimationFrame(animate);
		}
	
		function shiftPoint(p) {
			TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
				y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
				onComplete: function() {
					shiftPoint(p);
				}});
		}
	
		// Canvas manipulation
		function drawLines(p) {
			if(!p.active) return;
			for(var i in p.closest) {
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(p.closest[i].x, p.closest[i].y);
				// ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
				ctx.strokeStyle = 'rgba(63,133,70,'+ p.active+')';
				ctx.stroke();
			}
		}
	
		function Circle(pos,rad,color) {
			var _this = this;
	
			// constructor
			(function() {
				_this.pos = pos || null;
				_this.radius = rad || null;
				_this.color = color || null;
			})();
	
			this.draw = function() {
				if(!_this.active) return;
				ctx.beginPath();
				ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
				// ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
				ctx.fillStyle = 'rgba(63,133,70,'+ _this.active+')';
				ctx.fill();
			};
		}
	
		// Util
		function getDistance(p1, p2) {
			return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
		}
		
	// })();
}