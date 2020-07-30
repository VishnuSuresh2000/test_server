import { changeStateSyncCategory } from "../../CustomStream/CheckDataChaged";
import category from "../../Schemas/category";


export async function addImgCategory(id: string, value: boolean) {
    try {
        let temp = await category.findOne({_id:id})
        if(temp!=null){
            await category.findOneAndUpdate({_id:id},{hasImg:value})
            changeStateSyncCategory.push("true")
            return `Image has ${value?'Added':'Not Added'}`
        }else{
            throw new Error("No record Found")
        }
    } catch (error) {

    }
}