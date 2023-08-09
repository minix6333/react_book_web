import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../pages/ShoppingCartContext";
import CartItem from "./CartItem";
import { Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { books } from "../introContent";
function ShopCart({ isOpened }) {
  const { closeCart, cart } = useShoppingCart();
  return (
    <Offcanvas
      show={isOpened}
      onHide={closeCart}
      placement="end"
      style={{ zIndex: 10000 }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Icon disabled name="shopping cart" />
          購物車
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            總共： $
            {cart.reduce((sum, cartItem) => {
              const item = books.find((book) => book.id === cartItem.id);
              return sum + (item?.price || 0) * cartItem.quantity;
            }, 0)}
          </div>
        </Stack>
        <div style={{ display: "flex" }}>
          <div style={{ display: "block", margin: "0 auto" }}>
            <Button
              size="big"
              color="blue"
              as={Link}
              to="/checkout"
              onClick={() => {
                closeCart();
              }}
            >
              訂單結帳
            </Button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShopCart;

// 這個頁面是購物車的頁面，利用react-bootstrap的Offcanvas，做出一個由右邊滑出的購物車頁面，並且可以在這個頁面上做出增加、
// 減少、刪除商品的功能，並且可以計算出總共的金額，並且可以直接連結到結帳頁面。
