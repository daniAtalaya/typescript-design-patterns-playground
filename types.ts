const {Data} = require('./utils');
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
export class Volumen extends Data<Volumen, TVolumen> { constructor(h: any, r?: any){super(h, r)}; }
export class Coleccion extends Data<Coleccion, TColeccion> { constructor(h: any, r?: any){super(h, r)}; }