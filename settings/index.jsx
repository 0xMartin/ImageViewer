function mySettings(props) {
  let screenWidth = props.settingsStorage.getItem("screenWidth");
  let screenHeight = props.settingsStorage.getItem("screenHeight");

  return (
    <Page>
        <Button
          label="Delete all"
          onClick={() => props.settingsStorage.setItem('delete', 'all')}
        />
        <ImagePicker
          title="Image1"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image1"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image2"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image2"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image3"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image3"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image4"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image4"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image5"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image5"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image6"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image6"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image7"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image7"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image8"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image8"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image9"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image9"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image10"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image10"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image11"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image11"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image12"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image12"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image13"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image13"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image14"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image14"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image15"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image15"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image16"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image16"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image17"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image17"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image18"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image18"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image19"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image19"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
        <ImagePicker
          title="Image20"
          description="Pick an image"
          label="Pick an image"
          sublabel="Image picker"
          settingsKey="Image20"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
    </Page>
  );
}

registerSettingsPage(mySettings);