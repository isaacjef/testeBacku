import 'reflect-metadata';

export const nameKey = Symbol('name');

export function logAt(target: Object, key: string | symbol) {
	var t = Reflect.getMetadata("design:type", target, key);
	console.log('Atributo', key ,'é do tipo: ' + t.name)
	console.log(Reflect.getMetadata("design:type", target, key))
}

export function name(className: string): ClassDecorator {
	console.log("Classe " + className)
	return (Reflect as any).metadata(nameKey, className);
}
