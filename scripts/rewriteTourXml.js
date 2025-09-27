const fs = require("fs");
const path = require("path");
require("dotenv").config();
const inputPath = path.join(__dirname, "../tour.xml");
const xml = fs.readFileSync(inputPath, "utf8");
const skinPath = process.env.KRPANO_BASE_URL;
// Blocs à insérer
const header = `<krpano version="1.23" title="Virtual Tour" startscene="" showerrors="false" onstart="jscall(reactKrpano.onStart())">
    <!-- ############################################################## -->
    <!-- #############   Style commun à tous les Hotspot   ############# -->
    <!-- ############################################################## -->
    <style name="hotspot_custom_style"
   type="html"
   width="48"
   height="48"
   renderer="css3d"
   zorder="500"
   edge="left"
   scale="0"
   tweenwidth="250"
   oy="30"
   onloaded="delayedcall(0.3, tween(scale,1,1.3,easeOutQuart); tween(oy,0,1.3,easeOutQuart));"
   onover="set(zorder,999); tween(width, get(tweenwidth), 1.2, easeOutQuart);"
   onout="set(zorder,500); tween(width, 48, 1, easeOutQuart);"
/>
    <skin_settings maps="true"
                   maps_type="openstreetmaps"
                   maps_bing_api_key=""
                   maps_google_api_key=""
                   maps_zoombuttons="false"
                   maps_loadonfirstuse="true"
                   gyro="true"
                   gyro_keeplookingdirection="false"
                   webvr="true"
                   webvr_keeplookingdirection="true"
                   webvr_prev_next_hotspots="true"
                   autotour="false"
                   littleplanetintro="false"
                   followmousecontrol="true"
                   title="true"
                   thumbs="true"
                   thumbs_width="120" thumbs_height="80" thumbs_padding="10" thumbs_crop="0|40|240|160"
                   thumbs_opened="false"
                   thumbs_text="false"
                   thumbs_dragging="true"
                   thumbs_onhoverscrolling="false"
                   thumbs_scrollbuttons="false"
                   thumbs_scrollindicator="false"
                   thumbs_loop="false"
                   tooltips_buttons="false"
                   tooltips_thumbs="false"
                   tooltips_hotspots="false"
                   tooltips_mapspots="false"
                   deeplinking="false"
                   loadscene_flags="MERGE"
                   loadscene_blend="OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)"
                   loadscene_blend_prev="SLIDEBLEND(0.5, 180, 0.75, linear)"
                   loadscene_blend_next="SLIDEBLEND(0.5,   0, 0.75, linear)"
                   loadingtext=""
                   layout_width="100%"
                   layout_maxwidth="814"
                   controlbar_width="-24"
                   controlbar_height="40"
                   controlbar_offset="20"
                   controlbar_offset_closed="-40"
                   controlbar_overlap.no-fractionalscaling="10"
                   controlbar_overlap.fractionalscaling="0"
                   design_bgcolor="0x2D3E50"
                   design_bgalpha="0.8"
                   design_bgborder="0"
                   design_bgroundedge="1"
                   design_bgshadow="0 4 10 0x000000 0.3"
                   design_thumbborder_bgborder="3 0xFFFFFF 1.0"
                   design_thumbborder_padding="2"
                   design_thumbborder_bgroundedge="0"
                   design_text_css="color:#FFFFFF; font-family:Arial;"
                   design_text_shadow="1"
                   skin_path="${skinPath}/krpano/skin/"
                   />
    <!-- =================================================================== -->
    <!-- =================================================================== -->
    <!-- =================================================================== -->
    <!-- =================================================================== -->
    <!-- =================================================================== -->
    <!-- =================================================================== -->
`;

const footer = `
        <!-- ================================================================================ -->
        <!-- ================================================================================ -->
        <!-- ================================================================================ -->
        <!-- ================================================================================ -->
        <!-- ================================================================================ -->
           <events onnewscene="jscall(calc('reactKrpano.onSceneChange(\`' + get(xml.scene) + '\`)'))" />
    </krpano>
`;

// Extraction des scènes avec hotspot
const sceneRegex = /<scene[\s\S]*?<\/scene>/g;
const hotspotRegex = /<hotspot[\s\S]*?\/>/;

const scenes = [];
let match;
while ((match = sceneRegex.exec(xml)) !== null) {
  if (hotspotRegex.test(match[0])) {
    scenes.push(match[0]);
  }
}

// Construction du nouveau XML
const newXml = header + scenes.join("\n\n") + footer;

// Écriture du fichier
fs.writeFileSync(inputPath, newXml, "utf8");
console.log("tour.xml réécrit avec succès !");
