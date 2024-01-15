import { GestorAlerta } from './GestorAlerta';
import { Alerta } from '../entity/alerta/Alerta';
import { Tema } from '../entity/tema/Tema';
import { Usuario } from '../entity/usuario/Usuario';
import { TipoAlerta } from '../interfaces/TipoAlerta';

describe('GestorAlerta', () => {
  let gestor: GestorAlerta;
  let tema: Tema;
  let usuario: Usuario;
  let alerta: Alerta;
  let alerta1: Alerta;
  let alerta2: Alerta;
//Definimos una configuracion inicial para el test
  beforeEach(() => {
    gestor = new GestorAlerta();
    tema = new Tema('Noticias', 'Noticias generales');
    usuario = new Usuario('username', 'password', 'Nombre', 'correo@example.com', []);
    alerta = new Alerta(1, [usuario], tema, new Date('2024-06-20'), TipoAlerta.urgente, 'Mensaje de prueba');
    alerta1 = new Alerta(2, [usuario], tema, new Date('2024-06-20'), TipoAlerta.urgente, 'Mensaje de prueba');
    alerta2 = new Alerta(3, [usuario], tema, new Date('2024-06-20'), TipoAlerta.informativa, 'Mensaje de prueba');

    gestor.agregarTema(tema);
    gestor.agregarUsuario(usuario);
    usuario.suscribirseATema(tema);
    gestor.agregarAlerta(alerta);
    gestor.agregarAlerta(alerta1);
    gestor.agregarAlerta(alerta2);
    gestor.notificarPorUsuario(alerta, usuario);
    gestor.notificarPorUsuario(alerta1, usuario);
    gestor.notificarPorUsuario(alerta2, usuario);
  });
  //Testeamos que funcione correctamente el metodo obtener alertar no expiradas por tema, para esto anteriormente hemos definido una configuracion inicial.
  //Por lo tanto en este test verificamos que se devuelvan las alertas no expiradas que notificamos anteriormente, y que se encuentren en el orden correcto.
  test('debería obtener alertas no expiradas por tema', () => {
    const alertasNoExpiradas = gestor.obtenerAlertasNoExpiradasPorTema(tema);
    expect(alertasNoExpiradas).toHaveLength(3);
    expect(alertasNoExpiradas).toEqual([alerta1,alerta,alerta2]); //Ordenamiento correcto segun los metodos de ordenamiento.
  });

  //Muy similar a la anterior testeamos que nos devuelve correctamente las alertas no leidas de un usuario, definidas en la configuracion inicial.
  test('debería obtener alertas no leídas de un usuario', () => {
    const alertasNoLeidas = gestor.obtenerAlertaNoLeidaDeUsuario(usuario);
    expect(alertasNoLeidas).toHaveLength(3);
    expect(alertasNoLeidas[0]).toEqual(alerta1);
  });

  //Testeamos que se marquen como leidas las alertas dentro de un usuario.
  test('debería marcar una alerta como leída para un usuario', () => {
    gestor.marcarAlertaComoLeida(alerta, usuario); // Marcamos como leida una de las 3 alertas
    const alertasNoLeidas = gestor.obtenerAlertaNoLeidaDeUsuario(usuario);
    expect(alertasNoLeidas).toHaveLength(2); // Por lo tanto solo deberiamos tener 2 alertas no leidas
    expect(usuario.getAlertasLeidas()).toHaveLength(1); // Y una como leida, que es la que marcamos en la funcion del principio del test.
  });

  //Testeamos que se notifiquen correctamente las alertas a los usuarios suscritos a las mismas.
  test('debería notificar a todos los usuarios suscritos a una alerta', () => {
    //Creamos un usuario nuevo al que suscribimos al tema y lo agregamos al gestor.
    const otroUsuario = new Usuario('otroUsername', 'password', 'OtroNombre', 'otrocorreo@example.com', []); 
    otroUsuario.suscribirseATema(tema);
    gestor.agregarUsuario(otroUsuario);
    // Suscribimos al usuario y al nuevo usuario a la alerta.
    alerta.suscribir(usuario);
    alerta.suscribir(otroUsuario);
    // Realizamos un mock de la función notificar en Usuario, para verificar que al notificar a la alerta se llame a la función notificar de cada usuario.
    const spyNotificarUsuario1 = jest.spyOn(usuario, 'notificar');
    const spyNotificarUsuario2 = jest.spyOn(otroUsuario, 'notificar');

    gestor.notificarAlerta(alerta);

    // Verificar que se hayan llamado las funciones de notificación
    expect(spyNotificarUsuario1).toHaveBeenCalled();
    expect(spyNotificarUsuario2).toHaveBeenCalled();
  });  

  //Testeamos que se notifique correctamente a un usuario en particular.
  test('debería notificar a un usuario específico sobre una alerta', () => {
    const spyNotificarPorUsuario = jest.spyOn(alerta, 'notificarPorUsuario');   //Agregamos el mock a la funcion notificarPorUsuario de la alerta.
    const spyNotificarUsuario = jest.spyOn(usuario, 'notificar');   //Agregamos el mock a la funcion notificar del usuario.

    gestor.notificarPorUsuario(alerta, usuario);

    expect(spyNotificarPorUsuario).toHaveBeenCalledTimes(1); //Verificamos que se haya llamado a la funcion notificarPorUsuario de la alerta.
    expect(spyNotificarUsuario).toHaveBeenCalledTimes(1); // Por consiguiente se deberia haber llamado a la funcion notificar del usuario, por lo tanto hacemos la verificacion.
    expect(spyNotificarPorUsuario).toHaveBeenCalledWith(usuario); // Y por ultimo verificamos que la funcion de la a alerta haya sido llamada con el usuario como argumento.
  });
});
