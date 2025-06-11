"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameKey = void 0;
exports.name = name;
exports.logAt = logAt;
exports.logParamTypes = logParamTypes;
exports.logReturnType = logReturnType;
require("reflect-metadata");
exports.nameKey = Symbol('name');
//Função para verificar o nome da classe.
function name(className) {
    console.log("Classe " + className + "\n");
    return Reflect.metadata(exports.nameKey, className);
}
//Função para verificar o nome e o tipo dos atributos.
function logAt(target, key) {
    var t = Reflect.getMetadata("design:type", target, key);
    console.log('Atributo', key, 'é do tipo:' + t.name);
}
//Função para verificar os tipos dos parâmetros de um método
function logParamTypes(target, key) {
    var types = Reflect.getMetadata("design:paramtypes", target, key);
    var s = types.map((a) => a.name).join();
    console.log("Método", key, ", tipos dos parâmetros: " + s);
}
//Função para verificar o tipo do retorno de um método
function logReturnType(target, key) {
    var t = Reflect.getMetadata("design:returntype", target, key);
    console.log("Método", key, "possui retorno do tipo:" + t.name);
}
