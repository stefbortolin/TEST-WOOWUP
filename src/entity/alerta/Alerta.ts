import { Publisher } from "../../interfaces/observer/Publisher";
import { Suscriber } from "../../interfaces/observer/Suscriber";
import { TipoAlerta } from "../../interfaces/TipoAlerta";
import { Tema } from "../tema/Tema";
import { Usuario } from "../usuario/Usuario";

//Clase que representa una alerta que puede ser suscrita y notificada a usuarios interesados, representa al publisher del Patron Observer.
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


    //Verifica si la alerta ha expirado en base a una comparacion entre la fecha y hora de expiración y la fecha y hora actual, devuelve un boolean (true or false) segun si expiro o no.
    public haExpirado(): boolean {
        return this.fechaHoraExpiracion < new Date();
    }

    //Suscribe un usuario a la alerta.
    //Responde a metodo polimorfico de la interfaz Publisher.
    suscribir(suscriber: Suscriber): void {
        this.usuariosSuscriptos.push(suscriber as Usuario);
    }

    //Desuscribe un usuario de la alerta.
    //Responde a metodo polimorfico de la interfaz Publisher.
    desuscribir(suscriber: Suscriber): void {
        this.usuariosSuscriptos.splice(this.usuariosSuscriptos.indexOf(suscriber as Usuario), 1);
    }

    //Notifica a los usuarios suscritos a la alerta por tema.
    //Responde a metodo polimorfico de la interfaz Publisher.
    notificarPorTema(): void {
        //Recorremos todos los usuarios, y verificamos por cada uno si contiene el tema en su lista de temas elegidos, si es asi se le notifica.
        this.usuariosSuscriptos.forEach(usuario => {
            usuario.getTemasElegidos().includes(this.tema) ? usuario.notificar(this) : console.log(`El usuario ${usuario.getNombre()} no está suscripto al tema ${this.tema.getNombre()}`);
        });
    }

    //Notifica a un usuario específico sobre la alerta.
    //Responde a metodo polimorfico de la interfaz Publisher.
    notificarPorUsuario(usuario: Usuario): void {
        //Si el usuario se encuentra en la lista de usuarios suscriptos a la alerta, se le notifica, sino en este caso mostre un mensaje por consola como ejemplo, deberia lanzar un error.
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