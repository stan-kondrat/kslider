;(function( $ ) {
	var states = 5; // кол-во позиций в слайдере
	var wrapper;
	var element;
	var state;  // текущее положение

	var widthWrapper;	// ширина слайдера
	var widthElement;	// ширина ползунка
	var widthExtrm;		// ширина области крайних состояний
	var widthPos;		// ширина области не крайних состояний

	// функция рассчитывает состаяние слайдера
	function calcStates (position){

		// Область для первого состания
		if (position < widthExtrm) {
			state = 1;
		}
		// Область для последнего состания
		if (position > widthWrapper - widthExtrm) {
			state = states;
		}
		for (var i = 2; i < states; i++) {
			if ( position > widthExtrm + widthPos * (i - 2) &&
				 position < widthExtrm + widthPos * (i - 1)
				) {
				state = i;
			}
		};
	}

	function setState() {
		$(element).css('left',  widthPos * (state -1));
	}

	$.fn.kslider = function() {
		wrapper = $( this ); 
		element = $("<div/>");

		// инициаизируем структуру и добавляем стилей
		wrapper.addClass("kslider");
		element.addClass("kslider-element").appendTo(this);

		// рассчитываем значения
		widthWrapper = wrapper.width();
		widthElement = element.width();
		widthPos = (widthWrapper - widthElement) / (states - 1) // ширина области для одного состояния
		widthExtrm = widthPos/2 + widthElement/2; 

		// обрабатываем клик на слайдер
		$(wrapper).on('click', function(e){
			var position = e.pageX - e.target.offsetLeft;
			calcStates(position);
			setState();
		});


		// перетаскивание слайдера
		var offsetX = null;
		var move = function(e) {
			var left = e.pageX - offsetX;
			if (left > widthWrapper - widthElement) left = widthWrapper - widthElement;
			if (left < 0) left = 0;
			element.css("left", parseInt(left));
		};
		var up = function(e) {
			element.unbind("mouseup", up);
			$(document).unbind("mousemove", move);
			var pos = element.position();
			calcStates(pos.left);
			setState();
		};
		element.bind("mousedown", function(e) {
			var pos = element.position();
			offsetX = e.pageX - pos.left;
			$(document).bind("mousemove", move);
			element.bind("mouseup", up);
		});	



		return this;
	};
}( jQuery ));