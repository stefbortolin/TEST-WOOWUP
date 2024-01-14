import { Suscriber } from "../../interfaces/observer/Suscriber";
import { Alerta } from "../alerta/Alerta";
import { Tema } from "../tema/Tema";
import { MetodoFIFO } from "../concrete-strategy/MetodoFIFO";
import { MetodoLIFO } from "../concrete-strategy/MetodoLIFO";
import { TipoAlerta } from "../../interfaces/TipoAlerta";

//Clase que representa a un usuario que recibira alertas segun los temas a los que se ha suscripto, representa al suscriber del Patron Observer.
export class Usuario implements Suscriber{
    private usuario: string;
    private contraseña: string;
    private nombre: string;
    private email: string;
    private temasElegidos: Tema[];
    private alertasLeidas: Alerta[] = [];
    private alertasNoLeidas: Alerta[] = [];
    private FIFO: MetodoFIFO = new MetodoFIFO();
    private LIFO: MetodoLIFO = new MetodoLIFO();

    constructor(usuario: string, contraseña: string, nombre: string, email: string, temasElegidos: Tema[]){
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.email = email;
        this.temasElegidos = temasElegidos;
    }

    //Suscribe al usuario a un nuevo tema (contiene verificacion si el usuario ya se ha suscripto).
    public suscribirseATema(tema: Tema): void {
        !this.temasElegidos.includes(tema) ? this.temasElegidos.push(tema) : console.log('Ya está suscripto a este tema');
    }

    /**
     * Ordena las alertas según el método de ordenamiento solicitado (Urgentes primero ordenadas por LIFO y por consiguiente Informativas ordenadas por  FIFO).
     * @param alerta Lista de alertas a ordenar, puede contener urgentes, informativas o ambas.
     * @returns Lista de alertas ordenadas.
     */
    public ordenarAlertas(alerta: Alerta[]): Alerta[] {
        const alertasUrgentes = alerta.filter(alerta => alerta.getTipo() === TipoAlerta.urgente);
        const alertasInformativas = alerta.filter(alerta => alerta.getTipo() === TipoAlerta.informativa);

        const alertasUrgentesOrdenadas = this.LIFO.ordenar(alertasUrgentes);
        const alertasInformativasOrdenadas = this.FIFO.ordenar(alertasInformativas);

        return alertasUrgentesOrdenadas.concat(alertasInformativasOrdenadas);
    }

    //Obtiene las alertas no leídas y que aun no han expirado, y las devuelve ordenadas.
    public tomarAlertaNoLeida(): Alerta[] {
        let alertasNoLeidas = this.alertasNoLeidas.filter(alerta => !alerta.haExpirado());
        alertasNoLeidas = this.ordenarAlertas(alertasNoLeidas);

        return alertasNoLeidas;
    }

    //Obtiene las alertas no leídas de un tema específico y que aun no han expirado, y las devuelve ordenadas.
    public tomarAlertaPorTema(tema: Tema): Alerta[] {
        let alertasNoLeidas = this.alertasNoLeidas.filter(alerta => !alerta.haExpirado() && alerta.getTema().getNombre() === tema.getNombre());
        alertasNoLeidas = this.ordenarAlertas(alertasNoLeidas);

        return alertasNoLeidas;
    }


    //Marca una alerta existente como leída, moviendola a la lista de alertas leídas.
    public marcarAlertaComoLeida(alerta: Alerta): void {
        const alertaAMarcar = this.alertasNoLeidas.find(alertaNoLeida => alertaNoLeida.getIdentificador() === alerta.getIdentificador());
        if (alertaAMarcar) {
            this.alertasLeidas.push(alerta);
            this.alertasNoLeidas = this.alertasNoLeidas.filter(alertaNoLeida => alertaNoLeida.getIdentificador() !== alerta.getIdentificador());
        }
    }

    //Notifica al usuario de una nueva alerta y la agrega a la lista de alertas no leídas.
    //Responde a metodo polimorfico de la interfaz Suscriber.
    public notificar(alerta: Alerta): void {
        //Aquí se anexaría el codigo para notificar al usuario de la alerta.
        if (!this.alertasNoLeidas.includes(alerta)) {
            this.alertasNoLeidas.push(alerta);
        }
    }



    //GETTER Y SETTERS

    public getUsuario(): string{
        return this.usuario;
    }
    public setUsuario(usuario: string): void{
        this.usuario = usuario;
    }
    public getContraseña(): string{
        return this.contraseña;
    }
    public setContraseña(contraseña: string): void{
        this.contraseña = contraseña;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    public getEmail(): string{
        return this.email;
    }
    public setEmail(email: string): void{
        this.email = email;
    }
    public getTemasElegidos(): Tema[]{
        return this.temasElegidos as Tema[];
    }
    public setTemasElegidos(temasElegidos: Tema[]): void{
        this.temasElegidos = temasElegidos;
    }
    public getAlertasLeidas(): Alerta[]{
        return this.alertasLeidas;
    }
    public getAlertasNoLeidas(): Alerta[]{
        return this.alertasNoLeidas;
    }
}