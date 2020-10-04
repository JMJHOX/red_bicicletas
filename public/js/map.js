var map = L.map('main_map').setView([-34.6012424, -58.38614971], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/*L.marker([6.2486068999999995, -75.5742467]).addTo(map)
    .bindPopup('Donde esta mi ubucación de mi internet')
    .openPopup();

L.marker([6.330841, -75.482367]).addTo(map)
    .bindPopup('Mi casa')
    .openPopup();

L.marker([6.231942, -75.610910]).addTo(map)
    .bindPopup('Mi universidad')
    .openPopup();
*/
$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result) {
        console.log(result);
        result.bicicletas.forEach(function(bici) {
            L.marker(bici.ubicacion, { title: bici.id }).addTo(map);
        });
    }
})