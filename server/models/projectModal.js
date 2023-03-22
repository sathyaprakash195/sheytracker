const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    roles: {
      type: [String],
      default: ["member"],
    },
  },
  {
    timestamps: true,
  }
);

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  members: [memberSchema],
  status: {
    type: String,
    default: "active",
  },
});

const Project = mongoose.model("projects", projectSchema);
module.exports = Project;
