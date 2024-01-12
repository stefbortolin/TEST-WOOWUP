import { Alerta } from "../../entity/alerta/Alerta";

export interface MetodoOrdenamientoStrategy {
    ordenar(alertas: Alerta[]): Alerta[];
}