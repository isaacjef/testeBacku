import { Livro } from '../modelos/Livro';

export interface ILivroRepository {

	//findByTitulo, Titulo & ISBN, etc...

	save(titulo: string, email: string): Promise<void>
	findByID(id: number): Promise<string>
    findByISBN(isbn: string): Promise<Livro | null>
 	

}
