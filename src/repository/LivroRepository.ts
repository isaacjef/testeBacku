import { prisma } from '../index';
import { CategoriaLivro } from "../enumeracao/CategoriaLivro"
import { Livro } from '../modelos/Livro';
import { ILivroRepository } from './ILivroRepository';

export class LivroRepository implements ILivroRepository {
	
	//Salva um Livro no banco de dados.
	async save(titulo: string, isbn: string, categoria: CategoriaLivro, anoPublicacao: string): Promise<void>  {
		try {
			await prisma.livro.create({
            	data: {
                	titulo: titulo,
                	isbn: isbn,
                	categoria: categoria,
                	anoPublicacao: anoPublicacao,
            	},
        	})
		} catch (error: any) {
			console.log("Livro não inserido: " + error.message);
		}
	}
	
	//Busca um Livro no BD via id, e retorna os dados do Livro como uma string JSON.
	async findByID(id: number): Promise<string> {
		const livro = await prisma.livro.findUnique({
			where: { 
				id: id, 
			}, 
		});
		
		return JSON.stringify(livro);
	}

	//O try...catch pode ser implementado em LivroService, quando este chamar por findByISBN.
	//Tratar possível retorno nulo em LivroService, ou em InterfaceLivro
    async findByISBN(isbn: string): Promise<string> {
        //Busca no banco de dados por um livro que contenha o ISBN passado via parâmetro.
        const livro = await prisma.livro.findUnique({ where: { isbn: isbn, }, });

        return JSON.stringify(livro);
    }
    
    //Utilizado em consulta
    /*async findFirstTitulo(titulo: string): Promise<string> {
    	const livro = await prisma.livro.findFirst({ 
    		where: { 
    			titulo: titulo,
    		},
    	});

        return JSON.stringify(livro);
    }*/
    
    //Consulta todos os livros do banco de dados. Utilizado em getLivros() de LivroService
    async consultarLivros(): Promise<string> {
		const livros = JSON.stringify(await prisma.$queryRawUnsafe(`SELECT * FROM Livro`));
		return livros;
	}
    
    //Método simples que permite modificar o título do Livro.
	async updateTitulo(isbn: string, titulo: string): Promise<void> {
		try {
			await prisma.livro.update({
				where: {
					isbn: isbn,
				},
				data: {
					titulo: titulo,
				},
			})
        } catch (error: any) {
			console.log("Título não atualizado: " + error.message);
		}
	}
	
	//Método que permite deletar algum Livro via ISBN.
	async deleteByISBN(isbn: string): Promise<void> {
		try {
			await prisma.livro.delete({
				where: {
					isbn: isbn,
				},
			})
        } catch (error: any) {
			console.log("Usuário não deletado: " + error.message);
		}
	}
}
