import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = Schema({
 name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, maxlength: 50, unique: true },
  password: { type: String, required: true, maxlength: 5000 },
  role: {
    type: String,
    required: true,
    maxlength: 50,
    enum: ["USER", "BUSINESS"],
  },  
  zipcode: { type: String, maxlength: 500 },

});
export default mongoose.model("User", schema);
