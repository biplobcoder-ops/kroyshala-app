// ==========================================
// Seed Data - Users, Categories, Products
// Premium Ecommerce Catalog
// 100% Schema Compliant
// ==========================================

// ==========================================
// Seed Users Data
// Schema: name, email, password, phone, address, image, role, isBanned
// ==========================================

const seedUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "Password123",
    phone: "01710000001",
    address: {
      street: "1 Admin Road",
      city: "Dhaka",
      postalCode: "1200",
      country: "Bangladesh",
    },
    image: {
      public_id: "kroyshala/users/admin_user",
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    },
    role: "admin",
    isBanned: false,
  },
  {
    name: "Manager User",
    email: "manager@example.com",
    password: "Password123",
    phone: "01710000002",
    address: {
      street: "2 Manager Road",
      city: "Dhaka",
      postalCode: "1212",
      country: "Bangladesh",
    },
    image: {
      public_id: "kroyshala/users/manager_user",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
    role: "manager",
    isBanned: false,
  },
  {
    name: "Customer User",
    email: "customer@example.com",
    password: "Password123",
    phone: "01710000003",
    address: {
      street: "3 Customer Road",
      city: "Chittagong",
      postalCode: "4000",
      country: "Bangladesh",
    },
    image: {
      public_id: "kroyshala/users/customer_user",
      url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
    },
    role: "customer",
    isBanned: false,
  },
];

// ==========================================
// Seed Categories Data
// Schema: name, slug, description, image, isActive
// ==========================================

