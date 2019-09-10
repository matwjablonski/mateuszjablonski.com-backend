const mongoose = require('mongoose');

const glossarySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  entry: {
    type: String,
  },
  fullName: {
    type: String,
  },
  similar: {
    type: Map,
    of: String,
  },
  description: {
    type: String,
  },
  categories: {
    type: Map,
    of: String,
  },
});

const Glossary = mongoose.model('Glossary', glossarySchema);

module.exports = Glossary;
