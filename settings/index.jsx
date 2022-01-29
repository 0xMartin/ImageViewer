function mySettings(props) {
  let screenWidth = props.settingsStorage.getItem("screenWidth");
  let screenHeight = props.settingsStorage.getItem("screenHeight");

  var rows = [];
  
  rows.push(<Button label="Delete all" onClick={() => props.settingsStorage.setItem('delete', 'all')} />);
  rows.push(<Button label="Request sync" onClick={() => props.settingsStorage.setItem('sync', 'all')} />);
  
  
  for (var i = 1; i <= 20; i++) {
    var item = "Image"+i  
    rows.push(
      <ImagePicker
              title={ item }
              sublabel="Image picker"
              settingsKey={ item }
              imageWidth={ screenWidth }
              imageHeight={ screenHeight }
            />
    );
    const str = new String("Image"+i);
    rows.push(<Button label={"Request sync " + item} onClick={() => props.settingsStorage.setItem('sync', str.valueOf())} />);
    if(props.settingsStorage.getItem(item) == null) break;
  }
  
  return (
    <Page>{rows}</Page>
  );
}

registerSettingsPage(mySettings);