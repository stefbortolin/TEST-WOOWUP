import { MetodoOrdenamientoStrategy } from "../../interfaces/strategy/MetodoOrdenamientoStrategy";
import { Alerta } from "../alerta/Alerta";

export class MetodoFIFO implements MetodoOrdenamientoStrategy{
    public ordenar(alertas: Alerta[]): Alerta[]{
        return alertas;
    }
}