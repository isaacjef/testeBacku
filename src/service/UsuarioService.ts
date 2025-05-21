import { prisma } from '../index';
import { UsuarioRepository } from '../repository/UsuarioRepository';

export class UsuarioService {

	//Palavra-chave await em consultas (querys) sql são essenciais, se não os métodos (querys) retornarão
    //algo do tipo: Promise { <pending> }
    async adicionarUsuario(name: string, email: string): Promise<string> {
        const repositorio = new UsuarioRepository();
        repositorio.save(name, email);

        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});
    }
    
    async login(name: string, email: string): Promise<string> {
		const n = new UsuarioRepository();
		console.log("Testando usuario service " + email)
		const t = await n.findByEmail(email);
		console.log(t);
		
        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	});
    	});
    }
}
