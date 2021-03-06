const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				if (!element.classList.contains('on')){
					element.addEventListener('click', () => {
						this.btnToggleMenuMobile.forEach(element => element.classList.add("on"));
						this.menuMobile.classList.add("active");
						document.body.classList.add("fixed");
						return false;
					});
				} 
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container || this.btnToggleMenuMobile.contains('on')) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// // кастомный селлект
	// select2() {
	// 	$(".custom-select-wrap").each(function () {
	// 		var th = $(this)
	// 		th.find('.custom-select-js').select2({
	// 			dropdownParent: th,
	// 			tags: true,
	// 			minimumResultsForSearch: -1,
	// 			// width: 'auto',
	// 			// width: th.find(".select2-results__options"),
	// 			allowClear: false,
	// 			// dropdownAutoWidth: true
	// 		});
	// 	})
	// },

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").prepend('<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.ifie();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	// JSCCommon.select2();
	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	let screenName;
	screenName = 'main.jpg';
	screenName
		? $(".main-wrapper").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`)
		: '';
	// /добавляет подложку для pixel perfect


	function whenResize() {

		const topH = document.querySelector('header').scrollHeight;
		let stickyElement = document.querySelector('.top-nav')
		window.onscroll = () => {
			if ($(window).scrollTop() > topH) {

				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		};

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	let sliderAbout = new Swiper('.sliderAbout-js', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		coverflowEffect: {
			rotate: 0,
			stretch: -150,
			depth: 300,
			modifier: 1,
			slideShadows: false
		},
		slidesPerView: 1,
		// effect: 'coverflow',
		grabCursor: true,
		loop: true,
		// autoHeight: true,
		spaceBetween: 30,
		//lazy
		breakpoints: { 
			768: { 
				spaceBetween: 0,
			}
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
	});

	let coursesSlider = new Swiper('.coursesSlider-js', {
		grabCursor: true,
		slidesPerView: 1,
		loop: true,
		// autoHeight: true,
		spaceBetween: 20,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
		navigation: {
			nextEl: '.coursesSlider-next',
			// prevEl: '.coursesSlider-prev',
		},
		breakpoints: { 
			576: { 
				slidesPerView: 2,
			},
			
			992: { 
				slidesPerView: 3,
			},

			1200: {
				slidesPerView: 4,
			}
		},
	});

	let teachersSlider = new Swiper('.teachersSlider-js', {
		grabCursor: true,
		slidesPerView: 1,
		loop: true,
		autoHeight: true,
		spaceBetween: 0,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
		navigation: {
			nextEl: '.teachersSlider-next',
			prevEl: '.teachersSlider-prev',
		},
		pagination: {
			el: $(this).find('.swiper-pagination'),
			clickable: true,
		},
	});

	let achievementsSlider = new Swiper('.achievementsSlider-js', {
		grabCursor: true,
		slidesPerView: 1,
		loop: true,
		// autoHeight: true,
		spaceBetween: 37,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
			loadOnTransitionStart: true,
		},
		navigation: {
			nextEl: '.achievementsSlider-next',
			// prevEl: '.achievementsSlider-prev',
		},
		breakpoints: { 
			576: { 
				slidesPerView: 3,
			},
			
			992: { 
				slidesPerView: 4,
			},

			1200: {
				slidesPerView: 5,
			}
		},
	});

	let reviewsSlider = new Swiper('.reviewsSlider-js', {
		slidesPerView: 'auto',
		// loop: true,
		// autoHeight: true,
		freeMode: true,
		freeModeMomentum: true,
		spaceBetween: 30, 
		watchOverflow: true,
		breakpoints: { 

			992: { 
				slidesPerView: 3,
			},

		},
	});

	const headerBlock = new Swiper('.headerSlider-js', {
		// slidesPerView: 5,
		slidesPerView: 1,
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 5000,
		},
	});

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window
	$('.accardion-js').click(function () {
		$(this).toggleClass('active');

		$(this.parentElement).find('.accardionToggle-js').slideToggle(function () {
			$(this).toggleClass('active');
		});

	});

	let now = new Date();
	$('.curentYear').text(now.getFullYear());

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
