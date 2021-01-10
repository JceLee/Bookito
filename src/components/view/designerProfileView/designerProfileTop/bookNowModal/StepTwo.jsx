import React, {useEffect} from "react";
import {Button, Row, Col, Divider, Card, Typography, Checkbox} from "antd";

export default function StepTwo(props) {
  const {Text} = Typography;
  const {
    services,
    servicesContent,
    serviceKey,
    calculationBox,
    setCalculationBox,
    page,
    navigateTo,
    onTabChange,
    removeFromBox,
    totalSum,
  } = props;

  useEffect(() => {
    if (services) {
      onTabChange(services[0]?.key);
    }
  }, []);

  const renderService = () => (
    <div className="checkboxOption">
      <Card
        tabList={services}
        activeTabKey={serviceKey || services[0]?.key}
        onTabChange={(serviceKey) => {
          onTabChange(serviceKey);
        }}
      >
        {servicesContent[serviceKey].map((menu, index) => {

          return (
            <div className="servicesContent" key={index}>
              <Row>
                <Checkbox
                  key={menu.id}
                  id={menu.id}
                  checked={
                    calculationBox.some(e => e.id === menu.id)
                  }
                  onChange={() => {
                    navigateTo("Estimated Price");
                    if (calculationBox.some((e) => e.id === menu.id)) {
                      setCalculationBox(calculationBox.filter(e => e.id !== menu.id));
                    } else {
                      setCalculationBox([...calculationBox, menu]);
                    }
                  }}
                >
                  <Text strong>{menu.service}</Text>
                </Checkbox>
              </Row>
              <p className="serviceMenu">
                ${menu.price} <br/>
                {menu.description}
              </p>
              <Divider/>
            </div>
          );
        })}
      </Card>
    </div>
  );

  return (
    <div className="stepTwo" id="stepTwoTopId">
      <div className="genderService">{renderService()}</div>
      {page === "Estimated Price" && (
        <>
          <div className="estimatedPrice">
            <p className="estimatedPricePtag">Estimated price</p>
            {calculationBox.map((menu, index) => {
              return (
                menu && (
                  <div className="servicePriceTag" key={index}>
                    <p>
                      {menu.service} : ${menu.price}{" "}
                      <Button
                        className="removeButton"
                        type="link"
                        onClick={() => {
                          removeFromBox(menu);
                        }}
                      >
                        Remove
                      </Button>
                    </p>
                  </div>
                )
              );
            })}
            <Divider id="estPriceDivider"/>
            <p className="totalCost">Estimated total: ${totalSum()}</p>
          </div>
        </>
      )}
    </div>
  );
}
