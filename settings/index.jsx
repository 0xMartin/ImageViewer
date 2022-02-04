function totalSize(props) {
  var total = 0;
  for(var i = 1; i <= 20; ++i) {
    var img = props.settingsStorage.getItem("Image"+i);
    if(img != null) {
      var size = JSON.parse(img).imageUri.length / 1024;
      total += size;
    }
  }
  return total;
}


function mySettings(props) {
  let screenWidth = props.settingsStorage.getItem("screenWidth");
  let screenHeight = props.settingsStorage.getItem("screenHeight");

  var rows = [];
  
  rows.push(
    <Section>
      <Button label="Delete all" onClick={() => props.settingsStorage.setItem('delete', 'all')} />
      <Button label="Request sync" onClick={() => props.settingsStorage.setItem('sync', 'all')} />
      <Text bold align="center">{"Total size: "+ totalSize(props).toFixed(2) + " kB"}</Text>
    </Section>
  );
  
  
  for (var i = 1; i <= 21; i++) {
    var item = "Image"+i  
    const str = new String("Image"+i);
    rows.push(
      <Section>
        <ImagePicker
                title={ item }
                sublabel="Image picker"
                settingsKey={ item }
                imageWidth={ screenWidth }
                imageHeight={ screenHeight }
              />
        <Button label={"Request sync " + item} onClick={() => props.settingsStorage.setItem('sync', str.valueOf())} />
      </Section>
    );
    if(props.settingsStorage.getItem(item) == null) break;
  }
  
  return (
    <Page>{rows}</Page>
  );
}

registerSettingsPage(mySettings);