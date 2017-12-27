$(document).ready(function() {
  // funcion que hara desaparece el primer div en 3 segundos
  setTimeout(function() {
    $('#splash').fadeOut();
    $('#main').fadeIn('slow');
  }, 4000);


});
