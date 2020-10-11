var mongoose =require('mongoose');

//var Bicicleta =require('../models/bicicleta');
var Bicicleta =require('../../models/bicicleta');


describe('test',function(){
    beforeEach(function(done){
        var mongoDB='mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useUnifiedTopology: true});
        //////////////////////////mongoose.connect(mongoDB,{useNewUrlParser:true});
         
        const db=mongoose.connection;
        db.on('error',console.error.bind(console,'con erro'));
        db.once('open',function(){
            console.log('ok conn');
            done();
        });
    });

    afterEach(function(done){
         Bicicleta.deleteMany({},function(err,success){
             if(err) console.log(err);
             done();
         });
    });    


    describe('bici cre instac',()=>{
        it('crea inst',()=>{
            var bici = Bicicleta.createInstance(1,"verde","urbana",[-34,5,-54,1]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34,5);
            expect(bici.ubicacion[1]).toEqual(-54,1);
        })

    
    });

    describe('Bicicleta.allBicis',()=>{
        it('comienza vacia',(done)=>{
            Bicicleta.allBicis(function(err,bicis){    
                expect(Bicicleta.allBicis.length).toBe(0);
                done();
            });
    
        });
    });   
    
    describe('Bicicleta.add',()=>{
        it('agregamos una',(done)=>{
         
            var a = new Bicicleta({code:1,color:"rojo",modelo:"urbana"});
            
            Bicicleta.add(a,function(err,newBici){
                if(err) console.log(err)
                Bicicleta.allBicis(function(err,bicis){
                    expect(bicis.length).toEqual(1);
    
                    expect(bicis[0]).toEqual(a.code);
                    done();
                });
            });
            
    
        });
    
    
    });




});




// beforeEach(() =>{ Bicicleta.allBicis = []; 

//     console.log("testeando...");

// });

describe('Bicicleta.allBicis',()=>{
    it('comienza vacia',()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add',()=>{
    it('agregamos una',()=>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1,'rojo','urbana',[-31.63748,-60.7098175])
        
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);

        expect(Bicicleta.allBicis[0]).toBe(a);

    });


});

describe('Bicicleta.findById',()=>{
    it('debe devolver una bici con id 1',()=>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1,'rojo','urbana',[-31.63748,-60.7098175]);
        var b = new Bicicleta(2,'azul','chica',[-31.63748,-60.7098175]);
        
        Bicicleta.add(a);
        Bicicleta.add(b);

        var targetBici=Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(a.color);
        
   
    });

    
});