const seedCategories = [
  {
    name: "Electronics",
    description:
      "Smartphones, laptops, audio devices, and cutting-edge gadgets for modern living",
    image: {
      public_id: "kroyshala/categories/electronics",
      url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Fashion",
    description:
      "Premium clothing, footwear, and accessories for men and women",
    image: {
      public_id: "kroyshala/categories/fashion",
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Home & Living",
    description:
      "Elegant furniture, kitchen essentials, and home decor for a beautiful space",
    image: {
      public_id: "kroyshala/categories/home_living",
      url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Beauty & Health",
    description:
      "Skincare, cosmetics, and wellness products for your self-care routine",
    image: {
      public_id: "kroyshala/categories/beauty_health",
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Accessories",
    description:
      "Watches, bags, wallets, and stylish essentials to complete your look",
    image: {
      public_id: "kroyshala/categories/accessories",
      url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    },
    isActive: true,
  },
];

// ==========================================
// Seed Products Data
// Schema: name, slug, description, price, discountPrice, brand, sku, category,
//         images[{public_id, url}], stock, tags[], 
//         specifications{color, size, weight, material},
//         rating, numReviews, soldCount, isFeatured, isActive
// ==========================================

const seedProducts = [
  // ==========================================
  // ELECTRONICS (12 products)
  // ==========================================
  {
    name: "Wireless Noise Cancelling Earbuds Pro",
    description:
      "Experience studio-quality sound with advanced active noise cancellation (ANC). Features 40-hour total battery life with charging case, IPX5 water resistance, Bluetooth 5.3 connectivity, and premium titanium-coated drivers for crystal-clear audio.",
    price: 4499,
    discountPrice: 3499,
    brand: "SoundMax",
    sku: "ELEC-EARB-001",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/earbuds_pro_1",
        url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/earbuds_pro_2",
        url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
      },
    ],
    stock: 45,
    tags: ["wireless", "earbuds", "noise-cancelling", "bluetooth", "premium"],
    specifications: {
      color: "Midnight Black",
      size: "Standard",
      weight: "52g",
      material: "ABS Plastic + Silicone",
    },
    rating: 4.6,
    numReviews: 128,
    soldCount: 342,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Smart Watch Series 8 Pro",
    description:
      "Advanced smartwatch with AMOLED display, heart rate monitoring, SpO2 tracking, GPS, and 7-day battery life. Water-resistant up to 50m with 100+ sports modes.",
    price: 8999,
    discountPrice: 6999,
    brand: "TechFit",
    sku: "ELEC-WATCH-002",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/smartwatch_1",
        url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/smartwatch_2",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      },
    ],
    stock: 32,
    tags: ["smartwatch", "fitness", "wearable", "health"],
    specifications: {
      color: "Space Gray",
      size: "44mm",
      weight: "48g",
      material: "Aluminum Alloy",
    },
    rating: 4.7,
    numReviews: 205,
    soldCount: 428,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Portable Bluetooth Speaker Mini",
    description:
      "Compact yet powerful Bluetooth speaker with 360° surround sound. Features 20-hour playtime, IPX7 waterproof rating, and deep bass technology. Perfect for outdoor adventures.",
    price: 2999,
    discountPrice: 2299,
    brand: "BassWave",
    sku: "ELEC-SPKR-003",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/speaker_1",
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/speaker_2",
        url: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80",
      },
    ],
    stock: 60,
    tags: ["speaker", "bluetooth", "portable", "waterproof"],
    specifications: {
      color: "Charcoal Gray",
      size: "Compact",
      weight: "580g",
      material: "Aluminum + Fabric",
    },
    rating: 4.4,
    numReviews: 96,
    soldCount: 215,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Power Bank 20000mAh Fast Charge",
    description:
      "High-capacity power bank with 22.5W fast charging support. Dual USB-A ports plus USB-C PD. Smart LED display shows exact battery percentage. Charge 3 devices simultaneously.",
    price: 2499,
    discountPrice: 1899,
    brand: "PowerCore",
    sku: "ELEC-PB-004",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/powerbank_1",
        url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/powerbank_2",
        url: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&q=80",
      },
    ],
    stock: 75,
    tags: ["power bank", "charger", "portable", "fast charging"],
    specifications: {
      color: "Matte Black",
      size: "20000mAh",
      weight: "420g",
      material: "Aluminum",
    },
    rating: 4.5,
    numReviews: 178,
    soldCount: 512,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Mechanical Keyboard RGB Backlit",
    description:
      "Premium mechanical gaming keyboard with hot-swappable switches, per-key RGB lighting, aluminum frame, and detachable USB-C cable. Blue switches for satisfying tactile feedback.",
    price: 6999,
    discountPrice: 5499,
    brand: "KeyForge",
    sku: "ELEC-KB-005",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/keyboard_1",
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/keyboard_2",
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      },
    ],
    stock: 40,
    tags: ["keyboard", "mechanical", "gaming", "rgb"],
    specifications: {
      color: "Black",
      size: "Full Size",
      weight: "980g",
      material: "Aluminum + ABS",
    },
    rating: 4.8,
    numReviews: 142,
    soldCount: 287,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Wireless Mouse Silent Click",
    description:
      "Ergonomic wireless mouse with silent clicks, 1600 DPI optical sensor, and 18-month battery life. 2.4GHz reliable connection with USB nano receiver.",
    price: 1299,
    discountPrice: 999,
    brand: "ClickEase",
    sku: "ELEC-MOUSE-006",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/mouse_1",
        url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/mouse_2",
        url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
      },
    ],
    stock: 120,
    tags: ["mouse", "wireless", "silent", "office"],
    specifications: {
      color: "Black",
      size: "Standard",
      weight: "85g",
      material: "ABS Plastic",
    },
    rating: 4.3,
    numReviews: 245,
    soldCount: 678,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Aluminum Laptop Stand Adjustable",
    description:
      "Premium aluminum laptop stand with adjustable height and angle. Ergonomic design reduces neck strain. Compatible with 10-17 inch laptops. Non-slip silicone pads.",
    price: 2499,
    discountPrice: 1899,
    brand: "DeskPro",
    sku: "ELEC-STAND-007",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/laptopstand_1",
        url: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/laptopstand_2",
        url: "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?w=800&q=80",
      },
    ],
    stock: 55,
    tags: ["laptop stand", "aluminum", "ergonomic", "desk"],
    specifications: {
      color: "Silver",
      size: "Adjustable",
      weight: "620g",
      material: "Aluminum Alloy",
    },
    rating: 4.5,
    numReviews: 87,
    soldCount: 198,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "USB-C Hub 7-in-1 Multiport",
    description:
      "Expand your laptop with 7 ports: 4K HDMI, 3x USB 3.0, SD/TF card reader, and 100W PD charging. Aluminum body with fast heat dissipation.",
    price: 3499,
    discountPrice: 2699,
    brand: "LinkPro",
    sku: "ELEC-HUB-008",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/usbhub_1",
        url: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/usbhub_2",
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      },
    ],
    stock: 48,
    tags: ["usb hub", "usb-c", "multiport", "adapter"],
    specifications: {
      color: "Space Gray",
      size: "7-in-1",
      weight: "98g",
      material: "Aluminum",
    },
    rating: 4.4,
    numReviews: 76,
    soldCount: 165,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "HD Webcam 1080p with Microphone",
    description:
      "Full HD 1080p webcam with built-in dual noise-cancelling microphones. Auto-focus, auto-light correction, and 90° wide-angle view. Plug and play USB connection.",
    price: 3999,
    discountPrice: 2999,
    brand: "VisionTech",
    sku: "ELEC-CAM-009",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/webcam_1",
        url: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/webcam_2",
        url: "https://images.unsplash.com/photo-1615368144594-7d3e5e3e4f4b?w=800&q=80",
      },
    ],
    stock: 35,
    tags: ["webcam", "hd", "streaming", "video call"],
    specifications: {
      color: "Black",
      size: "1080p",
      weight: "145g",
      material: "ABS Plastic",
    },
    rating: 4.2,
    numReviews: 64,
    soldCount: 142,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Gaming Headset 7.1 Surround Sound",
    description:
      "Immersive 7.1 surround sound gaming headset with 50mm drivers. Detachable noise-cancelling microphone, RGB lighting, and memory foam ear cushions for long gaming sessions.",
    price: 5499,
    discountPrice: 4299,
    brand: "GameZone",
    sku: "ELEC-HSET-010",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/headset_1",
        url: "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/headset_2",
        url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
      },
    ],
    stock: 42,
    tags: ["headset", "gaming", "surround sound", "rgb"],
    specifications: {
      color: "Black + Red",
      size: "Over-ear",
      weight: "320g",
      material: "Plastic + Memory Foam",
    },
    rating: 4.6,
    numReviews: 118,
    soldCount: 245,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Smart LED Bulb WiFi Color Changing",
    description:
      "Smart LED bulb with 16 million colors, voice control via Alexa/Google, and app scheduling. 9W energy-efficient with 800 lumens brightness. No hub required.",
    price: 999,
    discountPrice: 749,
    brand: "SmartHome",
    sku: "ELEC-BULB-011",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/smartbulb_1",
        url: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/smartbulb_2",
        url: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
      },
    ],
    stock: 150,
    tags: ["smart bulb", "wifi", "color", "led"],
    specifications: {
      color: "RGB",
      size: "9W",
      weight: "95g",
      material: "Plastic + LED",
    },
    rating: 4.3,
    numReviews: 156,
    soldCount: 389,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Adjustable Phone Holder Desk Stand",
    description:
      "Premium aluminum phone holder with adjustable viewing angles. Compatible with all smartphones 4-7 inches. Anti-slip base and rubber padding protect your device.",
    price: 899,
    discountPrice: 649,
    brand: "DeskPro",
    sku: "ELEC-PH-012",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/phoneholder_1",
        url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/phoneholder_2",
        url: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&q=80",
      },
    ],
    stock: 100,
    tags: ["phone holder", "desk", "stand", "aluminum"],
    specifications: {
      color: "Silver",
      size: "Adjustable",
      weight: "180g",
      material: "Aluminum",
    },
    rating: 4.4,
    numReviews: 92,
    soldCount: 234,
    isFeatured: false,
    isActive: true,
  },

  // ==========================================
  // FASHION (10 products)
  // ==========================================
  {
    name: "Premium Oversized Cotton T-Shirt",
    description:
      "Ultra-soft 100% organic cotton oversized t-shirt. Drop shoulder design with relaxed fit. Pre-shrunk and bio-washed for lasting comfort. Perfect for casual everyday wear.",
    price: 1299,
    discountPrice: 899,
    brand: "UrbanBasics",
    sku: "FAS-TS-001",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/tshirt_1",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/tshirt_2",
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      },
    ],
    stock: 120,
    tags: ["t-shirt", "oversized", "cotton", "casual"],
    specifications: {
      color: "Off White",
      size: "S, M, L, XL",
      weight: "220g",
      material: "100% Organic Cotton",
    },
    rating: 4.7,
    numReviews: 312,
    soldCount: 856,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Minimalist Fleece Hoodie",
    description:
      "Premium fleece-lined hoodie with kangaroo pocket and adjustable drawstring hood. Made from soft cotton-polyester blend. Ribbed cuffs and hem for classic fit.",
    price: 2499,
    discountPrice: 1899,
    brand: "UrbanBasics",
    sku: "FAS-HD-002",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/hoodie_1",
        url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/hoodie_2",
        url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      },
    ],
    stock: 85,
    tags: ["hoodie", "fleece", "minimalist", "winter"],
    specifications: {
      color: "Charcoal Gray",
      size: "S, M, L, XL",
      weight: "480g",
      material: "Cotton-Poly Blend",
    },
    rating: 4.8,
    numReviews: 245,
    soldCount: 612,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Classic Linen Casual Shirt",
    description:
      "Breathable 100% linen shirt with button-down collar and chest pocket. Perfect for summer and semi-formal occasions. Wrinkle-resistant with natural texture.",
    price: 2199,
    discountPrice: 1649,
    brand: "NordStyle",
    sku: "FAS-SH-003",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/linenshirt_1",
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/linenshirt_2",
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      },
    ],
    stock: 70,
    tags: ["shirt", "linen", "casual", "summer"],
    specifications: {
      color: "Sky Blue",
      size: "S, M, L, XL",
      weight: "280g",
      material: "100% Linen",
    },
    rating: 4.5,
    numReviews: 156,
    soldCount: 398,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Premium Cotton Polo Shirt",
    description:
      "Classic polo shirt with pique cotton fabric, ribbed collar, and 3-button placket. Embroidered logo detail. Perfect for business casual or weekend wear.",
    price: 1799,
    discountPrice: 1349,
    brand: "NordStyle",
    sku: "FAS-PL-004",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/polo_1",
        url: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/polo_2",
        url: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&q=80",
      },
    ],
    stock: 95,
    tags: ["polo", "cotton", "premium", "classic"],
    specifications: {
      color: "Navy Blue",
      size: "S, M, L, XL",
      weight: "320g",
      material: "100% Pique Cotton",
    },
    rating: 4.6,
    numReviews: 198,
    soldCount: 512,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Everyday Running Sneakers",
    description:
      "Lightweight running sneakers with breathable mesh upper and cushioned EVA midsole. Non-slip rubber outsole for superior grip. Perfect for running, gym, and casual wear.",
    price: 3999,
    discountPrice: 2999,
    brand: "StridePro",
    sku: "FAS-SN-005",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/sneakers_1",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/sneakers_2",
        url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      },
    ],
    stock: 68,
    tags: ["sneakers", "running", "sports", "shoes"],
    specifications: {
      color: "White + Red",
      size: "39-45",
      weight: "580g",
      material: "Mesh + Rubber",
    },
    rating: 4.7,
    numReviews: 289,
    soldCount: 723,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Urban Commuter Backpack 25L",
    description:
      "Water-resistant laptop backpack with padded 15.6 inch sleeve. Features USB charging port, anti-theft pocket, and breathable back panel. 25L capacity with multiple compartments.",
    price: 3499,
    discountPrice: 2599,
    brand: "TravelGear",
    sku: "FAS-BP-006",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/backpack_1",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/backpack_2",
        url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
      },
    ],
    stock: 55,
    tags: ["backpack", "laptop", "travel", "water-resistant"],
    specifications: {
      color: "Black",
      size: "25L",
      weight: "850g",
      material: "Polyester + Nylon",
    },
    rating: 4.6,
    numReviews: 167,
    soldCount: 412,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Minimalist Leather Wallet RFID",
    description:
      "Slim bifold wallet in genuine leather with RFID blocking technology. Holds up to 8 cards plus cash. Handcrafted with precision stitching and gift box included.",
    price: 1999,
    discountPrice: 1499,
    brand: "CraftLine",
    sku: "FAS-WL-007",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/wallet_1",
        url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/wallet_2",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      },
    ],
    stock: 80,
    tags: ["wallet", "leather", "rfid", "minimalist"],
    specifications: {
      color: "Brown",
      size: "Slim",
      weight: "75g",
      material: "Genuine Leather",
    },
    rating: 4.5,
    numReviews: 234,
    soldCount: 578,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Vintage Denim Jacket Classic",
    description:
      "Timeless denim jacket in premium washed cotton. Classic button-front design with chest pockets and adjustable waist tabs. Perfect layering piece for all seasons.",
    price: 3999,
    discountPrice: 2999,
    brand: "UrbanBasics",
    sku: "FAS-DJ-008",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/denimjacket_1",
        url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/denimjacket_2",
        url: "https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=800&q=80",
      },
    ],
    stock: 45,
    tags: ["denim jacket", "vintage", "classic", "layering"],
    specifications: {
      color: "Medium Blue",
      size: "S, M, L, XL",
      weight: "720g",
      material: "100% Cotton Denim",
    },
    rating: 4.7,
    numReviews: 145,
    soldCount: 328,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Slim Fit Stretch Chino Pants",
    description:
      "Modern slim-fit chinos with 2% elastane for all-day comfort. Wrinkle-resistant cotton twill with 4-pocket design. Perfect for office and casual wear.",
    price: 2299,
    discountPrice: 1799,
    brand: "NordStyle",
    sku: "FAS-CH-009",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/chino_1",
        url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/chino_2",
        url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      },
    ],
    stock: 75,
    tags: ["chino", "slim fit", "pants", "office"],
    specifications: {
      color: "Khaki",
      size: "30-38",
      weight: "380g",
      material: "Cotton + Elastane",
    },
    rating: 4.4,
    numReviews: 187,
    soldCount: 445,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Wool Blend Beanie Winter Hat",
    description:
      "Soft wool-blend beanie with ribbed knit design. One-size-fits-most with stretchable fabric. Keeps you warm during cold weather. Available in classic colors.",
    price: 899,
    discountPrice: 649,
    brand: "NordStyle",
    sku: "FAS-BN-010",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/beanie_1",
        url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/beanie_2",
        url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
      },
    ],
    stock: 110,
    tags: ["beanie", "wool", "winter", "hat"],
    specifications: {
      color: "Charcoal",
      size: "Free Size",
      weight: "95g",
      material: "Wool Blend",
    },
    rating: 4.5,
    numReviews: 123,
    soldCount: 356,
    isFeatured: false,
    isActive: true,
  },

  // ==========================================
  // HOME & LIVING (8 products)
  // ==========================================
  {
    name: "Minimalist Table Lamp with Wooden Base",
    description:
      "Elegant table lamp with natural wooden base and fabric lampshade. Warm ambient lighting perfect for bedside or reading nook. E27 bulb compatible (not included).",
    price: 2499,
    discountPrice: 1899,
    brand: "HearthHome",
    sku: "HOME-LAMP-001",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/tablelamp_1",
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/tablelamp_2",
        url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      },
    ],
    stock: 50,
    tags: ["lamp", "minimalist", "wooden", "bedside"],
    specifications: {
      color: "Natural Wood + Beige",
      size: "Medium",
      weight: "1.2kg",
      material: "Wood + Fabric",
    },
    rating: 4.6,
    numReviews: 98,
    soldCount: 234,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Ceramic Coffee Mug Set of 4",
    description:
      "Handcrafted ceramic mugs with matte finish. 350ml capacity each, perfect for coffee, tea, or hot chocolate. Microwave and dishwasher safe. Gift-boxed set of 4.",
    price: 1499,
    discountPrice: 1099,
    brand: "ClayStudio",
    sku: "HOME-MUG-002",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/mugset_1",
        url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/mugset_2",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      },
    ],
    stock: 85,
    tags: ["mug", "ceramic", "coffee", "set"],
    specifications: {
      color: "Matte White",
      size: "350ml each",
      weight: "1.6kg",
      material: "Ceramic",
    },
    rating: 4.5,
    numReviews: 145,
    soldCount: 378,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Wooden Desk Organizer with Drawers",
    description:
      "Multi-compartment wooden desk organizer with 2 drawers. Keep your workspace clutter-free. Made from sustainable pine wood with natural finish.",
    price: 1999,
    discountPrice: 1499,
    brand: "HearthHome",
    sku: "HOME-ORG-003",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/organizer_1",
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/organizer_2",
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      },
    ],
    stock: 62,
    tags: ["organizer", "wooden", "desk", "storage"],
    specifications: {
      color: "Natural Pine",
      size: "Medium",
      weight: "890g",
      material: "Pine Wood",
    },
    rating: 4.4,
    numReviews: 76,
    soldCount: 189,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Insulated Stainless Steel Water Bottle",
    description:
      "Double-wall vacuum insulated bottle keeps drinks cold 24hrs or hot 12hrs. 750ml capacity with leak-proof cap. BPA-free food-grade stainless steel.",
    price: 1799,
    discountPrice: 1349,
    brand: "EcoSip",
    sku: "HOME-BT-004",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/bottle_1",
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/bottle_2",
        url: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=800&q=80",
      },
    ],
    stock: 130,
    tags: ["water bottle", "insulated", "stainless", "eco"],
    specifications: {
      color: "Ocean Blue",
      size: "750ml",
      weight: "380g",
      material: "Stainless Steel",
    },
    rating: 4.7,
    numReviews: 234,
    soldCount: 567,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Modern Minimalist Wall Clock",
    description:
      "Silent sweep wall clock with minimalist design. 30cm diameter with wooden frame and clear glass face. Battery operated (AA, not included).",
    price: 1499,
    discountPrice: 1099,
    brand: "HearthHome",
    sku: "HOME-CLK-005",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/wallclock_1",
        url: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/wallclock_2",
        url: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&q=80",
      },
    ],
    stock: 70,
    tags: ["wall clock", "minimalist", "modern", "home decor"],
    specifications: {
      color: "Natural Wood + White",
      size: "30cm",
      weight: "650g",
      material: "Wood + Glass",
    },
    rating: 4.3,
    numReviews: 89,
    soldCount: 212,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Foldable Storage Box Set of 3",
    description:
      "Set of 3 foldable fabric storage boxes with handles. Perfect for closet organization, toys, or office supplies. Collapsible design saves space when not in use.",
    price: 1299,
    discountPrice: 949,
    brand: "EcoSip",
    sku: "HOME-BOX-006",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/storagebox_1",
        url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/storagebox_2",
        url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&q=80",
      },
    ],
    stock: 95,
    tags: ["storage", "box", "foldable", "organizer"],
    specifications: {
      color: "Gray",
      size: "Set of 3",
      weight: "780g",
      material: "Fabric + Cardboard",
    },
    rating: 4.4,
    numReviews: 156,
    soldCount: 345,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Aromatherapy Essential Oil Diffuser",
    description:
      "Ultrasonic essential oil diffuser with 300ml capacity. 7-color LED mood lighting and 4 timer settings. Auto shut-off when water runs out. Whisper-quiet operation.",
    price: 2799,
    discountPrice: 2099,
    brand: "ZenSpace",
    sku: "HOME-DIF-007",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/diffuser_1",
        url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/diffuser_2",
        url: "https://images.unsplash.com/photo-1602874801006-e26b7c0e3a3c?w=800&q=80",
      },
    ],
    stock: 55,
    tags: ["diffuser", "aromatherapy", "essential oil", "relaxation"],
    specifications: {
      color: "White Wood Grain",
      size: "300ml",
      weight: "420g",
      material: "ABS + Wood",
    },
    rating: 4.6,
    numReviews: 178,
    soldCount: 412,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Decorative Throw Pillow Cover Set",
    description:
      "Set of 2 premium velvet throw pillow covers. Hidden zipper closure. 45x45cm size fits standard inserts. Elegant design adds instant style to any room.",
    price: 999,
    discountPrice: 749,
    brand: "HearthHome",
    sku: "HOME-PIL-008",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/pillow_1",
        url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/pillow_2",
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      },
    ],
    stock: 105,
    tags: ["pillow cover", "velvet", "home decor", "set"],
    specifications: {
      color: "Emerald Green",
      size: "45x45cm",
      weight: "280g",
      material: "Velvet",
    },
    rating: 4.5,
    numReviews: 134,
    soldCount: 298,
    isFeatured: false,
    isActive: true,
  },

  // ==========================================
  // BEAUTY & HEALTH (6 products)
  // ==========================================
  {
    name: "Vitamin C Brightening Face Serum",
    description:
      "Advanced 20% Vitamin C serum with hyaluronic acid and vitamin E. Brightens skin, reduces dark spots, and boosts collagen production. Dermatologist-tested, cruelty-free.",
    price: 1699,
    discountPrice: 1249,
    brand: "GlowLab",
    sku: "BEAUTY-SERUM-001",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/serum_1",
        url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/serum_2",
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      },
    ],
    stock: 90,
    tags: ["serum", "vitamin c", "skincare", "brightening"],
    specifications: {
      color: "Clear",
      size: "30ml",
      weight: "95g",
      material: "Glass Bottle",
    },
    rating: 4.8,
    numReviews: 456,
    soldCount: 1123,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Gentle Foaming Face Wash with Niacinamide",
    description:
      "Soap-free foaming face wash with 4% niacinamide and ceramides. Removes impurities without stripping skin. Suitable for all skin types, including sensitive skin.",
    price: 899,
    discountPrice: 699,
    brand: "GlowLab",
    sku: "BEAUTY-FW-002",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/facewash_1",
        url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/facewash_2",
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      },
    ],
    stock: 140,
    tags: ["face wash", "niacinamide", "cleanser", "skincare"],
    specifications: {
      color: "White",
      size: "150ml",
      weight: "185g",
      material: "Plastic Bottle",
    },
    rating: 4.6,
    numReviews: 312,
    soldCount: 789,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Hydrating Moisturizer with SPF 30",
    description:
      "Lightweight daily moisturizer with broad-spectrum SPF 30 protection. Hyaluronic acid and glycerin provide 24-hour hydration. Non-greasy, fragrance-free formula.",
    price: 1299,
    discountPrice: 949,
    brand: "GlowLab",
    sku: "BEAUTY-MOIST-003",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/moisturizer_1",
        url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/moisturizer_2",
        url: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
      },
    ],
    stock: 115,
    tags: ["moisturizer", "spf", "hydration", "daily"],
    specifications: {
      color: "White",
      size: "100ml",
      weight: "140g",
      material: "Plastic Tube",
    },
    rating: 4.7,
    numReviews: 289,
    soldCount: 678,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Sunscreen SPF 50 PA++++ Lightweight",
    description:
      "Ultra-light gel sunscreen with SPF 50 PA++++ broad-spectrum protection. No white cast, non-comedogenic. Suitable under makeup. Water-resistant formula.",
    price: 1199,
    discountPrice: 899,
    brand: "SunShield",
    sku: "BEAUTY-SUN-004",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/sunscreen_1",
        url: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/sunscreen_2",
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      },
    ],
    stock: 160,
    tags: ["sunscreen", "spf 50", "protection", "skincare"],
    specifications: {
      color: "White",
      size: "50ml",
      weight: "85g",
      material: "Plastic Tube",
    },
    rating: 4.7,
    numReviews: 401,
    soldCount: 945,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Ionic Hair Dryer Fast Drying",
    description:
      "Professional ionic hair dryer with 2200W motor for fast drying. 3 heat settings and 2 speed options. Cool shot button and concentrator nozzle included.",
    price: 3499,
    discountPrice: 2699,
    brand: "StylePro",
    sku: "BEAUTY-HD-005",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/hairdryer_1",
        url: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/hairdryer_2",
        url: "https://images.unsplash.com/photo-1595944024809-44e4a5d1c9c2?w=800&q=80",
      },
    ],
    stock: 42,
    tags: ["hair dryer", "ionic", "professional", "styling"],
    specifications: {
      color: "Rose Gold + Black",
      size: "2200W",
      weight: "620g",
      material: "ABS + Ceramic",
    },
    rating: 4.5,
    numReviews: 167,
    soldCount: 398,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Beard Trimmer Rechargeable Waterproof",
    description:
      "All-in-one beard trimmer with titanium-coated blades. 20 length settings, USB-C fast charging, and 90-minute runtime. IPX7 waterproof for easy cleaning.",
    price: 2999,
    discountPrice: 2299,
    brand: "StylePro",
    sku: "BEAUTY-TRIM-006",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/trimmer_1",
        url: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/trimmer_2",
        url: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=800&q=80",
      },
    ],
    stock: 68,
    tags: ["trimmer", "beard", "waterproof", "grooming"],
    specifications: {
      color: "Matte Black",
      size: "Standard",
      weight: "280g",
      material: "ABS + Titanium",
    },
    rating: 4.6,
    numReviews: 234,
    soldCount: 512,
    isFeatured: true,
    isActive: true,
  },

  // ==========================================
  // ACCESSORIES (6 products)
  // ==========================================
  {
    name: "Polarized Sunglasses UV400 Protection",
    description:
      "Premium polarized sunglasses with UV400 protection. Lightweight TR90 frame with anti-glare lenses. Includes hard case and cleaning cloth. Unisex design.",
    price: 2299,
    discountPrice: 1749,
    brand: "SunStyle",
    sku: "ACC-SUN-001",
    category: "Accessories",
    images: [
      {
        public_id: "kroyshala/products/sunglasses_1",
        url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/sunglasses_2",
        url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      },
    ],
    stock: 75,
    tags: ["sunglasses", "polarized", "uv400", "unisex"],
    specifications: {
      color: "Matte Black",
      size: "One Size",
      weight: "28g",
      material: "TR90 + TAC Lens",
    },
    rating: 4.6,
    numReviews: 245,
    soldCount: 578,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Classic Leather Belt with Buckle",
    description:
      "Genuine leather belt with brushed silver buckle. Adjustable length fits waist 30-40 inches. Handcrafted with premium stitching. Comes with gift box.",
    price: 1699,
    discountPrice: 1249,
    brand: "CraftLine",
    sku: "ACC-BLT-002",
    category: "Accessories",
    images: [
      {
        public_id: "kroyshala/products/belt_1",
        url: "https://images.unsplash.com/photo-1624222247344-550fb60fe8e3?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/belt_2",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      },
    ],
    stock: 90,
    tags: ["belt", "leather", "classic", "men"],
    specifications: {
      color: "Brown",
      size: "30-40 inches",
      weight: "250g",
      material: "Genuine Leather",
    },
    rating: 4.5,
    numReviews: 178,
    soldCount: 412,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Silicone Watch Band Quick Release",
    description:
      "Soft silicone watch band with quick-release pins. Compatible with 20mm/22mm lugs. Breathable design with secure buckle. Fits wrists 5.5-8.5 inches.",
    price: 999,
    discountPrice: 749,
    brand: "TechFit",
    sku: "ACC-BND-003",
    category: "Accessories",
    images: [
      {
        public_id: "kroyshala/products/watchband_1",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/watchband_2",
        url: "https://images.unsplash.com/photo-1548171916-c0b6f1f2a0e5?w=800&q=80",
      },
    ],
    stock: 130,
    tags: ["watch band", "silicone", "quick release", "strap"],
    specifications: {
      color: "Navy Blue",
      size: "20mm / 22mm",
      weight: "35g",
      material: "Silicone",
    },
    rating: 4.4,
    numReviews: 134,
    soldCount: 312,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Premium Leather Keychain Organizer",
    description:
      "Handcrafted leather keychain with 6 keyring slots. Keeps keys organized and quiet. Premium brass hardware with secure snap closure. Perfect gift item.",
    price: 899,
    discountPrice: 649,
    brand: "CraftLine",
    sku: "ACC-KC-004",
    category: "Accessories",
    images: [
      {
        public_id: "kroyshala/products/keychain_1",
        url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/keychain_2",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      },
    ],
    stock: 110,
    tags: ["keychain", "leather", "organizer", "gift"],
    specifications: {
      color: "Tan Brown",
      size: "Standard",
      weight: "65g",
      material: "Genuine Leather",
    },
    rating: 4.5,
    numReviews: 112,
    soldCount: 267,
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Slim Card Holder RFID Blocking",
    description:
      "Ultra-slim card holder with RFID blocking technology. Holds up to 6 cards plus cash. Premium aluminum body with leather accents. Fits in front pocket comfortably.",
    price: 1299,
    discountPrice: 949,
    brand: "CraftLine",
    sku: "ACC-CH-005",
    category: "Accessories",
    images: [
      {
        public_id: "kroyshala/products/cardholder_1",
        url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/cardholder_2",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      },
    ],
    stock: 95,
    tags: ["card holder", "rfid", "slim", "wallet"],
    specifications: {
      color: "Black",
      size: "Slim",
      weight: "55g",
      material: "Aluminum + Leather",
    },
    rating: 4.7,
    numReviews: 189,
    soldCount: 445,
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Premium Leather Laptop Sleeve 14 inch",
    description:
      "Elegant leather laptop sleeve with soft microfiber lining. Fits 13-14 inch laptops. Magnetic closure and additional front pocket for accessories. Water-resistant.",
    price: 2999,
    discountPrice: 2299,
    brand: "TravelGear",
    sku: "ACC-LS-006",
    category: "Accessories",
    images: [
      {
        public_id: "kroyshala/products/laptopsleeve_1",
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/laptopsleeve_2",
        url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      },
    ],
    stock: 48,
    tags: ["laptop sleeve", "leather", "14 inch", "case"],
    specifications: {
      color: "Tan Brown",
      size: "14 inch",
      weight: "380g",
      material: "Genuine Leather",
    },
    rating: 4.6,
    numReviews: 98,
    soldCount: 234,
    isFeatured: false,
    isActive: true,
  },
];

// ==========================================
// Export All Seed Data
// ==========================================

module.exports = {
  seedUsers,
  seedCategories,
  seedProducts,
};
