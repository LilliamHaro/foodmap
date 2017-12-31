$(document).ready(function() {
  // mostrando todos los restaurantes que hay en la base de datos
  for (var i = 0; i < data.length; i++) {
    $('#sample').append('<div class="rest" data-tag="' + data[i]['tags'] + '">' + data[i]['photo'] + '</div>');
    // añadiendo clases para mostrar los restaurantes de forma ordenada
    $('#sample img').addClass('col-xs-6 mg-bt-25');
  }
  // buscando el restaurante dependiendo de lo que se escribe
  // la busqueda depende del atributo data que se generó en la parte superior y de lo que se ingresa en el input
  $('#searching').on('input', function(event) {
    var inputSearch = $(this).val();
    // seleccionando todos los restaurante y convirtiendo el elemento en un array
    var restaurants = $('.rest').toArray();
    // variable vacía para almacena el data-tag por el que se distinguira cada restaurante
    var dataRestaurant = '';
    console.log(restaurants);

    for (var i = 0; i < restaurants.length; i++) {
      dataRestaurant = $(restaurants[i]).data('tag');
      console.log(dataRestaurant);
      for (var j = 0; j < dataRestaurant.length; j++) {
        // comparando el data-tag con lo ingresado en el input
        if (dataRestaurant.indexOf(inputSearch) > -1) {
          $(restaurants[i]).show();
        } else {
          $(restaurants[i]).hide();
        }
      }
    }
  });
});
