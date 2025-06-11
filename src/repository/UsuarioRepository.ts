import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { IUsuarioRepository } from './IUsuarioRepository';

//Repository de Usuario, responsável por executar as operações de CRUD.
export class UsuarioRepository implements IUsuarioRepository {

	//Salvar usuário no banco de dados, através dos parâmetros passados.
	async save(nome: string, senha: string, email: string): Promise<void> {
		try {
			await prisma.usuario.create({
            	data: {
                	nome: `${nome}`,
                	senha: `${senha}`,
                	email: `${email}`,
                	tipo: TipoUsuario.CLIENTE,
            	},
        	})
        } catch (error: any) {
			console.log("Usuário não inserido: " + error.message);
		}
	}
	
	//Salvar bibliotecário no banco de dados.
	async saveBiblio(nome: string, senha: string, email: string): Promise<void> {
		try {
			await prisma.usuario.create({
            	data: {
                	nome: `${nome}`,
                	senha: `${senha}`,
                	email: `${email}`,
                	tipo: TipoUsuario.BIBLIO,
            	},
        	})
        } catch (error: any) {
			console.log("Usuário não inserido: " + error.message);
		}
	}
	
	//Tratar possível retorno nulo em UsuarioService, ou em InterfaceUsuario
	//Encontra usuário no banco de dados via e-mail. Retorna uma string JSON com os dados obtidos.
	async findByEmail(email: string): Promise<string> {
		const userR = await prisma.usuario.findUnique({ where: { email: email } });
	
		return JSON.stringify(userR);
    }

	//Tratar possível retorno nulo em UsuarioService, ou em InterfaceUsuario
	//Encontra usuário no banco de dados via id. Retorna uma string JSON com os dados obtidos.
	async findByID(id: number): Promise<string> {
        const userR = await prisma.usuario.findUnique({ where: { id: id } });
	
		return JSON.stringify(userR);
    }
    
    //Consulta todos os usuarios do banco de dados. Utilizado em getUsuarios() de UsuarioService
    async consultarUsuarios(): Promise<string> {
		const usuarios = JSON.stringify(await prisma.$queryRawUnsafe(`SELECT * FROM Usuario`));
		return usuarios;
	}
    
    //Método simples que permite modificar o nome do Usuário
	async updateByEmail(email: string, nome: string): Promise<void> {
		try {
			await prisma.usuario.update({
				where: {
					email: `${email}`
				},
				data: {
					nome: `${nome}`,
				},
			})
        } catch (error: any) {
			console.log("Nome não atualizado: " + error.message);
		}
	}
	
	//Método que permite deletar algum usuario via email.
	async deleteByEmail(email: string): Promise<void> {
		try {
			await prisma.usuario.delete({
				where: {
					email: `${email}`
				},
			})
        } catch (error: any) {
			console.log("Usuário não deletado: " + error.message);
		}
	}
}
