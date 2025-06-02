"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeloBase = void 0;
class ModeloBase {
    //DataCriacao?: Date;
    //DataUpdate?: Date;
    constructor(id) {
        this._id = id;
        //this.DataCriacao = new Date();
        //this.DataUpdate = new Date();
    }
    get id() {
        return this._id;
    }
}
exports.ModeloBase = ModeloBase;
/* DESCRIÇÃO:
 *  Serve de modelo base para qualquer coisa a ser criada
 *  carrega consigo o ID, que será herdado pelas classes filhas
 *  e possiveis data de criação e atualização de cada coisa.
 */
