'use strict';

function reset() {
  setTimeout(function() {
    $('#target').removeAttr('style');
  }, 500);
}

function arrayToObject(inputArray) {
  var properties = {};
  for (var i = 0; i < inputArray.length; i += 2) {
    properties[inputArray[i]] = inputArray[i + 1];
  }
  return properties;
}


$(document).ready(function() {

  // $('select').prop('selectedIndex', -1);

  $('select').on('change', function() {
    var valueArray = $('select').val().split(':');
    var properties = arrayToObject(valueArray);
    $('#target').animate(properties, 2000, reset)
  });

});