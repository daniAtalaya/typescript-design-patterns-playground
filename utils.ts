class ExtendableProxy extends Object {
    constructor(handler: ProxyHandler<Object>) {
		super();
        return new Proxy(this, handler);
    }
}
function commonConstructor(req: any, obj: Data<any, any>){ req.forEach((prop: string | number) => obj.data[prop] = req[prop]); }
class Data<T extends Object, TI> extends ExtendableProxy {
	data: TI;
	constructor(handler?: ProxyHandler<T>, req?: TI){
		super(handler ?? {});
		if(req) commonConstructor(req, this);
	}
}
type TImage = {
	url: String;
	origin: "Local" | "Internet";
	resolution: {
		width: String | Number;
		height: String | Number;
	}
}
type TVolumen = {
    title: String;
    price: Number | String;
    date: String | Date;
	numPages: String;
	estado: "Editado" | "En Preparacion" | "No Editado";
	exDescripcion: String;
	images: TImage[];
}
type TColeccion = {
    title: String;
	descripcion: String;
	volumes: Volumen[];
	info: String[];
}
export class Volumen extends Data<Volumen, TVolumen> { constructor(h?: any, r?: any){super(h, r)}; }
export class Coleccion extends Data<Coleccion, TColeccion> { constructor(h?: any, r?: any){super(h, r)}; }