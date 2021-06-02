import mongoose from '../providers/Database';

// Define the User Schema
export const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phoneNumber: { type: Number, unique: true },
  ssn: { type: String, unique: true },
},
{ timestamps: true });

export default mongoose.model('User', userSchema);
