import { Livro } from './modelos/Livro';
//import { Formulario } from './console/Formulario';
import { PrismaClient } from '../src/generated/prisma/client';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { LivroRepository } from './repository/LivroRepository';
import { UsuarioService } from './service/UsuarioService';
import { LivroService } from './service/LivroService';

//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
export const prisma = new PrismaClient({ log: ['query'] });

async function main() {
	/*const user = await prisma.usuario.create({
		data: {
			name: 'Alice',
			email: 'alic1e@gmail.com',
		},
	})

	const rep = new UsuarioRepository();
	const form = new Formulario();
	form.cadastrarUsuario();
	const usuario = new UsuarioService();
	//usuario.adicionarUsuario("name", "email@gmail.com");
	usuario.login("name", "email@gmail.com");
	
	const livroT = new LivroService();
	livroT.adicionarLivro("Livro 2222", "12391239");
	const test = await prisma.livro.findMany();
	console.log(test)
	
	//{ id: 1, titulo: 'asdasd', isbn: 'asdasd' }
	
	const teste = { id: 1, titulo: "asdasd", isbn: 'asdasd' }
	const livro = new Livro(teste.id, teste.titulo, teste.isbn);*/
	
	const rep = new LivroRepository();
	console.log(await rep.findByISBN('asdasd'));
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
	
//const form = new Formulario();
//form.cadastrarUsuario();

/* DESCRIÇÃO:
 *  Necessária instalação da dependencia TypeROM:
 *  npm install typeorm reflect-metadata sqlite3
 * 
 */

/*
model Usuario {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
}
*/
