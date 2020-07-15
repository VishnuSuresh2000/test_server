import {Schema, Document,model} from 'mongoose'

interface ICategory extends Document{
    name:string
}

const category=new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    }
})


export default model<ICategory>("Category",category)