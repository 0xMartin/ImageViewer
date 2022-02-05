import * as document from "document";
import { inbox } from "file-transfer";
import * as messaging from "messaging";
import * as jpeg from "jpeg";
import * as fs from "fs";


var image_element = null;
var inited = false;

const root_dir = "/private/data/";

export var close_evt = null;
export var update_evt = null;


export function init() {   
  if(inited) return;
  inited = true;
  
  //image element
  image_element = document.getElementById("image");
  image_element.addEventListener("click", (evt) => {
    if(close_evt != null) {
      close_evt();
    }  
  });
} 

export function update(img_name) {
  image_element.image  = root_dir + img_name + ".txi";
} 

//file reciever
inbox.onnewfile = () => {
  console.log("[WATCH]: " + "New file");
  var fileName;
  do {
    fileName = inbox.nextFile();
    if (fileName) {
      const new_name = fileName.split(".")[0] + ".txi";
      //save new .jpg as .txi
      jpeg.decodeSync(fileName, new_name, {overwrite: true});
      //remove incoming .jpg
      fs.unlinkSync(fileName);
      console.log("[WATCH]: " + "Done " + fileName);
      //update
      if(update_evt != null) {
        update_evt(fileName.split(".")[0]);
      }
    }
  } while (fileName);
};
