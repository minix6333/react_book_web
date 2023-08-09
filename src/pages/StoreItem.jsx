import {
  Button,
  Container,
  Icon,
  Grid,
  Image,
  Comment,
} from "semantic-ui-react";
import { useShoppingCart } from "../pages/ShoppingCartContext";
import { useParams } from "react-router-dom";
import { React, useState, useRef, useEffect } from "react";
import { wu, U, ty, cm, books } from "../introContent";

function StoreItem() {
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity } =
    useShoppingCart();
  const { id } = useParams();

  const selectedBook = books.find((book) => book.id === parseInt(id));
  const quantity = getItemQuantity(selectedBook.id);
  //   console.log(selectedBook);
  const [selectImage, setSelectImage] = useState(selectedBook.image);
  const changeImage = (image) => {
    setSelectImage(image);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const introRef = useRef(null);
  const writterRef = useRef(null);
  const contentRef = useRef(null);
  const commRef = useRef(null);
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}>
            <Image.Group style={{ display: "flex", flexDirection: "column" }}>
              <Image
                src={selectedBook.image}
                onClick={() => {
                  changeImage(selectedBook.image);
                }}
                style={{
                  cursor: "pointer",
                  filter:
                    selectImage === selectedBook.image
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                }}
              />
              <Image
                src={selectedBook.image2}
                onClick={() => {
                  changeImage(selectedBook.image2);
                }}
                style={{
                  cursor: "pointer",
                  filter:
                    selectImage === selectedBook.image2
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                }}
              />
              <Image
                src={selectedBook.image3}
                onClick={() => {
                  changeImage(selectedBook.image3);
                }}
                style={{
                  cursor: "pointer",
                  filter:
                    selectImage === selectedBook.image3
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                }}
              />
              <Image
                src={selectedBook.image4}
                onClick={() => {
                  changeImage(selectedBook.image4);
                }}
                style={{
                  cursor: "pointer",
                  filter:
                    selectImage === selectedBook.image4
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                }}
              />
            </Image.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <div
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={selectImage}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={9}>
            <div style={{ marginLeft: "14%" }}>
              <div>
                <h2 style={{ fontWeight: "bolder" }}>{selectedBook.title}</h2>
                <h5>作者：{selectedBook.author}</h5>
                <h5>出版社：{selectedBook.press}</h5>
                <h5>出版日期：{selectedBook.press_time}</h5>
              </div>
              <div style={{ marginTop: "5%" }}>
                <h4 style={{ fontWeight: "bolder" }}>加入購物車</h4>
                <h5>數量：</h5>
                <div
                  className="d-flex align-items-center r"
                  style={{ gap: ".5rem" }}
                >
                  <Button
                    size="mini"
                    onClick={() => decreaseItemQuantity(selectedBook.id)}
                  >
                    -
                  </Button>
                  <div>
                    <span className="fs-4">{quantity}</span>
                  </div>
                  <Button
                    size="mini"
                    onClick={() => increaseItemQuantity(selectedBook.id)}
                  >
                    +
                  </Button>
                </div>
                <div
                  style={{
                    marginTop: "6%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon name="dollar" size="large" />
                    <h1 style={{ fontWeight: "bolder" }}>
                      {selectedBook.price * quantity}
                    </h1>
                  </div>
                </div>

                <hr style={{ borderTop: "1px solid black" }} />
                <div>
                  <Button basic color="red">
                    <Icon name="heart" />
                    收藏
                  </Button>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <div style={{ width: "100%", marginTop: "5%" }}>
          <Button.Group
            basic
            color="white"
            style={{ width: "80%", backgroundColor: "#e5e5e5" }}
          >
            <Button
              onClick={() => {
                introRef.current.scrollIntoView();
              }}
            >
              內容簡介
            </Button>
            <Button
              onClick={() => {
                writterRef.current.scrollIntoView();
              }}
            >
              作者介紹
            </Button>
            <Button
              onClick={() => {
                contentRef.current.scrollIntoView();
              }}
            >
              目錄
            </Button>
            <Button
              onClick={() => {
                commRef.current.scrollIntoView();
              }}
            >
              買家留言
            </Button>
          </Button.Group>
        </div>
        <div ref={introRef} style={{ marginTop: "5%", width: "100%" }}>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>內容簡介</span>
          <hr style={{ borderTop: "1px solid black" }} />
          <div style={{ fontSize: "16px" }}>
            {selectedBook.intro.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div ref={writterRef} style={{ marginTop: "5%", width: "100%" }}>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>作者介紹</span>
          <hr style={{ borderTop: "1px solid black" }} />
          <div style={{ fontSize: "16px" }}>
            {selectedBook.writterintro.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div ref={contentRef} style={{ marginTop: "5%", width: "100%" }}>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>目錄</span>
          <hr style={{ borderTop: "1px solid black" }} />
          <div style={{ fontSize: "16px" }}>
            {selectedBook.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div ref={commRef} style={{ marginTop: "5%", width: "100%" }}>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>買家留言</span>
          <hr style={{ borderTop: "1px solid black" }} />
          <Comment.Group size="large">
            <Comment>
              <Comment.Avatar src={ty} />
              <Comment.Content>
                <Comment.Author as="a">TOYZ</Comment.Author>
                <Comment.Metadata>
                  <div>2022 2/2</div>
                </Comment.Metadata>
                <Comment.Text>77777777!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>回覆</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
            <Comment>
              <Comment.Avatar src={U} />
              <Comment.Content>
                <Comment.Author as="a">IU</Comment.Author>
                <Comment.Metadata>
                  <div>2022 2/2</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>牛逼呀</p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>回覆</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src={wu} />
                  <Comment.Content>
                    <Comment.Author as="a">吳養生</Comment.Author>
                    <Comment.Metadata>
                      <div>2022 2/2</div>
                    </Comment.Metadata>
                    <Comment.Text>我是智商三乙吳養生</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>回覆</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>
            <Comment>
              <Comment.Avatar src={cm} />
              <Comment.Content>
                <Comment.Author as="a">館舊</Comment.Author>
                <Comment.Metadata>
                  <div>2022 2/2</div>
                </Comment.Metadata>
                <Comment.Text>沒我的書頂</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>回覆</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </div>
      </Grid>
    </Container>
  );
}

export default StoreItem;

//這個是商品點進來的畫面，可以看到商品的詳細資訊，像是書本的簡介、目錄，使用了useref當作節點用scrollIntoView()來做畫面的滑動，
//當按下按鈕可以導航到設定的節點，方便使用這觀看，並且可以從這裡加入購物車，這裡有做個商品的評論，但目前只是裝飾還沒有功能。
