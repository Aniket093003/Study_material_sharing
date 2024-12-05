import mongoose from 'mongoose';


const materialSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true, 
        enum: ['tech', 'health', 'finance', 'trading', 'other'],
        default: 'others'
    },
    fileUrl: { 
        type: String, 
        required: true },
    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' },
}) 

const Material = mongoose.model("Material", materialSchema);
export default Material;