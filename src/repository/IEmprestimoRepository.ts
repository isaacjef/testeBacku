import { Emprestimo } from '../modelos/Emprestimo';

export interface IEmprestimoRepository {

    save(livroId: number, usuarioId: number, dataEmprestimo: string, dataVencimento: string): Promise<void>
    findEmprestimo(livroId: number, usuarioId: number): Promise<string>
    findEmprestimo(livroId: number, usuarioId: number): Promise<string>
    findEmprestimos(usuarioId: number): Promise<string> 
    findDevolucoes(usuarioId: number): Promise<string>
    updateStatus(livroId: number, usuarioId: number): Promise<void>
    consultarLivroParamn(paramn: string): Promise<string>
}
