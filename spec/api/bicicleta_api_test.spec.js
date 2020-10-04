var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:5000/api/bicicletas"

describe('BICICLETAS API', () => {
    beforeAll(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error'));
        db.once('open', function() {
            console.log('We are connected to the Data Base');

            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            done();
        });
    });

    describe('BICICLETAS GET/', () => {
        it('Status 200', () => {
            request.get(base_url, function(error, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('POST Bicicletas /create ', () => {
        it('Status 200', (done) => {
            var headers = {
                'content-type': 'application/json'
            };
            var aBici = '{"id":10, "color":"rojo", "modelo":"urbana", "lat":-34, "lng":-54}';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            });
        });
    });

    /**describe("Delete BICICLETAS /delete", () => {
        it("Status 204", (done) => {
            var a = Bicicleta.createInstance(1, "negro", "urbana", [-34.6012424, -54.306]);
            Bicicleta.add(a, function(err, newBici) {
                var headers = {
                    'content-type': 'application/json'
                };
            });
        });
    });**/
});