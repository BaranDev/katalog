import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import {colors, Texts} from '../constants';

export default function ImageViewerScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {images, productId} = route.params;
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const toggleSelectImage = (uri: string): void => {
    setSelectedImages(prev =>
      prev.includes(uri) ? prev.filter(image => image !== uri) : [...prev, uri],
    );
  };

  const shareSelectedImages = async (): Promise<void> => {
    try {
      const shareOptions = {
        urls: selectedImages,
        failOnCancel: false,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing images:', error);
    }
  };

  const deleteSelectedImages = (): void => {
    const updatedImages = images.filter(
      (image: string) => !selectedImages.includes(image),
    );
    navigation.goBack();
    route.params.onUpdateImages(productId, updatedImages);
  };
  const unselectAll = () => {
    setSelectedImages([]);
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        {images.map((uri: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleSelectImage(uri)}
            style={[
              styles.imageWrapper,
              selectedImages.includes(uri) && styles.selectedImageWrapper,
            ]}>
            <Image source={{uri}} style={styles.image} />
            {selectedImages.includes(uri) && (
              <Icon
                name="check-circle"
                size={30}
                color="white"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedImages.length > 0 && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton_delete}
            onPress={deleteSelectedImages}>
            <Text style={styles.actionButtonText}>
              {Texts.ImageViewer_DeletePhotosButtonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton_unselect}
            onPress={unselectAll}>
            <Icon name="close" size={20} color={colors.ButtonTextColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton_share}
            onPress={shareSelectedImages}>
            <Text style={styles.actionButtonText}>
              {Texts.ImageViewer_SharePhotosButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 10,
    width: (Dimensions.get('window').width - 30) / 2,
    height: 300,
    backgroundColor: colors.ImageView_PhotoFillerColor, // to visualize image selection
    borderRadius: 15,
  },
  selectedImageWrapper: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
  },
  actionButton_share: {
    backgroundColor: colors.ImageView_SharePhotosButtonColor, // Bright green
    padding: 15,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 'auto',
  },
  actionButton_delete: {
    backgroundColor: colors.ImageView_DeletePhotosButtonColor, // Soft orange
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 'auto',
  },
  actionButton_unselect: {
    backgroundColor: colors.ImageView_UnselectPhotosButtonColor, // Soft orange
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 'auto',
  },
  actionButtonText: {
    color: colors.ButtonTextColor,
    fontWeight: 'bold',
  },
});
