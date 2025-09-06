// models/Reservation.js
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["SUCCESS", "FAILED"], required: true },
  reason: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

const Reservation= mongoose.model('Reservation', reservationSchema);
export default Reservation; 