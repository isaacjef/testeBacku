import * as readlineSync from 'readline-sync';
import { Livro } from './modelos/Livro';
import { Usuario } from './modelos/Usuario';
import { TipoUsuario } from "./enumeracao/TipoUsuario"
import { InterfaceUsuario } from './console/InterfaceUsuario';
import { InterfaceConsulta } from './console/InterfaceConsulta';
import { GerenciarLivro } from './console/GerenciarLivro';
import { PrismaClient } from '../src/generated/prisma/client';
//import { testeQueries } from '../src/generated/prisma/sql';
import { ConsultaRepository } from './repository/ConsultaRepository';
import { LivroRepository } from './repository/LivroRepository';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { ConsultaService } from './service/ConsultaService';
import { LivroService } from './service/LivroService';
import { UsuarioService } from './service/UsuarioService';

//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
export const prisma = new PrismaClient({ log: ['query'] });

async function main() {
	

	const form = new InterfaceUsuario();
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
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
	
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
