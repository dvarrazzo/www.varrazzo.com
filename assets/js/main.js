$(function () {
	'use strict';


	// PAGE TRANSITIONS
	// ---------------------------------
	$(".animsition").animsition({
		inClass               :   'fade-in',
		outClass              :   'fade-out',
		inDuration            :    800,
		outDuration           :    500,
		// linkElement           :   '.animsition-link',
		linkElement           :   'a:not([target="_blank"]):not([href^=#]):not([data-rel*="lightcase"]):not([class*="no-redirect"])',
		loading               :    true,
		loadingParentElement  :   'body', //animsition wrapper element
		loadingClass          :   'animsition-loading',
		unSupportCss          : [ 'animation-duration',
								  '-webkit-animation-duration',
								  '-o-animation-duration'
								],
		overlay               :   false,
		overlayClass          :   'animsition-overlay-slide',
		overlayParentElement  :   'body'
	});



	// SLIDESHOWS
	// ---------------------------------

	// OPTIONS
	var swipermw = $('.swiper-container.mousewheel').length ? true : false;
	var swiperkb = $('.swiper-container.keyboard').length ? true : false;
	var swipercentered = $('.swiper-container.center').length ? true : false;

	var swiperautoplay = $('.swiper-container').data('autoplay');
	var swiperinterval = $('.swiper-container').data('interval'),
		swiperinterval = swiperinterval ? swiperinterval : 4000;
		swiperautoplay = swiperautoplay ? swiperinterval : false;

	// SLIDESHOW
	var swiperSlideshow = $('.slideshow').swiper({
		autoplay: swiperautoplay,
		autoplayDisableOnInteraction: false,
		effect: 'fade',
		speed: 600,
		loop: true,
		simulateTouch: false,
		onSlideChangeStart: swiperCaption,
		mousewheelControl: swipermw,
		keyboardControl: swiperkb
	});
	// KENBURNS SLIDESHOW
	var swiperKenburns = $('.kenburns').swiper({
		autoplay: swiperautoplay,
		autoplayDisableOnInteraction: false,
		effect: 'fade',
		speed: 600,
		loop: true,
		simulateTouch: false,
		onSlideChangeStart: swiperCaption,
		mousewheelControl: swipermw,
		keyboardControl: swiperkb
	});
	// SLIDER
	var swiperSlider = $('.slider').swiper({
		autoplay: swiperautoplay,
		autoplayDisableOnInteraction: false,
		speed: 600,
		loop: true,
		onSlideChangeStart: swiperCaption,
		mousewheelControl: swipermw,
		keyboardControl: swiperkb
	});
	// HORIZONTAL SLIDER
	if( $('.horizontal-slider').length ){
		$('body').addClass('horizontal-slider-mode');
		// Chrome+Windows Fix
		$('.swiper-container .swiper-slide a').addClass('noswipe');
		$('.horizontal-slider').imagesLoaded(function(){
			var swiperHorizontal = $('.horizontal-slider').swiper({
				slidesPerView: 'auto',
				loop: true,
				loopedSlides: 5,
				noSwipingClass: 'noswipe',
				centeredSlides: swipercentered,
				mousewheelControl: swipermw,
				keyboardControl: swiperkb,
				onInit: lbFix
			});
		});
	}
	// LANDING PAGE SLIDESHOWS
	var swiperLanding = $('.landing-slideshow').swiper({
		autoplay: swiperautoplay,
		autoplayDisableOnInteraction: false,
		effect: 'fade',
		speed: 600,
		loop: true,
		simulateTouch: false,
		mousewheelControl: swipermw,
		keyboardControl: swiperkb
	});
	// GALLERY ORIGINAL
	var swiperGalleryTop = $('.gallery-original').swiper({
		autoplay: swiperautoplay,
		autoplayDisableOnInteraction: true,
		effect: 'fade',
		speed: 600,
		loop: false,
		simulateTouch: false,
		onInit: swiperCaption,
		onSlideChangeStart: swiperCaption,
		mousewheelControl: swipermw,
		keyboardControl: swiperkb
	});
	// GALLERY THUMBS
	var swiperGalleryThumbs = $('.gallery-thumbs').swiper({
		autoplayDisableOnInteraction: true,
		slidesPerView: 'auto',
		simulateTouch: false,
		slideToClickedSlide: true,
		centeredSlides: true
	});
	if (swiperGalleryTop && swiperGalleryThumbs) {
		swiperGalleryTop.params.control = swiperGalleryThumbs;
		swiperGalleryThumbs.params.control = swiperGalleryTop;
	}
	$('.gallery-thumbs').on('click', '.swiper-slide', function() {
		swiperGalleryTop.slideTo($(this).index(), 500);
	});

	var uncropped = $('.swiper-container.uncropped-slides');
	if( uncropped.length ){
		$(window).resize(function() {
			uncropped.css({
				'top': $('#header').height(),
				'bottom': $('#footer').height()
			});
		}).resize();
	}

	// SLIDER CAPTIONS
	function swiperCaption(){
		var el   = $('.swiper-slide-active');
		var cap  = el.attr('data-caption');
		var link = el.attr('data-link');
		if(cap) $('.active-slide-caption').stop().fadeOut(0).text(cap).fadeIn(900);
		if(link) $('.active-slide-caption').wrapInner('<a href="'+link+'">');
	}

	// CONTROLS
	swiperautoplay ? $('.swiper-play').addClass('hidden') : $('.swiper-pause').addClass('hidden');
	// Prev
	$('.controls-wrapper').on('click', '.swiper-prev', function () {
		$('.swiper-container')[0].swiper.slidePrev()
	});
	// Next
	$('.controls-wrapper').on('click', '.swiper-next', function () {
		$('.swiper-container')[0].swiper.slideNext()
	});
	// Play
	$('.controls-wrapper').on('click', '.swiper-play', function () {
		$('.swiper-container')[0].swiper.params.autoplay = swiperinterval;
		$('.swiper-container')[0].swiper.startAutoplay();
		$('.swiper-play, .swiper-pause').toggleClass('hidden');
	});
	// Pause
	$('.controls-wrapper').on('click', '.swiper-pause', function () {
		$('.swiper-container')[0].swiper.stopAutoplay();
		$('.swiper-play, .swiper-pause').toggleClass('hidden');
	});
	// FULLSCREEN MODE
	$('.controls-wrapper').on('click', '.expand', function () {
		if( !$('.controls-wrapper').hasClass('slider-expanded') ){
			$('body').addClass('slider-expanded');
			setTimeout(function() {
				$('.controls-wrapper').addClass('slider-expanded').find('.expand i').toggleClass('fa-expand fa-compress');
			}, 400);
		}else{
			$('.controls-wrapper').removeClass('slider-expanded').find('.expand i').toggleClass('fa-expand fa-compress');
			setTimeout(function() {
				$('body').removeClass('slider-expanded');
			}, 400);
		}
	});


	// YOUTUBE Background
	// ---------------------------------
	var ytMute = $('.youtube-bg').hasClass('muted') ? true : false;
	$('.youtube-bg').YTPlayer({
		mute: ytMute,
		showControls: false,
		showYTLogo: false,
		containment: 'self'
	});
	ytMute ? $('.yt-mute').addClass('hidden') : $('.yt-unmute').addClass('hidden');

	// YouTube Controls
	$('.controls-wrapper').on('click', '.yt-play', function () {
		$('.youtube-bg').YTPPlay();
		$('.yt-play, .yt-pause').toggleClass('hidden');
	});
	$('.controls-wrapper').on('click', '.yt-pause', function () {
		$('.youtube-bg').YTPPause();
		$('.yt-play, .yt-pause').toggleClass('hidden');
	});
	$('.controls-wrapper').on('click', '.yt-mute', function () {
		$('.youtube-bg').YTPMute();
		$('.yt-mute, .yt-unmute').toggleClass('hidden');
	});
	$('.controls-wrapper').on('click', '.yt-unmute', function () {
		$('.youtube-bg').YTPUnmute();
		$('.yt-mute, .yt-unmute').toggleClass('hidden');
	});

	// SIDESLIDE (controls hover animation)
	$.fn.hoverSide = function(e){
			var $this = $(this);
			var l = $this.offset().left;
			var t = $this.offset().top;
			var w = $this.outerWidth();
			var h = $this.outerHeight();
			var x = e.pageX;
			var y = e.pageY;
			var fromLeft   = x - l,
					fromRight  = l + w - x,
					fromTop    = y - t,
					fromBottom = t + h - y;
			var min = Math.min(fromLeft, fromRight, fromTop, fromBottom), $result;

			if( fromLeft == min ){ $result = 'left';}
			else if( fromRight == min ){ $result = 'right';}
			else if( fromTop == min ){ $result = 'top'; }
			else if( fromBottom == min ){ $result = 'bottom'; }
			return $result;
	};	

	if( !$('html.touch').length ){
		$('.sideslide').each(function(){
				var $this = $(this), $rslt;
				$this.mouseenter(function(e){
					$rslt = $this.hoverSide(e);
					$this.removeClass('top-out bottom-out left-out right-out');
					$this.addClass($rslt+'-in');
				});
				$this.mouseleave(function(e){
					$rslt = $this.hoverSide(e);
					$this.removeClass('top-in bottom-in left-in right-in');
					$this.addClass($rslt+'-out');
				});	
		});
	}

	// MENU
	$('.main-menu ul ul').prev('a').addClass('dropdown');
	$('.mob-menu').click(function(e) {
		e.preventDefault();
		$('.main-menu').slideToggle();
		$(this).find('i').toggleClass('fa-bars fa-times');
	});


	// JUSTIFIED GALLERY
	$('.justified').each(function() {
		var e = $(this);
		function collage() {
			e.imagesLoaded(function() {
				e.removeWhitespace().collagePlus({
					'targetHeight': 400,
					'effect': 'effect-2',
					'allowPartialLastRow': true
				});
			});
		}
		collage();
		var resizeTimer = null;
		$(window).bind('resize', function() {
			$('.justified a').css("opacity", 0);
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(collage, 200);
		});
	});


	// BACKGROUNDS
	$('[data-background]').each(function(){
		var bg = $(this).attr('data-background');
		if( bg.match('^rgb') || bg.match('^#') ){
			$(this).css('background-color', bg);
		}else{
			$(this).css('background-image', 'url('+bg+')');
		}
	});


	// PARALLAX BACKGROUNDS
	// ---------------------------------
	$.stellar({
		horizontalScrolling: false,
		responsive:true
	});
	// stellar fix - bg position on load
	if( $('[data-stellar-background-ratio]').length > 0 ){
		setTimeout(function () {
			var st = $(window).scrollTop();
			$(window).scrollTop(st+1);
			setTimeout(function(){
				$(window).scrollTop(st)
			}, 200)
		}, 200);
	};



	// SMOOTH SCROLL
	// ---------------------------------
	$('.sscroll').click(function () {
		var ti = $(this).attr('href'),
			tt = $(ti).offset().top-100;
		$('html, body').animate({ scrollTop: tt }, 1000, 'easeInOutExpo');
		return false;
	});	



	// RESPONSIVE VIDEOS
	// ---------------------------------
	$('.video-container').fitVids();



	// GRID
	// --------------------------------
	$('.grid').each(function(){
		var $grid = $(this),
			$item = $grid.children('.grid-item'),
			$itemWide = $grid.children('.grid-item.wide'),
			$itemTall = $grid.children('.grid-item.tall'),
			$cols = $grid.data('columns'),
			$cols = $cols != undefined ? $cols : 3,
			$gutter = $grid.data('gutter'),
			$gutter = $gutter != undefined ? $gutter / 2 : 0;
		
		// spaces between items
		$grid.wrap("<div class='grid-wrapper' />");
		$grid.css({
			'margin-left': -$gutter+'px',
			'margin-right': -$gutter+'px',
			'margin-top': -$gutter+'px',
			'margin-bottom': -$gutter+'px'
		});
		$item.wrapInner("<div class='grid-item-inner' />");
		$grid.find('.grid-item-inner').css({
			'position': 'absolute',
			'top': $gutter,
			'bottom': $gutter,
			'left': $gutter,
			'right': $gutter,
		});
		
		function itemSizes(){
			$item.width(Math.round($grid.width() / $cols));
			$item.height(Math.round($item.width() * 4/5));
			$itemTall.height(Math.round($item.width() * 8/5));
			$itemWide.width(Math.round($grid.width() / $cols * 2));
		}
		itemSizes();
		
		$grid.isotope({
			itemSelector: '.grid-item',
			masonry: { columnWidth: $grid.width() / $cols }
		});

		// Update Grid On Resize
		$(window).resize(function(){
			itemSizes();
			$grid.isotope({
				masonry: { columnWidth: $grid.width() / $cols }
			})
		}).resize();
		
	});



	// FILTER
	$('.filter').on('click', 'li', function () {
		var filter = $(this).attr('data-filter');
		$('.grid').isotope({ filter: filter });
		$('.filter ul li').removeClass('active');
		$(this).addClass('active');
	});



	// MASONRY
	// ---------------------------------
	$(window).load(function(){
		$('.masonry').each(function () {
			var $this = $(this);
			$this.imagesLoaded(function () {
				$this.isotope({
					itemSelector: '.masonry-item'
				});
			});
		});
	});	


	// OWL CAROUSEL
	$('.owl-slider').each(function () {
		var $this = $(this),
			items = $this.data('items'),
			itemsTablet = $this.data('items-tablet'),
			itemsMobile = $this.data('items-mobile'),
			speed = $this.data('speed'),
			margin = $this.data('margin'),
			loop  = $this.data('loop'),
			loop  = loop != undefined ? loop : true,
			dots  = $this.data('dots'),
			dots  = dots != undefined ? dots : true,
			nav   = $this.data('nav'),
			nav   = nav != undefined ? nav : true,
			autoplay = $this.data('autoplay'),
			autoplay = autoplay != undefined ? autoplay : true,
			mousewheel = $this.data('mousewheel'),
			mousewheel = mousewheel != undefined ? mousewheel : false;
		$this.imagesLoaded(function () {
			$this.owlCarousel({
				dots: dots,
				nav: nav,
				loop: loop,
				autoplay: autoplay,
				smartSpeed: speed || 1000,
				dotsSpeed: 1000,
				navSpeed: 1000,
				autoHeight : true,
				responsive: {
					0:   { items: itemsMobile || itemsTablet || items || 1 },
					768: { items: itemsTablet || items || 1 },
					992: { items: items || 1 }
				},
				margin: margin || 0
			});
		});
		// refresh height on resize
		$this.on('resized.owl.carousel', function(event) {
			$this.find('.owl-height').css('height', $this.find('.owl-item.active').height() );
		});

		if( mousewheel ){
			$this.mousewheel(function(e){
				if( e.deltaY < 0 ){
					$this.trigger('next.owl.carousel');
				}else{
					$this.trigger('prev.owl.carousel');
				}
			});
		}

	});



	// EQUAL-HEIGHT COLUMNS
	// $(window).load(function() {
		$('.equal-height-cols').each(function () {
			var el = $(this).find('[class*="col-"]');
			el.imagesLoaded(function() {
				el.matchHeight({
					byRow: false
				});
			});
		});  
	// })

	// FIX LIGHTBOX COUNT IN SWIPER LOOP MODE
	function lbFix() {
		if( $('.swiper-container a.expand').length ){
			$('.swiper-container .swiper-slide-duplicate').each(function(){
				var link = $(this).find('a.expand');
				var href = link.attr('href');
				link.removeAttr('data-rel').addClass('no-redirect');
				var originalLink = $(this).closest('.swiper-wrapper').find('.swiper-slide:not(.swiper-slide-duplicate) [data-rel^="lightcase"][href="'+href+'"]');
				link.click(function(e){
					e.preventDefault();
					originalLink.click();
				});
			});
		}
	}

	// Lightbox
	$('[data-rel^=lightcase]').lightcase({
		maxWidth: 1600,
		maxHeight: 1200,
		shrinkFactor: 1
	});
	
	// Intense
	var intenseImages = document.querySelectorAll('.intense');
	if(intenseImages.length) Intense(intenseImages);



	// AJAX CONTACT FORM
	// ---------------------------------
	$('#contact').submit(function () {
		var url = $(this).attr('action');
		// get information from contact form
		var name = $('[name=name]').val();
		var email = $('[name=email]').val();
		var message = $('[name=message]').val();

		// send information to contact.php
		$.ajax({
			type: "POST",
			url: url,
			data: { name: name, email: email, message: message },
			success: function (response) {
				// response from contact.php
				$('.contact-message').html(response).slideDown(500);
			},
			error: function () {
				// error message
				$('.contact-message').html('<p class="error">Something went wrong, try again!</p>').slideDown('slow');
			}
		});

		return false;
	});



	// GOOGLE MAP
	// ----------------------------------
	//set your google maps parameters
	$(window).load(function () {
		
		if( $('#google-map').length > 0 ){

			var latitude = 51.5255069,
				longitude = -0.0836207,
				map_zoom = 14;

			//google map custom marker icon 
			var marker_url = 'img/map-marker.png';

			//we define here the style of the map
			var style= [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
				
			//set google map options
			var map_options = {
				center: new google.maps.LatLng(latitude, longitude),
				zoom: map_zoom,
				panControl: false,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				styles: style,
			}
			//inizialize the map
			var map = new google.maps.Map(document.getElementById('google-map'), map_options);
			//add a custom marker to the map				
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				visible: true,
				icon: marker_url,
			});
		}
	});


})
