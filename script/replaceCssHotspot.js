// Script pour mettre à jour le css des hotspots selon un tableau de correspondance

const fs = require("fs");
const path = require("path");

// Tableau de correspondance : linkedscene => nouveau css
const correspondances = {
  scene_1:
    "background-image:url('https://guillaumeducuing.github.io/krpano/skin/skin-1.png');background-size:auto 50px;background-repeat:no-repeat;background-position:left;overflow:hidden;box-sizing:border-box;border-radius:30px; cursor:pointer;",
  scene_2:
    "background-image:url('https://guillaumeducuing.github.io/krpano/skin/skin-2.png');background-size:auto 50px;background-repeat:no-repeat;background-position:left;overflow:hidden;box-sizing:border-box;border-radius:30px; cursor:pointer;",
  scene_3:
    "background-image:url('https://guillaumeducuing.github.io/krpano/skin/skin-3.png');background-size:auto 50px;background-repeat:no-repeat;background-position:left;overflow:hidden;box-sizing:border-box;border-radius:30px; cursor:pointer;"
};

const xmlPath = path.join(__dirname, "../tour.xml");
let xml = fs.readFileSync(xmlPath, "utf8");

// Regex pour trouver tous les hotspots
xml = xml.replace(/<hotspot([^>]+)>?/g, (match, attrs) => {
  // Cherche l'attribut linkedscene
  const linkedsceneMatch = attrs.match(/linkedscene="([^"]+)"/);
  if (linkedsceneMatch) {
    const linkedscene = linkedsceneMatch[1];
    if (correspondances[linkedscene]) {
      // Remplace ou ajoute l'attribut css
      if (attrs.match(/css="[^"]*"/)) {
        attrs = attrs.replace(
          /css="[^"]*"/,
          `css="${correspondances[linkedscene]}"`
        );
      } else {
        attrs += ` css="${correspondances[linkedscene]}"`;
      }
      return `<hotspot${attrs}>`;
    }
  }
  return `<hotspot${attrs}>`;
});

fs.writeFileSync(xmlPath, xml, "utf8");
console.log("Mise à jour terminée !");
