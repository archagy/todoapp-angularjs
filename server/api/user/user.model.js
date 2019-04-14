'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './user.events';

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
});

registerEvents(UserSchema);
export default mongoose.model('User', UserSchema);
