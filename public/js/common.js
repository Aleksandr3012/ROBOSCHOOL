"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
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
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				if (!element.classList.contains('on')) {
					element.addEventListener('click', function () {
						_this.btnToggleMenuMobile.forEach(function (element) {
							return element.classList.add("on");
						});

						_this.menuMobile.classList.add("active");

						document.body.classList.add("fixed");
						return false;
					});
				}
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container || _this2.btnToggleMenuMobile.contains('on')) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
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
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /табы
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			$("body").prepend('<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$("form").submit(function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl, _Swiper;

	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.ifie();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.select2();
	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect

	var screenName;
	screenName = 'main.jpg';
	screenName ? $(".main-wrapper").after("<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>")) : ''; // /добавляет подложку для pixel perfect

	function whenResize() {
		var topH = document.querySelector('header').scrollHeight;
		var stickyElement = document.querySelector('.top-nav');

		window.onscroll = function () {
			if ($(window).scrollTop() > topH) {
				stickyElement.classList.add('fixed');
			} else {
				stickyElement.classList.remove('fixed');
			}
		};
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var sliderAbout = new Swiper('.sliderAbout-js', (_Swiper = {
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
		slidesPerView: 1
	}, _defineProperty(_Swiper, "grabCursor", true), _defineProperty(_Swiper, "loop", true), _defineProperty(_Swiper, "spaceBetween", 30), _defineProperty(_Swiper, "breakpoints", {
		768: {
			spaceBetween: 0
		}
	}), _defineProperty(_Swiper, "lazy", {
		loadPrevNext: true,
		loadPrevNextAmount: 4
	}), _Swiper));
	var coursesSlider = new Swiper('.coursesSlider-js', {
		grabCursor: true,
		slidesPerView: 1,
		loop: true,
		// autoHeight: true,
		spaceBetween: 20,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4
		},
		navigation: {
			nextEl: '.coursesSlider-next' // prevEl: '.coursesSlider-prev',

		},
		breakpoints: {
			576: {
				slidesPerView: 2
			},
			992: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 4
			}
		}
	});
	var teachersSlider = new Swiper('.teachersSlider-js', {
		grabCursor: true,
		slidesPerView: 1,
		loop: true,
		autoHeight: true,
		spaceBetween: 0,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4
		},
		navigation: {
			nextEl: '.teachersSlider-next',
			prevEl: '.teachersSlider-prev'
		},
		pagination: {
			el: $(this).find('.swiper-pagination'),
			clickable: true
		}
	});
	var achievementsSlider = new Swiper('.achievementsSlider-js', {
		grabCursor: true,
		slidesPerView: 1,
		loop: true,
		// autoHeight: true,
		spaceBetween: 37,
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
			loadOnTransitionStart: true
		},
		navigation: {
			nextEl: '.achievementsSlider-next' // prevEl: '.achievementsSlider-prev',

		},
		breakpoints: {
			576: {
				slidesPerView: 3
			},
			992: {
				slidesPerView: 4
			},
			1200: {
				slidesPerView: 5
			}
		}
	});
	var reviewsSlider = new Swiper('.reviewsSlider-js', {
		slidesPerView: 'auto',
		// loop: true,
		// autoHeight: true,
		freeMode: true,
		freeModeMomentum: true,
		spaceBetween: 30,
		watchOverflow: true,
		breakpoints: {
			992: {
				slidesPerView: 3
			}
		}
	});
	var headerBlock = new Swiper('.headerSlider-js', {
		// slidesPerView: 5,
		slidesPerView: 1,
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 5000
		}
	});
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window

	$('.accardion-js').click(function () {
		$(this).toggleClass('active');
		$(this.parentElement).find('.accardionToggle-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	var now = new Date();
	$('.curentYear').text(now.getFullYear());
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}