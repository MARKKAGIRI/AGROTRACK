const { body } = require("express-validator");

const cropValidation = [
  body("cropName")
    .trim()
    .notEmpty()
    .withMessage("Crop name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Crop name must be between 2 and 100 characters"),
  body("plantingDate")
    .notEmpty()
    .withMessage("Planting date is required")
    .isISO8601()
    .withMessage("Invalid planting date format"),
  body("harvestDate")
    .notEmpty()
    .withMessage("Harvest date is required")
    .isISO8601()
    .withMessage("Invalid harvest date format")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.plantingDate)) {
        throw new Error("Harvest date must be after planting date");
      }
      return true;
    }),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["upcoming", "in-progress", "completed"])
    .withMessage("Status must be upcoming, in-progress, or completed"),
];

module.exports = cropValidation