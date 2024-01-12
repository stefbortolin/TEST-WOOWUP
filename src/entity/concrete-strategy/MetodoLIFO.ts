import { MetodoOrdenamientoStrategy } from "../../interfaces/strategy/MetodoOrdenamientoStrategy";
import { Alerta } from "../alerta/Alerta";

export class MetodoLIFO implements MetodoOrdenamientoStrategy{
    public ordenar(alertas: Alerta[]): Alerta[]{
        return alertas.reverse();
    }
}