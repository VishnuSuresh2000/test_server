
import cartLog from "../../Schemas/cartLog";

export async function addCartLog(data:any){
    try {
        var temp= new cartLog(data)
        await temp.save()
        return "Added to Cart log"
    } catch (error) {
        throw error
    }
}

export async function readCartLog(){
    try {
        return await cartLog.find()
    } catch (error) {
        throw error
    }
}

export async function readSinglelog(id:string){
    try {
        return await cartLog.findOne({_id:id})
    } catch (error) {
        throw error
    }
}

