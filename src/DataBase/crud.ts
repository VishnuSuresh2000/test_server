import { Model, Document } from 'mongoose'

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
                throw new Error("all ready exist")
            }
        } catch (error) {
            console.log("error", error)
            throw new Error(`Record not added {error on add}`)
        }
    }
    async read() {
        try {
            var data = await this._model.find()
            if (data.length == 0) {
                throw new Error("No Records Found")
            }
            return data
        } catch (error) {
            console.log("error on fun:read", error)
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
            console.log(error)
            throw new Error(`error occured {error on isExist}`);

        }
    }

    async updateRecord(id: string, data: object) {
        try {
            var temp2 = await this.isExist({ _id: id })
            if (temp2) {
                await this._model.findByIdAndUpdate(id, data)
                return "Record Update"
            } else {
                throw new Error("Record Not exist")
            }
        } catch (error) {
            console.log("error on updateRecord", error)
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
                throw new Error("Record Not exist")
            }

        } catch (error) {
            console.log("error on deleteRecord", error)
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
                throw new Error("Record Not exist")
            }
        } catch (error) {
            console.log("error on deleteRecord", error)
            throw error
        }
    }
}

export default CRUD