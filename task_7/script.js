$(document).ready(function () {
	console.log("ready!")

	$(".responsive").slick({
		infinite: true,
		dots: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	})
})