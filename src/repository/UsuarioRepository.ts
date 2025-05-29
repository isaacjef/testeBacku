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
        const r = await prisma.usuario.findUnique({ where: { email: email } });
        if(r && r.tipo == 'Membro') {
        	return new Usuario(r.id, r.nome, r.email, TipoUsuario.CLIENTE)
        } else if (r && r.tipo == 'Administrador') {
        	return new Usuario(r.id, r.nome, r.email, TipoUsuario.ADMIN)
        } else {
        	return null;
        }
    }

    listarUsuarios(): void {
        throw new Error("Method not implemented.");
    }
}
