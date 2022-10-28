import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: Object,
    },
    animeID: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);
export default Post;
