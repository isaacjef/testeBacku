import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { IUsuarioRepository } from './IUsuarioRepository';

//Repository de Usuario, responsável por executar as operações de CRUD.
export class UsuarioRepository implements IUsuarioRepository {

	//Salvar usuário no banco de dados, através dos parâmetros passados.
	async save(nome: string, senha: string, email: string): Promise<void> {
		await prisma.usuario.create({
            data: {
                nome: `${nome}`,
                senha: `${senha}`,
                email: `${email}`,
                tipo: TipoUsuario.CLIENTE,
            },
        })
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
    
    //Método simples que permite modificar o nome
	async update(email: string, nome: string): Promise<void> {
		await prisma.usuario.update({
			where: {
				email: `${email}`
			},
			data: {
				nome: `${nome}`,
			},
		})
	}
	
	async delete(email: string): Promise<void> {
		await prisma.usuario.delete({
			where: {
				email: `${email}`
			},
		})
	}
}
