import * as document from "document";
import * as fs from "fs";
import * as image from "./image_action";
import * as messaging from "messaging";
import * as config from "../common/config";


// elements
/*****************************************************************************************************************/

const CONFIG_FILE = "config.txt";

//list header
const list_mode = document.getElementById("list_mode");

//list
const list = document.getElementById("myList");
const list_items = document.getElementsByClassName("list-item");

//app actions
const list_action = document.getElementById("list_action");
const image_action = document.getElementById("image_action");
const status_action = document.getElementById("status_action");

// events
/*****************************************************************************************************************/

//list click event
if(list_items != null) {
  list_items.forEach((element, index) => {
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
}

//image events 
image.close_evt = function() {
  navigation_goToListView(); 
};
image.update_evt = function(img_name) {
  navigation_showStatusAction(img_name, 2000);
  refreshList(); 
};

//list header event (list mode switching)
if(list_mode != null) {
  list_mode.onclick = function(evt) {
    
    //change mode
    if(list_mode.class == "tiles") {
      list_mode.class = "list";
    } else {
      list_mode.class = "tiles";
    }    
    
    //save config to fs
    fs.writeFileSync(CONFIG_FILE, list_mode.class, "ascii");
    
    //refresh list
    refreshList();
  };
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
          console.log("[WATCH]: " + dv + " removed");
          fs.unlinkSync(dv);
        }  
      }
      //refresh
      refreshList();
      break;
    case 'rename':
      //rename
      if (fs.existsSync("/private/data/"+evt.data.old+".txi")) {
        fs.renameSync(evt.data.old+".txi", evt.data.new+".txi");
        console.log("[WATCH]: " + "Rename done");
      }
      //refresh
      refreshList();
      break;
  }
});

// navigation
/*****************************************************************************************************************/

function navigation_goToListView() {
  console.log("[WATCH]: " + "Go to list view");
  list_action.style.display = "inline";
  image_action.style.display = "none";  
  refreshList();
}

function navigation_goToImageView(img_href) {
  if(img_href.length == 0) return;
  console.log("[WATCH]: " + "Go to image view [" + img_href + "]");
  const img_name = img_href.substring(img_href.lastIndexOf("/"), img_href.lastIndexOf("."));
  console.log("[WATCH]: " + "Image name: " + img_name);
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
      //clear text
      var text_item = element.getElementById("text").text = "";
      //clear images
      element.getElementById("img1").href = "";
      element.getElementById("img2").href = "";
      element.getElementById("img3").href = "";
      //hide element
      element.style.display = "none"; 
    }
  });
  
  //find all files in watch storage
  const listDir = fs.listDirSync("/private/data");
  var dirIter;
  var index = 0;
  while((dirIter = listDir.next()) && !dirIter.done) {
    var dv = String(dirIter.value);
    
    //file must by type of .txi => image in base64
    if(strEndsWith(dv, ".txi")) {
      var name = dv.split(".")[0];
      
      //write image priview and name of image to list item
      if(list_mode.class == "tiles") {
        //tiles mode
        var img_index = index % 3 + 1;
        var list_item_index = Math.floor(index / 3);
        var img_item = list_items[list_item_index + 1].getElementById("img" + img_index);
        img_item.href = "/private/data/"+name+".txi";
        list_items[list_item_index + 1].style.display = "inline";
      } else {
        //list mode  
         var text_item = list_items[index + 1].getElementById("text");
        text_item.text = name;
        var img_item = list_items[index + 1].getElementById("img1");
        img_item.href = "/private/data/"+name+".txi";
        list_items[index + 1].style.display = "inline";
      }
      
      //iamge index (for offset)
      index++;
      if(index >= config.IMAGE_COUNT) break;
    }
  }
}

function strEndsWith(str1, str2) {
  var cnt = 0;
  for (var i = str1.length - 1; i >= 0 && cnt < str2.length; i--) {
    if(str1.charAt(i) != str2.charAt(str2.length - 1 - cnt)) break;  
    cnt++;
  }
  return cnt == str2.length;
}

// run watch app
/*****************************************************************************************************************/

//aplly local config
if (fs.existsSync("/private/data/" + CONFIG_FILE)) {
  var config_str = fs.readFileSync(CONFIG_FILE, "ascii");
  if(config_str == "list" || config_str == "tiles") {
    list_mode.class = config_str;
  }
}


//open list action
navigation_goToListView();
