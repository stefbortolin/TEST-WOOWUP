import { Suscriber } from "./Suscriber";
//Interfaz que contiene la definicion del metodo polimorfico del publisher en el patron observer utilizado para manejar el envio de notificaciones/alertas a los usuarios.
export interface Publisher {
    suscribir(suscriber: Suscriber): void;
    desuscribir(suscriber: Suscriber): void;
    //Tenemos dos notificar porque una notifica a todos los usuarios suscritos a la alerta y la otra notifica a un usuario en particular.
    notificarPorTema(): void;
    notificarPorUsuario(suscriber: Suscriber): void;
}