import React, { useState, useEffect } from 'react';
import { Affix, Button, Modal, Divider, Form, Collapse } from 'antd';
import DesignerNav from './designerNav/DesignerNav.jsx';
import ReadOnlyStar from '../../../commonComponents/ReadOnlyStar';
import ServiceNPriceForm from '../designerEditProfile/ServiceNPriceForm';
import HoursForm from '../designerEditProfile/HoursForm';
import AddressPhoneForm from '../designerEditProfile/AddressPhoneForm';
import WorksForm from '../designerEditProfile/WorksForm';

const { Panel } = Collapse;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 24 },
};

const DesignerTop = (props) => {
  const {
    isAuthenticated,
    fname,
    lname,
    img,
    totalRate,
    works,
    location,
  } = props;
  const [top] = useState(64);
  const [height, setHeight] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [Visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  useEffect(() => {
    setHeight(document.getElementById('tapWithButton').clientHeight);
  }, [height]);

  return (
    <div className='designerTop' id='designerTop'>
      <div className='designerProfile'>
        <img className='profileImage' src={img} alt='profileImage' />
        <h2>
          {fname} {lname}
        </h2>
        <ReadOnlyStar rate={totalRate} />
        <p>{location}</p>
      </div>
      <Affix offsetTop={top}>
        <div className='tapWithButton' id='tapWithButton'>
          <DesignerNav height={height} />
          {isAuthenticated ? (
            <>
              <Button className='Button' type='primary' onClick={showModal}>
                Edit Profile
              </Button>
              <Modal
                className='editProfileModal'
                visible={Visible}
                title='Edit Profile'
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
                footer={[
                  <Button key='back' onClick={handleCancel}>
                    Return
                  </Button>,
                  <Button
                    key='submit'
                    htmlType='submit'
                    type='primary'
                    loading={Loading}
                    onClick={handleOk}
                  >
                    Save
                  </Button>,
                ]}
              >
                <div>
                  <Form
                    {...layout}
                    name='editProfile'
                    onFinish={onFinish}
                    autoComplete='off'
                    // validateMessages={validateMessages}
                  >
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                      <Panel header='Service & Price' key='1'>
                        <ServiceNPriceForm />
                      </Panel>
                      <Panel header='Hours' key='2'>
                        <HoursForm />
                      </Panel>
                      <Panel header='Address & Phone' key='3'>
                        <AddressPhoneForm />
                      </Panel>
                      <Panel header='Works' key='4'>
                        <WorksForm works={works} />
                      </Panel>
                    </Collapse>
                  </Form>
                </div>
              </Modal>
            </>
          ) : (
            <Button className='Button' type='primary'>
              Book Now
            </Button>
          )}
        </div>
      </Affix>
    </div>
  );
};

export default DesignerTop;
