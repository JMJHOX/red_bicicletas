var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function() {
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
        Reserva.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            Usuario.deleteMany({}, function(err1, success1) {
                if (err1) console.log(err1);
                Bicicleta.deleteMany({}, function(err2, success2) {
                    if (err2) console.log(err2);
                    done();
                })
            })
        })
    });

    describe('Creando un usuario reserva una bici', () => {
        it('debe existir la reserva', (done) => {
            const usuario = new Usuario({ nombre: 'Ezequiel' });
            usuario.save();
            const bicicleta = new Bicicleta({
                code: 1,
                color: "verde",
                modelo: "urbana"
            });
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva) {
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err1, reservas) {
                    if (err1) console.log(err1);
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });
});