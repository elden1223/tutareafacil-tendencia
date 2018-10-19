$(document).ready(function(){
	/*alert('Hola');*/
    
	var flag = false;
	var scroll;

	$(window).scroll(function(){
		scroll = $(window).scrollTop();

		if(scroll > 10){
			if(!flag){
				//$("header").css({"background-color": "#3C3C3C"});
				flag = true;
			}
		}else{
			if(flag){
				//$("header").css({"background-color": "transparent"});
				flag = false;
			}
		}


	});

	var banner = {
		padre: $('#banner'),
		numeroSlides: $('#banner').children('.slide').length,
		posicion: 1
	}

	var info = {
		padre: $('#info'),
		numeroSlides: $('#info').children('.slide').length,
		posicion: 1
	}

	banner.padre.children('.slide').first().css({
		'left': '0'
	});

	info.padre.children('.slide').first().css({
		'left': '0'
	});

	var altoBanner =  function(){
		var alto = banner.padre.children('.slide').outerHeight();
		banner.padre.css({
			'height': alto + 'px'
		});
		//console.log(alto);
	}

	var altoInfo =  function(){
		var alto = info.padre.children('.active').outerHeight();
		info.padre.animate({
			'height': alto + 'px'
		});
		//console.log(alto);
	}

	var altoContenedor = function() {
		var altoVentana = $(window).height();
		if(altoVentana<= $('.contenedor').outerHeight() + 200){
			$('#contenedor').css({'height':''});
		} else {
			$('#contenedor').css({'height': altoVentana + 'px'});
		}
	}
	altoBanner();
	altoInfo();
	altoContenedor();

	$(window).resize(function(){
		altoBanner();
		altoInfo();
		altoContenedor();
	});

	//Agregamos un puntito por cada slide que tengamos
	$('#info').children('.slide').each(function(){
		$('#botones').append('<span>');
	});

	$('#botones').children('span').first().addClass('active');
	//* Banner *
	//Boton Siguiente
	$('#banner-next').on('click', function(e){
		e.preventDefault();

		if(banner.posicion < banner.numeroSlides){
			// Nos aseguramos de que las demas slides empiecen desde la derecha.
			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			// Quitamos la clase active y se la ponemos al siguiente elemento.Y lo animamos
			$('#banner .active').removeClass('active').next().addClass('active').animate({
				'left': 0
			});

			// Animamos el slide anterior para que se deslaza hacia la izquierda
			$('#banner .active').prev().animate({
				'left': '-100%'
			});

			banner.posicion = banner.posicion + 1;
		} else {
			$('#banner .active').animate({
				'left':'-100%'
			});

			banner.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#banner .active').removeClass('active');
			banner.padre.children('.slide').first().addClass('active').animate({
				'left':'0'
			});

			banner.posicion = 1;
		}

	});

	//Boton Anterior
	$('#banner-prev').on('click', function(e){
		e.preventDefault();

		if(banner.posicion > 1){
			banner.padre.children().not('.active').css({
			'left':'-100%'
			});

			$('#banner .active').animate({
				'left':'100%'
			});

			$('#banner .active').removeClass('active').prev().addClass('active').animate({
				'left':'0'
			});

			banner.posicion = banner.posicion - 1;
		} else {
			banner.padre.children().not('.active').css({
				'left':'-100%'
			});

			$('#banner .active').animate({
				'left':'100%'
			});

			$('#banner .active').removeClass('active');

			banner.padre.children().last().addClass('active').animate({
				'left':'0'
			});

			banner.posicion =  banner.numeroSlides;
		}
		
	});

	//Informacion

	//Boton Siguiente
	$('#info-next').on('click', function(e){
		e.preventDefault();

		if(info.posicion < info.numeroSlides){
			//Nos aseguramos de que las dema slides empiecen desde la derecha
			info.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#info .active').removeClass('active').next().addClass('active').animate({
				'left': '0'
			});

			$('#info .active').prev().animate({
				'left':'-100%'
			});

			$('#botones').children('.active').removeClass('active').next().addClass('active');

			info.posicion = info.posicion + 1;
		} else {
			$('#info .active').animate({
				'left':'-100%'
			});

			info.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#info .active').removeClass('active');
			info.padre.children('.slide').first().addClass('active').animate({
				'left':'0'
			});

			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').first().addClass('active');

			//Reseteamos la posicion a 1
			info.posicion = 1;
		}
		altoInfo();
	});

	//Boton Anterior
	$('#info-prev').on('click', function(e){
		e.preventDefault();

		if(info.posicion > 1){
			info.padre.children().not('.active').css({
			'left':'-100%'
			});

			$('#info .active').animate({
				'left':'100%'
			});

			$('#info .active').removeClass('active').prev().addClass('active').animate({
				'left':'0'
			});

			$('#botones').children('.active').removeClass('active').prev().addClass('active');

			info.posicion = info.posicion - 1;
		} else {
			info.padre.children().not('.active').css({
				'left':'-100%'
			});

			$('#info .active').animate({
				'left':'100%'
			});

			$('#info .active').removeClass('active');

			info.padre.children().last().addClass('active').animate({
				'left':'0'
			});

			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').last().addClass('active');
			info.posicion =  info.numeroSlides;
		}
		altoInfo();
	});
});