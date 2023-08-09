import { Menu, Form, Container, Message } from "semantic-ui-react";
import { useState } from "react";
import firebase from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import "firebase/auth";
import userEvent from "@testing-library/user-event";
function Signin() {
  const navigate = useNavigate();
  //切換 註冊登入
  const [activeItem, setActiveItem] = useState("reg");
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [birth, setBirth] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  function onSubmit() {
    setIsloading(true);
    if (activeItem === "reg") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then(() => {
          const userListString = localStorage.getItem("userlist");
          const userList = JSON.parse(userListString) || [];
          const newUser = {
            name: username,
            birth: birth,
            sex: sex,
            phone: phone,
            email: email,
            shopcart: [],
            history: [],
          };
          userList.push(newUser);

          const updatedUserListString = JSON.stringify(userList);
          localStorage.setItem("userlist", updatedUserListString);
          console.log(JSON.parse(localStorage.getItem("userlist")));
          localStorage.setItem("current", email);
          setIsloading(false);

          navigate("/");
        })
        .catch((error) => {
          setIsloading(false);
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足");
              break;

            default:
              break;
          }
        });
    } else if (activeItem === "sign") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(() => {
          localStorage.setItem("current", email);
          navigate("/");
          window.location.reload();
          setIsloading(false);
        })
        .catch((error) => {
          setIsloading(false);
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/user-not-found":
              setErrorMessage("信箱不存在");
              break;
            case "auth/wrong-password":
              setErrorMessage("密碼錯誤");
              break;
            default:
              break;
          }
        });
    }
  }
  return (
    <Container
      style={{
        width: "30%",
        borderRadius: "20px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
        padding: "30px",
      }}
    >
      <Menu widths={2}>
        {/*註冊按鈕 */}
        <Menu.Item
          active={activeItem === "reg"}
          onClick={() => {
            setActiveItem("reg");
            setErrorMessage("");
          }}
        >
          註冊
        </Menu.Item>
        {/*登入按鈕 */}
        <Menu.Item
          active={activeItem === "sign"}
          onClick={() => {
            setActiveItem("sign");
            setErrorMessage("");
          }}
        >
          登入
        </Menu.Item>
      </Menu>
      {activeItem === "reg" && (
        <Form onSubmit={onSubmit}>
          <Form.Input
            label="姓名"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="請輸入姓名"
          />
          <Form.Input
            label="信箱"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="請輸入信箱"
          />
          <Form.Input
            label="密碼"
            value={password}
            onChange={(e) => setpass(e.target.value)}
            placeholder="請輸入密碼"
            type="password"
          />

          <label style={{ fontSize: "13px", fontWeight: "bold" }}>性別</label>
          <Form.Group inline>
            <Form.Radio
              label="男"
              value="male"
              checked={sex === "male"}
              onChange={(e) => setSex("male")}
            />
            <Form.Radio
              label="女"
              value="female"
              checked={sex === "female"}
              onChange={(e) => setSex("female")}
            />
          </Form.Group>
          <Form.Input
            label="電話"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="請輸入電話"
          />
          <Form.Input
            label="生日"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            type="date"
          />
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <Form.Button loading={isLoading}>註冊</Form.Button>
        </Form>
      )}

      {activeItem === "sign" && (
        <Form onSubmit={onSubmit}>
          <Form.Input
            label="信箱"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="請輸入信箱"
          />
          <Form.Input
            label="密碼"
            value={password}
            onChange={(e) => setpass(e.target.value)}
            placeholder="請輸入密碼"
            type="password"
          />
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <Form.Button loading={isLoading}>登入</Form.Button>
        </Form>
      )}
    </Container>
  );
}
export default Signin;
