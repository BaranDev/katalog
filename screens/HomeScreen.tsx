import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, Texts} from '../constants';
interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  sold: boolean;
}

export default function HomeScreen({navigation}: {navigation: any}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, []),
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: selectedProducts.length > 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedProducts]);

  const loadProducts = async (): Promise<void> => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts !== null) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const toggleSelect = (id: string): void => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(product => product !== id)
        : [...prev, id],
    );
  };

  const shareSelected = async (): Promise<void> => {
    const selectedItems = products.filter(product =>
      selectedProducts.includes(product.id),
    );
    const imagesToShare = selectedItems.flatMap(product => product.images);

    try {
      const shareOptions = {
        urls: imagesToShare,
        failOnCancel: false,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing images:', error);
    }
  };

  const deleteSelected = async (): Promise<void> => {
    try {
      const updatedProducts = products.filter(
        product => !selectedProducts.includes(product.id),
      );
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const unselectAll = () => {
    setSelectedProducts([]);
  };

  const updateProductImages = async (
    productId: string,
    updatedImages: string[],
  ): Promise<void> => {
    const updatedProducts = products.map(product =>
      product.id === productId ? {...product, images: updatedImages} : product,
    );
    setProducts(updatedProducts);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const viewImages = (productId: string, images: string[]): void => {
    navigation.navigate('ImageViewer', {
      images,
      productId,
      onUpdateImages: updateProductImages,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const onUpdateImages = (updatedImages: string[]) => {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === navigation.getParam('productId')
              ? {...product, images: updatedImages}
              : product,
          ),
        );
        AsyncStorage.setItem('products', JSON.stringify(products));
      };

      navigation.setParams({onUpdateImages});
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) =>
          item ? (
            <ProductCard
              product={item}
              onSelect={() => toggleSelect(item.id)}
              isSelected={selectedProducts.includes(item.id)}
              onViewImages={() => viewImages(item.id, item.images)}
            />
          ) : null
        }
        keyExtractor={item => item?.id || String(Math.random())}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <Animated.View style={[styles.buttonContainer, {opacity: fadeAnim}]}>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteSelected}>
          <Icon name="delete" size={15} color={colors.ButtonTextColor} />
          <Text style={styles.buttonText}>
            {Texts.HomeScreen_SelectedProducts_DeleteButtonText} (
            {selectedProducts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unselectButton} onPress={unselectAll}>
          <Icon name="close" size={20} color={colors.ButtonTextColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={shareSelected}>
          <Icon name="share-variant" size={15} color={colors.ButtonTextColor} />
          <Text style={styles.buttonText}>
            {Texts.HomeScreen_SelectedProducts_ShareButtonText} (
            {selectedProducts.length})
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.HomeBackgroundColor,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
  },
  deleteButton: {
    backgroundColor: colors.DeleteButtonColor,
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  shareButton: {
    backgroundColor: colors.ShareButtonColor,
    padding: 15,
    borderRadius: 30,
    marginLeft: 10,
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
  unselectButton: {
    backgroundColor: colors.UnselectedButtonColor,
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
  buttonText: {
    color: colors.ButtonTextColor,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
});
