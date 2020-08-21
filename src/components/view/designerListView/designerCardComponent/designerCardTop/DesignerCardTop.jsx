import React from 'react';
import { Row } from 'antd';
import DesignerCardTopRight from './DesignerCardTopRight';
import DesignerCardTopLeft from './DesignerCardTopLeft';

export default function DesignerCardTop(props) {
  const { fname, rate, services, profile } = props;

  return (
    <Row className='designerCardTop'>
      <DesignerCardTopLeft rate={rate} fname={fname} profile={profile} />
      {/* <DesignerCardTopRight services={services} /> */}
    </Row>
  );
}
