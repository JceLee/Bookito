import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/commonComponents/NavBar";
import MainView from "./components/view/mainView/MainView";
import DesignerListView from "./components/view/designerListView/DesignerListView";
import DesignerScheduleView from "./components/view/designerScheduleView/DesignerScheduleView";
import DesignerProfileView from "./components/view/designerProfileView/DesignerProfileView";
import ClientScheduleView from "./components/view/clientScheduleView/ClientScheduleView";
import ClientProfileView from "./components/view/clientProfileView/ClientProfileView";
import SignIn from "./components/view/authView/SignIn";
import MessengerListView from "./components/view/messengerView/MessengerListView";
import ChatRoom from "./components/view/messengerView/ChatRoom";
import EmailNotificationFromDesigner from "./components/commonComponents/loadingView/EmailNotificationFromDesigner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";
import "./assets/scss/App.scss";
import BecomeDesignerView from "./components/view/becomeDesignerView/BecomeDesignerView";
import AboutUs from "./components/commonComponents/AboutUs";
import ScrollToTop from "./ScrollToTop";

const { Header } = Layout;

export default function App() {
  return (
    <Router>
      <ScrollToTop>
        <Header id="header">
          <NavBar />
        </Header>
        <main>
          <Route exact path="/" component={MainView} />
          <Route path="/designer_list" component={DesignerListView} />
          <Route path="/designer_schedule" component={DesignerScheduleView} />
          <Route path="/client_schedule" component={ClientScheduleView} />
          <Route path="/client_profile" component={ClientProfileView} />
          <Route path="/designer_profile" component={DesignerProfileView} />
          <Route path="/messenger" component={MessengerListView} />
          <Route path="/chatroom" component={ChatRoom} />
          <Route path="/sign_in" component={SignIn} />
          <Route path="/loading" component={EmailNotificationFromDesigner} />
          <Route path="/becomeDesigner" component={BecomeDesignerView} />
          <Route path="/aboutUs" component={AboutUs} />
        </main>
      </ScrollToTop>
    </Router>
  );
}
