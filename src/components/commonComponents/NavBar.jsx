import React from "react";
import {Menu, Dropdown, Button, Typography, Drawer} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined, BarsOutlined} from "@ant-design/icons";
import SignInModal from "../view/authView/SignInModal";
import {useSelector} from "react-redux";
import SignOut from "../view/authView/SignOut";

export default function Navbar() {
  const signedInUser = useSelector((state) => state.currentUser.currentUser);

  const menuItems = signedInUser === null ?
    [
      {name: "Become a designer", link: ""},
      {name: "Log In", link: ""},
    ]
    : signedInUser.accountTypes === "admin" ?
      [
        {name: "Manage Accounts", link: "/administration"},
        {name: "Log In", link: ""},
      ]
      : signedInUser.accountTypes === "client" ?
        [
          {name: "Schedule (Designer)", link: "/designer_schedule"},
          {name: "Schedule (Client)", link: "/client_schedule"},
          {name: "Profile (Designer)", link: `/designer_profile?uid=${signedInUser.uid}`},
          {name: "Profile (Client)", link: "/client_profile"},
          {name: "Divider", link: ""},
          {name: "Message", link: "/messenger"},
          {name: "Log In", link: ""},
        ] : [
          {name: "Schedule (Designer)", link: "/designer_schedule"},
          {name: "Schedule (Client)", link: "/client_schedule"},
          {name: "Profile (Designer)", link: `/designer_profile?uid=${signedInUser.uid}`},
          {name: "Profile (Client)", link: "/client_profile"},
          {name: "Divider", link: ""},
          {name: "Message", link: "/messenger"},
          {name: "Log In", link: ""},
        ]
  ;

  const menu = (
    <Menu>
      {menuItems.map((menu, inx) => {
        if (menu.name == "Divider") {
          return <Menu.Divider key={inx}/>;
        } else if (menu.name == "Log In") {
          return (
            <Menu.Item key={inx}>
              {signedInUser == null ? <SignInModal/> : <SignOut/>}
            </Menu.Item>
          );
        } else {
          return (
            <Menu.Item key={inx}>
              <Link to={menu.link}>{menu.name}</Link>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
  return (
    <>
      <div id="logo">
        <Link to="/">Bookito</Link>
      </div>

      <div id="menuBtn">
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Button shape="round" icon={<UserOutlined/>}>
            <BarsOutlined/>
          </Button>
        </Dropdown>
      </div>
    </>
  );
}
