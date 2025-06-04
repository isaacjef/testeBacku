import { prisma } from '../index';
import { Emprestimo } from '../modelos/Emprestimo';

export class EmprestimoRepository {
	vetor: number[] = []

	async save(livroId: number, usuarioId: number): Promise<void> {
		await prisma.emprestimo.create({
			data: {
				livroID: livroId,
				usuarioID: usuarioId,
			},
		})
	}
	//tratar saída 0 ou nula.
	async findEmprestimos(usuarioId: number): Promise<number[]> {
		const emprestimos = await prisma.emprestimo.findMany({
			where: {
				usuarioID: usuarioId,
			},
			omit: {
				usuarioID: true,
			},
		})
		console.log(emprestimos.length);
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
