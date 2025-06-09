import { prisma } from '../index';
import { Livro } from '../modelos/Livro';
import { IConsultaRepository } from './IConsultaRepository';

export class ConsultaRepository implements IConsultaRepository {

	//async consultarLivro(query: string): Promise<Livro[] | null> {
	async consultarLivro(query: string): Promise<void> {
		const livros = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE ` + query);
		console.log(livros);
		if (livros) {
			//return new Livro(livros.id, livros.titulo, livros.isbn);
		} else {
			//return null;
		}
	}
}
