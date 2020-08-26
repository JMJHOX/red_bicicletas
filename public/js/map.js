var mymap = L.map('main_map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 18
}).addTo(mymap);

L.control.scale().addTo(mymap);
L.marker([41.66, -4.71],{draggable: true}).addTo(mymap);