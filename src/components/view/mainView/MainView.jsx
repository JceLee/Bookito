import React from "react";
import SearchBarSection from "./SearchBarSection";
import NewDesignerCarousel from "./NewDesignerCarousel";
import InfoCard from "./InfoCard";
import Announcement from "./Announcement";
import desktopMainPageBackground from "../../../assets/images/desktopMainPageBackground.jpeg";
import mobileMainPageBackground from "../../../assets/images/mobileMainPageBackground.jpeg";

export default function MainView() {
  return (
    <>
      <div className="searchBarSectionContainer">
        <img className="backgroundImage" src={desktopMainPageBackground} />
        <SearchBarSection />
      </div>
      <div align="middle" className="infoCardsSection">
        <InfoCard
          header="Become our partner!"
          context="blabalablabalb"
          src="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1373&q=80"
        />
        <InfoCard
          header="Q & A"
          context="BLABLABLABVLALBA"
          src="https://cdn.pixabay.com/photo/2016/10/20/18/36/search-1756278_960_720.jpg"
        />
      </div>
    </>
  );
}
