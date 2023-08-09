import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Accordion,
  Icon,
  Table,
  Form,
  TextArea,
} from "semantic-ui-react";
import { useShoppingCart } from "../pages/ShoppingCartContext";
import { books } from "../introContent";
export default function CheckOut() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const {
    cart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
    clearCart,
  } = useShoppingCart();
  const navigate = useNavigate();

  const handleOrderSubmit = () => {
    let userList = JSON.parse(localStorage.getItem("userlist")) || [];
    let user = userList.find(function (u) {
      return u.email === localStorage.getItem("current");
    });
    if (user && user.history) {
      if (user.history.length === 0) {
        let hisotryData = [];
        hisotryData.push(books);
        hisotryData[1] = [];
        hisotryData[1].push(cart);
        user.history = hisotryData;
        localStorage.setItem("userlist", JSON.stringify(userList));
      } else {
        let hisotryData = user.history;
        hisotryData[1].push(cart);
        user.history = hisotryData;
        localStorage.setItem("userlist", JSON.stringify(userList));
      }
    }

    clearCart();
    navigate("/history", { state: { cartItems: [books, cart] } });
  };
  let userList = JSON.parse(localStorage.getItem("userlist")) || [];
  let users = userList.find(function (u) {
    return u.email === localStorage.getItem("current");
  });

  const [same, setSame] = useState(false);
  const controllSame = () => {
    setSame(!same);
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{ width: "70%", backgroundColor: "#f5f5f4", borderRadius: 20 }}
      >
        <div
          style={{
            display: "block",
            textAlign: "center",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          合計：NT${" "}
          {cart.reduce((sum, cartItem) => {
            const item = books.find((book) => book.id === cartItem.id);
            return sum + (item?.price || 0) * cartItem.quantity;
          }, 0)}
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <div style={{ fontSize: 15 }}>
                <Icon name="dropdown" />
                購物車
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <div>
                <Table celled selectable style={{ fontSize: 15 }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>書本資料</Table.HeaderCell>
                      <Table.HeaderCell>單件價格</Table.HeaderCell>
                      <Table.HeaderCell>數量</Table.HeaderCell>
                      <Table.HeaderCell>小計</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {cart.map((cartItem) => {
                      const book = books.find(
                        (book) => book.id === cartItem.id
                      );
                      if (!book) {
                        return null;
                      }
                      const subtotal = (book.price || 0) * cartItem.quantity;
                      return (
                        <Table.Row key={book.id}>
                          <Table.Cell>
                            {" "}
                            <img
                              src={book.image}
                              style={{
                                width: "100px",
                                height: "120px",
                                opjectFit: "cover",
                              }}
                              alt=""
                            />
                            {book.title}
                          </Table.Cell>
                          <Table.Cell style={{ textAlign: "center" }}>
                            {" "}
                            NT$ {book.price}
                          </Table.Cell>
                          <Table.Cell style={{ textAlign: "center" }}>
                            <Button
                              size="mini"
                              onClick={() => decreaseItemQuantity(book.id)}
                            >
                              -
                            </Button>{" "}
                            {cartItem.quantity}{" "}
                            <Button
                              size="mini"
                              onClick={() => increaseItemQuantity(book.id)}
                            >
                              +
                            </Button>
                          </Table.Cell>

                          <Table.Cell
                            style={{
                              textAlign: "center",
                              paddingRight: "10px",
                            }}
                          >
                            NT$ {subtotal}
                            <Button
                              size="mini"
                              color="red"
                              icon="delete"
                              onClick={() => removeItem(book.id)}
                              style={{ marginLeft: "10px" }}
                            ></Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </Accordion.Content>
          </Accordion>
          <div
            style={{ borderBottom: "1px solid #f1e8ea", textAlign: "initial" }}
          >
            <div
              style={{
                display: "flex",
                marginTop: "50px",
                backgroundColor: "#f1e8ea",
              }}
            >
              <div style={{ flex: 1, backgroundColor: "#f5f5f4" }}>
                <div
                  style={{ backgroundColor: "#d6d3d1", borderRadius: "2px" }}
                >
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                    顧客資料
                  </div>
                </div>
                <Form style={{ marginTop: "20px", margin: "20px" }}>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="顧客名稱"
                      placeholder="姓名"
                      value={users.name}
                    />
                    <Form.Input
                      fluid
                      label="電子郵件"
                      placeholder="Email"
                      value={users.email}
                    />
                  </Form.Group>
                  <Form.Field>
                    <label>電話號碼</label>
                    <input placeholder="電話號碼" value={users.phone} />
                  </Form.Field>
                </Form>
              </div>
              <div style={{ flex: 1, backgroundColor: "#f5f5f4" }}>
                <div
                  style={{ backgroundColor: "#d6d3d1", borderRadius: "2px" }}
                >
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                    送貨資料
                  </div>
                </div>
                <Form style={{ marginTop: "20px", margin: "20px" }}>
                  <Form.Field
                    label="收件人資料與顧客資料相同"
                    control="input"
                    type="checkbox"
                    checked={same}
                    onChange={controllSame}
                  />
                  <Form.Field>
                    <label>收件人名稱</label>
                    <input placeholder="" value={users.name} />
                  </Form.Field>
                  <Form.Field>
                    <label>收件人電話號碼</label>
                    <input placeholder="" value={users.phone} />
                  </Form.Field>
                </Form>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "50px",
                backgroundColor: "#f1e8ea",
                borderRadius: "0 0 20px 20px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#f5f5f4",
                }}
              >
                <div
                  style={{ backgroundColor: "#d6d3d1", borderRadius: "2px" }}
                >
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                    其他
                  </div>
                </div>
                <Form style={{ marginTop: "20px", margin: "20px" }}>
                  <Form.Field>
                    <label>轉帳後五碼(選填)</label>
                    <input placeholder="" />
                  </Form.Field>
                  <Form.Field>
                    <label>Line ID(選填)</label>
                    <input placeholder="" />
                  </Form.Field>
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="訂單備註"
                    placeholder="有什麼話想告訴賣家嗎?"
                  />
                </Form>
              </div>
              <div style={{ flex: 1, backgroundColor: "#f5f5f4" }}>
                <div
                  style={{ backgroundColor: "#d6d3d1", borderRadius: "2px" }}
                >
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                    付款資料
                  </div>
                </div>
                <Form style={{ marginTop: "20px", margin: "20px" }}>
                  已選擇的付款方式: 7-11 C2C取貨付款
                </Form>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    marginTop: "40px",
                  }}
                >
                  <div
                    style={{ backgroundColor: "#f5f5f4", borderRadius: "5px" }}
                  >
                    <div
                      style={{
                        backgroundColor: "#d6d3d1",
                        fontSize: "22px",
                        fontWeight: "bold",
                        borderRadius: "2px",
                      }}
                    >
                      索取發票
                    </div>

                    <Form style={{ marginTop: "40px", margin: "20px" }}>
                      <Form.Group widths="equal">
                        <Form.Field label="發票類型" control="select">
                          <option value="cloud">雲端發票</option>
                          <option value="donate">捐贈發票</option>
                          <option value="company">公司戶發票</option>
                        </Form.Field>
                        <Form.Field label="載具類型" control="select">
                          <option value="member">會員載具</option>
                          <option value="phone">手機條碼</option>
                          <option value="natual">自然人憑證條碼</option>
                        </Form.Field>
                      </Form.Group>
                      <Button
                        color="green"
                        fluid
                        style={{ marginTop: "80px" }}
                        onClick={() => {
                          handleOrderSubmit();
                          navigate("/history", {
                            state: { cartItems: [books, cart] },
                          });
                        }}
                      >
                        提交訂單
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
// 這邊是結帳頁面，可以看到購物車的商品內容，並且在這邊還能做修改，可以選擇付款方式、
//索取發票(但目前只是裝飾)，最後提交訂單，這邊提交訂單會將資料傳到購買紀錄的頁面，因為沒做金流，所以是模擬結帳成功後，購賣的紀錄。
