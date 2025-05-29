import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { IUsuarioRepository } from './IUsuarioRepository';

export class UsuarioRepository implements IUsuarioRepository {

	async save(nome: string, email: string): Promise<void> {
		await prisma.usuario.create({
            data: {
                nome: `${nome}`,
                email: `${email}`,
                tipo: TipoUsuario.CLIENTE,
            },
        })
	}
	
	//Tratar possível retorno nulo em UsuarioService, ou em InterfaceUsuario
	async findByEmail(email: string): Promise<Usuario | null> {
        const userR = await prisma.usuario.findUnique({ where: { email: email } });

        if(userR && userR.tipo == 'Membro') {
        	return new Usuario(userR.id, userR.nome, userR.email, TipoUsuario.CLIENTE)
        } else if (userR && userR.tipo == 'Administrador') {
        	return new Usuario(userR.id, userR.nome, userR.email, TipoUsuario.ADMIN)
        } else {
        	return null;
        }
    }

    listarUsuarios(): void {
        throw new Error("Method not implemented.");
    }
}
