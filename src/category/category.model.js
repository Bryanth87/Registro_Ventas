import { Schema, model} from "mongoose";

const categorySchema = new Schema({
    name: { 
      type: String, 
      required: true 
    },
    description: { 
        type: String,
        required: true
    },
    status: {
      type: Boolean,
      default: true
  }
},
{
  versionKey: false,
  timeStamps: true
})

categorySchema.methods.toJSON = function(){
  const {_id, ...category} = this.toObject()
  category.uid = _id
  return category
}
    
export default model ("Category", categorySchema)
