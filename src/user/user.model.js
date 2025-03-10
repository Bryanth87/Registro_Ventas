import { Schema, model} from "mongoose";

const userSchema = Schema({
    name: { 
      type: String, 
      required: true 
    },
    surname:{
      type: String,
    },
    username:{
      type: String,
      required: true,
      unique: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String,
      required: true 
    },
    role: { 
      type: String,
      enum: ['ADMIN_ROLE', 'CLIENT_ROLE'], 
      default: 'CLIENT_ROLE' 
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function () {
    const { password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;

};

export default model ("User", userSchema)