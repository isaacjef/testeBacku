"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formulario = void 0;
const readlineSync = __importStar(require("readline-sync"));
const UsuarioService_1 = require("../service/UsuarioService");
class Formulario {
    iniciar() {
        console.log(`|---------------Iniciando Sistema---------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`| . . . . . . . . [1] Cadastro  . . . . . . . . |`);
        console.log(`| . . . . . . . . [2] Login     . . . . . . . . |`);
        try {
            const resp = readlineSync.question(`                     `, { limit: [1, 2] });
            if (resp == '1')
                this.cadastrarUsuario();
            else
                this.logarUsuario();
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`|-----------------------------------------------|`);
    }
    cadastrarUsuario() {
        console.log(`|-----------------Teste de User-----------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        try {
            const name = readlineSync.question(`| Nome:`);
            const email = readlineSync.question(`| E-mail:`);
            const usuario = new UsuarioService_1.UsuarioService();
            usuario.adicionarUsuario(name, email);
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
        console.log(`|-----------------------------------------------|`);
    }
    logarUsuario() {
        console.log(`|---------------    Login    ---------------|`);
        console.log(`|                        					 |`);
        try {
            const name = readlineSync.question(`| Nome:`);
            //Posteriormente, substituir nome por senha...
            const email = readlineSync.question(`| E-mail:`);
            const usuario = new UsuarioService_1.UsuarioService();
            usuario.login(name, email);
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
        console.log(`|-------------------------------------------|`);
    }
}
exports.Formulario = Formulario;
