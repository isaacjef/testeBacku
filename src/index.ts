//import { Livro } from './modelos/Livro';
//import { Usuario } from './modelos/Usuario';
//import { Emprestimo } from './modelos/Emprestimo';
//import { Formulario } from './console/Formulario';
import { PrismaClient } from '../src/generated/prisma/client';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { UsuarioService } from './service/UsuarioService';

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
	usuario.login("name", "email@gmail.com");*/
	
	const listar = await prisma.usuario.findMany();
	console.log(listar);
	
	const livro = await prisma.livro.create({
        data: {
            titulo: 'asdasd',
            isbn: 'asdasd',
        },
    })
	console.log(livro)

    const emprestimo = await prisma.emprestimo.create({
        data: {
            livroID: 1,
            usuarioID: 1,
        },
    })
    console.log(emprestimo);
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
