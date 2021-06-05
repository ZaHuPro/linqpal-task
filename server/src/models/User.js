import mongoose from '../providers/Database';
import { rsaEncrypt, rsaDecrypt } from '../utils/Encryption';

// Define the User Schema
export const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phoneNumber: { type: String, unique: true },
  ssn: { type: String },
},
{ timestamps: true });

userSchema.pre('save', function preSave(next) {
  if (!this.isModified('ssn')) {
    return next();
  }
  this.ssn = rsaEncrypt(this.ssn);
  return next();
});

userSchema.post('save', (result) => {
  result.ssn = rsaDecrypt(result.ssn);
  return result;
});

userSchema.post('find', (result) => result.map((each) => {
  each.ssn = rsaDecrypt(each.ssn);
  return each;
}));

export default mongoose.model('User', userSchema);
