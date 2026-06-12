const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    countryCode: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    flag: {
      type: String,
      required: true,
    },

    data: {
      type: String,
      required: true,
    },

    dataGb: {
      type: Number,
      required: true,
    },

    validityDays: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    network: {
      type: String,
      enum: ["4G", "5G"],
      default: "4G",
    },

    quality: {
      type: Number,
      default: 4,
    },

    carriers: {
      type: [String],
      default: [],
    },

    hotspot: {
      type: Boolean,
      default: true,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

planSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Plan", planSchema);