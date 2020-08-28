import { Schema } from "mongoose"
import IProgressNote from "./Schema Interface/IProgressNotes"

var progressNote = new Schema<IProgressNote>({
    progress: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default  progressNote