/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const adminSchema = new Schema<TAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  },
);

// hashing password and save into DB
adminSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// set '' after saving password
adminSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});

//check if the user is Exists
adminSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await Admin.findOne({ email });
};

//check if the password is mached
adminSchema.statics.isPasswordMatched = async function (
  planTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planTextPassword, hashedPassword);
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
