(function($) 
{
    $.fn.slideTo = function(data) {
    
		var width = parseInt($('#slider').css('width'));
		var transfer = $('<div class="transfer"></div>').css({ 'width': (2 * width) + 'px' });
		var current = $('<div class="current"></div>').css({ 'width': width + 'px', 'left': '0', 'float': 'left' }).html($('#slider').html());
		var next = $('<div class="next"></div>').css({ 'width': width + 'px', 'left': width + 'px', 'float': 'left' }).html(data);
		
		transfer.append(current).append(next);
		
		//c.replaceWith($(a).find(".frame-center"))
		
		$('#slider').html('').append(transfer);
		
		transfer.animate({ 'margin-left': '-' + width + 'px' }, 400, function () {
			$('#slider').html($('#slider .next').html());
		});
	}
	
	$.fn.slideBackTo = function(data) {
    
		var width = parseInt($('#slider').css('width'));
		var transfer = $('<div class="transfer"></div>').css({ 'width': (2 * width) + 'px', 'margin-left': '-' + width + 'px' });
		var current = $('<div class="current"></div>').css({ 'width': width + 'px', 'left': '0', 'float': 'left' }).html($('#slider').html());
		var next = $('<div class="next"></div>').css({ 'width': width + 'px', 'left': width + 'px', 'float': 'left' }).html(data);
		
		transfer.append(next).append(current);

		$('#slider').html('').append(transfer);
		
		transfer.animate({ 'margin-left': '0px' }, 400, function () {
			$('#slider').html($('#slider .next').html());
		});
	}
	
	
	
})(jQuery);
