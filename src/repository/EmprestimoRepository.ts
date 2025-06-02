import { prisma } from '../index';
//import { Emprestimo } from '../modelos/Emprestimo';

export class EmprestimoRepository {

	async save(livroId: number, usuarioId: number): Promise<void> {
		await prisma.emprestimo.create({
			data: {
				livroID: livroId,
				usuarioID: usuarioId,
			},
		})
	}
	//retur nstrings
	async findEmprestimos(usuarioId: number): Promise<string> {
		const emprestimos = await prisma.emprestimo.findMany({
			where: {
				usuarioID: usuarioId,
			},
			omit: {
				usuarioID: true,
			},
		})
		
		if (emprestimos) {
			return JSON.stringify(emprestimos);
		} else {
			return '';
		}
	}
}
