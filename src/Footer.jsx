import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
export default function Footer() {
  return (
    <div
      className="bg-light text-black text-center p-4"
      style={{ marginTop: "10vh" }}
    >
      <div className="container">
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-12 col-md-6">
            <h5>聯絡我們</h5>
            <p>地址：愛愛市愛愛區復興愛路六段666號</p>
            <p>電話：02-1234-5678</p>
            <p>傳真：02-1234-5678</p>
            <p>信箱：apple1234@nkust.edu.tw</p>
          </div>
          <div className="col-12 col-md-6">
            <h5>網站地圖</h5>
            <p>
              <Link to="/" className="text-black">
                首頁
              </Link>
            </p>
            <p>
              <Link to="/" className="text-black">
                關於我們
              </Link>
            </p>
            <p>
              <Link to="/" className="text-black">
                書籍介紹
              </Link>
            </p>
            <p>
              <Link to="/" className="text-black">
                最新消息
              </Link>
            </p>
            <p>
              <Link to="/" className="text-black">
                聯絡我們
              </Link>
            </p>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <Button circular color="facebook" icon="facebook" />
              <Button circular color="twitter" icon="twitter" />
              <Button circular color="instagram" icon="instagram" />
              <Button circular color="youtube" icon="youtube" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//網頁的footer，可以看到有聯絡我們、網站地圖、社群網站的連結，並且可以點擊連結到相對應的頁面。
