const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  createdAnnouncements: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: []
  }],
  games: [{
      game: { type: String },
      rank: { type: String },
      numberOfHours: { type: Number }
  }],
  birthYear: {
    type: String, 
    required: false
  },
  description: {
    type: String, 
    required: false
  },
  imagePath: { 
    type: String, 
    required: false,
    default: 'http://localhost:3000/images/placeholder-avatar.png'
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
  };

userSchema.methods.validPassword = function(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
    return this.hash === hash;
  };

userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
      },
      'MY_SECRET'
    );
  };

mongoose.model('User', userSchema);