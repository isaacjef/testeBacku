import { Livro } from '../modelos/Livro';

export interface IConsultaRepository {

	consultarLivro(query: string): Promise<void>
}
