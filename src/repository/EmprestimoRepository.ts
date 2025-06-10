import { prisma } from '../index';
import { StatusEmprestimo } from "../enumeracao/StatusLivro"
import { Emprestimo } from '../modelos/Emprestimo';
import { LivroService } from '../service/LivroService';
import { UsuarioService } from '../service/UsuarioService';
import { IEmprestimoRepository } from './IEmprestimoRepository';

const userS = new UsuarioService();
const livS = new LivroService();

export class EmprestimoRepository implements IEmprestimoRepository {
	vetor: number[] = [];
	
	//Salva um empréstimo no BD com ID de Livro e de Usuário passado via parâmetro.
	//Antes, verifica se os IDs passados são válidos, isto é, existentes no BD.
	async save(livroId: number, usuarioId: number, dataEmprestimo: string, dataVencimento: string): Promise<void> {	
		await prisma.emprestimo.create({
			data: {
				livroID: livroId,
				usuarioID: usuarioId,
				dataEmprestimo: dataEmprestimo,
  				dataVencimento: dataVencimento,
  				status: StatusEmprestimo.ATIVO,
			},
		})
	}
	
	//Busca no BD por um empréstimo que contenha o ID de Livro e Usuario passados via parâmetro.
	//Converte o retorno do BD em uma string JSON.
	//Método utilizado em adicionarEmprestimo da classe EmprestimoService.
	//Diminuímos a chance de ocorrer erro de ID, ao verificarmos se existe Usuario e Livro antes de o utilizarmos.
	async findEmprestimo(livroId: number, usuarioId: number): Promise<string> {
		const emprestimo = await prisma.emprestimo.findUnique({
			where: {
				livroID_usuarioID: {
					livroID: livroId,
					usuarioID: usuarioId,
				},
			},
		})
		
		return JSON.stringify(emprestimo);
	}	
	
	//Busca no BD por todos os empréstimos do Usuario, com status = 'Ativo'
	//Converte o retorno do BD em uma string JSON, que pode ser nula ou conter um array de Emprestimos
	//Método implementado em getEmprestimos() de EmprestimoService, deve tratar saída nula.
	async findEmprestimos(usuarioId: number): Promise<string> {
		const emprestimos = await prisma.emprestimo.findMany({
			where: {
				usuarioID: usuarioId,
				status: 'Ativo',
			},
		})
		
		return JSON.stringify(emprestimos);
	}
	
	
	//Busca no BD por todos os empréstimos do Usuario com status = 'Devolvido'
	//Converte o retorno do BD em um array de números.
	//Método implementado em getEmprestimos() de EmprestimoService, deve tratar saída nula.
	async findDevolucoes(usuarioId: number): Promise<string> {
		const devolucoes = await prisma.emprestimo.findMany({
			where: {
				usuarioID: usuarioId,
				status: 'Devolvido',
			},
		})
		
		return JSON.stringify(devolucoes);
	}
	
	//Atualiza a coluna de status da tabela de Empréstimos.
	async updateStatus(livroId: number, usuarioId: number): Promise<void> {
		const emprestimo = await prisma.emprestimo.update({
			where: {
				livroID_usuarioID: {
					livroID: livroId,
					usuarioID: usuarioId,
				},
			},
			data: {
				status: 'Devolvido',
			},
		})
	}
}
