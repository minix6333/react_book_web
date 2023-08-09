import { useShoppingCart } from "../pages/ShoppingCartContext";
import { Stack } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import { books } from "../introContent";
export default function CartItem({ id, quantity, totalQuantity }) {
  const { removeItem } = useShoppingCart();

  const book = books.find((book) => book.id === id);
  if (book == null) {
    return null;
  }
  // console.log(totalQuantity);
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-item-center">
      <img
        src={book.image}
        style={{ width: "115px", height: "150px", opjectFit: "cover" }}
        alt=""
      />
      <div className="me-auto">
        <div>
          {book.title}{" "}
          {quantity > 1 && (
            <span
              className="text-muted"
              style={{
                fontSize: ".65rem",
              }}
            >
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          ${book.price}
        </div>
      </div>
      <div>${book.price * quantity}</div>
      <Button
        color="red"
        size="mini"
        icon="delete"
        onClick={() => {
          removeItem(book.id);
        }}
      ></Button>
    </Stack>
  );
}
// 這邊是顯示購物車的商品內容，可以看到商品的圖片、名稱、價格、數量，並且可以刪除商品。
