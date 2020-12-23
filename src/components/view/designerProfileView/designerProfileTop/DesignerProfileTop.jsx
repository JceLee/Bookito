import React, { useState, useEffect } from "react";
import { Affix, Button, Modal, Form, Collapse } from "antd";
import DesignerNav from "./designerNav/DesignerNav.jsx";
import ReadOnlyStar from "../../../commonComponents/ReadOnlyStar";
import ClientProfileView from "../../../view/clientProfileView/ClientProfileView";
import ServiceNPriceForm from "./designerEditProfile/ServiceNPriceForm";
import HoursForm from "./designerEditProfile/HoursForm";
import WorksForm from "./designerEditProfile/WorksForm";
import BookNowModal from "../designerProfileTop/bookNowModal/BookNowModal";
import Avatar from "antd/lib/avatar/avatar";
import { useSelector } from "react-redux";

const defaultStartTime = 16; // 08:00
const defaultEndTime = 42; // 21:00
const defaultTradingHours = [defaultStartTime, defaultEndTime];
const searchBarHeight = 64;
const avatarSize = 64;
const { Panel } = Collapse;

export default function DesignerProfileTop(props) {
  const designer = useSelector(
    (state) => state.selectedDesigner.selectedDesigner
  );
  const [stickyNavPositionFromTop] = useState(searchBarHeight);
  const [height, setHeight] = useState(0);
  const [visibleEditProfileModal, setVisibleEditProfileModal] = useState(false);
  const [visibleBookNowModal, setVisibleBookNowModal] = useState(false);
  const [form] = Form.useForm();

  const editProfilePanels = [
    {
      header: "Service & Price",
      content: <ServiceNPriceForm />,
    },
    {
      header: "Hours",
      content: <HoursForm defaultTradingHours={defaultTradingHours} />,
    },
    {
      header: "Address & Phone",
      content: <ClientProfileView form={form} editMode={true} />,
    },
    {
      header: "Works",
      content: <WorksForm />,
    },
  ];

  const showEditProfileModal = () => {
    setVisibleEditProfileModal(true);
  };

  const handleCancelEditProfileModal = () => {
    setVisibleEditProfileModal(false);
  };

  const bookNowModalHandler = () => {
    setVisibleBookNowModal(!visibleBookNowModal);
  };

  const onOk = () => {
    form.submit();
    console.log(form.submit);
    setVisibleEditProfileModal(false);
  };

  useEffect(() => {
    setHeight(document.getElementById("tabWithButton").clientHeight);
  }, [height]);

  return (
    <div className="designerTop">
      <div className="designerProfile">
        <Avatar
          className="designerProfileImage"
          size={avatarSize}
          src={designer.photoURL}
        />
        <div className="designerNameRateLocation">
          <h2>
            {designer.fname} {designer.lname}
          </h2>
          <ReadOnlyStar rate={designer.rate} />
          <p>{designer.location}</p>
        </div>
      </div>
      <Affix offsetTop={stickyNavPositionFromTop}>
        <div id="tabWithButton">
          <DesignerNav searchBarHeight={searchBarHeight} height={height} />
          {props.authentication ? (
            <>
              <Button
                className="buttonInProfileLayoutTab"
                onClick={showEditProfileModal}
              >
                Edit Profile
              </Button>
              <Modal
                className="editProfileModal"
                visible={visibleEditProfileModal}
                title="Edit Profile"
                onOk={onOk}
                onCancel={handleCancelEditProfileModal}
                // width={window.innerWidth * 0.8}
                destroyOnClose={true}
                footer={null}
                // footer={
                //   <Button className="saveBtnInEditProfile" key="submit" onClick={onOk}>
                //     Save
                //   </Button>
                // }
              >
                <Collapse
                  className="editProfileCollapse"
                  bordered={false}
                  defaultActiveKey={["1"]}
                >
                  {editProfilePanels.map((panel, index) => {
                    return (
                      <Panel
                        className="editProfilePanel"
                        header={panel.header}
                        key={index + 1}
                      >
                        {panel.content}
                      </Panel>
                    );
                  })}
                </Collapse>
              </Modal>
            </>
          ) : (
            <Button
              className="buttonInProfileLayoutTab"
              onClick={bookNowModalHandler}
            >
              Book Now
            </Button>
          )}
        </div>
      </Affix>
      <BookNowModal
        visible={visibleBookNowModal}
        modalHandler={bookNowModalHandler}
      />
    </div>
  );
}
