import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { IUsuarioRepository } from './IUsuarioRepository';

export class UsuarioRepository implements IUsuarioRepository {

	async save(name: string, email: string): Promise<void> {
		await prisma.usuario.create({
            data: {
                name: `${name}`,
                email: `${email}`,
            },
        })
	}

	//O email, neste caso, é único
    async findByEmail(email: string): Promise<Usuario | null> {
        return prisma.usuario.findUnique({ where: { email: email } });
    }

    listarUsuarios(): void {
        throw new Error("Method not implemented.");
    }
}
