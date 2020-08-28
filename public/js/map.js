var mymap = L.map('main_map').setView([51.509865,-0.118092],13);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 18
}).addTo(mymap);

L.control.scale().addTo(mymap);
//L.marker([51.509865,-0.118092],{draggable: true}).addTo(mymap);
$.ajax({
    dataType:"json",
    url:"api/bicicletas",
    success:function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title:bici.id}).addTo(mymap);
            
        });
    }
})