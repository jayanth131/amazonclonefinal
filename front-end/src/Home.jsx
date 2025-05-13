import React from 'react';
import Product from './Product';
import { useStateValue } from './Stateproduct';

function Home() {
  const [{ searchTerm }] = useStateValue();

  const allProducts = [
    {
      id: 1234,
      title: 'The Lean Startup: How Constant Innovation Creates Radically Successful Businesses',
      price: 500,
      rating: 5,
      img: 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
      category: 'Books',
    },
    {
      id: 1235,
      title: 'Philips HR3705/10 300 Watt Lightweight Hand Mixer',
      price: 2000,
      rating: 5,
      img: 'https://m.media-amazon.com/images/I/71rsVfDPlAL._SX679_.jpg',
      category: 'Home Appliances',
    },
    {
      id: 1236,
      title: 'Noise Buds N1 Pro in-Ear True Wireless Earbuds',
      price: 1799,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/61--03DsnSL._SX522_.jpg',
      category: 'Electronics',
    },
    {
      id: 1237,
      title: 'Rugged Armor Pro for Samsung Galaxy Watch Ultra',
      price: 5000,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/61SeT0aMVrL._SX522_.jpg',
      category: 'Accessories',
    },
    {
      id: 1238,
      title: 'Echo Studio - Smart speaker with high-fidelity audio',
      price: 8000,
      rating: 5,
      img: 'https://m.media-amazon.com/images/I/41kCNGqQbXL._SY450_.jpg',
      category: 'Electronics',
    },
    {
      id: 1239,
      title: 'Apple iPad Pro 12.9-inch (M1)',
      price: 55000,
      rating: 4,
      img: './ipad.jpeg',
      category: 'Electronics',
    },
    {
      id: 1240,
      title: 'Samsung 1.5 Ton 3 Star AI Inverter Smart Split AC',
      price: 26999,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/81wWyXOJk6L._SL1500_.jpg',
      category: 'Home Appliances',
    },
    {
      id: 1241,
      title: 'Acer ALG Intel Core i5-13th Gen',
      price: 62000,
      rating: 5,
      img: 'https://m.media-amazon.com/images/I/51JH5OhIx2L.jpg',
      category: 'laptop',
    },
    {
      id: 1242,
      title: 'Sony WH-1000XM5 Noise Cancelling Headphones',
      price: 29990,
      rating: 5,
      img: 'https://m.media-amazon.com/images/I/51aXvjzcukL._SY355_.jpg',
      category: 'Headphones',
    },
    // Additional 9 Products with categories
    {
      id: 1243,
      title: 'Canon EOS 1500D 24.1 Digital SLR Camera',
      price: 44990,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/914hFeTU2-L._SL1500_.jpg',
      category: 'Camera',
    },
    {
      id: 1244,
      title: 'boAt Stone 1200 14W Bluetooth Speaker',
      price: 3999,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/61CcvfVAQHL._AC_UY327_FMwebp_QL65_.jpg',
      category: 'Bluetooth Speaker',
    },
    {
      id: 1245,
      title: 'Fire-Boltt Ninja Call Pro Plus Smartwatch',
      price: 1499,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/61PVOwvLthL._AC_UY327_FMwebp_QL65_.jpg',
      category: 'Smartwatch',
    },
    {
      id: 1246,
      title: 'DELL Inspiron 14 Laptop, Intel i5 12th Gen',
      price: 68990,
      rating: 5,
      img: 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/w/x/p/-original-imaghzahjrwt6bvp.jpeg?q=70',
      category: 'laptops',
    },
    {
      id: 1247,
      title: 'LG 27-inch Full HD IPS Monitor',
      price: 12499,
      rating: 4,
      img: 'https://rukminim2.flixcart.com/image/312/312/xif0q/monitor/n/s/i/-original-imagzhaefszwjavv.jpeg?q=70',
      category: 'Monitor',
    },
    {
      id: 1248,
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime)',
      price: 19999,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/61QRgOgBx0L._SL1500_.jpg',
      category: 'Mobiles',
    },
    {
      id: 1249,
      title: 'Zebronics Zeb-Rise Wired USB Keyboard',
      price: 499,
      rating: 3,
      img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/keyboard/g/j/1/-original-imaggd53ggffpuzf.jpeg?q=70',
      category: 'Keyboard',
    },
    {
      id: 1250,
      title: 'Cosmic Byte GS410 Wired Gaming Headset',
      price: 1099,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/51hloAuxmQL._AC_UY327_FMwebp_QL65_.jpg',
      category: 'Headset',
    },
    {
      id: 1251,
      title: 'Amazon Basics 68W USB Type-C Wall Charger',
      price: 1499,
      rating: 4,
      img: 'https://m.media-amazon.com/images/I/51UDbYqCcuL._AC_UY327_FMwebp_QL65_.jpg',
      category: 'Charger',
    },
  ];

  // Filter products based on both title and category
  const filteredProducts = allProducts.filter((product) =>
    (product.title.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    product.category.toLowerCase().includes(searchTerm?.toLowerCase() || ''))
  );

  return (
    <div className="w-full">
      {/* Top banner image */}
      <img
        src="./prime1.png"
        alt="Amazon Banner"
        className="w-full h-auto object-cover mb-6"
      />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              img={product.img}
            />
          ))
        ) : (
          <p className="text-left text-gray-700 text-lg">
            No products found for: <strong>{searchTerm}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
