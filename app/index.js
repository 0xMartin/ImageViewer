import * as document from "document";
import * as fs from "fs";
import * as image from "./image_action";
import * as messaging from "messaging";

//list click event
const list = document.getElementById("myList");
const items = list.getElementsByClassName("list-item");
items.forEach((element, index) => {
  var touch = element.getElementById("touch");
  var text = element.getElementById("text");
  if(touch != null) {
    touch.onclick = function(evt) {
      navigation_goToImageView(text.text);
    };
  }
});

//image events 
image.close_evt = function() {
  navigation_goToListView(); 
};
image.update_evt = function() {
  refreshList(); 
};

//list items
const list_items = document.getElementsByClassName("list-item");

//app actions
const list_action = document.getElementById("list_action");
const image_action = document.getElementById("image_action");

function navigation_goToListView() {
  console.log("Go to list view");
  list_action.style.display = "inline";
  image_action.style.display = "none";  
  refreshList();
}
navigation_goToListView();

function navigation_goToImageView(img_name) {
  console.log("Go to image view [" + img_name + "]");
  list_action.style.display = "none";
  image_action.style.display = "inline";  
  
  image.init();
  image.update(img_name);
}

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
    var dv = dirIter.value;
    var name = dv.split(".")[0];
    console.log(index + " > " + name);  
    var text_item = list_items[index + 1].getElementById("text");
    text_item.text = name;
    list_items[index + 1].style.display = "inline";
    index++;
  }
}
