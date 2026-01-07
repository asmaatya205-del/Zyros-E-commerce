import React, { useState, useEffect } from 'react';
import './App.css';

// استيراد مكونات Material UI
import { 
  Button, 
  IconButton, 
  Badge, 
  Drawer, 
  TextField, 
  InputAdornment, 
  Snackbar, 
  Alert,
  Typography,
  Box,
  Divider
} from '@mui/material';

// استيراد أيقونات Material UI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategoryValue, setActiveCategoryValue] = useState('All'); 
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  const menuItems = [
    { title: 'Home', value: 'All' },
    { title: 'Watches', value: 'Women', sub: [{ label: "Men's Watches", value: "Men's watches" }, { label: "Women's Watches", value: "Women's watch" }] },
    { title: 'Bags', value: "Women's bags", sub: [{ label: "Men's Bags", value: "Men's bag" }, { label: "Women's Bags", value: "Women's bags" }] },
    { title: 'Jewelry', value: "Women's jewlry", sub: [{ label: "Necklaces", value: "Necklaces" }, { label: "Rings", value: "Rings" }] },
    { title: "Men's Gifts", value: "Men's gifts" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setFilteredProducts(data); })
      .catch(err => console.error('Error fetching data:', err));
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const results = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.mainCategory && p.mainCategory.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const openProductDetails = (product) => {
    const imgs = getImages(product.hFullSrc);
    setMainImage(imgs[0]);
    setSelectedProduct(product);
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setSnackbarMsg(`Added ${product.name} to cart!`);
    setOpenSnackbar(true);
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const handleCategoryClick = (val) => {
    setSearchTerm("");
    setActiveCategoryValue(val);
    if (val === 'All') setFilteredProducts(products);
    else {
      const target = val.toLowerCase().trim();
      setFilteredProducts(products.filter(p => 
        [p.mainCategory, p.subCategory, p.subSubCategory].some(cat => (cat || "").toLowerCase().trim() === target)
      ));
    }
  };

  const getImages = (src) => src ? src.split(',').map(s => s.trim().startsWith('http') ? s.trim() : `/${s.trim()}`) : ["/placeholder.png"];
  const formatPrice = (p) => parseFloat(p || 0).toFixed(2);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-container">
          <img src="/logo.png" alt="Brand Logo" className="splash-logo-animated" />
          <div className="splash-loader-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* MUI Snackbar للتنبيهات بدلاً من التوست اليدوي */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>{snackbarMsg}</Alert>
      </Snackbar>

      {/* MUI Drawer بدلاً من السلة اليدوية */}
      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Box sx={{ width: 380, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8f8f8' }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Shopping Cart</Typography>
            <IconButton onClick={() => setIsCartOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            {cartItems.length === 0 ? <Typography align="center" sx={{ mt: 5, color: '#888' }}>Your cart is empty</Typography> : 
              cartItems.map(item => (
                <div key={item.id} className="cart-card">
                  <img src={getImages(item.hFullSrc)[0]} alt={item.name} />
                  <div className="cart-card-info">
                    <h4>{item.name}</h4>
                    <p className="price-tag">{formatPrice(item.totalPrice)} SAR</p>
                    <div className="cart-qty-ctrl-mui">
                      <IconButton size="small" onClick={() => updateQty(item.id, -1)}><RemoveIcon fontSize="small" /></IconButton>
                      <span>{item.quantity}</span>
                      <IconButton size="small" onClick={() => updateQty(item.id, 1)}><AddIcon fontSize="small" /></IconButton>
                    </div>
                  </div>
                  <IconButton color="error" onClick={() => removeFromCart(item.id)}><DeleteOutlineIcon /></IconButton>
                </div>
              ))
            }
          </Box>
          {cartItems.length > 0 && (
            <Box sx={{ p: 3, borderTop: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{formatPrice(cartItems.reduce((s,i) => s + (i.totalPrice * i.quantity), 0))} SAR</Typography>
              </Box>
              <Button fullWidth variant="contained" className="checkout-btn-black" sx={{ bgcolor: 'black', py: 1.5, '&:hover': {bgcolor: '#333'} }}>
                PROCEED TO CHECKOUT
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Navbar باستخدام MUI Components */}
      <nav className="site-nav-bar">
        <div className="nav-logo" onClick={() => handleCategoryClick('All')}>ZYROS</div>
        <ul className="nav-links">
          {menuItems.map(item => (
            <li key={item.title} className={`nav-li-drop ${activeCategoryValue === item.value ? 'active-red' : ''}`}>
              <span onClick={() => handleCategoryClick(item.value)}>{item.title}</span>
              {item.sub && (
                <ul className="nav-dropdown">
                  {item.sub.map(s => <li key={s.value} className={activeCategoryValue === s.value ? 'active-red-text' : ''} onClick={() => handleCategoryClick(s.value)}>{s.label}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-utils">
          <TextField 
            placeholder="Search products..." 
            size="small"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: '20px', width: '200px', fontSize: '13px' }
            }}
          />
          <IconButton onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItems.reduce((a,b) => a + b.quantity, 0)} color="error">
              <ShoppingCartIcon sx={{ color: 'black' }} />
            </Badge>
          </IconButton>
        </div>
      </nav>

      {/* Grid */}
      <main className="products-layout-grid">
        {filteredProducts.map(p => (
          <div key={p.id} className="item-card-sq" onClick={() => openProductDetails(p)}>
            <div className="item-card-img">
              {p.productCardPromotion && <div className="badge-red-promo">{p.productCardPromotion}</div>}
              <img src={getImages(p.hFullSrc)[0]} alt={p.name} />
            </div>
            <div className="item-card-content">
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{p.name}</Typography>
              <Box className="item-card-prices">
                <span className="p-new-price">{formatPrice(p.totalPrice)} SAR</span>
                {p.beforePrice && <span className="p-old-price">{formatPrice(p.beforePrice)} SAR</span>}
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                className="add-btn-sq-black"
                sx={{ mt: 2, bgcolor: 'black', borderRadius: 0, '&:hover': {bgcolor: '#333'} }}
                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        ))}
      </main>

      {/* المنتج Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <IconButton sx={{ position: 'absolute', top: 10, right: 10, zIndex: 11 }} onClick={() => setSelectedProduct(null)}><CloseIcon /></IconButton>
            <div className="modal-body">
              <div className="modal-visuals">
                <div className="modal-hero-img">
                  {selectedProduct.productCardPromotion && <div className="badge-red-promo">{selectedProduct.productCardPromotion}</div>}
                  <img src={mainImage} alt={selectedProduct.name} />
                </div>
                <div className="modal-thumbnails-row">
                  {getImages(selectedProduct.hFullSrc).map((img, i) => (
                    <div key={i} className={`th-item ${mainImage === img ? 'active' : ''}`} onClick={() => setMainImage(img)}>
                      <img src={img} alt="thumb" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-details">
                <span className="cat-tag">{selectedProduct.subCategory}</span>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{selectedProduct.name}</Typography>
                <div className="modal-price-line">
                  <span className="price-new">{formatPrice(selectedProduct.totalPrice)} SAR</span>
                  {selectedProduct.beforePrice && <span className="price-old">{formatPrice(selectedProduct.beforePrice)} SAR</span>}
                </div>
                <p className="product-desc">{selectedProduct.description || "Elegant design with premium materials, perfect for any occasion."}</p>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ mt: 4, bgcolor: 'black', borderRadius: 0, py: 2 }}
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;