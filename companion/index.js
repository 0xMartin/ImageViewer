import { device } from "peer";
import { settingsStorage } from "settings";
import { outbox } from "file-transfer";
import { Image } from "image";
import * as messaging from "messaging";


settingsStorage.setItem("screenWidth", device.screen.width);
settingsStorage.setItem("screenHeight", device.screen.height);

settingsStorage.onchange = function(evt) {
  //delete all
  switch(evt.key) {
    case 'delete':
      for(var i = 1; i <= 20; ++i) {
        if(settingsStorage.getItem("Image"+i) != null) {
          settingsStorage.removeItem("Image"+i);
        }
      }
      //send delete mess to wath
      if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({type: 'delete'});
      }
      break
    //upload image on watch
    default:
      compressAndTransferImage(evt.key, evt.newValue);   
  }
};

function compressAndTransferImage(name, settingsValue) {
  const imageData = JSON.parse(settingsValue);
  Image.from(imageData.imageUri)
    .then(image =>
      image.export("image/jpeg", {
        background: "#FFFFFF",
        quality: 90
      })
    )
    .then(buffer => outbox.enqueue(name + ".jpg", buffer))
    .then(fileTransfer => {
      console.log(`Enqueued ${fileTransfer.name}`);
    });
}
