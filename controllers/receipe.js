// Import du modèle receipe
var Receipe = require("../models/receipe");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const receipeValidationRules = () => {
  return [
    body("receipeName")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Receipe name must be specified.")
      .isAlphanumeric()
      .withMessage("Receipe name has non-alphanumeric characters."),

    body("descriptionReceipe")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Receipe description must be specified.")
      .isAlphanumeric()
      .withMessage("Receipe description has non-alphanumeric characters."),

    body("time")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Time must be specified."),
    body("level")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Level must be specified."),
    body("category")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Category must be specified."),
  ];
};

const paramIdValidationRule = () => {
  return [
    param("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Id must be specified.")
      .isNumeric()
      .withMessage("Id must be a number."),
  ];
};

const bodyIdValidationRule = () => {
  return [
    body("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Id must be specified.")
      .isNumeric()
      .withMessage("Id must be a number."),
  ];
};

// Méthode de vérification de la conformité de la requête
const checkValidity = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Create
exports.create = [
  bodyIdValidationRule(),
  receipeValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de student à ajouter
    var receipe = new Receipe({
      _id: req.body.id,
      receipeName: req.body.receipeName,
      descriptionReceipe: req.body.descriptionReceipe,
      time: req.body.time,
      level: req.body.level,
      category: req.body.category,
    });

    // Ajout de student dans la bdd
    receipe.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json("Receipe created successfully !");
    });
  },
];

// Read
exports.getAll = (req, res, next) => {
  Receipe.find(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  }).populate("category");
};

exports.getById = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Receipe.findById(req.params.id).exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
  },
];

// Update
exports.update = [
  paramIdValidationRule(),
  receipeValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de student à modifier
    var receipe = new Receipe({
      _id: req.body.id,
      receipeName: req.body.receipeName,
      descriptionReceipe: req.body.descriptionReceipe,
      time: req.body.time,
      level: req.body.level,
      category: req.body.category,
    });

    Receipe.findByIdAndUpdate(req.params.id, receipe, function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!result) {
        res
          .status(404)
          .json("Receipe with id " + req.params.id + " is not found !");
      }
      return res.status(201).json("Receipe updated successfully !");
    }).populate("category");
  },
];

// Delete
exports.delete = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Receipe.findByIdAndRemove(req.params.id).exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!result) {
        res
          .status(404)
          .json("Receipe with id " + req.params.id + " is not found !");
      }
      return res.status(200).json("Receipe deleted successfully !");
    });
  },
];
