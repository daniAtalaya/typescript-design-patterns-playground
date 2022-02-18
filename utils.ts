class ExtendableProxy extends Object {
    constructor(handler: ProxyHandler<Object>) {
		super();
        return new Proxy(this, handler);
    }
}
function isEmpty(obj) { 
	for (var _ in obj) return false;
	return true;
}
function commonConstructor(req: any, obj: any){ 
	if(isEmpty(obj.data)) obj.data = {};
	for(let prop in req.data) obj.data[prop] = req.data[prop]; 
}
export class Data<T extends Object, TI> extends ExtendableProxy {
	data: TI;
	constructor(handler: ProxyHandler<T>, req?: TI){
		super(handler);
		commonConstructor(req ?? {}, this ?? {});
	}
}
