// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");

// (Étape 2) Définition du schéma category
// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/schematypes.html#schematype-options
const categorySchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  category: {
    type: String,
    required: true,
  },
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
categorySchema.virtual("id").get(function () {
  return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// (Étape 4) Export du modèle student
// Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB.
module.exports = mongoose.model("categories", categorySchema);
