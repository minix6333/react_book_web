import { createContext, useContext, useState, useEffect } from "react";
import ShopCart from "../pages/ShopCart";

const ShoppingCartContext = createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }) {
  const [cart, setCart] = useState(usercartdata());

  let userList = JSON.parse(localStorage.getItem("userlist")) || [];
  let user = userList.find(function (u) {
    return u.email === localStorage.getItem("current");
  });
  if (user && user.shopcart) {
    user.shopcart = cart;
    localStorage.setItem("userlist", JSON.stringify(userList));
  }

  function usercartdata() {
    let userList = JSON.parse(localStorage.getItem("userlist")) || [];
    let user = userList.find(function (u) {
      return u.email === localStorage.getItem("current");
    });

    if (user && user.shopcart) {
      return user.shopcart;
    } else {
      return [];
    }
  }
  const [isOpened, setIsOpened] = useState(false); // 購物車開啟Y N
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); // 計算總數量

  const openCart = () => setIsOpened(true);
  const closeCart = () => setIsOpened(false);
  // 取得商品數量
  function getItemQuantity(id) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }
  // 增加商品數量
  function increaseItemQuantity(id) {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  // 減少商品數量
  function decreaseItemQuantity(id) {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  // 刪除商品
  function removeItem(id) {
    setCart((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  function clearCart() {
    setCart([]);
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        openCart,
        closeCart,
        totalQuantity,
        cart,
        clearCart,
      }}
    >
      {children}
      <ShopCart isOpened={isOpened} />
    </ShoppingCartContext.Provider>
  );
}
//這邊都是在寫購物車的功能，像是增加商品數量、減少商品數量、商除商品、打開購物車、關閉購物車、計算總數量、取得商品數量、清空購物車等等
// ，每個都寫成函數，然後再用ShoppingCartContext.Provider包起來，共享給其他頁面使用。
