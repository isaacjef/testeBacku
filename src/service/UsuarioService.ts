import { prisma } from '../index';
import { Usuario } from '../modelos/Usuario';
import { name, logAt, logParamTypes, logReturnType } from '../log';
import { UsuarioRepository } from '../repository/UsuarioRepository';

//Instância de UsuarioRepository destinada a ser utilizada em todos os métodos da classe.
const rep = new UsuarioRepository();

@name('UsuarioService')
export class UsuarioService {
	
	//Utiliza o método save() de UsuarioRepository para adicionar usuários no banco de dados. 
	//É implementado na classe InterfaceUsuario
	@logParamTypes
	@logReturnType
    async adicionarUsuario(nome: string, senha: string, email: string): Promise<boolean> {
        const verificacao = JSON.parse(await rep.findByEmail(email));
       
        //Verifica se verificacao é nulo ou não &
        //Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
        //Utilizado no método cadastrarUsuario() de InterfaceUsuario.
        if (verificacao === null) {
        	await rep.save(nome, senha, email.toLowerCase());
        	console.log("Usuário foi salvo no banco de dados com sucesso.")
        	return true;
        } else {
        	console.log("Usuário já cadastrado!")
        	return false;
        }
    }
    
    async adicionarBiblio(nome: string, senha: string, email: string): Promise<boolean> {
       	const verificacao = JSON.parse(await rep.findByEmail(email));
       
        //Verifica se verificacao é nulo ou não &
        //Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
        //Utilizado no método cadastrarUsuario() de InterfaceUsuario.
        if (verificacao === null) {
        	await rep.saveBiblio(nome, senha, email.toLowerCase());
        	console.log("Usuário foi salvo no banco de dados com sucesso.")
        	return true;
        } else {
        	console.log("Usuário já cadastrado!")
        	return false;
        }
    }
    
    //Tratar retorno nulo de findByEmail
    @logParamTypes
	@logReturnType
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
    }
    
    //Utiliza o método findByEmail de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    //Método implementado em getEmprestimo(), de EmprestimoService; Em home(), de InterfaceUsuario.
    async getUsuario(email: string): Promise<Usuario | null> {
    	const userS: Usuario = JSON.parse(await rep.findByEmail(email));
    	
    	if (userS !== null)
    		return userS;
    	else
    		return null;
    }
    
    //Lista todos os usuarios do banco.
	async getUsuarios(): Promise<void> {
    	const usuarios: Array<Usuario> = JSON.parse(await rep.consultarUsuarios());
    	
    	if (usuarios !== null) {
    		usuarios.forEach(async (value: Usuario, index: number, array: Usuario[]) => {
				console.log(`Usuário ${index + 1} - Nome: ${value.nome}, E-mail: ${value.email}, Tipo: ${value.tipo}`)
        	});
    	} else {
    		console.log("Não há nenhum usuário cadastrado.")
    	}
    }
    
    //Utiliza o método findByID de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    //
    async getUsuarioByID(id: number): Promise<Usuario | null> {
    	const userS: Usuario = JSON.parse(await rep.findByID(id));
    	
    	if (userS !== null)
    		return userS;
    	else
    		return null;
    }
    
    //Atualizar nome do usuário.
    async atualizarNome(email: string, nome: string): Promise<boolean> {
    	await rep.updateByEmail(email, nome)
    	
    	const verificacao = JSON.parse(await rep.findByEmail(email));
        
        //Verifica se há algum usuario com o e-mail informado pelo usuário.
        if (verificacao !== null && verificacao.nome != nome) {
        	return true;
        } else {	
        	return false;
        }
    }
    

    //Deleta usuário do banco de dados
    async deletar(email: string): Promise<boolean> {
    	await rep.deleteByEmail(email);
    	
    	const verificacao = await rep.findByEmail(email);
        
        //Verifica se há algum usuario com o e-mail digitado pelo usuário.
        if (verificacao !== null) {
        	return true;
        } else {	
        	return false;
        }
    }
}
