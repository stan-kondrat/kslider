;(function( $ ) {
	$.fn.kslider = function() {
		// инициаизируем структуру и добавляем стилей
		this.addClass("kslider");
		$("<div/>").addClass("kslider-element").appendTo(this);

		return this;
	};
}( jQuery ));