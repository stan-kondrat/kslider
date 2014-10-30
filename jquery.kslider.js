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
		widthWrapper = wrapper.width();
		widthElement = element.width();
		widthPos = (widthWrapper - widthElement) / (states - 1) // ширина области для одного состояния
		widthExtrm = widthPos/2 + widthElement/2; 

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

		// обрабатываем клик на слайдер
		$(wrapper).on('click', function(e){
			var position = e.pageX - e.target.offsetLeft;
			calcStates(position);
			setState();
		});

		return this;
	};
}( jQuery ));