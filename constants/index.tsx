// constants/index.tsx

// Define the colors object with TypeScript types
const colors: {
  ForegroundColor: string;
  BackgroundColor: string;
  ButtonTextColor: string;
  HomeBackgroundColor: string;
  CardBackgroundColor: string;
  CardSelectedColor: string;
  ShareButtonColor: string;
  DeleteButtonColor: string;
  UnselectedButtonColor: string;
  AddProduct_SaveButtonColor: string;
  AddProduct_SelectImagesButtonColor: string;
  AddProduct_RemoveSelectedImageButtonColor: string;
  AddProduct_RemoveSelectedImageButton_BackgroundColor: string;
  ImageView_DeletePhotosButtonColor: string;
  ImageView_SharePhotosButtonColor: string;
  ImageView_UnselectPhotosButtonColor: string;
  ImageView_PhotoFillerColor: string;
} = {
  ForegroundColor: '#D4617E',
  BackgroundColor: '#F3D7CA',
  ButtonTextColor: '#FFFFFF',
  HomeBackgroundColor: '#FAF6F2',
  CardBackgroundColor: '#F3D7CA',
  CardSelectedColor: '#D4617E',
  ShareButtonColor: '#30AE65',
  DeleteButtonColor: '#AE304F',
  UnselectedButtonColor: '#96D463',
  AddProduct_SelectImagesButtonColor: '#63D492',
  AddProduct_SaveButtonColor: '#D4617E',
  AddProduct_RemoveSelectedImageButtonColor: '#FF7043',
  AddProduct_RemoveSelectedImageButton_BackgroundColor:
    'rgba(255, 255, 255, 0.6)',
  ImageView_DeletePhotosButtonColor: '#AE304F',
  ImageView_SharePhotosButtonColor: '#30AE65',
  ImageView_UnselectPhotosButtonColor: '#96D463',
  ImageView_PhotoFillerColor: 'rgba(0,0,0,0.1)',
};

const Texts: {
  HomeScreenTitle: string; // Title displayed on the Home screen (screens/HomeScreen.tsx)
  AddProductScreenTitle: string; // Title displayed on the Add Product screen (screens/AddProductScreen.tsx)
  ImageViewerScreenTitle: string; // Title displayed on the Image Viewer screen (components/ImageViewerScreen.tsx)
  HomeScreen_SelectedProducts_ShareButtonText: string; // Text displayed on the Share button in the Home screen (screens/HomeScreen.tsx)
  HomeScreen_SelectedProducts_DeleteButtonText: string; // Text displayed on the Delete button in the Home screen (screens/HomeScreen.tsx)
  ProductsCard_CurrencySymbol: string; // Currency symbol displayed on the Product Card in the Home screen (screens/HomeScreen.tsx)
  AddProduct_SaveButtonText: string; // Text displayed on the Save button in Add Product screen (screens/AddProductScreen.tsx)
  AddProduct_SelectImagesButtonText: string; // Text displayed on the Select Images button in Add Product screen (screens/AddProductScreen.tsx)
  AddProduct_ItemNamePlaceholder: string; // Placeholder text for the Item Name input in Add Product screen (screens/AddProductScreen.tsx)
  AddProduct_ItemPricePlaceholder: string; // Placeholder text for the Item Price input in Add Product screen (screens/AddProductScreen.tsx)
  ImageViewer_DeletePhotosButtonText: string; // Text displayed on the Delete Photos button in Image Viewer screen (components/ImageViewerScreen.tsx)
  ImageViewer_SharePhotosButtonText: string; // Text displayed on the Share Photos button in Image Viewer screen (components/ImageViewerScreen.tsx)
  ImageViewer_UnselectPhotosButtonText: string; // Text displayed on the Unselect Photos button in Image Viewer screen (components/ImageViewerScreen.tsx)
} = {
  HomeScreenTitle: 'Your Homescreen Title',
  AddProductScreenTitle: 'Add Product',
  ImageViewerScreenTitle: 'View Images',
  HomeScreen_SelectedProducts_ShareButtonText: 'Share',
  HomeScreen_SelectedProducts_DeleteButtonText: 'Delete',
  ProductsCard_CurrencySymbol: '$',
  AddProduct_SaveButtonText: 'Save',
  AddProduct_SelectImagesButtonText: 'Select Images',
  AddProduct_ItemNamePlaceholder: 'Name (optional)',
  AddProduct_ItemPricePlaceholder: 'Price (optional)',
  ImageViewer_DeletePhotosButtonText: 'Delete Photos',
  ImageViewer_SharePhotosButtonText: 'Share Photos',
  ImageViewer_UnselectPhotosButtonText: 'Unselect Photos',
};

// Export the colors object as the default export
export {Texts, colors};
