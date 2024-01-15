import { Alerta } from "../entity/alerta/Alerta";
import { MetodoFIFO } from "../entity/concrete-strategy/MetodoFIFO";
import { MetodoLIFO } from "../entity/concrete-strategy/MetodoLIFO";
import { Tema } from "../entity/tema/Tema";
import { Usuario } from "../entity/usuario/Usuario";
import { TipoAlerta } from "../interfaces/TipoAlerta";

//Clase de control que contiene las listas de alertas, usuarios y temas, y los metodos para ordenar las alertas y obtenerlas.
export class GestorAlerta{
    private alertas: Alerta[] = [];
    private usuarios: Usuario[] = [];
    private temas: Tema[] = [];

    private FIFO: MetodoFIFO = new MetodoFIFO();
    private LIFO: MetodoLIFO = new MetodoLIFO();
    
    public ordenarAlertas(alerta: Alerta[]): Alerta[] {
        //Recorremos la lista de alertas que recibimos por parametro y las separamos en dos listas, una de alertas urgentes y otra de alertas informativas,
        //se realiza mediante filter, que devuelve un array con los elementos que cumplan la condicion.
        const alertasUrgentes: Alerta[] = alerta.filter(alerta => alerta.getTipo() === TipoAlerta.urgente);
        const alertasInformativas: Alerta[] = alerta.filter(alerta => alerta.getTipo() === TipoAlerta.informativa);
        //Utilizamos los objetos creados de las clases estrategias, que contienen el metodo para ordenar las alertas segun la estrategia elegida.
        const alertasUrgentesOrdenadas = this.LIFO.ordenar(alertasUrgentes);
        const alertasInformativasOrdenadas = this.FIFO.ordenar(alertasInformativas);

        return alertasUrgentesOrdenadas.concat(alertasInformativasOrdenadas);
    }

    //Funcion para obtener las alertas no expiradas de un tema especifico, filtrando la lista de alertas por tema y por si aun no expiraron. Antes de devolverlas las ordena.
    public obtenerAlertasNoExpiradasPorTema(tema: Tema): Alerta[] {
      let obtenerAlertasNoExpiradasPorTema: Alerta[] = this.alertas.filter(alerta => !alerta.haExpirado() && alerta.getTema() === tema);
      return this.ordenarAlertas(obtenerAlertasNoExpiradasPorTema);
    }
    //Funcion que llama al metodo de la clase Usuario para obtener las alertas no leidas que no expiraron de un usuario especifico. La logica se encuentra dentro de la clase Usuario ya que es su responsabilidad.
    public obtenerAlertaNoLeidaDeUsuario(usuario: Usuario): Alerta[] {
      return usuario.tomarAlertaNoLeida();
    }

    //Funcion que llama al metodo de la clase Usuario para marcar una alerta como leida. La logica se encuentra dentro de la clase Usuario ya que es su responsabilidad.
    public marcarAlertaComoLeida(alerta: Alerta, usuario: Usuario): void {
      usuario.marcarAlertaComoLeida(alerta);
    }
    //Funcion que llama al metodo de la clase Alerta para notificar a los usuarios suscritos a la alerta. La logica se encuentra dentro de la clase Alerta ya que es su responsabilidad.
    public notificarAlerta(alerta: Alerta): void {
        alerta.notificar();
    }
    //Funcion que llama al metodo de la clase Alerta para notificar a un usuario especifico. La logica se encuentra dentro de la clase Alerta ya que es su responsabilidad.
    public notificarPorUsuario(alerta: Alerta, usuario: Usuario): void {
        alerta.notificarPorUsuario(usuario);
    }


    //SETTER
    //Agregar alerta, usuario y tema a las listas correspondientes. Funcionan como una especie de SETTER.
    public agregarAlerta(alerta: Alerta): void {
        this.alertas.push(alerta);
    }
    
    public agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }
    
    public agregarTema(tema: Tema): void {
        this.temas.push(tema);
    }
}