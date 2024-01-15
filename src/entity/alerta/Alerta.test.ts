import { Alerta } from './Alerta';
import { Usuario } from '../usuario/Usuario';
import { Tema } from '../tema/Tema';
import { TipoAlerta } from '../../interfaces/TipoAlerta';

describe('Alerta', () => {
    let alerta: Alerta;
    let usuariosSuscriptos: Usuario[];
    let tema: Tema;
    let fechaHoraExpiracion: Date;
    let tipo: TipoAlerta;
    let mensaje: string;

    beforeEach(() => {
        // Configuración inicial antes de cada test
        usuariosSuscriptos = [new Usuario('username', 'password', 'Nombre', 'user@example.com', [])];
        tema = new Tema('Noticias', 'Apartado noticias generales');
        fechaHoraExpiracion = new Date('2024-06-20');
        tipo = TipoAlerta.urgente;
        mensaje = 'Test alerta';

        alerta = new Alerta(1, usuariosSuscriptos, tema, fechaHoraExpiracion, tipo, mensaje);
    });
    //Se espera que devuelva false ya que definimos una alerta que no expiró, por lo tanto no ha expirado.
    test('haExpirado devuelve false si la fechaHoraExpiracion es futura', () => {
        expect(alerta.haExpirado()).toBe(false);
    });
    //Se espera que devuelva true ya que definimos una alerta que expiró, por lo tanto ha expirado.
    test('haExpirado devuelve true si la fechaHoraExpiracion es pasada', () => {
        const fechaPasada = new Date('2023-01-01');
        alerta.setfechaHoraExpiracion(fechaPasada);
        expect(alerta.haExpirado()).toBe(true);
    });

    //En los dos siguientes tests, verificamos que funcione correctamente el metodo suscribir y desuscribir, estos son metodos polimorficos de la interfaz Publisher (Patron Observer).
    //Para esto, creamos un nuevo usuario y lo suscribimos a la alerta, luego verificamos que se encuentre en la lista de usuarios suscritos.
    test('suscribir agrega un usuario a usuariosSuscriptos', () => {
        const nuevoUsuario = new Usuario('nuevousername', 'password', 'Nuevo Nombre', 'user@gmail.com', []);
        alerta.suscribir(nuevoUsuario);
        expect(alerta.getUsuariosSuscriptos()).toContain(nuevoUsuario);
    });
    //Para este test, desuscribimos al usuario que creamos en el test anterior, y verificamos que no se encuentre en la lista de usuarios suscritos.
    test('desuscribir elimina un usuario de usuariosSuscriptos', () => {
        const usuarioADesuscribir = usuariosSuscriptos[0];
        alerta.desuscribir(usuarioADesuscribir);
        expect(alerta.getUsuariosSuscriptos()).not.toContain(usuarioADesuscribir);
    });
    //En este test, notificamos a los usuarios suscritos a la alerta, y verificamos que se haya llamado a la funcion notificar de cada usuario.
    test('notificarPorTema notifica a usuarios suscritos al tema', () => {
        const usuarioNotificado = usuariosSuscriptos[0];
        usuarioNotificado.suscribirseATema(tema);

        // Mock de la función notificar en Usuario
        const notificarMock = jest.fn();    //Los mocks son una especie de simulacion de una funcion, en este caso simulamos la funcion notificar de Usuario.
        usuarioNotificado.notificar = notificarMock; //Le asignamos el mock a la funcion notificar del usuario.

        alerta.notificar();

        expect(notificarMock).toHaveBeenCalledWith(alerta); //Verificamos si notificarMock fue llamado con alerta como argumento en algún momento durante la ejecución de la prueba.
    });
    //En este test, notificamos a un usuario en particular, y verificamos que se haya llamado a la funcion notificar de ese usuario.
    test('notificarPorUsuario notifica al usuario específico', () => {
        const usuarioNotificado = usuariosSuscriptos[0];
        console.log(usuarioNotificado)
        // Mock de la función notificar en Usuario
        const notificarMock = jest.fn();   //Los mocks son una especie de simulacion de una funcion, en este caso simulamos la funcion notificar de Usuario.
        usuarioNotificado.notificar = notificarMock; //Le asignamos el mock a la funcion notificar del usuario.

        alerta.notificarPorUsuario(usuarioNotificado);

        expect(notificarMock).toHaveBeenCalledWith(alerta); //Verificamos si notificarMock fue llamado con alerta como argumento en algún momento durante la ejecución de la prueba.
    });
    
    //En este test, notificamos a un usuario que no se encuentra suscrito a la alerta, y verificamos que no se haya llamado a la funcion notificar de ese usuario.
    test('notificarPorUsuario maneja usuarios no suscritos correctamente', () => {
        const usuarioNoSuscrito = new Usuario('usernosuscripto', 'password', 'No Suscrito', 'nosuscrip@gmail.com', []);
        const alerta = new Alerta(1, [], new Tema('General', 'Tema general'), new Date('2024-06-20'), TipoAlerta.informativa, 'Mensaje de prueba');
        
        // Mock de la función notificar en Usuario
        const notificarMock = jest.fn();
        usuarioNoSuscrito.notificar = notificarMock;
    
        alerta.notificarPorUsuario(usuarioNoSuscrito);
    
        expect(notificarMock).not.toHaveBeenCalled(); // Verificamos que la función notificar del usuario no se haya llamado.
    });
});
