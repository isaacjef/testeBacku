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
    //Método responsável por adicionar um empréstimo ao banco de dados. 
    //Como se trata de uma biblioteca virtual, um livro pode ser alocado por mais de um usuário ao mesmo tempo.
    //Método utilizado em realizarEmprestimo() de InterfaceEmprestimo.
    adicionarEmprestimo(livroId, usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar se o usuario já emprestou o Livro passado via parâmetro.
            const emprestimo = JSON.parse(yield empRep.findEmprestimo(livroId, usuarioId));
            //Verificar se emprestimo já possui livro e usuário. Se for nulo, não há nenhum empréstimo.
            if (emprestimo !== null) {
                console.log("O usuário já está com o livro emprestado.");
                return true;
            }
            else {
                const dataEmprestimo = new Date(Date.now());
                const dataVencimento = new Date(dataEmprestimo);
                //Configura a data de vencimento do empréstimo para 1 dia depois, apenas para exemplificar
                dataVencimento.setDate(dataVencimento.getDate() + 1);
                empRep.save(livroId, usuarioId, dataEmprestimo.toJSON(), dataVencimento.toJSON());
                return false;
            }
        });
    }
    //Método responsável por listar todos os empréstimos do usuário.
    getEmprestimos(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield userS.getUsuario(email);
            //Se usuario não for nulo:
            if (usuario !== null) {
                const emprestimos = JSON.parse(yield empRep.findEmprestimos(usuario.id));
                //Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
                //Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
                if (emprestimos.length == 0) {
                    console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Nenhum Livro Emprestado ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
                }
                else {
                    emprestimos.forEach((value, index, array) => __awaiter(this, void 0, void 0, function* () {
                        const livro = yield livS.getLivroByID(parseInt(value.livroID));
                        console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Empréstimo ${index + 1} ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
                        console.log(`Data do Empréstimo: ${value.dataEmprestimo} | Data de Vencimento: ${value.dataVencimento} | Status: ${value.status}`);
                        console.log(`Livro - Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
                    }));
                }
            }
        });
    }
    //Método destinado a verificar a data de vencimento de cada empréstimo
    //Atribui o status = 'Devolvido' ao empréstimo se a data atual for maior que a data de vencimento
    verificarEmprestimos(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield userS.getUsuario(email);
            //Se usuario não for nulo:
            if (usuario !== null) {
                const emprestimos = JSON.parse(yield empRep.findEmprestimos(usuario.id));
                if (emprestimos.length != 0) {
                    const data = new Date(Date.now());
                    emprestimos.forEach((value, index, array) => __awaiter(this, void 0, void 0, function* () {
                        console.log(value.dataVencimento);
                        const data2 = new Date(value.dataVencimento);
                        if (data.getTime() > data2.getTime()) {
                            empRep.updateStatus(parseInt(value.livroID), parseInt(value.usuarioID));
                        }
                    }));
                }
            }
        });
    }
    //Método responsável por listar todos os empréstimos do usuário.
    getDevolucoes(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield userS.getUsuario(email);
            //Se usuario não for nulo:
            if (usuario !== null) {
                const devolucoes = JSON.parse(yield empRep.findDevolucoes(usuario.id));
                //Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
                //Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
                if (devolucoes.length == 0) {
                    console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Nenhum Livro Devolvido ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
                }
                else {
                    devolucoes.forEach((value, index, array) => __awaiter(this, void 0, void 0, function* () {
                        const livro = yield livS.getLivroByID(parseInt(value.livroID));
                        console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Devolução ${index + 1} ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
                        console.log(`Data do Empréstimo: ${value.dataEmprestimo} | Data de Vencimento: ${value.dataVencimento} | Status: ${value.status}`);
                        console.log(`Livro - Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
                    }));
                }
            }
        });
    }
}
exports.EmprestimoService = EmprestimoService;
