import React, { useEffect, useRef, useState } from 'react'
import { FiGrid, FiHeart, FiHome, FiLogOut, FiMenu, FiPackage, FiSettings, FiShoppingBag, FiShoppingCart, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../features/auth/services/authApi';
import { clearUser } from '../../../features/auth/store/authSlice';
import Button from '../../ui/Button/Button';
import useDebounce from '../../../hooks/useDebounce';
import { clearSuggestions, getSearchSuggestions } from '../../../features/search/store/searchSlice';
import { clearCart } from '../../../features/cart/store/cartSlice';
import { clearWishlist } from '../../../features/wishlist/store/wishlistSlice';

const navigationItems2 = [
    {
      id:"home",
      label:"Home",
      path:"/",
      icon:<FiHome />
    },
     {
      id:"products",
      label:"Products",
      path:"/products",
      icon:<FiPackage />
    },
     {
      id:"categories",
      label:"Categorires",
      path:"/categories",
      icon:<FiGrid />
    },
     {
      id:"wishlist",
      label:"Wishlist",
      path:"/wishlist",
      icon:<FiHeart />
    },
     {
      id:"cart",
      label:"Cart",
      path:"/cart",
      icon:<FiShoppingCart />
    },
];

const bottomNavigationItems2 = [
    
      {
      id:"home",
      label:"Home",
      path:"/",
      icon:<FiHome />
    },  
     {
      id:"products",
      label:"Products",
      path:"/products",
      icon:<FiPackage />
    },
     {
      id:"wishlist",
      label:"Wishlist",
      path:"/wishlist",
      icon:<FiHeart />
    },
    {
      id:"cart",
      label:"Cart",
      path:"/cart",
      icon:<FiShoppingCart />
    },
    {
        id:"account",
        label:"Account",
        path:"/account/profile",
        icon:<FiUser />
    }
    
];

// Profile Dropdown Items

const profileItems2 = [
    {
        id:"profile",
        label:"My Profile",
        icon:<FiUser />,
        value:"profile",
     },
     {
        id:"settings",
        label:"Settings",
        icon:<FiSettings />,
        value:"settings"
     },
     {
        id:"divider-1",
        divider:true
     },
     {
        id:"logout",
        label:"Logout",
        value:"logout",
        icon:<FiLogOut />,
        danger:true
     }
]

const Navbar2 = () => {
   
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const cart = useSelector((state) => state.cart?.totalItems || 0);
    const wishlistCount = useSelector((state) => state.wishlist?.items.length || 0);

    const navigate = useNavigate();
    const location = useLocation();
    const profileRef = useRef(null);
    const searchRef = useRef(null);
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);
    const [isProfileOpen,setIsProfileOpen] = useState(false);
    const [isSearchOpen,setIsSearchOpen] = useState(false);
    const [searchTerm,setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm,300);


 useEffect(() => {
  if(debouncedSearchTerm.trim().length >=2){
    dispatch(getSearchSuggestions(debouncedSearchTerm));
    setIsSearchOpen(true)
    
  } else{
     dispatch(clearSuggestions());
     setIsSearchOpen(false)
  }
 },[debouncedSearchTerm,dispatch]);

    const isActive = (path) => {
        if(path ==="/") {
            return location.pathname = "/"
        }
        if(path ==="/account/profile") {
          return (
            location.pathname = path || 
            location.pathname.startsWith("/account")
          )
        }
        return (
          location.pathname = path ||
          location.pathname.startsWith(`${path}/`)
        )
    };
 
    useEffect(() => {
     setIsSidebarOpen(false)
     setIsProfileOpen(false)
     setIsSearchOpen(false)
    },[location.pathname])

   useEffect(() => {
     const handleClickOutside = (event) => {
      if(profileRef.current && !profileRef.current.contains(event.target)){
        setIsProfileOpen(false)
      }
      if(searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
     } 
     document.addEventListener("mousedown",handleClickOutside);
    return () => {
       document.removeEventListener("mousedown",handleClickOutside);
    }
   },[])

   useEffect(() => {
    const handleClickEscape = (event) => {
      if(event.key === 'Escape') {
        setIsProfileOpen(false)
        setIsSearchOpen(false)
        setIsSidebarOpen(false)
      }
    }
    document.addEventListener("keydown",handleClickEscape);
    return () => {
      document.removeEventListener("keydown",handleClickEscape);
    }
   },[]);

  useEffect(() => {
    if(isSidebarOpen){
      document.body.style.overflow="hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ''
    }
  },[isSidebarOpen])

 const handleLogout2 = async () => {
  try {
     await logoutUser();
     dispatch(clearUser())
      dispatch(clearCart())
      dispatch(clearWishlist())
      setIsSidebarOpen(false)
     setIsProfileOpen(false)
     navigate("/login",{replace:true});
    
  } catch (error) {
    error.response?.data?.message || error.message
  }

 }

const handleProfileSelect2 = (value) => {
  switch(value) {
    case "profile":
      navigate("/account/profile")
      break;
    case "settings":
      navigate("/account/settings")
      break;
    case "logout":
      handleLogout2()
      break;
      default:
        break;
  }
}

  return (
   <>
     <header className='sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur'>
        <div className='mx-auto flex h-18 max-w-7xl justify-between items-center px-4 sm:px-6 lg:px-8'>
           
            // logo and mobile menu button 
           <div className='flex gap-3'>
               <Button 
               type='button'
               variant='outline'
               size='sm'
               rounded='lg'
               aria-label="open navigation menu"
               onClick={() => setIsSidebarOpen(true)}
               className='
                h-10!
                w-10!
                border-none!
                bg-white!
                p-0!
                text-slate-700
                hover:bg-slate-50
                 md:hidden
               '
               >
                 <FiMenu className='h-5 w-5'/> 
                </Button> 
                <Link to={"/"} className='flex items-center gap-2.5'>
                   <div className='flex h-9 w-9 shrink-0 items-center justify-center bg-blue-600 rounded-lg text-white shadow-sm'>
                    <FiShoppingBag className='w-5 h-5' />
                   </div>
                  <span className='text-xl font-bold tracking-tight text-slate-900'>Kroyshala</span>

                </Link> 
           </div>

          

       // right section - user Actions
      <div className='flex items-center gap-2'>

              <Link 
              to={"/wishlist"}
              aria-label='Wishlist'
              className={`
              flex 
              relative
              justify-center
              items-center 
              rounded-lg w-10
              h-10 transition  
              md:hidden
              ${
                isActive("/wishlist")? 
                "bg-blue-50 text-blue-600":
                "text-slate-600 hover:text-slate-100"

              }    
            `}
              >
                <FiHeart className='w-5 h-5' />
                {
                  wishlistCount > 0 && (
                    <span
                    className='
                    absolute
                    right-0.5
                    top-0.5
                    flex h-4
                    min-w-4
                    justify-center
                    items-center
                    rounded-full
                    text-white
                    bg-blue-600
                    text-[10px]
                    px-1
                    font-semibold
                    
                    '
                    >
                      {wishlistCount}
                    </span>
                  )
                }
              </Link>

               <Link 
              to={"/cart"}
              aria-label='Cart'
              className={`
              flex 
              relative
              justify-center
              items-center 
              rounded-lg w-10
              h-10 transition  
              md:hidden
              ${
                isActive("/cart")? 
                "bg-blue-50 text-blue-600":
                "text-slate-600 hover:text-slate-100"

              }    
            `}
              >
                <FiShoppingCart className='w-5 h-5' />
                {
                  cart  > 0 && (
                    <span
                    className='
                    absolute
                    right-0.5
                    top-0.5
                    flex h-4
                    min-w-4
                    justify-center
                    items-center
                    rounded-full
                    text-white
                    bg-blue-600
                    text-[10px]
                    px-1
                    font-semibold
                    
                    '
                    >
                      {cart}
                    </span>
                  )
                }
              </Link>
           </div>

        </div>
     </header>
   </>
  )
}

export default Navbar2