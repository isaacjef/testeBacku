import 'reflect-metadata';

export const nameKey = Symbol('name');

//Função para verificar o nome da classe.
export function name(className: string): ClassDecorator {
	console.log("Classe " + className + "\n")
	return (Reflect as any).metadata(nameKey, className);
}

//Função para verificar o nome e o tipo dos atributos.
export function logAt(target: Object, key: string | symbol) {
	var t = Reflect.getMetadata("design:type", target, key);
	console.log('Atributo', key ,'é do tipo:' + t.name)
}

//Função para verificar os tipos dos parâmetros de um método
export function logParamTypes(target: Object, key : string | symbol) {
    var types = Reflect.getMetadata("design:paramtypes", target, key);
    var s = types.map((a:any) => a.name).join();

    console.log("Método", key ,", tipos dos parâmetros: " + s);
}  

//Função para verificar o tipo do retorno de um método
export function logReturnType(target: Object, key : string | symbol) {
    var t = Reflect.getMetadata("design:returntype", target, key);
    console.log("Método", key ,"possui retorno do tipo:" + t.name);
}  

