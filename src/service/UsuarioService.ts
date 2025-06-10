import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { UsuarioRepository } from '../repository/UsuarioRepository';

//Instância de UsuarioRepository destinada a ser utilizada em todos os métodos da classe.
const rep = new UsuarioRepository();

export class UsuarioService {
	
	//Utiliza o método save() de UsuarioRepository para adicionar usuários no banco de dados. 
	//É implementado na classe InterfaceUsuario
    async adicionarUsuario(nome: string, senha: string, email: string): Promise<boolean> {
        const verificacao = JSON.parse(await rep.findByEmail(email));
       
        //Verifica se verificacao é nulo ou não &
        //Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
        //Utilizado no método cadastrarUsuario() de InterfaceUsuario.
        if (verificacao === null) {
        	rep.save(nome, senha, email);
        	console.log("Usuário foi salvo no banco de dados com sucesso.")
        	return true;
        } else {
        	console.log("Usuário já cadastrado!")
        	return false;
        }
    }
    
    //Tratar retorno nulo de findByEmail
    async login(senha: string, email: string): Promise<boolean> {
		const usuario: Usuario = JSON.parse(await rep.findByEmail(email));
		
		//Verifica primeiro se usuario é nulo & 
		//Se a senha informada pelo usuário é iguais à credencial cadastrada anteriormente.
		//Utilizado no método logarUsuario() de InterfaceUsuario.
		if (usuario !== null && senha == usuario.senha) {
			return true;
		} else {
			console.log("Usuário não cadastrado!")
			return false;
		}

        /*return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	});
    	});*/
    }
    
    //Utiliza o método findByEmail de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    async getUsuario(email: string): Promise<Usuario | null> {
    	const userS: Usuario = JSON.parse(await rep.findByEmail(email));
    	
    	if (userS !== null)
    		return userS;
    	else
    		return null;
    }
    
    //Utiliza o método findByID de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    async getUsuarioByID(id: number): Promise<Usuario | null> {
    	const userS: Usuario = JSON.parse(await rep.findByID(id));
    	
    	if (userS !== null)
    		return userS;
    	else
    		return null;
    }
}
