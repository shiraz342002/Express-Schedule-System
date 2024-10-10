import mongoose from "mongoose";
const ESchema = mongoose.Schema;

const eventschema = ESchema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { type: String },
  event_name: { type: String, required: true, maxlength: 50 },
  category: { type: String, required: true, maxlength: 50 },
  date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  description: { type: String, required: true },
  liability: { type: String, required: true },
  videolink: { type: String, required: true },
  socialpagelink: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point", required: false },
    // long , lat
    coordinates: { type: [Number], required: true },
  },
  fee: { type: Number, required: true },
});
export default mongoose.model("Event", eventschema);
