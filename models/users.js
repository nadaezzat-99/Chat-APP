const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    maxLength: 11,
    minLength: 11,
    unique: true,
  },
  pic: {
    type: String,
    default: 'https://drive.google.com/file/d/1QkRU7kJ-e24xymcppcZMC6SFo0IQ0dOo/view?usp=share_link',

  },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
    },
  },
  timestamps: true,
});

userSchema.pre('save', function hashPass(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.verifyPassword = function verifyPassword(pass) {
  return bcrypt.compareSync(pass, this.password);
};

userSchema.pre('updateOne', { document: true, query: false }, function hashPass(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
