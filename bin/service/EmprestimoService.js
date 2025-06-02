"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const LivroService_1 = require("../service/LivroService");
const UsuarioService_1 = require("../service/UsuarioService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const userS = new UsuarioService_1.UsuarioService();
const livS = new LivroService_1.LivroService();
const empRep = new EmprestimoRepository_1.EmprestimoRepository();
class EmprestimoService {
    //async adicionarEmprestimo(): Promise<void> {
    //verificar se o livro foi alocado. COmo se trata de uma biblio virtual, o mesmo livro pode ser alocado infinitamente.
    //}
    getEmprestimos(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield userS.getUsuario(email);
            if (usuario) {
                const livros = JSON.parse(yield empRep.findEmprestimos(usuario.id));
                console.log(`|------------- Empréstimos Atuais --------------|`);
                //tratar se não tiver nenhum livro
                livros.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                    const livro = yield livS.buscarLivro(value);
                    console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
                }));
            }
        });
    }
}
exports.EmprestimoService = EmprestimoService;
