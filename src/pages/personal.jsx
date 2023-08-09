import React, { useState } from "react";
import { Form, Input, Button, Radio, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  console.log(localStorage.getItem("current"));

  let userList = JSON.parse(localStorage.getItem("userlist")) || [];
  let users = userList.find(function (u) {
    return u.email === localStorage.getItem("current");
  });

  const [name, setName] = useState(users.name);
  const [email, setEmail] = useState(users.email);
  const [phone, setPhone] = useState(users.phone);
  const [gender, setGender] = useState(users.sex);
  const [birthdate, setBirthdate] = useState(users.birth);

  const updateUserList = () => {
    users.name = name;
    users.email = email;
    users.phone = phone;
    users.sex = gender;
    users.birth = birthdate;
    localStorage.setItem("userlist", JSON.stringify(userList));
    alert("修改成功");
  };

  return (
    <div>
      <Container>
        <h2>個人資料</h2>

        <Form>
          <Form.Field>
            <label>姓名</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>郵件</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>手機號碼</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>性別</label>
            <Form.Group inline>
              <Form.Radio
                label="男"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              <Form.Radio
                label="女"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
            </Form.Group>
          </Form.Field>
          <Form.Field>
            <label>生日</label>
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </Form.Field>
          <div>
            <Button primary type="submit" onClick={updateUserList}>
              提交
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
