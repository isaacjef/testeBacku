//import { Livro } from './modelos/Livro';
import { Formulario } from './console/Formulario';
import { GerenciarLivro } from './console/GerenciarLivro';
import { PrismaClient } from '../src/generated/prisma/client';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { LivroRepository } from './repository/LivroRepository';
import { UsuarioService } from './service/UsuarioService';
import { LivroService } from './service/LivroService';

//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
export const prisma = new PrismaClient({ log: ['query'] });

async function main() {
	const form = new Formulario();
	form.iniciar();
	
	/*const user = await prisma.usuario.create({
		data: {
			name: 'Alice',
			email: 'alic1e@gmail.com',
		},
	})

	const rep = new UsuarioRepository();
	const usuario = new UsuarioService();
	//usuario.adicionarUsuario("name", "email@gmail.com");
	usuario.login("name", "email@gmail.com");
	
	const teste = { id: 1, titulo: "asdasd", isbn: 'asdasd' }
	const livro = new Livro(teste.id, teste.titulo, teste.isbn);
	
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
