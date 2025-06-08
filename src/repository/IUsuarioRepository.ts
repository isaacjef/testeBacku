import { Usuario } from '../modelos/Usuario';

export interface IUsuarioRepository {

/* Possíveis métodos:
*  listar registros
*  salvar no BD (criar)
*  deletar do BD
*
*/

    save(nome: string, senha: string, email: string): Promise<void>
    findByEmail(email: string): Promise<Usuario | null>
    listarUsuarios(): void

}
