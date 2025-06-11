"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UsuarioService = void 0;
const log_1 = require("../log");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
//Instância de UsuarioRepository destinada a ser utilizada em todos os métodos da classe.
const rep = new UsuarioRepository_1.UsuarioRepository();
let UsuarioService = class UsuarioService {
    //Utiliza o método save() de UsuarioRepository para adicionar usuários no banco de dados. 
    //É implementado na classe InterfaceUsuario
    adicionarUsuario(nome, senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificacao = JSON.parse(yield rep.findByEmail(email));
            //Verifica se verificacao é nulo ou não &
            //Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
            //Utilizado no método cadastrarUsuario() de InterfaceUsuario.
            if (verificacao === null) {
                yield rep.save(nome, senha, email.toLowerCase());
                console.log("Usuário foi salvo no banco de dados com sucesso.");
                return true;
            }
            else {
                console.log("Usuário já cadastrado!");
                return false;
            }
        });
    }
    adicionarBiblio(nome, senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificacao = JSON.parse(yield rep.findByEmail(email));
            //Verifica se verificacao é nulo ou não &
            //Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
            //Utilizado no método cadastrarUsuario() de InterfaceUsuario.
            if (verificacao === null) {
                yield rep.saveBiblio(nome, senha, email.toLowerCase());
                console.log("Usuário foi salvo no banco de dados com sucesso.");
                return true;
            }
            else {
                console.log("Usuário já cadastrado!");
                return false;
            }
        });
    }
    //Tratar retorno nulo de findByEmail
    login(senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = JSON.parse(yield rep.findByEmail(email));
            //Verifica primeiro se usuario é nulo & 
            //Se a senha informada pelo usuário é iguais à credencial cadastrada anteriormente.
            //Utilizado no método logarUsuario() de InterfaceUsuario.
            if (usuario !== null && senha == usuario.senha) {
                return true;
            }
            else {
                console.log("Usuário não cadastrado!");
                return false;
            }
        });
    }
    //Utiliza o método findByEmail de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    //Método implementado em getEmprestimo(), de EmprestimoService; Em home(), de InterfaceUsuario.
    getUsuario(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userS = JSON.parse(yield rep.findByEmail(email));
            if (userS !== null)
                return userS;
            else
                return null;
        });
    }
    //Lista todos os usuarios do banco.
    getUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = JSON.parse(yield rep.consultarUsuarios());
            if (usuarios !== null) {
                usuarios.forEach((value, index, array) => __awaiter(this, void 0, void 0, function* () {
                    console.log(`Usuário ${index + 1} - Nome: ${value.nome}, E-mail: ${value.email}, Tipo: ${value.tipo}`);
                }));
            }
            else {
                console.log("Não há nenhum usuário cadastrado.");
            }
        });
    }
    //Utiliza o método findByID de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    //
    getUsuarioByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userS = JSON.parse(yield rep.findByID(id));
            if (userS !== null)
                return userS;
            else
                return null;
        });
    }
    //Atualizar nome do usuário.
    atualizarNome(email, nome) {
        return __awaiter(this, void 0, void 0, function* () {
            yield rep.updateByEmail(email, nome);
            const verificacao = JSON.parse(yield rep.findByEmail(email));
            //Verifica se há algum usuario com o e-mail informado pelo usuário.
            if (verificacao !== null && verificacao.nome != nome) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    //Deleta usuário do banco de dados
    deletar(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield rep.deleteByEmail(email);
            const verificacao = yield rep.findByEmail(email);
            //Verifica se há algum usuario com o e-mail digitado pelo usuário.
            if (verificacao !== null) {
                return true;
            }
            else {
                return false;
            }
        });
    }
};
exports.UsuarioService = UsuarioService;
__decorate([
    log_1.logParamTypes,
    log_1.logReturnType,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsuarioService.prototype, "adicionarUsuario", null);
__decorate([
    log_1.logParamTypes,
    log_1.logReturnType,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsuarioService.prototype, "login", null);
exports.UsuarioService = UsuarioService = __decorate([
    (0, log_1.name)('UsuarioService')
], UsuarioService);
