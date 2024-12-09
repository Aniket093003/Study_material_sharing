import { strict } from "assert";
import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { type } from "os";
import { format } from "path";
import { title } from "process";
const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["tech", "health", "finance", "trading"],
    },
    book: [
      {
        title: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
        pdf: {
          type: String,
          required: true,
        },
      },
    ],

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

materialSchema.plugin(mongooseAggregatePaginate);

const Book = mongoose.model("Book", materialSchema);
export default Book;
