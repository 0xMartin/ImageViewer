<div align="center">
  <img src="./resources/icon.png" width="22%">
  <h1>Image Viewer</h1>
  <div>
    <img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/0xMartin/ImageViewer">
    <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/0xMartin/ImageViewer/total">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/0xMartin/ImageViewer">
  </div>
</div>

---

The application allows you to view pictures on the watch. The user uploads the images in the settings and then can view them on the watch (maximum 21 images / depends on the size of the image). In the application, all uploaded images are displayed in a list (there are two display modes: tiles and list, you can change this by clicking on the icon on right of the "IMAGE header"). In tiles list mode you can seen max 6 images on the page. Page you can change be swiping. To show an image from the list, just click on it. To return back to the list, click on the maximized image.

Available in Fitbit gallery: https://gallery.fitbit.com/details/33e5fac2-b8a8-4deb-b41f-a87cd6099c23

## List of pictures
<div>
  <img src="./doc/img2.png" width="30%">
  <img src="./doc/img3.png" width="30%">
  <img src="./doc/img4.png" width="30%">
</div>

## Image display
<div>
  <img src="./doc/img5.png" width="30%">
  <img src="./doc/img6.png" width="30%">
  <img src="./doc/img7.png" width="30%">
</div>

---

## Instructions for uploading and deleting
If you wants to make some changes, the application must also running on the watches !! If you are switching from older version of application, it is possible that something may not be working properly (in this case, it is recommended to delete all images and reload or reinstall app). Sometimes it happens that some images do not appear in the list, it is most likely due to the device limits (in this case, restarting the application may help).

You can add new images in the settings of this application on your mobile in the Fitbit application. After adding an image to the settings, it will be automatically uploaded to the watch. Sometimes a connection error may occur that the image will not move to the watch (then you must click the "Reqest sync" button and synchronize the watch data with the mobile data). It can synchronize all images (button at the top) or one specific image (button below the image). The images can be deleted with the "Delete all" button. If you are replacing uploaded images, you must restart the watch application for the changes to take effect. It is also possible set image name (max. length of image name is 20 chars). Image names are visible only in "list mode". If for some reason it is not possible to rename the image, press "Request sync" at the top.

---

<div align="center">
  <h1>Settings</h1>
    <p>Delete all</p>
    <p>Reqest sync (one image / all)</p>
    <p>Upload new image</p>
    <p>Set name of image</p>
  <div>
    <img src="./doc/img1.png" width="30%">
  </div>
</div>  

