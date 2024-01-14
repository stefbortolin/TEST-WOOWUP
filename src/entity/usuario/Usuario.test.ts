import { Usuario } from './Usuario';
import { Alerta } from '../alerta/Alerta';
import { Tema } from '../tema/Tema';
import { TipoAlerta } from '../../interfaces/TipoAlerta';

describe('usuario', () => {
    let temasElegidos = [new Tema('Noticias', 'Apartado noticias generales'), new Tema('Deportes', 'Apartado deportes')];
    let usuario = new Usuario('username', 'password', 'Nombre', 'correo@example.com', temasElegidos);

    test('getUsuario devuelve el nombre de usuario correcto', () => {
        expect(usuario.getUsuario()).toBe('username');
    });

    test('setUsuario actualiza correctamente el nombre de usuario', () => {
        usuario.setUsuario('nuevoUsername');
        expect(usuario.getUsuario()).toBe('nuevoUsername');
    });

    test('suscribirseATema añade un tema a la lista de temas elegidos', () => {
        const nuevoTema = new Tema('Tecnología', 'Apartado tecnología');
        usuario.suscribirseATema(nuevoTema);
        expect(usuario.getTemasElegidos()).toContain(nuevoTema);
    });

    test('tomarAlertaNoLeida devuelve alertas no leídas ordenadas', () => {

        const alerta1 = new Alerta(1, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2024-01-20'), TipoAlerta.urgente, 'Test alerta');
        const alerta2 = new Alerta(2, [usuario], new Tema('Tecnología', 'Apartado tecnología'), new Date('2024-01-20'), TipoAlerta.informativa, 'Test alerta');
        const alerta3 = new Alerta(3, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2024-01-20'), TipoAlerta.urgente, 'Test alerta');
        const alerta4 = new Alerta(4, [usuario], new Tema('Tecnología', 'Apartado tecnología'), new Date('2024-01-20'), TipoAlerta.informativa, 'Test alerta');
        const alerta5 = new Alerta(5, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2024-01-20'), TipoAlerta.urgente, 'Test alerta');
        const alerta6 = new Alerta(6, [usuario], new Tema('Tecnología', 'Apartado tecnología'), new Date('2024-01-20'), TipoAlerta.informativa, 'Test alerta');

        usuario.notificar(alerta2);
        usuario.notificar(alerta1);
        usuario.notificar(alerta3);
        usuario.notificar(alerta4);
        usuario.notificar(alerta5);
        usuario.notificar(alerta6);

        const alertasNoLeidasOrdenadas = usuario.tomarAlertaNoLeida();
        
        expect(alertasNoLeidasOrdenadas).toEqual([alerta5, alerta3, alerta1, alerta2, alerta4, alerta6]);
    });
    

    test('marcarAlertaComoLeida marca correctamente una alerta como leída', () => {
        const alerta = new Alerta(3, [usuario], new Tema('Deportes', 'Apartado noticias generales'), new Date('2024-01-20'), TipoAlerta.urgente, 'Test alerta');

        usuario.notificar(alerta);
        usuario.marcarAlertaComoLeida(alerta);

        expect(usuario.tomarAlertaNoLeida()).not.toContain(alerta);
    });
});
