module.exports = (mongoose) => {
  const schema = new mongoose.Schema({
    IDuser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastDateAccessed: { type: Date, required: true },
    streaks: { type: Number, required: true, default: 0 }
  }, {
    collection: 'streaks',
    timestamps: false
  });

  const Streak = mongoose.model('Streak', schema);
  return Streak;
};
