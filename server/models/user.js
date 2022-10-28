import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
      minlength: [5, 'Must be at least length 5, got {VALUE}'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    profilePic: {
      type: String,
      required: true,
      default: '/images/default.jpg',
    },
    signature: {
      type: String,
      required: true,
      default: 'Default signature',
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
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

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.password;
    delete returnedObject.updatedAt;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);
export default User;
