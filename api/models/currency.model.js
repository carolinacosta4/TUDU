module.exports = (mongoose) => {
  const schema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      symbol: { type: String, required: true },
    },
    {
      collection: "currency",
      timestamps: false,
    }
  );

  const CategoryTask = mongoose.model("Currency", schema);
  return CategoryTask;
};
