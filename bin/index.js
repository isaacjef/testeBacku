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
exports.Sessao = exports.form = exports.prisma = void 0;
exports.simples = simples;
const log_1 = require("./log");
const InterfaceUsuario_1 = require("./console/InterfaceUsuario");
const client_1 = require("../src/generated/prisma/client");
const EmprestimoService_1 = require("./service/EmprestimoService");
//Aparentemente, duas classes não podem se inter-importar no typescript.
//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
exports.prisma = new client_1.PrismaClient({ log: ['query'] });
exports.form = new InterfaceUsuario_1.InterfaceUsuario();
let Sessao = class Sessao {
};
exports.Sessao = Sessao;
Sessao.email = '';
__decorate([
    log_1.logAt,
    __metadata("design:type", String)
], Sessao, "email", void 0);
exports.Sessao = Sessao = __decorate([
    (0, log_1.name)('Sessao')
], Sessao);
class Aba {
    metodo(email) {
        console.log("DEu certo " + email);
    }
}
function simples(C) {
    console.log(`CLASSEZONA`);
    return C;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const d1 = new Date(Date.now()).toJSON();
        const d3 = new Date(d1);
        d3.setDate(d3.getDate() - 7);
        /*await prisma.emprestimo.create({
            data: {
                livroID: 1,
                usuarioID: 4,
                dataEmprestimo: d1,
                dataVencimento: d3.toJSON(),
                status: StatusEmprestimo.ATIVO,
            },
        })*/
        const empS = new EmprestimoService_1.EmprestimoService();
        empS.verificarEmprestimos("asd@asd");
        empS.getDevolucoes("asd@asd");
        /*const d1 = new Date(Date.now());
        console.log(d1)
        console.log(d2)
        const d3 = new Date(d1);
        d3.setDate(d3.getDate() - 7);
        const d4 = new Date(`${d1.getUTCFullYear()}-${d1.getUTCMonth() + 1}-${d1.getUTCDate()}`).toJSON();
        console.log(d3.toJSON());
        console.log(d4);*/
        //empS.getDevolucoes("teste@email")
        //empS.getEmprestimos("teste@email")
        //empS.getEmprestimos("b@b")
        //empS.adicionarEmprestimo(2, 1)
        //const emprestimos = JSON.stringify(await prisma.emprestimo.findMany({ where: { usuarioID: 1, status: 'Ativo', }, }))
        //const vetor2: Emprestimo[] = JSON.parse(emprestimos);
        //console.log(vetor2);
        //form.iniciar();
        //verificar amanha
        //const interEmp = new InterfaceEmprestimo();
        //interEmp.realizarEmprestimo("teste@email")
        //const interLivro = new InterfaceLivro();
        //const consulta = new InterfaceConsulta();
        //interLivro.cadastrarLivro();
        //consulta.consultaUnica("admin@admin");
        //form.home();
        /*const repL = new LivroRepository();
        const aaa = await repL.findByISBN("A1");
        console.log(aaa)
        if (aaa !== null) {
            console.log("verificacao é nulo")
        } else {
            console.log("Verificacao contem")
        }*/
        /*let livros: Array<number> = JSON.parse(await repE.findEmprestimos(3));
        livros.forEach(async (value: number) => {
            //const livro: Livro = await livS.buscarLivro(value);
            //console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
            let teste: number = value.livroID;
            console.log(teste);
        });*/
        /*
        const form = new InterfaceUsuario();
        form.iniciar();
        const ala = new InterfaceConsulta();
        ala.iniciarConsulta();
        
        //Service e Repository para testes:
        const repE = new EmprestimoRepository();
        const empS = new EmprestimoService();
        const repL = new LivroRepository();
        const livS = new LivroService();
        const repU = new UsuarioRepository();
        const userS = new UsuarioService();
        const con = new ConsultaRepository();
        
        //Listar instâncias nas tabelas:
        const test = await prisma.livro.findMany();
        console.log(test)
        const emp = await prisma.emprestimo.findMany();
        console.log(emp)*/
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
/* const form = new Formulario();
 * form.cadastrarUsuario();
 *
 * Consultar livro via ISBN. Neste aqui, o ISBN não existe, o método retorna null.
 * const rep = new LivroRepository();
 * console.log(await rep.findByISBN('asdasd12312'));
 *
 *
 *
 * model Usuario {
 * 	id    Int    @id @default(autoincrement())
 * 	email String @unique
 * 	name  String
 *  }
 */
/*------------------------------------------------------------------------------------------------------------
const result = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE titulo LIKE '%a%' AND isbn LIKE 'asdasd'`);
console.log(result)

const column = 'isbn'
const teste = 'a'
const result2 = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE ${column} LIKE '%${teste}%'`)

//Admin primário
await prisma.usuario.create({
    data: {
        nome: `Admin`,
        senha: `12345`,
        email: `admin`,
        tipo: TipoUsuario.BIBLIO,
    },
})*/
