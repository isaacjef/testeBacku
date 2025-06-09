import { prisma } from '../index';
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
	async save(livroId: number, usuarioId: number): Promise<void> {	
		await prisma.emprestimo.create({
			data: {
				livroID: livroId,
				usuarioID: usuarioId,
			},
		})
	}
	
	//Busca no BD por um empréstimo que contenha o ID de Livro e Usuario passados via parâmetro.
	//Converte o retorno do BD em uma string JSON.
	//O método que o implementar, deve tratar saída nula.
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
	
	//Busca no BD por todos os empréstimos do Usuario.
	//Converte o retorno do BD em um array de números.
	//O método que o implementar, deve tratar saída nula.
	async findEmprestimos(usuarioId: number): Promise<number[]> {
		const emprestimos = await prisma.emprestimo.findMany({
			where: {
				usuarioID: usuarioId,
			},
			omit: {
				usuarioID: true,
			},
		})
		
		for (let i = 0; i < emprestimos.length; i++) {
			this.vetor[i] = emprestimos[i].livroID;
		}
		
		if (emprestimos) {
			return this.vetor;
		} else {
			return [];
		}
	}
}
