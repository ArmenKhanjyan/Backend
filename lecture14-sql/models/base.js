import pool from "../db/config.js"
export class BaseModel {
   table = null
   _select = "*"
   _limit = 0
   _where = []

    select(name) {
       this._select = name || "*"    
        return this  
   }
    where(age,op,val) {
      this._where.push(`${age} ${op} ${val} `)
      return this
   }
    andWhere(salary,op,val) {
     this._where.push(`${salary} ${op} ${val} `)
      return this
   }
   limit(quantity) {
        this._limit = quantity
        return this
   }
   async get() {
      let command = `SELECT ${this._select} FROM ${this.table} WHERE `
                
         if (this.where.length) {
          command +=  this._where.join(' AND ')
         }
         if(this._limit !== 0) {
          command += " LIMIT " + this._limit
         }
         const[rows] =  await pool.query(command)
        return rows
       }
} 

  
