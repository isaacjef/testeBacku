export abstract class ModeloBase {
    private _id: number;
    //DataCriacao?: Date;
    //DataUpdate?: Date;
  
    constructor(id: number) {
    	this._id = id;
     	//this.DataCriacao = new Date();
      	//this.DataUpdate = new Date();
    }
    
    public get id() {
    	return this._id;
    }
}

/* DESCRIÇÃO:
 *  Serve de modelo base para qualquer coisa a ser criada
 *  carrega consigo o ID, que será herdado pelas classes filhas
 *  e possiveis data de criação e atualização de cada coisa. 
 */
