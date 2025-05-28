const OwnerMessage = mongoose.model("OwnerMessage", {
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now },
});