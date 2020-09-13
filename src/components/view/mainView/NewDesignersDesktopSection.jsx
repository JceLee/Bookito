import React from "react";
import { Card } from "antd";

export default function NewDesignersDesktopSection(props) {
  const { newDesignerImages } = props;
  const firstHalfNewDesigners = newDesignerImages.slice(0, 4);
  const secondHalfNewDesigners = newDesignerImages.slice(4, 8);
  return (
    <div className="newDesignersDesktopSection">
      <div className="leftSection">
        <div className="topLine">New Designers</div>
        <div className="bottomLine">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
      <div className="mobileNewDesignersHeaderSection">New Designers</div>
      <div className="rightSection">
        <div className="designerImagesRow">
          {firstHalfNewDesigners.map((image, inx) => {
            return (
              <Card key={inx} className="newDesignerCard" hoverable>
                <img
                  src={image}
                  alt="New Designers"
                  className="designerImage"
                />
              </Card>
            );
          })}
        </div>
        <div className="designerImagesRow">
          {secondHalfNewDesigners.map((image, inx) => {
            return (
              <Card key={inx} className="newDesignerCard" hoverable>
                <img
                  src={image}
                  alt="New Designers"
                  className="designerImage"
                />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
