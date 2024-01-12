export class Tema {
    private nombre: string;
    private descripcion: string;

    constructor(nombre: string, descripcion: string){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public getNombre(): string{
        return this.nombre;
    }
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    public getDescripcion(): string{
        return this.descripcion;
    }
    public setDescripcion(descripcion: string): void{
        this.descripcion = descripcion;
    }
}