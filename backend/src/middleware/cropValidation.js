const { body } = require("express-validator");

const cropValidation = [
  body("cropId")
    .notEmpty()
    .withMessage("Crop ID is required")
    .isInt()
    .withMessage("Crop ID must be an integer"),
  body("plantingDate")
    .notEmpty()
    .withMessage("Planting date is required")
    .isISO8601()
    .withMessage("Invalid planting date format"),
  body("harvestDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid harvest date format")
    .custom((value, { req }) => {
      if (value && new Date(value) <= new Date(req.body.plantingDate)) {
        throw new Error("Harvest date must be after planting date");
      }
      return true;
    }),
  body("status")
    .optional()
    .isIn(["plantend", "growing", "harvested"])
    .withMessage("Status must be plantend, growing, or harvested"),
];

module.exports = cropValidation