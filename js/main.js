'use strict';

function reset() {
	setTimeout(function(){
		$('.target').removeAttr('style');
	}, 500)
}


$(document).ready(function() {

	$('select').prop('selectedIndex', -1)

	$('select').on('change', function() {
		var value = $('select').val();
		var action = value.split(' ')[0];
		var amount = value.split(' ')[1];
		var time = value.split(' ')[2];

		var properties = {};
		properties[action] = amount;

		$('#target').animate(properties, time || 2000, reset);
	});
});