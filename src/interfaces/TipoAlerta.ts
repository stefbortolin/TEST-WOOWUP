// El objetivo de utilizar el enum aqui es definir los tipos de alerta que existen en la aplicación 
// y que no tengan que ser escritos como cadena cada vez que sean utilizados.
export enum TipoAlerta {
    informativa = "Informativa",
    urgente = "Urgente"
}