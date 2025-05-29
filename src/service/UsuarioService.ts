import { prisma } from '../index';
import { UsuarioRepository } from '../repository/UsuarioRepository';

export class UsuarioService {

	//Palavra-chave await em consultas (querys) sql são essenciais, se não os métodos (querys) retornarão
    //algo do tipo: Promise { <pending> }
    async adicionarUsuario(nome: string, email: string): Promise<string> {
        const repositorio = new UsuarioRepository();
        repositorio.save(nome, email);

        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});
    }
    
    //Tratar retorno nulo de findByEmail
    async login(nome: string, email: string): Promise<boolean> {
		const n = new UsuarioRepository();
		console.log("Testando usuario service " + email)
		const t = await n.findByEmail(email);
		if (t && nome == t.nome && email == t.email) {
			return true;
		} else {
			return false;
		}

        /*return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	});
    	});*/
    }
}
