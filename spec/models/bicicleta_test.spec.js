var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
const { deleteOne } = require('../../models/bicicleta');

describe('testing Bicicletas', function() {
    beforeAll(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test data base');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            done();
        });
    });

    describe('Bicleta.createInstance', () => {
        it('Crea una instancia de Bicileta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);


            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);

        })
    });

    describe('Bicicleta.allBicis', () => {
        it('Comienza vacida', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('bicicleta.add', () => {
        it('Agrega solo una bici', (done) => {
            var aBici = new Bicicleta({
                code: 1,
                color: "verde",
                modelo: "urbana"
            });
            Bicicleta.add(aBici, function(err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function(err1, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Debe devolver la Bici con el code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                var aBici = new Bicicleta({
                    code: 1,
                    color: "verde",
                    modelo: "urbana"
                });
                Bicicleta.add(aBici, function(err1, newBici1) {
                    if (err1) console.log(err1);

                    var aBici2 = new Bicicleta({
                        code: 2,
                        color: "roja",
                        modelo: "urbana"
                    });

                    Bicicleta.add(aBici2, function(err2, newBici2) {
                        if (err2) console.log(err2);
                        Bicicleta.findByCode(1, function(error, targetBici) {
                            expect(targetBici.code).toEqual(aBici.code);
                            expect(targetBici.color).toEqual(aBici.color);
                            expect(targetBici.modelo).toEqual(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.deleteyCode', () => {
        it('Debe eliminar a  la Bici con el code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                var aBici = new Bicicleta({
                    code: 1,
                    color: "verde",
                    modelo: "urbana"
                });
                Bicicleta.add(aBici, function(err1, newBici1) {
                    if (err1) console.log(err1);

                    var aBici2 = new Bicicleta({
                        code: 2,
                        color: "roja",
                        modelo: "urbana"
                    });

                    Bicicleta.add(aBici2, function(err2, newBici2) {
                        if (err2) console.log(err2);
                        Bicicleta.removeByCode(1, function(error, targetBici) {
                            done();
                        });

                    });
                });
            });
        });
    });
});

/**
beforeEach(() => { Bicicleta.allBicis = []; });

describe('Bicicleta.allBicis', () => {
    it('Comienza vacida', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.38614971]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findByID', () => {
    it('Debe devolver la bicicleta con el Id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var aBici = new Bicicleta(1, 'rojo', 'urbana');
        var bBici = new Bicicleta(2, 'blanca', 'urbana');
        Bicicleta.add(aBici);
        Bicicleta.add(bBici);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);

    });
});**/