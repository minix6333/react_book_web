import { Menu, Image, Dropdown, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "./utils/firebase";
import { useState, useEffect } from "react";
import LOGO from "./img/logonew.png";
import { useShoppingCart } from "./pages/ShoppingCartContext";
import { Button, Icon, Search } from "semantic-ui-react";
import { Container } from "react-bootstrap";
import CartItem from "./pages/CartItem";
import "./index.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { openCart, totalQuantity } = useShoppingCart();
  const [search, setSearch] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const options = [
    { text: "數學", value: "1" },
    { text: "英文", value: "2" },
    { text: "國文", value: "3" },
  ];
  let userList = JSON.parse(localStorage.getItem("userlist")) || [];
  let users = userList.find(function (u) {
    return u.email === localStorage.getItem("current");
  });
  // console.log(users);
  function SignOut() {
    firebase.auth().signOut();
    localStorage.setItem("current", null);

    navigate("/signin");
    window.location.reload();
  }
  function url(s) {
    if (localStorage.getItem("current")) {
      if (localStorage.getItem("current") === "null") {
        return "signin";
      } else {
        return s;
      }
    } else {
      return "signin";
    }
  }
  return (
    <Menu
      secondary
      size="massive"
      style={{
        margin: "0 0 60px 0",
        background: "#99f6e4",
        borderRadius: "0 0 20px 20px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <div style={{ color: "black" }}></div>
      <Container
        style={{ display: "flex", alignItems: "center", zIndex: 9999 }}
      >
        <Image
          src={LOGO}
          as={Link}
          to="/"
          style={{ width: "8%", height: "10vh" }}
        ></Image>
        <Dropdown
          style={menufont}
          item
          text="商品類型"
          options={options}
          onSearchChange={(event, { value }) => setSearch(value)}
        />
        <Menu.Item as={Link} to={url("/personal")} style={menufont}>
          個人資料
        </Menu.Item>
        <Menu.Item as={Link} to={url("/history")} style={menufont}>
          購買紀錄
        </Menu.Item>
      </Container>
      <Menu.Item>
        {users && user ? (
          <div
            style={{ display: "flex", fontSize: "15px", fontWeight: "bold" }}
          >
            你好!<div style={{ color: "#d97706" }}>{users.name}</div>
          </div>
        ) : (
          <div
            style={{ display: "flex", fontSize: "15px", fontWeight: "bold" }}
          >
            你好!<div style={{ color: "#65a30d" }}>訪客</div>
          </div>
        )}
      </Menu.Item>
      <Menu.Menu
        position="right"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div style={{ marginRight: "40px", marginLeft: "auto" }}>
          <Search
            value={search}
            onSearchChange={(event, { value }) => setSearch(value)}
            placeholder="搜尋書籍..."
          />
        </div>

        <div style={{ position: "relative", zIndex: 999 }}>
          <Button
            circular
            animated="vertical"
            style={{ height: 40, backgroundColor: "#99f6e4" }}
            onClick={() => {
              if (localStorage.getItem("current")) {
                if (localStorage.getItem("current") === "null") {
                  navigate("/signin");
                } else {
                  openCart();
                }
              } else {
                navigate("/signin");
              }
            }}
          >
            <Button.Content hidden>Shop</Button.Content>
            <Button.Content visible>
              <Icon name="shop" />
            </Button.Content>
          </Button>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 25,
              zIndex: 1000,
            }}
          >
            <CartItem totalQuantity={totalQuantity} />
            <Label circular color="red" style={{ zIndex: 1001 }}>
              {totalQuantity}
            </Label>
          </div>
        </div>

        {user ? (
          <Menu.Item style={menufont2} onClick={() => SignOut()}>
            <Icon name="user circle" />
            登出
          </Menu.Item>
        ) : (
          <Menu.Item
            style={menufont}
            as={Link}
            to="/signin"
            className="responsive-signin-item"
          >
            <div style={{ marginRight: "11vh" }}>
              <Icon name="user circle outline" /> 註冊/登入
            </div>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

const menufont = {
  fontSize: "20px",
  color: "black",
};
const menufont2 = {
  fontSize: "20px",
  color: "black",
  marginRight: "7vh",
};

export default Header;

// 這個頁面是網站的header，可以選擇商品類型(還沒有功能)，以及搜尋書籍(還沒有功能)，並且可以看到購物車的商品數量，在這邊有用到函數頁面useShoppingCart來控制購物車的開啟與關閉
// ，最後則是導向登入/登出的按鈕，前面那些內容都需要先登入才能看到，沒登入點擊時，會導向登入/註冊畫面。
