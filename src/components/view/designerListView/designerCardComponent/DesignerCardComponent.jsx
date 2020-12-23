import React from "react";
import DesignerCardBottom from "./DesignerCardBottom";
import DesignerCardTop from "./designerCardTop/DesignerCardTop";
import { useHistory } from "react-router-dom";
import { Divider } from 'antd';

export default function DesignerCardComponent(props) {
  const { designer, handleSearch } = props;

  return (
    <div className="designerCardComponent" onClick={handleSearch(designer)}>
      <DesignerCardTop
        fname={designer.fname}
        rateScore={designer.rate.average}
        services={designer.services}
        profile={designer.photoURL}
      />
      {designer.works?.length > 0 && <DesignerCardBottom works={designer.works} />}
      <Divider className="designerCardComponentDivider"/>
    </div>
  );
}
