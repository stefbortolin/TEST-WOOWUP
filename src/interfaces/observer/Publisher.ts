import { Suscriber } from "./Suscriber";

export interface Publisher {
    suscribir(suscriber: Suscriber): void;
    desuscribir(suscriber: Suscriber): void;
    notificarPorTema(): void;
    notificarPorUsuario(suscriber: Suscriber): void;
}