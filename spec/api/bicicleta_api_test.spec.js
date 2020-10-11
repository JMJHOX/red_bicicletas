
var Bicicleta =require('../../models/bicicleta');
var request =require('request');
var server = require('../../bin/www');


describe('Bicicleta api',()=>{
    describe('get Bicicleta',()=>{
        it('status 200',()=>{
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1,'rojo','urbana',[-31.63748,-60.7098175])
            Bicicleta.add(a);

            request.get('http://localhost:5000/api/v1/bicicletas',function(error,response,body){
                expect(response.statusCode).toBe(200);
            });
        });    
    });
});


describe('Bicicleta api post',()=>{
        it('status 200',(done)=>{
            var headers={'content-type':'application/json'};
            var aBici='{"id":1,"color":"rojo","modelo":"urbana","lat"=-34,"lng"=-54}';
            request.post({
                headers:headers,
                url:'http://localhost:5000/api/v1/bicicletas/create',
                body:aBici
            },function(error,response,body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(1).color).toBe("rojo");
                done();
             
            });
        });    
});



