import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/store/authSlice2"; // ✅ এটা নিশ্চিত
import productReducer from "../features/products/store/productSlice";
import cartReducer from "../features/cart/store/cartSlice";
import categoryReducer from "../features/categories/store/categorySlice";
import wishlistReducer from "../features/wishlist/store/wishlistSlice";
import orderReducer from "../features/order/store/orderSlice";
import reviewReducer from "../features/review/store/reviewSlice";
import searchReducer from "../features/search/store/searchSlice";
import dashboardReducer from "../features/admin/store/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    categories: categoryReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    review: reviewReducer,
    search: searchReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;