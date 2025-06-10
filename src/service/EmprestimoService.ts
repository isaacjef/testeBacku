import { prisma } from '../index';
import { Livro } from '../modelos/Livro';
import { Emprestimo } from '../modelos/Emprestimo';
import { LivroService } from '../service/LivroService';
import { UsuarioService } from '../service/UsuarioService';
import { EmprestimoRepository } from '../repository/EmprestimoRepository';

const userS = new UsuarioService();
const livS = new LivroService();
const empRep = new EmprestimoRepository();

export class EmprestimoService {

	//Método responsável por adicionar um empréstimo ao banco de dados. 
	//Como se trata de uma biblioteca virtual, um livro pode ser alocado por mais de um usuário ao mesmo tempo.
	//Método utilizado em realizarEmprestimo() de InterfaceEmprestimo.
	async adicionarEmprestimo(livroId: number, usuarioId: number): Promise<boolean> {
		
		//Verificar se o usuario já emprestou o Livro passado via parâmetro.
		const usuarioEmp = await empRep.findEmprestimo(livroId, usuarioId);
		
		//Verificar se o usuario está com o livro emprestado.
		if (usuarioEmp !== null) {
			return true;
		} else {
			const data = Date.now();
			await prisma.emprestimo.create({
				data: {
					livroID: livroId,
					usuarioID: usuarioId,
				},
			})
			return false;
		}
	} // Não sei se vai ser necessário verificar se o Livro existe, já que o usuário vai selecionar via consulta...
	
	//Método responsável por listar todos os empréstimos do usuário.
    async getEmprestimo(email: string): Promise<void> {
        const usuario = await userS.getUsuario(email);
	
		//Se usuario não for nulo:
        if (usuario !== null) {
        	const livrosId: Array<number> = await empRep.findEmprestimos(usuario.id);
        	
        	//Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
        	//Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
        	if (livrosId.length == 0 ) {
        		console.log(`|----------- Nenhum livro emprestado -----------|`);
        	} else {
        	    livrosId.forEach(async (value: number) => {
        			const livro: Livro = await livS.getLivroByID(value);
        		
        			console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
        		});
        	}
        }
    }
	
	//Método responsável por listar todos os empréstimos do usuário.
    async getEmprestimos(email: string): Promise<void> {
        const usuario = await userS.getUsuario(email);
	
		//Se usuario não for nulo:
        if (usuario !== null) {
        	const livrosId: Array<number> = await empRep.findEmprestimos(usuario.id);
        	
        	//Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
        	//Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
        	if (livrosId.length == 0 ) {
        		console.log(`|----------- Nenhum livro emprestado -----------|`);
        	} else {
        	    livrosId.forEach(async (value: number) => {
        			const livro: Livro = await livS.getLivroByID(value);
        		
        			console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
        		});
        	}
        }
    }
    
    

}
