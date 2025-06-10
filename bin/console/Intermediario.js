"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intermediario = void 0;
//Classe para funcionar como intermediária entre as interfaces, de forma a evitar que o erro:
//[ERR_REQUIRE_CYCLE_MODULE] ocorra
class Intermediario {
    //Retorna o usuario ao método home() de InterfaceUsuario 
    itfConsulta_itfUsuario() {
        //form.home();
    }
}
exports.Intermediario = Intermediario;
