module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      image: { type: String },
      cloudinary_id: { type: String },
    },
    {
      collection: "achievements",
      timestamps: false,
    }
  );
  const Achievement = mongoose.model("Achievement", schema);
  return Achievement;
};
