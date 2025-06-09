import { Emprestimo } from '../modelos/Emprestimo';

export interface IEmprestimoRepository {

    save(livroId: number, usuarioId: number): Promise<void>
    findEmprestimo(livroId: number, usuarioId: number): Promise<string>
    findEmprestimos(usuarioId: number): Promise<number[]>
}
