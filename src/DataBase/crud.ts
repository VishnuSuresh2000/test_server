import { Model, Document } from 'mongoose'
import { AlredyExist, NoRecordFound } from '../CustomExceptions/Custom_Exception'

class CRUD {
    _model: Model<Document>

    constructor(model: Model<Document>) {
        this._model = model
    }
    async addData(data: object) {
        try {
            var temp2 = await this.isExist(data)
            if (!temp2) {
                var temp = new this._model(data)
                await temp.save()
                return "Record added"
            } else {
                throw new AlredyExist()
            }
        } catch (error) {
            console.log("error from addData Crud", error)
            throw error
        }
    }
    async read() {
        try {
            var data = await this._model.find()
            if (data.length == 0) {
                throw new NoRecordFound()
            }
            return data
        } catch (error) {
            console.log("error from read Crud", error)
            throw error
        }
    }

    async isExist(param: object) {
        try {
            var temp = await this._model.find(param)
            if (temp.length == 0) {
                return false
            }
            return true
        } catch (error) {
            console.log("error from isExist Crud", error)
            throw error
        }
    }

    async updateRecord(id: string, data: object) {
        try {
            var temp2 = await this.isExist({ _id: id })
            if (temp2) {
                await this._model.findByIdAndUpdate(id, data)
                return "Record Update"
            } else {
                throw new NoRecordFound()
            }
        } catch (error) {
            console.log("error on updateRecord crud", error)
            throw error
        }
    }

    async deleteRecord(id: string) {
        try {
            var temp2 = await this.isExist({ _id: id })
            if (temp2) {
                await this._model.findByIdAndRemove(id)
                return "Record Delete"
            } else {
                throw new NoRecordFound()
            }

        } catch (error) {
            console.log("error from deleteRecord Crud", error)
            throw error
        }
    }
    async readSingleRecord(id: string) {
        try {
            var temp2 = await this.isExist({ _id: id })
            if (temp2) {
                let temp = await this._model.findOne({ _id: id })
                return temp?.toJSON()
            } else {
                throw new NoRecordFound()
            }
        } catch (error) {
            console.log("error on deleteRecord Crud", error)
            throw error
        }
    }
}

export default CRUD