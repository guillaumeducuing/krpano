const fs = require("fs-extra");
const path = require("path");

// Supprimer le dossier "plugins"
fs.removeSync(path.join(__dirname, "../plugins"));

// Supprimer les fichiers "vtourskin*" dans "skin"
const skinDir = path.join(__dirname, "../skin");
if (fs.existsSync(skinDir)) {
  const files = fs.readdirSync(skinDir);
  files.forEach(file => {
    if (file.startsWith("vtourskin")) {
      fs.removeSync(path.join(skinDir, file));
    }
  });
}
console.log(
  "Nettoyage terminé : plugins supprimé, fichiers vtourkin* supprimés dans skin."
);
