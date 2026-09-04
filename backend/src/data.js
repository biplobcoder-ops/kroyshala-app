// ==========================================
// Seed Data - Users, Categories, Products
// Schema অনুযায়ী Updated
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
  {
    name: "Blocked Customer",
    email: "blocked@example.com",
    password: "Password123",
    phone: "01710000005",
    address: {
      street: "5 Blocked Road",
      city: "Rajshahi",
      postalCode: "6000",
      country: "Bangladesh",
    },
    image: {
      public_id: "kroyshala/users/blocked_customer",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
    role: "customer",
    isBanned: true,
  },
  {
    name: "Inactive Customer",
    email: "inactive@example.com",
    password: "Password123",
    phone: "01710000006",
    address: {
      street: "6 Inactive Road",
      city: "Sylhet",
      postalCode: "3100",
      country: "Bangladesh",
    },
    image: {
      public_id: "kroyshala/users/inactive_customer",
      url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
    },
    role: "customer",
    isBanned: true,
  },
];

// ==========================================
// Seed Categories Data
// Schema: name, slug, description, image, isActive
// ==========================================

const seedCategories = [
  {
    name: "Electronics",
    description: "Mobile, laptop, TV, accessories and more",
    image: {
      public_id: "kroyshala/categories/electronics",
      url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Fashion",
    description: "Men & women clothing, shoes, accessories",
    image: {
      public_id: "kroyshala/categories/fashion",
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Groceries",
    description: "Daily necessities, food items, cooking essentials",
    image: {
      public_id: "kroyshala/categories/groceries",
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Home & Living",
    description: "Furniture, kitchen items, home decor",
    image: {
      public_id: "kroyshala/categories/home_living",
      url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
    },
    isActive: true,
  },
  {
    name: "Beauty & Health",
    description: "Cosmetics, skincare, health products",
    image: {
      public_id: "kroyshala/categories/beauty_health",
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    },
    isActive: true,
  },
];

// ==========================================
// Seed Products Data
// Schema: name, slug, description, price, discountPrice, brand, sku, category,
//         images, stock, tags, specifications{color,size,weight,material},
//         isFeatured, isActive
// ==========================================

const seedProducts = [
  // ==========================================
  // Electronics Products
  // ==========================================

  {
    name: "iPhone 15 Pro Max",
    description: "Latest Apple iPhone with A17 Pro chip, 48MP camera, and Titanium body. The most powerful iPhone ever.",
    price: 185000,
    discountPrice: 179000,
    brand: "Apple",
    sku: "APP-IP15PM-001",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/iphone15promax_1",
        url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      },
      {
        public_id: "kroyshala/products/iphone15promax_2",
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      },
    ],
    stock: 25,
    tags: ["phone", "apple", "iphone", "smartphone"],
    specifications: {
      color: "Natural Titanium",
      size: "6.7 inch",
      weight: "221g",
      material: "Titanium",
    },
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung flagship with S-Pen, 200MP camera, and AI features. Experience the future of smartphones.",
    price: 145000,
    discountPrice: 139000,
    brand: "Samsung",
    sku: "SAM-S24U-001",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/samsungs24ultra_1",
        url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
      },
    ],
    stock: 30,
    tags: ["phone", "samsung", "galaxy", "smartphone"],
    specifications: {
      color: "Titanium Gray",
      size: "6.8 inch",
      weight: "232g",
      material: "Titanium",
    },
    isFeatured: true,
    isActive: true,
  },
  {
    name: "MacBook Pro 14",
    description: "Apple laptop with M3 Pro chip, 16GB RAM, 512GB SSD. Perfect for professionals and creators.",
    price: 245000,
    discountPrice: 235000,
    brand: "Apple",
    sku: "APP-MBP14-001",
    category: "Electronics",
    images: [
      {
        public_id: "kroyshala/products/macbookpro14_1",
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      },
    ],
    stock: 10,
    tags: ["laptop", "apple", "macbook", "computer"],
    specifications: {
      color: "Space Black",
      size: "14.2 inch",
      weight: "1.55kg",
      material: "Aluminum",
    },
    isFeatured: true,
    isActive: true,
  },

  // ==========================================
  // Fashion Products
  // ==========================================

  {
    name: "Men's Casual Shirt",
    description: "Premium cotton casual shirt, perfect for daily wear. Comfortable and stylish design.",
    price: 1500,
    discountPrice: 1200,
    brand: "Yellow",
    sku: "FAS-SHIRT-001",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/menscasualshirt_1",
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      },
    ],
    stock: 100,
    tags: ["shirt", "men", "casual", "cotton"],
    specifications: {
      color: "Blue",
      size: "M, L, XL",
      weight: "250g",
      material: "Cotton",
    },
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Women's Kurti",
    description: "Elegant designer kurti for women, comfortable fabric. Perfect for any occasion.",
    price: 1800,
    discountPrice: 1400,
    brand: "Aarong",
    sku: "FAS-KURTI-001",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/womenskurti_1",
        url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80",
      },
    ],
    stock: 80,
    tags: ["kurti", "women", "designer", "traditional"],
    specifications: {
      color: "Red",
      size: "S, M, L",
      weight: "200g",
      material: "Cotton Silk",
    },
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes with breathable mesh upper. Perfect for daily workouts.",
    price: 3500,
    discountPrice: 2800,
    brand: "Nike",
    sku: "FAS-SHOE-001",
    category: "Fashion",
    images: [
      {
        public_id: "kroyshala/products/runningshoes_1",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      },
    ],
    stock: 60,
    tags: ["shoes", "running", "sports", "nike"],
    specifications: {
      color: "Red",
      size: "38-44",
      weight: "300g",
      material: "Mesh",
    },
    isFeatured: true,
    isActive: true,
  },

  // ==========================================
  // Groceries Products
  // ==========================================

  {
    name: "Basmati Rice 5kg",
    description: "Premium quality basmati rice, aromatic and long grain. Perfect for biryani and daily meals.",
    price: 850,
    discountPrice: 799,
    brand: "Pran",
    sku: "GRO-RICE-001",
    category: "Groceries",
    images: [
      {
        public_id: "kroyshala/products/basmatirice5kg_1",
        url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
      },
    ],
    stock: 200,
    tags: ["rice", "basmati", "grocery", "food"],
    specifications: {
      color: "White",
      size: "5kg",
      weight: "5kg",
      material: "Food",
    },
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Soybean Oil 5L",
    description: "Pure soybean oil, healthy cooking oil for daily use. Cholesterol free.",
    price: 950,
    discountPrice: 899,
    brand: "Rupchanda",
    sku: "GRO-OIL-001",
    category: "Groceries",
    images: [
      {
        public_id: "kroyshala/products/soybeanoil5l_1",
        url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
      },
    ],
    stock: 150,
    tags: ["oil", "soybean", "cooking", "grocery"],
    specifications: {
      color: "Golden",
      size: "5L",
      weight: "4.6kg",
      material: "Food",
    },
    isFeatured: false,
    isActive: true,
  },

  // ==========================================
  // Home & Living Products
  // ==========================================

  {
    name: "Dinner Set 24 Pieces",
    description: "Elegant ceramic dinner set, perfect for family dining and special occasions.",
    price: 3500,
    discountPrice: 2999,
    brand: "Shine",
    sku: "HAL-DINNER-001",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/dinnerset24_1",
        url: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800&q=80",
      },
    ],
    stock: 40,
    tags: ["dinner", "ceramic", "kitchen", "home"],
    specifications: {
      color: "White",
      size: "24 pieces",
      weight: "8kg",
      material: "Ceramic",
    },
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Bed Sheet Double",
    description: "Soft cotton double bed sheet with pillow covers. Comfortable and durable.",
    price: 2200,
    discountPrice: 1800,
    brand: "Essenza",
    sku: "HAL-BED-001",
    category: "Home & Living",
    images: [
      {
        public_id: "kroyshala/products/bedsheetdouble_1",
        url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      },
    ],
    stock: 60,
    tags: ["bed sheet", "cotton", "home", "bedroom"],
    specifications: {
      color: "Multi",
      size: "Double",
      weight: "800g",
      material: "Cotton",
    },
    isFeatured: false,
    isActive: true,
  },

  // ==========================================
  // Beauty & Health Products
  // ==========================================

  {
    name: "Vitamin C Serum",
    description: "Skin brightening vitamin C serum with hyaluronic acid. For glowing and youthful skin.",
    price: 1200,
    discountPrice: 999,
    brand: "The Ordinary",
    sku: "BH-SERUM-001",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/vitamincserum_1",
        url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      },
    ],
    stock: 90,
    tags: ["skincare", "serum", "vitamin c", "beauty"],
    specifications: {
      color: "Clear",
      size: "30ml",
      weight: "50g",
      material: "Liquid",
    },
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Hair Growth Oil",
    description: "Natural herbal hair oil for strong and shiny hair. Reduces hair fall.",
    price: 800,
    discountPrice: 650,
    brand: "Dabur",
    sku: "BH-OIL-001",
    category: "Beauty & Health",
    images: [
      {
        public_id: "kroyshala/products/hairgrowthoil_1",
        url: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
      },
    ],
    stock: 120,
    tags: ["hair", "oil", "herbal", "beauty"],
    specifications: {
      color: "Green",
      size: "200ml",
      weight: "220g",
      material: "Oil",
    },
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