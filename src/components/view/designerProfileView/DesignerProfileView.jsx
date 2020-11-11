import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { BackTop } from "antd";
import DesignerProfileTop from "./designerProfileTop/DesignerProfileTop";
import DesignerProfileBottom from "./designerProfileBottom/DesignerProfileBottom.jsx";
import { useSelector } from "react-redux";

export default function DesignerProfileView() {
  const designers = useSelector((state) => state.firestore.designers);
  const currentUser = useSelector((state) => state.signIn.currentUser);
  const urlParams = new URLSearchParams(window.location.search);
  const found = designers.find((element) => element.uid === urlParams.get("uid"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (currentUser != null && currentUser.uid === found.uid) {
      setIsAuthenticated(true);
    }
  }, []);

  const {
    fname,
    lname,
    location,
    rate,
    photoURL,
    activity,
    bio,
    works,
    services,
    hours,
    reviews,
  } = found;

  return (
    <BrowserRouter>
      <div className="designerProfileView">
        <DesignerProfileTop
          isAuthenticated={isAuthenticated}
          fname={fname}
          lname={lname}
          totalRate={rate}
          hours={hours}
          works={works}
          location={location}
          img={photoURL}
          customer={currentUser}
          designer={found}
        />

        <DesignerProfileBottom
          fname={fname}
          location={location}
          activity={activity}
          bio={bio}
          works={works}
          serviceNPrices={services}
          hours={hours}
          reviews={reviews}
        />

        <BackTop visibilityHeight={0}>
          <div className="backTopButton">Top</div>
        </BackTop>
      </div>
    </BrowserRouter>
  );
}
