import * as document from "document";
import * as fs from "fs";
import * as image from "./image_action";
import * as messaging from "messaging";

// events
/*****************************************************************************************************************/

//list click event
const list = document.getElementById("myList");
const items = list.getElementsByClassName("list-item");
items.forEach((element, index) => {
  var img1 = element.getElementById("img1");
  if(img1 != null) {
    img1.onclick = function(evt) {
      navigation_goToImageView(img1.href);
    };
  }
  var img2 = element.getElementById("img2");
  if(img2 != null) {
    img2.onclick = function(evt) {
      navigation_goToImageView(img2.href);
    };
  }
  var img3 = element.getElementById("img3");
  if(img3 != null) {
    img3.onclick = function(evt) {
      navigation_goToImageView(img3.href);
    };
  }
});

//image events 
image.close_evt = function() {
  navigation_goToListView(); 
};
image.update_evt = function(img_name) {
  navigation_showStatusAction(img_name + " accepted", 2000);
  refreshList(); 
};

// elements
/*****************************************************************************************************************/

//list items
const list_items = document.getElementsByClassName("list-item");

//app actions
const list_action = document.getElementById("list_action");
const image_action = document.getElementById("image_action");
const status_action = document.getElementById("status_action");

// navigation
/*****************************************************************************************************************/

function navigation_goToListView() {
  console.log("Go to list view");
  list_action.style.display = "inline";
  image_action.style.display = "none";  
  refreshList();
}
navigation_goToListView();

function navigation_goToImageView(img_href) {
  console.log("Go to image view [" + img_href + "]");
  const img_name = img_href.substring(img_href.lastIndexOf("/"), img_href.lastIndexOf("."));
  console.log("Image name: " + img_name);
  list_action.style.display = "none";
  image_action.style.display = "inline";  
  
  image.init();
  image.update(img_name);
}


// status action (show incoming images)
/*****************************************************************************************************************/

var status_queue = [];
function navigation_showStatusAction(status_msg, time) {
  status_queue.push({txt: status_msg, time: time});
  flushStatusQueue(true);
}

var running = false;
function flushStatusQueue(run) {
  if(run) {
    if(running) return;  
  }
  if(status_queue.length > 0) {
    status_action.style.display = "inline";  
    running = true;
  } else {
    status_action.style.display = "none";  
    running = false;
    return;
  }
  
  var status_txt = document.getElementById("status_txt");
  var ste = status_queue.pop();
  status_txt.text = ste.txt;
  setTimeout(function() {
    flushStatusQueue(false);  
  }, ste.time);
}


// local functions
/*****************************************************************************************************************/

//refresh list view
function refreshList() {
   //clear list
  list_items.forEach((element, index) => {
    if(index != 0) {
      element.style.display = "none"; 
    }
  });
  
  //get image names
  const listDir = fs.listDirSync("/private/data");
  var dirIter;
  var index = 0;
  while((dirIter = listDir.next()) && !dirIter.done) {
    var dv = String(dirIter.value);
    if(strStartsWith(dv, "Image")) {
      var name = dv.split(".")[0];
      var img_index = index % 3 + 1;
      var list_item_index = Math.floor(index / 3);
      var img_item = list_items[list_item_index + 1].getElementById("img" + img_index);
      img_item.href = "/private/data/"+name+".txi";
      list_items[list_item_index + 1].style.display = "inline";
    }
    index++;
  }
}

//delete all images
messaging.peerSocket.addEventListener("message", (evt) => {
  switch(evt.data.type) {
    case 'delete': 
      //delete all
      const listDir = fs.listDirSync("/private/data");
      var dirIter;
      while((dirIter = listDir.next()) && !dirIter.done) {
        var dv = String(dirIter.value);
        if (fs.existsSync("/private/data/"+dv)) {
          console.log(dv + " removed");
          fs.unlinkSync(dv);
        }  
      }
      //refresh
      refreshList();
      break;
  }
});

function strStartsWith(str1, str2) {
  var i;
  for (i = 0; i < str1.length && i < str2.length; i++) {
    if(str1.charAt(i) != str2.charAt(i)) break;  
  }
  return i == str2.length;
}
