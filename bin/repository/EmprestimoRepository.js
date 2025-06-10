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
exports.EmprestimoRepository = void 0;
const index_1 = require("../index");
const StatusLivro_1 = require("../enumeracao/StatusLivro");
const LivroService_1 = require("../service/LivroService");
const UsuarioService_1 = require("../service/UsuarioService");
const userS = new UsuarioService_1.UsuarioService();
const livS = new LivroService_1.LivroService();
class EmprestimoRepository {
    constructor() {
        this.vetor = [];
    }
    //Salva um empréstimo no BD com ID de Livro e de Usuário passado via parâmetro.
    //Antes, verifica se os IDs passados são válidos, isto é, existentes no BD.
    save(livroId, usuarioId, dataEmprestimo, dataVencimento) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.prisma.emprestimo.create({
                data: {
                    livroID: livroId,
                    usuarioID: usuarioId,
                    dataEmprestimo: dataEmprestimo,
                    dataVencimento: dataVencimento,
                    status: StatusLivro_1.StatusEmprestimo.ATIVO,
                },
            });
        });
    }
    //Busca no BD por um empréstimo que contenha o ID de Livro e Usuario passados via parâmetro.
    //Converte o retorno do BD em uma string JSON.
    //Método utilizado em adicionarEmprestimo da classe EmprestimoService.
    //Diminuímos a chance de ocorrer erro de ID, ao verificarmos se existe Usuario e Livro antes de o utilizarmos.
    findEmprestimo(livroId, usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimo = yield index_1.prisma.emprestimo.findUnique({
                where: {
                    livroID_usuarioID: {
                        livroID: livroId,
                        usuarioID: usuarioId,
                    },
                },
            });
            return JSON.stringify(emprestimo);
        });
    }
    //Busca no BD por todos os empréstimos do Usuario, com status = 'Ativo'
    //Converte o retorno do BD em uma string JSON, que pode ser nula ou conter um array de Emprestimos
    //Método implementado em getEmprestimos() de EmprestimoService, deve tratar saída nula.
    findEmprestimos(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimos = yield index_1.prisma.emprestimo.findMany({
                where: {
                    usuarioID: usuarioId,
                    status: 'Ativo',
                },
            });
            return JSON.stringify(emprestimos);
        });
    }
    //Busca no BD por todos os empréstimos do Usuario com status = 'Devolvido'
    //Converte o retorno do BD em um array de números.
    //Método implementado em getEmprestimos() de EmprestimoService, deve tratar saída nula.
    findDevolucoes(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const devolucoes = yield index_1.prisma.emprestimo.findMany({
                where: {
                    usuarioID: usuarioId,
                    status: 'Devolvido',
                },
            });
            return JSON.stringify(devolucoes);
        });
    }
    //Atualiza a coluna de status da tabela de Empréstimos.
    updateStatus(livroId, usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimo = yield index_1.prisma.emprestimo.update({
                where: {
                    livroID_usuarioID: {
                        livroID: livroId,
                        usuarioID: usuarioId,
                    },
                },
                data: {
                    status: 'Devolvido',
                },
            });
        });
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
