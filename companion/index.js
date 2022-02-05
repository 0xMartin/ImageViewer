import { device } from "peer";
import { settingsStorage } from "settings";
import { outbox } from "file-transfer";
import { Image } from "image";
import * as messaging from "messaging";
import * as config from "../common/config";


settingsStorage.setItem("screenWidth", device.screen.width);
settingsStorage.setItem("screenHeight", device.screen.height);

settingsStorage.onchange = function(evt) {
  //delete all
  switch(evt.key) {
    case 'delete':
      for(var i = 1; i <= config.IMAGE_COUNT; ++i) {
        if(settingsStorage.getItem("Image"+i) != null) {
          settingsStorage.removeItem("Image"+i);
        }
      }
      //send delete mess to wath
      if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({type: 'delete'});
      }
      break;
    case 'sync':
      console.log("Sync " + evt.newValue);
      if(evt.newValue == 'all') {
         //send delete mess to wath
        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          messaging.peerSocket.send({type: 'delete'});
        }
        //all
        for(var i = 1; i <= config.IMAGE_COUNT; ++i) {
          var img = settingsStorage.getItem("Image"+i);
          if(img != null) {
            compressAndTransferImage("Image"+i, img);   
          }
        }
      } else {
        //only one
        var img = settingsStorage.getItem(evt.newValue);
        if(img != null) {
          compressAndTransferImage(evt.newValue, img);   
        }  
      }
      break;
    //upload image on watch
    default:
      if(strEndsWith(evt.key, "_str")) {
        //name repair
        var new_name = JSON.parse(evt.newValue).name;
        if(new_name.length > 20) {
          new_name = new_name.substring(0, 20);
          settingsStorage.setItem(evt.key, JSON.stringify({"name": new_name}));
        }
        
        //rename image
        var old_name = JSON.parse(evt.oldValue).name;
        console.log("Rename: " + old_name + " -> " + new_name);
        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          messaging.peerSocket.send({type: 'rename', old: old_name, new: new_name});
        }  
      } else {
        //send image
        compressAndTransferImage(evt.key, evt.newValue);   
      }
  }
};

// name - image name
// settingsValue - image data
function compressAndTransferImage(name, settingsValue) {
  //get name for image from text input
  var img_name_field = settingsStorage.getItem(name + "_str");
  var img_name = "";
  if(img_name_field == null) {
    settingsStorage.setItem(name + "_str", JSON.stringify({"name": name}));  
    img_name = name;
  } else {
    img_name = JSON.parse(img_name_field).name;  
  }
  
  //upload image
  const imageData = JSON.parse(settingsValue);
  Image.from(imageData.imageUri)
    .then(image =>
      image.export("image/jpeg", {
        background: "#FFFFFF",
        quality: 90
      })
    )
    .then(buffer => outbox.enqueue(img_name + ".jpg", buffer))
    .then(fileTransfer => {
      console.log(`Enqueued ${fileTransfer.name}`);
    });
}

function strEndsWith(str1, str2) {
  var cnt = 0;
  for (var i = str1.length - 1; i >= 0 && cnt < str2.length; i--) {
    if(str1.charAt(i) != str2.charAt(str2.length - 1 - cnt)) break;  
    cnt++;
  }
  return cnt == str2.length;
}