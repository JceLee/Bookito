import React from "react";
import * as db from "../config/fbConfig";
import { Row, Col } from "antd";

export default function Listing() {
  db.getDesignerList();
  return (
    <>
      <Row className="listingContainer">
        <Col className="designerContainer" span={12}>
          <div className="listNavBar">
            listNavBar
            <div className="filter">filter</div>
          </div>
          <div className="designerList">designerList</div>
        </Col>
        <Col className="mapContainer" span={12}>
          Map container
        </Col>
      </Row>
    </>
  );
}
