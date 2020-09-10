import { connect, set } from 'mongoose'

const connectionStart = (): void => {
    var db: string = "test"
    var localhost: string = "mongodb://localhost:27017/"
    connect(localhost + db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("DB Connected")
    }).catch((error) => {
        console.log("error on DB conection", error)
    })
    set('useFindAndModify', false)
}

export default connectionStart