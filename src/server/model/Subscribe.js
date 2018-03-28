import mongoose from 'mongoose';
import database from './database'
const Schema = mongoose.Schema;

const Subscribe = new Schema({
  email: String,
});

export default database.model('Subscribe', Subscribe)
