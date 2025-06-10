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
const index_1 = require("../index");
const LivroService_1 = require("../service/LivroService");
const UsuarioService_1 = require("../service/UsuarioService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const userS = new UsuarioService_1.UsuarioService();
const livS = new LivroService_1.LivroService();
const empRep = new EmprestimoRepository_1.EmprestimoRepository();
class EmprestimoService {
    //Método responsável por adicionar um empréstimo ao banco de dados. 
    //Como se trata de uma biblioteca virtual, um livro pode ser alocado por mais de um usuário ao mesmo tempo.
    //Método utilizado em realizarEmprestimo() de InterfaceEmprestimo.
    adicionarEmprestimo(livroId, usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar se o usuario já emprestou o Livro passado via parâmetro.
            const usuarioEmp = yield empRep.findEmprestimo(livroId, usuarioId);
            //Verificar se o usuario está com o livro emprestado.
            if (usuarioEmp !== null) {
                return true;
            }
            else {
                const data = Date.now();
                yield index_1.prisma.emprestimo.create({
                    data: {
                        livroID: livroId,
                        usuarioID: usuarioId,
                    },
                });
                return false;
            }
        });
    } // Não sei se vai ser necessário verificar se o Livro existe, já que o usuário vai selecionar via consulta...
    //Método responsável por listar todos os empréstimos do usuário.
    getEmprestimo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield userS.getUsuario(email);
            //Se usuario não for nulo:
            if (usuario !== null) {
                const livrosId = yield empRep.findEmprestimos(usuario.id);
                //Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
                //Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
                if (livrosId.length == 0) {
                    console.log(`|----------- Nenhum livro emprestado -----------|`);
                }
                else {
                    livrosId.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                        const livro = yield livS.getLivroByID(value);
                        console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
                    }));
                }
            }
        });
    }
    //Método responsável por listar todos os empréstimos do usuário.
    getEmprestimos(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield userS.getUsuario(email);
            //Se usuario não for nulo:
            if (usuario !== null) {
                const livrosId = yield empRep.findEmprestimos(usuario.id);
                //Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
                //Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
                if (livrosId.length == 0) {
                    console.log(`|----------- Nenhum livro emprestado -----------|`);
                }
                else {
                    livrosId.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                        const livro = yield livS.getLivroByID(value);
                        console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
                    }));
                }
            }
        });
    }
}
exports.EmprestimoService = EmprestimoService;
