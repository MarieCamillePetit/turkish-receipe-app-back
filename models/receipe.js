// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

// (Étape 2) Définition du schéma student
// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/schematypes.html#schematype-options
const receipeSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  receipeName: { type: String, required: true },
  descriptionReceipe: { type: String, required: true },
  time: { type: String, required: true },
  level: { type: String, required: true },
  receipeImg: { type: String, required: true },
  receipeYtb: { type: String, required: true },
  category: {
    type: Number,
    required: true,
    ref: "categories",
    // enum: ["Starters", "Main-Courses", "Dessert"],
  },
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
receipeSchema.virtual("id").get(function () {
  return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
receipeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// (Étape 4) Export du modèle student
// Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB.
module.exports = mongoose.model("receipe", receipeSchema);
