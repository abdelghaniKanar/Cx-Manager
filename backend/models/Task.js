import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["À faire", "En cours", "Terminé"],
      default: "À faire",
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
