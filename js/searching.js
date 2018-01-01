$(document).ready(function() {
  // mostrando todos los restaurantes que hay en la data en la seccion de muestra(sample)
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
    var restaurantOfferts = data[indexRestaurant]['offers'];
    // console.log(restaurantName);
    console.log(restaurantMap);
    // asignando la informacion del restaurante seleccionado al contenido del modal
    $('#myModalLabel').text(restaurantName);
    $('#map iframe').replaceWith('<iframe class="col-xs-12 mg-bt-15 "src="' + restaurantMap + '" width="300" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>');
    $('#address').text(restaurantAddress);
    $('#lema').text(restaurantLema);

    // verificando si hay platos en oferta -- si la propiedad offers esta vacía
    if (restaurantOfferts === undefined || restaurantOfferts.length === 0) {
      $('#show-offers').append('<div class="text-center color-black"> En este momento no hay ofertas disponibles </div>');
    } else {
      // recorriendo el array con las ofertas para ubicarlas en su respectiva seccion que por el momento permanecerá oculta
      for (var j = 0; j < restaurantOfferts.length; j++) {
        var imagePlate = restaurantOfferts[j]['image'];
        var infoPlate = restaurantOfferts[j]['plate'];
        var infoPrice = restaurantOfferts[j]['price'];
        $('#show-offers').append('<div class="text-center offert color-black bold-text">' + imagePlate + infoPlate + '<br>' + infoPrice + '</div>');
        if (restaurantOfferts.length === 1) {
          $('.offert').addClass('col-xs-12');
          $('.offert img').addClass('col-xs-offset-3 col-xs-6 mg-rigth-25');
        } else {
          $('.offert').addClass('col-xs-6');
          $('.offert img').addClass('col-xs-12');
        }
      }
    }

    // al hacer click en la $('#offers') la seccion con los platos en oferta disponibles se mostrará en el modal
    $('#offers').on('click', function(event) {
      $('#show-offers').removeClass('display-none');
    });

    // funcion para que al cerrarse el modal despues de la busqueda vuelva a la vista principal con todos los restaurantes
    // hidden.bs.modal --> Es un modal Event, se produce cuando el modal termina de ocultarse
    $('#myModal').on('hidden.bs.modal', function(event) {
      // vaciando el buscador
      $('#searching').val('');
      // mostrando todos los restaurantes otra vez
      $('#sample div').show();
      // limpiando la seccion de ofertas
      $('#show-offers').children().remove();
      $('#show-offers').addClass('display-none');
    });
  });

  // funcionalidad del buscador
  // la busqueda depende del atributo data-tag proveniente de la propiedad tags desl objeto con la info del restaurante y del value del input
  $('#searching').on('input', function(event) {
    // obteniendo el value del input y volviendolo a minuscula por si es que el usuario ingresa mayusculas
    var inputSearch = $(this).val().toLowerCase();
    // seleccionando todos los restaurante por su clase y convirtiendo el elemento en un array
    var restaurants = $('.rest').toArray();
    // variable vacía para almacena el data-tag por el que se distinguira cada restaurante
    var dataRestaurant = '';
    console.log(restaurants);

    for (var i = 0; i < restaurants.length; i++) {
      dataRestaurant = $(restaurants[i]).data('tag');
      console.log(dataRestaurant);
      for (var j = 0; j < dataRestaurant.length; j++) {
        // comparando el data-tag con lo ingresado en el input -- si es mayor que -1 significa que encontró coincidencias para mostrar
        if (dataRestaurant.indexOf(inputSearch) > -1) {
          $(restaurants[i]).show();
        } else {
          $(restaurants[i]).hide();
        }
      }
    }
  });
});
