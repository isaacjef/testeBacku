import { prisma } from '../index';
import { Livro } from '../modelos/Livro';
import { ILivroRepository } from './ILivroRepository';

export class LivroRepository implements ILivroRepository {

	async save(titulo: string, isbn: string): Promise<void> {
		await prisma.livro.create({
            data: {
                titulo: titulo,
                isbn: isbn,
            },
        })
	}

	//O email, neste caso, é único
    async findByISBN(isbn: string): Promise<void> {
        const livro = prisma.livro.findUnique({ where: { isbn: isbn } });
        console.log(livro);
        //return new Livro();
    }
}
