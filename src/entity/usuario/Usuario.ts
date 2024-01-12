import { Suscriber } from "../../interfaces/observer/Suscriber";
import { Alerta } from "../alerta/Alerta";
import { Tema } from "../tema/Tema";
import { MetodoFIFO } from "../concrete-strategy/MetodoFIFO";
import { MetodoLIFO } from "../concrete-strategy/MetodoLIFO";
import { TipoAlerta } from "../../interfaces/TipoAlerta";

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


    public suscribirseATema(tema: Tema): void{
        !this.temasElegidos.includes(tema) ? this.temasElegidos.push(tema) : console.log('Ya está suscripto a este tema');
    }

    public tomarAlertaNoLeida(): Alerta[] {
        let alertasNoLeidas = this.alertasNoLeidas.filter(alerta => !alerta.haExpirado());
        alertasNoLeidas = this.ordenarAlertas(alertasNoLeidas);

        return alertasNoLeidas;
    }

    public tomarAlertaPorTema(tema: Tema): Alerta[] {
        let alertasNoLeidas = this.alertasNoLeidas.filter(alerta => !alerta.haExpirado() && alerta.getTema().getNombre() === tema.getNombre());
        alertasNoLeidas = this.ordenarAlertas(alertasNoLeidas);

        return alertasNoLeidas;
    }

    public ordenarAlertas(alerta: Alerta[]): Alerta[]{
        const alertasUrgentes = alerta.filter(alerta => alerta.getTipo() === TipoAlerta.urgente);
        const alertasInformativas = alerta.filter(alerta => alerta.getTipo() === TipoAlerta.informativa);

        const alertasUrgentesOrdenadas = this.FIFO.ordenar(alertasUrgentes);
        const alertasInformativasOrdenadas = this.LIFO.ordenar(alertasInformativas);

        return alertasUrgentesOrdenadas.concat(alertasInformativasOrdenadas);
    }

    marcarAlertaComoLeida(alerta: Alerta): void {
        const alertaAMarcar = this.alertasNoLeidas.find(alertaNoLeida => alertaNoLeida.getIdentificador() === alerta.getIdentificador());
        if(alertaAMarcar) {
            this.alertasLeidas.push(alerta);
            this.alertasNoLeidas = this.alertasNoLeidas.filter(alertaNoLeida => alertaNoLeida.getIdentificador() !== alerta.getIdentificador());
        }
    }

    notificar(alerta: Alerta): void {
        if(!this.alertasNoLeidas.includes(alerta)){
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
}