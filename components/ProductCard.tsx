import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Texts} from '../constants';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    images: string[];
    sold: boolean;
  };
  onSelect: () => void;
  isSelected: boolean;
  onViewImages: () => void;
}

export default function ProductCard({
  product,
  onSelect,
  isSelected,
  onViewImages,
}: ProductCardProps) {
  if (!product) {
    return null; // Or return a placeholder component
  }
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onSelect}>
      <View style={styles.imageContainer}>
        {product.images && product.images.length > 0 ? (
          <Image
            source={{uri: product.images[0]}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.placeholderImage]} />
        )}
        <TouchableOpacity style={styles.eyeButton} onPress={onViewImages}>
          <Icon name="eye" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {(product.name || product.price) && (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name || '-'}</Text>
          <Text style={styles.price}>
            {product.price
              ? `${product.price}${Texts.ProductsCard_CurrencySymbol}`
              : '-'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    maxWidth: 200,
    height: 'auto',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#D4617E',
    borderWidth: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
  },
  eyeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    padding: 10,
    height: 'auto',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  placeholderImage: {
    backgroundColor: '#e0e0e0',
  },
});
