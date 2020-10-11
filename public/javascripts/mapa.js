var map = L.map('main_mapa').setView([-31.6255448, -60.7072808], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//var marker = L.marker([-31.6426027,-60.7046328]).addTo(map);
//var marker = L.marker([-31.6367848,-60.6949814]).addTo(map);


// ajax: request asincornico http a un servidor

$.ajax({
    dataType: "json",
    url: "api/v1/bicicletas",
    success: function(result){ //callback
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion,{title: bici.id}).addTo(map);
        });
    }
})