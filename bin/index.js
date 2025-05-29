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
exports.prisma = void 0;
const InterfaceUsuario_1 = require("./console/InterfaceUsuario");
const client_1 = require("../src/generated/prisma/client");
//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
exports.prisma = new client_1.PrismaClient({ log: ['query'] });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = new InterfaceUsuario_1.InterfaceUsuario();
        form.iniciar();
        /*const test = await prisma.usuario.findMany();
        console.log(test);
        const rep = new UsuarioRepository();
        const n = await rep.findByEmail("teste@gaao.com");
        console.log(n);
        
        //const con = new ConsultaRepository();
        //con.consultarLivro("isbn LIKE '%a%'");
        
        //const ala = new InterfaceConsulta();
        //ala.iniciarConsulta();
    
        const usuarioS = new UsuarioService();
        const t = await usuarioS.getUsuario("facil");
        //const usuario = new Usuario(t.id, t.nome, t.email, t.tipo);
        console.log(t.tipo)
        
        
        /*
        const rep = new UsuarioRepository();
        const usuarioS = new UsuarioService();
        
        const ger = new GerenciarLivro();
        ger.cadastrarLivro();
        
        const test = await prisma.livro.findMany();
        console.log(test)*/
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
const result2 = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE ${column} LIKE '%${teste}%'`)*/
