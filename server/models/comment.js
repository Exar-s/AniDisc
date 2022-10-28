import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: Object,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(paginate);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
