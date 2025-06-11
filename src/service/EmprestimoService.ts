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
		const emprestimo = JSON.parse(await empRep.findEmprestimo(livroId, usuarioId));
		
		//Verificar se emprestimo já possui livro e usuário. Se for nulo, não há nenhum empréstimo.
		if (emprestimo !== null) {
			console.log("O usuário já está com o livro emprestado.")
			return true;
		} else {
			const dataEmprestimo = new Date(Date.now());
			const dataVencimento = new Date(dataEmprestimo);
			//Configura a data de vencimento do empréstimo para 1 dia depois, apenas para exemplificar
			dataVencimento.setDate(dataVencimento.getDate() + 1)
			
			empRep.save(livroId, usuarioId, dataEmprestimo.toJSON(), dataVencimento.toJSON());
			console.log("Empréstimo feito!")
			return false;
		}
	}
	
	async validarEmprestimo(livroId: number, usuarioId: number): Promise<boolean> {
		const emprestimo = JSON.parse(await empRep.findEmprestimoAtivo(livroId, usuarioId));
		
		if (emprestimo !== null) {
			return true;
		} else {
			return false;
		}
	}
	
	//Método responsável por listar todos os empréstimos do usuário.
    async getEmprestimos(email: string): Promise<void> {
        const usuario = await userS.getUsuario(email);
	
		//Se usuario não for nulo:
        if (usuario !== null) {
        	const emprestimos: Array<Emprestimo> = JSON.parse(await empRep.findEmprestimos(usuario.id));
        	
        	//Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
        	//Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
        	if (emprestimos.length == 0 ) {
        		console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Nenhum Livro Emprestado ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
        	} else {
        	    emprestimos.forEach(async (value: Emprestimo, index: number, array: Emprestimo[]) => {
        			const livro: Livro = await livS.getLivroByID(parseInt(value.livroID));
        		
        			console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Empréstimo ${index + 1} ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
        			console.log(`Data do Empréstimo: ${value.dataEmprestimo} | Data de Vencimento: ${value.dataVencimento} | Status: ${value.status}`)
        			console.log(`Livro - Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
        		});
        	}
        }
    }
    
    //Método destinado a verificar a data de vencimento de cada empréstimo
    //Atribui o status = 'Devolvido' ao empréstimo se a data atual for maior que a data de vencimento
    async verificarEmprestimos(email: string): Promise<void> {
    	const usuario = await userS.getUsuario(email);
    	
    	//Se usuario não for nulo:
        if (usuario !== null) {
        	const emprestimos: Array<Emprestimo> = JSON.parse(await empRep.findEmprestimos(usuario.id));
        	
        	if (emprestimos.length != 0 ) {
        		const data = new Date(Date.now());
        		emprestimos.forEach(async (value: Emprestimo, index: number, array: Emprestimo[]) => {
        			const data2 = new Date(value.dataVencimento);
					if (data.getTime() > data2.getTime()) {
						empRep.updateStatus(parseInt(value.livroID), parseInt(value.usuarioID));
					}
        		});
        	}
        }
    }
    
    //Atualiza a coluna de status da tabela de Empréstimos.
	async consultarLivroTitulo(paramn: string): Promise<string> {
		//const livro: Livro = JSON.parse(await empRep.consultarLivroParamn(paramn));
		const livro = await empRep.consultarLivroParamn(paramn);
		
		return livro;
	}
    
    //Método responsável por listar todos os empréstimos do usuário.
    async getDevolucoes(email: string): Promise<void> {
        const usuario = await userS.getUsuario(email);
	
		//Se usuario não for nulo:
        if (usuario !== null) {
        	const devolucoes: Array<Emprestimo> = JSON.parse(await empRep.findDevolucoes(usuario.id));
        	
        	//Se o livro não for nulo, o algoritmo lista os empréstimo do Usuário. 
        	//Se for nulo ou possuir tamanho igual a 0, retorna ao usuário uma mensagem.
        	if (devolucoes.length == 0 ) {
        		console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Nenhum Livro Devolvido ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
        	} else {
        	    devolucoes.forEach(async (value: Emprestimo, index: number, array: Emprestimo[]) => {
        			const livro: Livro = await livS.getLivroByID(parseInt(value.livroID));
        		
        			console.log(`~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Devolução ${index + 1} ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~`);
        			console.log(`Data do Empréstimo: ${value.dataEmprestimo} | Data de Vencimento: ${value.dataVencimento} | Status: ${value.status}`)
        			console.log(`Livro - Título: ${livro.titulo}, ISBN: ${livro.isbn}, Categoria: ${livro.categoria}, Ano de Publicação: ${livro.anoPublicacao}`);
        		});
        	}
        }
    }
}
