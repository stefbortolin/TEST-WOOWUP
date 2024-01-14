import { Alerta } from "../../entity/alerta/Alerta";
//Interfaz que contiene la definicion del metodo polimorfico del patron strategy utilizado para manejar los metodos de ordenamientos.
export interface MetodoOrdenamientoStrategy {
    ordenar(alertas: Alerta[]): Alerta[];
}