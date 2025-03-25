import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }, // Lien avec le fournisseur
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Liste des tâches qui utilisent cette ressource
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
