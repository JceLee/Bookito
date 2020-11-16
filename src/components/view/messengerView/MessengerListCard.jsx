import React from "react";
import { Row, Col, Avatar, Divider, Button } from "antd";
import Moment from "moment";
import {firebaseDate} from "../../../config/fbConfig";

export default function MessengerListCard(props) {
    const { fname, photoURL, roomID, enterChatRoom } = props;

    return (
        <div className="messengerCardComponent" onClick={()=>{enterChatRoom(roomID)}}>
            <Row className="photoImage">
                <Col>
                    <Avatar size={64} src={photoURL} />
                </Col>
                <Col className="rightSide">
                    <div>{fname}</div>
                </Col>
            </Row>
            <Divider />
        </div>
    );
}
