const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  position: {
    type: String,
  },
  description: {
    type: String,
  },
  techonologies: {
    type: Map,
    of: String,
  },
  logo: {
    type: String,
  },
  projects: [
    {
      projectName: {
        type: String,
        required: true,
      },
      productionUrl: {
        type: String,
      },
      techonologies: {
        type: Map,
        of: String,
      },
    },
  ],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
