import { Usuario } from './Usuario';
import { Alerta } from '../alerta/Alerta';
import { Tema } from '../tema/Tema';
import { TipoAlerta } from '../../interfaces/TipoAlerta';

describe('usuario', () => {
    //Defini un usuario sobre el que voy a realizar los tests.
    let temasElegidos = [new Tema('Noticias', 'Apartado noticias generales'), new Tema('Deportes', 'Apartado deportes')];
    let usuario = new Usuario('username', 'password', 'Nombre', 'correo@example.com', temasElegidos);
    //Testee los getter y setters aunque sean muy simples, solo para tenerlos cubiertos.
    test('getUsuario devuelve el nombre de usuario correcto', () => {
        expect(usuario.getUsuario()).toBe('username');
    });

    test('setUsuario actualiza correctamente el nombre de usuario', () => {
        usuario.setUsuario('nuevoUsername');
        expect(usuario.getUsuario()).toBe('nuevoUsername');
    });


    //Para testear la suscripcion a un tema, cree un tema nuevo y lo suscribi al usuario, por lo tanto se espera que el tema se encuentre en la lista de temas elegidos del usuario al final del test.
    test('suscribirseATema añade un tema a la lista de temas elegidos', () => {
        const nuevoTema = new Tema('Tecnología', 'Apartado tecnología');
        usuario.suscribirseATema(nuevoTema);
        expect(usuario.getTemasElegidos()).toContain(nuevoTema);
    });
    //Test para verificar que no se agregue un tema ya suscrito, por lo tanto tomamos un tema que ya este suscripto y lo intentamos suscribir nuevamente.
    test('suscribirseATema no agrega un tema ya suscrito', () => {
        const temaExistente = temasElegidos[0];
        usuario.suscribirseATema(temaExistente);
    
        // Se espera que la lista de temas elegidos no haya cambiado.
        expect(usuario.getTemasElegidos()).toEqual(temasElegidos);
    });

    //En este test, se verefica varias funciones juntas, ya que corroborramos que las alertas que se notifican pasen a estar en la lista de no leidas, y que al ser devueltas
    //se encuentren en el orden correcto, por lo tanto corroboramos que funcione ordenarAlertas y las estrategias creadas.
    test('tomarAlertaNoLeida devuelve alertas no leídas ordenadas', () => {
        //Este test se ve medio engorroso, pero al solo crear 6 alertas no las recorri porque eran pocas, en todo caso si fueran mas las podria guardar en un array y recorrerlas para notificarlas.
        const alerta1 = new Alerta(1, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2024-06-20'), TipoAlerta.urgente, 'Test alerta');
        const alerta2 = new Alerta(2, [usuario], new Tema('Tecnología', 'Apartado tecnología'), new Date('2024-06-20'), TipoAlerta.informativa, 'Test alerta');
        const alerta3 = new Alerta(3, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2024-06-20'), TipoAlerta.urgente, 'Test alerta');
        const alerta4 = new Alerta(4, [usuario], new Tema('Tecnología', 'Apartado tecnología'), new Date('2024-06-20'), TipoAlerta.informativa, 'Test alerta');
        const alerta5 = new Alerta(5, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2023-01-20'), TipoAlerta.urgente, 'Test alerta');
        const alerta6 = new Alerta(6, [usuario], new Tema('Tecnología', 'Apartado tecnología'), new Date('2024-06-20'), TipoAlerta.informativa, 'Test alerta');

        usuario.notificar(alerta2);
        usuario.notificar(alerta1);
        usuario.notificar(alerta3);
        usuario.notificar(alerta4);
        usuario.notificar(alerta5); //La alerta nro 5, al tener fecha de expiracion anterior a la fecha actual, no deberia ser devuelta por el metodo tomarAlertaNoLeida.
        usuario.notificar(alerta6);

        const alertasNoLeidasOrdenadas = usuario.tomarAlertaNoLeida();
        
        expect(alertasNoLeidasOrdenadas).toEqual([alerta3, alerta1, alerta2, alerta4, alerta6]);
    });

    //Verificamos que la funcion a testear no devuelva alertas ya expiradas, uno de los requisitos planteados por el problema.
    test('tomarAlertaNoLeida no devuelve alertas expiradas', () => {
        // Creamos una alerta expirada
        const alertaExpirada = new Alerta(8, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2020-01-01'), TipoAlerta.urgente, 'Test alerta expirada');
    
        usuario.notificar(alertaExpirada);
        const alertasNoLeidas = usuario.tomarAlertaNoLeida();
    
        // Se espera que la alerta expirada no esté en la lista de alertas no leídas
        expect(alertasNoLeidas).not.toContain(alertaExpirada);
    });
    
    //Para testear que se marquen como leidas, creamos la alerta y la notificamos, esto deberia agregarla a la lista de no leidas, 
    //luego la marcamos como leida y verificamos que no se encuentre en la lista de no leidas y que se encuentre en la lista de leidas.
    test('marcarAlertaComoLeida marca correctamente una alerta como leída', () => {
        const alerta = new Alerta(3, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2024-06-20'), TipoAlerta.urgente, 'Test alerta');

        usuario.notificar(alerta);
        usuario.marcarAlertaComoLeida(alerta);

        expect(usuario.tomarAlertaNoLeida()).not.toContain(alerta); //Se le agretga un not, que niega la condicion, por lo tanto no debe contener la alerta.
        expect(usuario.getAlertasLeidas()).toContain(alerta);
    });
    
});
