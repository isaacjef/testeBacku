"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.prisma = void 0;
exports.logAt = logAt;
exports.simples = simples;
require("reflect-metadata");
const client_1 = require("../src/generated/prisma/client");
const LivroRepository_1 = require("./repository/LivroRepository");
const LivroService_1 = require("./service/LivroService");
//Aparentemente, duas classes não podem se inter-importar no typescript.
//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
exports.prisma = new client_1.PrismaClient({ log: ['query'] });
function logAt(target, key) {
    var t = Reflect.getMetadata("design:type", target, key);
    console.log('Atributo ', key, ' é do tipo: ' + t);
}
class Teste {
    constructor() {
        this.nome = 'aa';
    }
}
__decorate([
    logAt
], Teste.prototype, "nome", void 0);
function simples(C) {
    console.log(`CLASSEZONA`);
    return C;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const d1 = new Date(Date.now());
        const d2 = new Date("2023-11-17");
        console.log(d1);
        console.log(d2);
        const d3 = new Date(d1);
        d3.setDate(d3.getDate() + 7);
        const d4 = `${d1.getFullYear()}-${d1.getMonth()}-${d1.getDay()}`;
        console.log(d3);
        console.log(d4);
        //const livros = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE ` + query);
        const livS = new LivroService_1.LivroService();
        const livro = yield livS.getLivroByISBN("A");
        if (livro !== null) {
            console.log(livro);
        }
        else {
            console.log("não há livro");
        }
        //verificar amanha
        //const interEmp = new InterfaceEmprestimo();
        //interEmp.realizarEmprestimo("teste@email")
        //const form = new InterfaceUsuario();
        //const interLivro = new InterfaceLivro();
        //const consulta = new InterfaceConsulta();
        //interLivro.cadastrarLivro();
        //consulta.consultaUnica("admin@admin");
        //form.iniciar();
        //form.home();
        const repL = new LivroRepository_1.LivroRepository();
        const aaa = yield repL.findByISBN("A1");
        console.log(aaa);
        if (aaa !== null) {
            console.log("verificacao é nulo");
        }
        else {
            console.log("Verificacao contem");
        }
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
        if (userS) {
            const u = userS.getUsuario("facil")
            form.emprestimo(u.id);
        }
        
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
