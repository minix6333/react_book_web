import { React, useState } from "react";
import { Grid, Card, Container, Search, Button, Icon } from "semantic-ui-react";
import "../index.css";
import { useShoppingCart } from "../pages/ShoppingCartContext";
import { Link } from "react-router-dom";
import { carouselData, carouselData2, books } from "../introContent";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const BookPage = () => {
  const navigate = useNavigate();

  localStorage.setItem("books", JSON.stringify(books));

  console.log(JSON.parse(localStorage.getItem("userlist")));

  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShoppingCart();

  const renderCardContent = (book) => {
    const quantity = getItemQuantity(book.id);

    if (quantity === 0) {
      return (
        <Button
          className="add-to-cart"
          onClick={() => {
            if (localStorage.getItem("current")) {
              if (localStorage.getItem("current") === "null") {
                navigate("/signin");
              } else {
                increaseItemQuantity(book.id);
              }
            } else {
              navigate("/signin");
            }
          }}
          icon="in cart"
          style={{ backgroundColor: "#67e8f9" }}
        />
      );
    } else {
      return (
        <div
          className="d-flex align-item-center flex-column"
          style={{ gap: ".5rem", justifyContent: "center" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: ".2rem" }}
          >
            <Button size="mini" onClick={() => decreaseItemQuantity(book.id)}>
              {" "}
              -{" "}
            </Button>
            <div>
              <span className="fs-4">{quantity}</span>
            </div>
            <Button size="mini" onClick={() => increaseItemQuantity(book.id)}>
              {" "}
              +{" "}
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              size="mini"
              color="red"
              onClick={() => removeItem(book.id)}
              icon="trash alternate"
            />
          </div>
        </div>
      );
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Container style={{ width: "80%" }}>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "80%" }}>
          <Slider {...settings}>
            {carouselData.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{ width: "100%", height: "50vh" }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div style={{ width: "20%", marginLeft: "30px" }}>
          <Slider {...settings}>
            {carouselData2.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{ width: "100%", height: "50vh" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div style={{ marginTop: "8%" }}>
        <hr style={{ borderTop: "1px solid black" }} />
        <div style={{ fontSize: "24px", color: "red" }}>
          <Icon name="hotjar" color="red" /> 熱門推薦
        </div>
        <Grid columns={5} doubling stackable>
          {books.map((book) => (
            <Grid.Column key={book.id}>
              <Card style={{ textDecoration: "none" }}>
                <Link
                  to={`/storeitem/${book.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "25vh",
                      background: `url(${book.image}) center/contain no-repeat`,
                    }}
                  />
                  <Card.Content style={{ textAlign: "center" }}>
                    <Card.Header
                      style={{
                        color: "black",
                        fontSize: "16px",
                      }}
                    >
                      <strong>{book.title}</strong>
                    </Card.Header>
                    <Card.Meta style={{ color: "#78716c" }}>
                      {book.author}
                    </Card.Meta>
                  </Card.Content>
                </Link>
                <Card.Content extra style={{ textAlign: "" }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "100%" }}>
                      <span
                        style={{
                          display: "block",
                          color: "red",
                          fontSize: "16px",
                        }}
                      >
                        ${book.price}
                      </span>
                    </div>
                    <div>{renderCardContent(book)}</div>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default BookPage;
//  這頁是我們的首頁，我們在這頁會顯示所有的書本，並且可以加入購物車，這邊我們使用了semantic ui的card元件來做一個個商品的畫面，裡面有些基本的資料，
// 像是書名、作者、價格，以及一個按鈕，按下按鈕可以加入購物車，並且選擇數量，讓後續購物車的頁面可以做處理。
