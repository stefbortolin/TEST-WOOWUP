import { Publisher } from "./Publisher";

export interface Suscriber {
    notificar(alerta: Publisher): void;
}