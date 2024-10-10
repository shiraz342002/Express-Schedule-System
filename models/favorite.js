import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
});


export default mongoose.model("Fav", FavoriteSchema);