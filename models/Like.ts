import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
});

const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

export default Like;
