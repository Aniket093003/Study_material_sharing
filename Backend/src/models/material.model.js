import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["tech", "health", "finance", "trading"],
    },
    file: { type: String, required: true },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

materialSchema.plugin(mongooseAggregatePaginate);

const Book = mongoose.model("Book", materialSchema);
export default Book;
