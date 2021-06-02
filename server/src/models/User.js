import mongoose from '../providers/Database';
import { encrypt, decrypt } from '../utils/Encryption';

// Define the User Schema
export const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phoneNumber: { type: Number, unique: true },
  ssn: { type: String },
},
{ timestamps: true });

userSchema.pre('save', function preSave(next) {
  if (!this.isModified('ssn')) {
    return next();
  }
  this.ssn = encrypt(this.ssn);
  return next();
});

userSchema.post('save', (result) => {
  result.ssn = decrypt(result.ssn);
  return result;
});

userSchema.post('find', (result) => result.map((each) => {
  each.ssn = decrypt(each.ssn);
  return each;
}));

export default mongoose.model('User', userSchema);
