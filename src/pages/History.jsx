import {
  Button,
  Container,
  Accordion,
  Icon,
  Table,
  Form,
  TextArea,
  Card,
  Rating,
} from "semantic-ui-react";
import { useState } from "react";

export default function History() {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const historydata = () => {
    let userList = JSON.parse(localStorage.getItem("userlist")) || [];
    let user = userList.find(function (u) {
      return u.email === localStorage.getItem("current");
    });
    return user.history[1];
  };
  const [history, setHistory] = useState(historydata);
  const hideClick = (e, titleProps) => {
    const { index } = titleProps;
    const isActive = activeIndexes.includes(index);

    let newActiveIndexes = [];

    if (isActive) {
      newActiveIndexes = activeIndexes.filter((i) => i !== index);
    } else {
      newActiveIndexes = [...activeIndexes, index];
    }

    setActiveIndexes(newActiveIndexes);
  };
  let bookset = JSON.parse(localStorage.getItem("books"));
  console.log(bookset);
  /*
  useEffect(() => {
    let userList = JSON.parse(localStorage.getItem('userlist')) || []; 
    let user = userList.find(function(u) {
      return u.email === localStorage.getItem('current');
    });
      const storedHistory =user.history;
      setHistory((storedHistory));
  }, [setHistory]);*/

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <Card fluid style={{ width: "100%" }}>
          <Card.Content>
            <Card.Header>購買紀錄</Card.Header>
            <Card.Meta>2021/10/10</Card.Meta>
            <Card.Description>
              {history ? (
                history.map((n, index) => {
                  const isActive = activeIndexes.includes(index);

                  return (
                    <Accordion key={index}>
                      <Accordion.Title
                        active={isActive}
                        index={index}
                        onClick={hideClick}
                      >
                        <Icon name={isActive ? "dropdown" : "angle right"} />
                        訂單編號：{index + 1}
                      </Accordion.Title>
                      <Accordion.Content active={isActive}>
                        <Table celled>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>書本</Table.HeaderCell>
                              <Table.HeaderCell>數量</Table.HeaderCell>
                              <Table.HeaderCell>價格</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {n.map((n1, index) => {
                              const quantity = n[index];
                              let book = bookset[quantity.id - 1];
                              return (
                                <Table.Row key={book.id}>
                                  <Table.Cell>
                                    <div style={{ display: "flex" }}>
                                      <img
                                        src={book.image}
                                        alt="Book"
                                        style={{ width: "8%" }}
                                      />
                                      <div style={{ marginLeft: "5%" }}>
                                        {book.title}
                                      </div>
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>{quantity.quantity}</Table.Cell>
                                  <Table.Cell>${book.price}</Table.Cell>
                                </Table.Row>
                              );
                            })}
                          </Table.Body>
                        </Table>
                        <Form>
                          <div style={{ marginTop: "20px" }}>為商品評分：</div>
                          <Rating icon="star" defaultRating={5} maxRating={5} />
                          <TextArea
                            placeholder="請輸入評論..."
                            style={{ marginTop: "10px" }}
                          />
                          <div style={{ marginTop: "20px" }}>
                            <Button color="green">送出評論</Button>
                          </div>
                        </Form>
                      </Accordion.Content>
                    </Accordion>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={3}>目前沒有購買紀錄</Table.Cell>
                </Table.Row>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    </Container>
  );
}
