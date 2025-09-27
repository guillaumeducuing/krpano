/* Ce script met à jour les hotspots avec les skins, le style du hotspot et la fonction onclick  */

const fs = require("fs");
const path = require("path");

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
xml = xml.replace(/<hotspot([^>]*)\s*(\/?)>/g, (match, attrs, closing) => {
  // Cherche l'attribut linkedscene
  const linkedsceneMatch = attrs.match(/linkedscene="([^"]+)"/);
  let cssAttr = "";
  if (linkedsceneMatch) {
    const linkedscene = linkedsceneMatch[1];
    if (correspondances[linkedscene]) {
      // Remplace ou ajoute l'attribut css
      if (attrs.match(/css="[^"]*"/)) {
        cssAttr = `css="${correspondances[linkedscene]}"`;
        attrs = attrs.replace(/css="[^"]*"/g, "");
      } else {
        cssAttr = `css="${correspondances[linkedscene]}"`;
      }

      // Supprime style et onclick existants
      attrs = attrs.replace(/style="[^"]*"/g, "");
      attrs = attrs.replace(/onclick="[^"]*"/g, "");

      // Nettoyage des espaces
      attrs = attrs.trim().replace(/\s+/g, " ");

      // Place style, onclick, css juste après <hotspot
      const styleAttr = 'style="hotspot_custom_style"';
      const onclickAttr =
        'onclick="loadscene(get(linkedscene), null, MERGE, BLEND(0.5));"';
      const allAttrs = `${styleAttr} ${onclickAttr} ${cssAttr} ${attrs}`
        .replace(/\s+/g, " ")
        .trim();

      if (closing === "/") {
        return `<hotspot ${allAttrs} />`;
      } else {
        return `<hotspot ${allAttrs}>`;
      }
    }
  }
  // Si pas de correspondance, on nettoie quand même style et onclick
  attrs = attrs.replace(/style="[^"]*"/g, "");
  attrs = attrs.replace(/onclick="[^"]*"/g, "");
  attrs = attrs.trim().replace(/\s+/g, " ");
  const styleAttr = 'style="hotspot_custom_style"';
  const onclickAttr =
    'onclick="loadscene(get(linkedscene), null, MERGE, BLEND(0.5));"';
  const allAttrs = `${styleAttr} ${onclickAttr} ${attrs}`
    .replace(/\s+/g, " ")
    .trim();
  if (closing === "/") {
    return `<hotspot ${allAttrs} />`;
  } else {
    return `<hotspot ${allAttrs}>`;
  }
});

fs.writeFileSync(xmlPath, xml, "utf8");
console.log("Mise à jour terminée !");
