$(document).ready(function() {

	$('.menu__icon').click(function(event) {
		$('.menu__icon,.menu__body,.header__logo_active').toggleClass('active');
		$('body').toggleClass('lock')
	});

	$('.slider__body').slick({
		arrows: false,
		dots: true,
		infinite: false,
		initialSlide: 0,
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 900,
	})
});

