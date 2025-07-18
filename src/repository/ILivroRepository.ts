import { Livro } from '../modelos/Livro';
import { CategoriaLivro } from "../enumeracao/CategoriaLivro"

export interface ILivroRepository {

	//findByTitulo, Titulo & ISBN, etc...

	save(titulo: string, isbn: string, categoria: CategoriaLivro, anoPublicacao: string): Promise<void>
	findByID(id: number): Promise<string>
    findByISBN(isbn: string): Promise<string>
    consultarLivros(): Promise<string>
 	updateTitulo(isbn: string, titulo: string): Promise<void>
	deleteByISBN(isbn: string): Promise<void>
}
