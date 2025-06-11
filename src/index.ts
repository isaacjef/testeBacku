import * as readlineSync from 'readline-sync';
import { name, logAt } from './log';
import { TipoUsuario } from './enumeracao/TipoUsuario';
import { Usuario } from './modelos/Usuario';
import { Livro } from './modelos/Livro';
import { PrismaClient } from '../src/generated/prisma/client';
import { InterfaceBiblio } from './console/InterfaceBiblio'
import { InterfaceUsuario } from './console/InterfaceUsuario'

//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'. Caso queira ver um log das consultas, basta descomentar e comentar a linha de baixo.
//export const prisma = new PrismaClient({ log: ['query'] });
export const prisma = new PrismaClient();
export const form = new InterfaceUsuario();
export const interfaceBiblio = new InterfaceBiblio();

@name('Sessao')
export class Sessao {
	@logAt
	static email: string = '';
}

async function main() {
	//Tratar readline de Categoria Livro;
	//Para exemplificar o uso de metadados, vamos utilizar a classe Usuario e UsuarioService:
	const usuarioLog = new Usuario(1, "username", "password", "email@", TipoUsuario.CLIENTE);
		
	form.iniciar();
	//Para acessar a página de bibliotecario -> Login -> email: admin@a & senha: admin
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

/*
//Bibliotecário primário
await prisma.usuario.create({
    data: {
        nome: `Admin`,
        senha: `admin`,
        email: `admin@a`,
        tipo: TipoUsuario.BIBLIO,
    },
})*/
