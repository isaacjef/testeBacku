import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { UsuarioRepository } from '../repository/UsuarioRepository';

const rep = new UsuarioRepository();

export class UsuarioService {

	//Palavra-chave await em consultas (querys) sql são essenciais, se não os métodos (querys) retornarão
    //algo do tipo: Promise { <pending> }
    async adicionarUsuario(nome: string, email: string): Promise<string> {
        //const rep = new UsuarioRepository();
        rep.save(nome, email);
        
        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});
    }
    
    //Tratar retorno nulo de findByEmail
    async login(nome: string, email: string): Promise<boolean> {
		//const rep = new UsuarioRepository();
		console.log("Testando usuario service " + email)
		const usuario = await rep.findByEmail(email);
		if (usuario && nome == usuario.nome && email == usuario.email) {
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
    
    async getUsuario(email: string): Promise<Usuario | null> {
    	const userS = await rep.findByEmail(email);
    	if (userS)
    		//return new Usuario(userS.id, userS.nome, userS.email, userS.tipo);
    		return userS;
    	else
    		return null;
    }
}
