import { Publisher } from "../../interfaces/observer/Publisher";
import { Suscriber } from "../../interfaces/observer/Suscriber";
import { TipoAlerta } from "../../interfaces/TipoAlerta";
import { Tema } from "../tema/Tema";
import { Usuario } from "../usuario/Usuario";

export class Alerta implements Publisher{
    private identificador: number;
    private usuariosSuscriptos: Usuario[];
    private tema: Tema;
    private fechaHoraExpiracion: Date;
    private tipo: TipoAlerta;
    private mensaje: string;

    constructor(identificador: number, usuariosSuscriptos: Usuario[], tema: Tema, fechaHoraExpiracion: Date, tipo: TipoAlerta, mensaje: string){
        this.identificador = identificador;
        this.usuariosSuscriptos = usuariosSuscriptos;
        this.tema = tema;
        this.fechaHoraExpiracion = fechaHoraExpiracion;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }


    public haExpirado(): boolean{
        return this.fechaHoraExpiracion < new Date();
    }

    suscribir(suscriber: Suscriber): void {
        this.usuariosSuscriptos.push(suscriber as Usuario);
    }
    
    desuscribir(suscriber: Suscriber): void {
        this.usuariosSuscriptos.splice(this.usuariosSuscriptos.indexOf(suscriber as Usuario), 1);
    }

    notificarPorTema(): void {
        this.usuariosSuscriptos.forEach(usuario => {
            usuario.getTemasElegidos().includes(this.tema) ? usuario.notificar(this) : console.log(`El usuario ${usuario.getNombre()} no está suscripto al tema ${this.tema.getNombre()}`);
        });
    }

    notificarPorUsuario(usuario: Usuario): void {
        this.usuariosSuscriptos.includes(usuario) ? usuario.notificar(this) : console.log(`El usuario ${usuario.getNombre()} no está suscripto a la alerta ${this.identificador}`);
    }



    
    //GETTER Y SETTERS

    public getIdentificador(): number{
        return this.identificador;
    }
    public getUsuariosSuscriptos(): Usuario[]{
        return this.usuariosSuscriptos;
    }
    public setUsuariosSuscriptos(usuariosSuscriptos: Usuario[]): void{
        this.usuariosSuscriptos = usuariosSuscriptos;
    }
    public getTema(): Tema{
        return this.tema;
    }
    public setTema(tema: Tema): void{
        this.tema = tema;
    }
    public getfechaHoraExpiracion(): Date{
        return this.fechaHoraExpiracion;
    }
    public setfechaHoraExpiracion(fechaHoraExpiracion: Date): void{
        this.fechaHoraExpiracion = fechaHoraExpiracion;
    }
    public getTipo(): TipoAlerta{
        return this.tipo;
    }
    public setTipo(tipo: TipoAlerta): void{
        this.tipo = tipo;
    }
    public getMensaje(): string{
        return this.mensaje;
    }
    public setMensaje(mensaje: string): void{
        this.mensaje = mensaje;
    }
}