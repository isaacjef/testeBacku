"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameKey = void 0;
exports.logAt = logAt;
exports.name = name;
require("reflect-metadata");
exports.nameKey = Symbol('name');
function logAt(target, key) {
    var t = Reflect.getMetadata("design:type", target, key);
    console.log('Atributo', key, 'é do tipo: ' + t.name);
    console.log(Reflect.getMetadata("design:type", target, key));
}
function name(className) {
    console.log("Classe " + className);
    return Reflect.metadata(exports.nameKey, className);
}
