$(document).ready(function() {
  // mostrando todos los restaurantes que hay en la data
  for (var i = 0; i < data.length; i++) {
    $('#sample').append('<div class="rest" data-toggle="modal" data-target="#myModal" data-num="' + data[i]['num'] + '" data-tag="' + data[i]['tags'] + '">' + data[i]['photo'] + '</div>');
    // añadiendo clases para mostrar los restaurantes de forma ordenada
    $('#sample img').addClass('col-xs-4 mg-bt-25 height-25');
  }

  // añadiedo efecto al evento mouseover en desktop
  $('#sample div img').mouseover(function() {
    $(this).addClass('col-md-6');
  });
  // quitando los efectos del mouse over en desktop
  $('#sample div img').mouseout(function() {
    $(this).removeClass('col-md-6');
  });

  // funcionalidad del modal
  $('#sample div').on('click', function(event) {
    var indexRestaurant = $(this).data('num');
    // console.log(indexRestaurant);
    // obteniendo datos del restaurante seleccionado
    var restaurantName = data[indexRestaurant]['name'];
    var restaurantAddress = data[indexRestaurant]['address'];
    var restaurantLema = data[indexRestaurant]['lema'];
    var restaurantMap = data[indexRestaurant]['map'];
    // console.log(restaurantName);
    console.log(restaurantMap);
    // asignando la informacion del restaurante seleccionado al contenido del modal
    $('#myModalLabel').text(restaurantName);
    $('#map iframe').replaceWith('<iframe class="col-xs-12 mg-bt-15 "src="' + restaurantMap + '" width="300" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>');
    $('#address').text(restaurantAddress);
    $('#lema').text(restaurantLema);

    // funcion para que al cerrarse el modal despues de la busqueda vuelva a la vista principal con todos los restaurantes
    $('#myModal').on('hidden.bs.modal', function() {
      $('#searching').val('');
      $('#sample div').show();
    });
  });

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
