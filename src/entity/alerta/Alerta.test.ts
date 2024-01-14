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
        usuariosSuscriptos = [new Usuario('username', 'password', 'Nombre', 'correo@example.com', [])];
        tema = new Tema('Noticias', 'Apartado noticias generales');
        fechaHoraExpiracion = new Date('2024-01-20');
        tipo = TipoAlerta.urgente;
        mensaje = 'Test alerta';

        alerta = new Alerta(1, usuariosSuscriptos, tema, fechaHoraExpiracion, tipo, mensaje);
    });

    test('haExpirado devuelve false si la fechaHoraExpiracion es futura', () => {
        expect(alerta.haExpirado()).toBe(false);
    });

    test('haExpirado devuelve true si la fechaHoraExpiracion es pasada', () => {
        const fechaPasada = new Date('2023-01-01');
        alerta.setfechaHoraExpiracion(fechaPasada);
        expect(alerta.haExpirado()).toBe(true);
    });

    test('suscribir agrega un usuario a usuariosSuscriptos', () => {
        const nuevoUsuario = new Usuario('nuevo', 'password', 'Nuevo Nombre', 'nuevo@correo.com', []);
        alerta.suscribir(nuevoUsuario);
        expect(alerta.getUsuariosSuscriptos()).toContain(nuevoUsuario);
    });

    test('desuscribir elimina un usuario de usuariosSuscriptos', () => {
        const usuarioADesuscribir = usuariosSuscriptos[0];
        alerta.desuscribir(usuarioADesuscribir);
        expect(alerta.getUsuariosSuscriptos()).not.toContain(usuarioADesuscribir);
    });

    test('notificarPorTema notifica a usuarios suscritos al tema', () => {
        const usuarioNotificado = usuariosSuscriptos[0];
        usuarioNotificado.suscribirseATema(tema);

        // Mock de la función notificar en Usuario
        const notificarMock = jest.fn();
        usuarioNotificado.notificar = notificarMock;

        alerta.notificarPorTema();

        expect(notificarMock).toHaveBeenCalledWith(alerta);
    });

    test('notificarPorUsuario notifica al usuario específico', () => {
        const usuarioNotificado = usuariosSuscriptos[0];

        // Mock de la función notificar en Usuario
        const notificarMock = jest.fn();
        usuarioNotificado.notificar = notificarMock;

        alerta.notificarPorUsuario(usuarioNotificado);

        expect(notificarMock).toHaveBeenCalledWith(alerta);
    });

    // Agrega más tests según sea necesario
});
