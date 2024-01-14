import { Publisher } from "./Publisher";
//Interfaz que contiene la definicion del metodo polimorfico del suscriber en el patron observer utilizado para manejar el envio de notificaciones/alertas a los usuarios.
export interface Suscriber {
    notificar(alerta: Publisher): void;
}