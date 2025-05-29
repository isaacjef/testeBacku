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

	//O try...catch pode ser implementado em LivroService, quando este chamar por findByISBN.
	//Tratar possível retorno nulo em LivroService, ou em InterfaceLivro
    async findByISBN(isbn: string): Promise<Livro | null> {
        //Busca no banco de dados por um livro que contenha o ISBN passado via parâmetro.
        const livro = await prisma.livro.findUnique({ where: { isbn: isbn } });
        console.log("Possível mensagem de log. Repository.");
        
        if (livro) { //Se livro tiver um valor
        	return new Livro(livro.id, livro.titulo, livro.isbn);
        } else {
        	return null;
        }
    }
}
