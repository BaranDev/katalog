import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  CameraOptions,
  ImageLibraryOptions,
  PhotoQuality,
} from 'react-native-image-picker';
import {colors, Texts} from '../constants';

interface AddProductScreenProps {
  navigation: any;
}

export default function AddProductScreen({navigation}: AddProductScreenProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const saveProduct = async () => {
    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      images: images, // Store full image URIs
      sold: false,
    };

    try {
      const products = JSON.parse(
        (await AsyncStorage.getItem('products')) || '[]',
      );
      products.push(newProduct);
      await AsyncStorage.setItem('products', JSON.stringify(products));
      console.log('Product saved:', newProduct);
      navigation.goBack();
    } catch (error) {
      console.error('Error while saving the product:', error);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async (useCamera = false) => {
    const options: CameraOptions & ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1 as PhotoQuality,
      includeBase64: false,
      maxWidth: 1000,
      maxHeight: 1000,
      selectionLimit: 0, // Allows multiple selection
    };

    try {
      if (useCamera) {
        const hasCameraPermission = await requestCameraPermission();
        if (!hasCameraPermission) {
          console.log('Camera permission denied');
          return;
        }
      }

      const launch = useCamera ? launchCamera : launchImageLibrary;
      const result = await new Promise<ImagePickerResponse>(resolve => {
        launch(options, resolve);
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else if (result.assets) {
        const newImages = result.assets
          .map(asset => asset.uri)
          .filter((uri): uri is string => uri !== undefined);
        setImages(prevImages => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.view_container}>
          <View style={styles.productDetailsTextboxContainer}>
            <TextInput
              style={styles.input}
              placeholder={Texts.AddProduct_ItemNamePlaceholder}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder={Texts.AddProduct_ItemPricePlaceholder}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => pickImage()}>
            <Icon name="image-plus" size={24} color="white" />
            <Text style={styles.imageButtonText}>
              {Texts.AddProduct_SelectImagesButtonText}
            </Text>
          </TouchableOpacity>
          <View style={styles.imagePreviewContainer}>
            {images.map((uri, index) => (
              <TouchableOpacity key={index} onPress={() => removeImage(index)}>
                <Image source={{uri}} style={styles.imagePreview} />
                <View style={styles.removeIconContainer}>
                  <Icon name="close-circle" size={24} color="red" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveProduct}>
          <Text style={styles.saveButtonText}>
            {Texts.AddProduct_SaveButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.HomeBackgroundColor,
    height: '100%',
    width: '100%',
  },
  view_container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '5%',
    height: '100%',
    width: '100%',
  },
  productDetailsTextboxContainer: {
    flex: 1,
    backgroundColor: colors.HomeBackgroundColor,
    padding: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'transparent',
    width: '40%',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.AddProduct_SelectImagesButtonColor,
    borderRadius: 20,
    marginBottom: 20,
  },
  imageButtonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 7,
  },
  imagePreviewWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  removeIconContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor:
      colors.AddProduct_RemoveSelectedImageButton_BackgroundColor,
    borderRadius: 12,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
  },
  saveButton: {
    backgroundColor: colors.AddProduct_SaveButtonColor,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
