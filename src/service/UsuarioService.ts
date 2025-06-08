import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { UsuarioRepository } from '../repository/UsuarioRepository';

//Instância de UsuarioRepository destinada a ser utilizada em todos os métodos da classe.
const rep = new UsuarioRepository();

export class UsuarioService {
	
	//Utiliza o método save() de UsuarioRepository para adicionar usuários no banco de dados. 
	//É implementado na classe InterfaceUsuario
    async adicionarUsuario(nome: string, senha: string, email: string): Promise<boolean> {
        const verificacao = await rep.findByEmail(email)
       
        //Verifica se verificacao é nulo ou não. Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
        if (verificacao) {
        	return true;
        } else {
        	rep.save(nome, senha, email);
        	return false;
        }
    }
    
    //Tratar retorno nulo de findByEmail
    async login(senha: string, email: string): Promise<boolean> {
		const usuario = await rep.findByEmail(email);
		
		//Verifica primeiro se const usuario é nulo & 
		//Se a senha e email informados pelo usuário são iguais às credenciais cadastradas anteriormente.
		if (usuario && senha == usuario.senha && email == usuario.email) {
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
