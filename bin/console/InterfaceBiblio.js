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
exports.InterfaceBiblio = void 0;
const index_1 = require("../index");
const readlineSync = __importStar(require("readline-sync"));
const InterfaceLivro_1 = require("../console/InterfaceLivro");
const UsuarioService_1 = require("../service/UsuarioService");
const userS = new UsuarioService_1.UsuarioService();
const interfaceLivro = new InterfaceLivro_1.InterfaceLivro();
class InterfaceBiblio {
    homeAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|--------- Bem-vindo(a) Bibliotecário(a) -------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . . [1] Gerenciar Livros          . . . |`);
            console.log(`| . . . . . [2] Gerenciar Usuários        . . . |`);
            console.log(`| . . . . . [0] Sair                      . . . |`);
            try {
                const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2], limitMessage: 'Opção incorreta! Digite novamente: ' });
                if (resp == 1) {
                    interfaceLivro.gerenciarLivro();
                }
                else if (resp == 2) {
                    this.gerenciarUsuario();
                }
                else {
                    index_1.form.desconectar();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    gerenciarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|~~~~~~~~~~~~~~ Gerenciar Usuarios ~~~~~~~~~~~~~|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . . . [0] Sair              . . . . . . |`);
            console.log(`| . . . . . . [1] Adicionar Biblio... . . . . . |`);
            console.log(`| . . . . . . [2] Listar Usuarios   . . . . . . |`);
            console.log(`| . . . . . . [3] Alterar Usuario   . . . . . . |`);
            console.log(`| . . . . . . [4] Excluir Usuario   . . . . . . |`);
            console.log(`| . . . . . . [5] Retornar          . . . . . . |`);
            try {
                const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2, 3, 4, 5], limitMessage: 'Opção incorreta! Digite novamente: ' });
                switch (resp) {
                    case 0:
                        return index_1.form.desconectar();
                    case 1:
                        return this.cadastrarBiblio();
                    case 2:
                        return this.listarUsuarios();
                    case 3:
                        return this.alterarNome();
                    case 4:
                        return this.deletarUsuario();
                    case 5:
                        return this.homeAdmin();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Página destinada ao cadastro de bibliotecário. Somente um bibliotecário pode adicionar outro.
    cadastrarBiblio() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`|----------- Cadastrar Bibliotecário -----------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            try {
                const nome = readlineSync.question(`| Nome: `);
                const senha = readlineSync.question(`| Senha: `);
                const email = readlineSync.questionEMail(`| E-mail: `);
                if (yield userS.adicionarBiblio(nome, senha, email)) {
                    console.log("Usuário cadastrado com sucesso");
                    this.gerenciarUsuario();
                }
                else {
                    console.log("Bibliotecário já cadastrado! Tente novamente.");
                    this.cadastrarBiblio();
                }
            }
            catch (error) {
                console.error("Erro:", error.message);
            }
        });
    }
    listarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Usuarios Cadastrados ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ `);
            yield userS.getUsuarios();
            console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`);
            console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`);
            try {
                const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1], limitMessage: 'Opção incorreta! Digite novamente: ' });
                switch (resp) {
                    case 0:
                        return this.gerenciarUsuario();
                    case 1:
                        return index_1.form.desconectar();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Permite modificar o nome
    alterarNome() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`| . . . . . . . .  Alterar Nome  . . . . . . . . |`);
            try {
                const email = readlineSync.question(`|~~> Digite o e-mail do Usuário: `);
                const nome = readlineSync.question(`|~~> Digite o novo nome do Usuário: `);
                if (yield userS.atualizarNome(email, nome)) {
                    console.log("Nome alterado com sucesso");
                }
                else {
                    console.log("Nome não foi alterado.");
                }
                this.gerenciarUsuario();
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Página para deletar usuarios
    deletarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`| . . . . . . .  Deletar Usuario  . . . . . . . . |`);
            try {
                const email = readlineSync.question(`|~~> Digite o e-mail do Usuário: `);
                if (yield userS.deletar(email)) {
                    console.log("Usuário não foi deletado.");
                }
                else {
                    console.log("Usuário deletado com sucesso.");
                }
                this.gerenciarUsuario();
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
}
exports.InterfaceBiblio = InterfaceBiblio;
