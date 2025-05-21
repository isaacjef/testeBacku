import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { IUsuarioRepository } from './IUsuarioRepository';

export class UsuarioRepository implements IUsuarioRepository {
//    prisma: PrismaClient = new PrismaClient({ log: ['query'] });

	//O email, neste caso, é único
    async findByEmail(email: string): Promise<Usuario | null> {
        return prisma.usuario.findUnique({ where: { email: email } });
        /*const usuario1 = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });
        
        // É necessário transformar o resultado da query em uma string JSON, para podermos tratar os dados obtidos.
        // A constante/variável 'usuarioId', se referenciada, retorna [object Object]

		//console.log("REpositorio" + JSON.stringify(usuario1));
        return (JSON.stringify(usuario1));
        
        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});*/
    }

    listarUsuarios(): void {
        throw new Error("Method not implemented.");
    }
}
