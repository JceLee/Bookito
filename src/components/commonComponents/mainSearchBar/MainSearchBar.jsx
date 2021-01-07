import React, { useEffect, useState } from "react";
import { Input, Select, Form } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import LocationInput from "../LocationInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { reverseGeocode } from "../../../helpers/geocode";
import { useHistory } from "react-router-dom";
import { designerTypes } from "../../../constants/designerTypes";

export default function MainSearchBar(props) {
  const {
    defaultDesignerType,
    defaultAddress,
    disableMovement
  } = props;

  const [designerType, setDesignerType] = useState(defaultDesignerType ? defaultDesignerType : "");
  const [address, setAddress] = useState(defaultAddress ? defaultAddress : "");
  const [form] = Form.useForm();
  const designerTypeSelect = Object.values(designerTypes).filter(type => type !== "client" && type !== "newClient");
  const tabletLWidth = 1024;
  const half = 2;
  var heightToShowSearchBarOnNav = null;

  const setSelectedType = (value) => {
    setDesignerType(value);
  };

  const hide = (element) => {
    document.getElementById(element).style.display = "none";
  };

  const show = (element) => {
    document.getElementById(element).style.display = "flex";
  };

  //#region Functions related SearchBar
  // calculate and set height to show search bar on nav bar
  useEffect(() => {
    if (!disableMovement) {
      heightToShowSearchBarOnNav =
        (window.pageYOffset +
          document.getElementById("searchBarForm").clientHeight) *
        -1;
    }
  });

  // give css when search bar sticks on nav bar
  const stickSearchBarOnNavBar = (width) => {
    var searchBarHeight = document.getElementById("mainSearchBar").clientHeight;
    var navBarHeight = document.getElementById("header").clientHeight;
    var searchBarMarginOnNavBar =
      (navBarHeight - searchBarHeight) / half + "px";

    if (width < tabletLWidth) {
      hide("logo");
      hide("menuBtn");
    }

    document
      .getElementById("searchBarForm")
      .classList.add("stickedSearchBarOnNav");
    document.getElementById(
      "searchBarForm"
    ).style.top = searchBarMarginOnNavBar;
    document.getElementById("mainSearchBar").style.textAlign = "center";
    document.getElementById("mainSearchBar").style.marginTop = 0;
    document.getElementById("mainHeader").style.display = "none";
  };

  // give css when search bar is taken off from nav bar
  const takeSearchBarOffFromNavBar = (width) => {
    show("logo");
    show("menuBtn");

    document
      .getElementById("searchBarForm")
      .classList.remove("stickedSearchBarOnNav");
    document.getElementById("searchBarForm").style.top = "unset";
    document.getElementById("mainSearchBar").style.textAlign = "unset";

    // if (width <= tabletLWidth) {
    document.getElementById("mainSearchBar").style.marginTop = "300px";
    // } else {
    document.getElementById("mainSearchBar").style.marginTop = "20%";
    // }
    document.getElementById("mainHeader").style.display = "unset";
  };

  useScrollPosition(({ prevPos, currPos }) => {
    try {
      if (currPos.y < heightToShowSearchBarOnNav) {
        stickSearchBarOnNavBar(window.innerWidth);
      } else {
        takeSearchBarOffFromNavBar(window.innerWidth);
      }
    } catch {
    }
  });
  //#endregion

  //#region Functions related Location
  useEffect(() => {
    // TODO: is setFieldsValue working as intended?
    form.setFieldsValue({
      addressInput: "",
    });
  });

  const clearAddress = () => {
    form.setFieldsValue({
      addressInput: "",
    });
  };

  const handleAddressChange = (address) => {
    setAddress(address);
  };

  const handleAddressSelect = (address, placeID) => {
    handleAddressChange(address);
  };

  const getGeocodeByAddress = (address) => {
    geocodeByAddress(address)
      .then(async (results) => {
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        return latLng;
      })
      .catch((error) => {
        console.error("Error", error);
        return null;
      });
  };

  const history = useHistory();

  const handleSearch = (location) => {
    const route = `/designer_list?type=${designerType}${
      location ? `&location=${location}` : ""
    }`;
    window.scrollTo(0, 0);
    history.push(route);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(
          position.coords.latitude,
          position.coords.longitude
        ).then((address) => {
          if (address) {
            setAddress(address);
          } else {
            // TODO: Handle failure (ie. failure popover)
          }
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  //#endregion

  return (
    <div id="mainSearchBar">
      {/*<div id="mainHeader">Find your favourite beautician</div>*/}
      <Input.Group compact>
        <Select
          onChange={setSelectedType}
          placeholder="Choose Designer"
          suffixIcon={<CaretDownOutlined style={{pointerEvents: "none"}} />}
          defaultValue={defaultDesignerType}
        >
          {designerTypeSelect.map((type, inx) => {
            return (
              <Select.Option key={inx} value={type}>
                {type}
              </Select.Option>
            );
          })}
        </Select>
        <Form form={form}>
          <Form.Item
            name="addressInput"
            initialValue=""
            rules={[{ required: true }]}
          >
            <LocationInput
              address={address}
              clearAddress={clearAddress}
              handleAddressChange={handleAddressChange}
              handleAddressSelect={handleAddressSelect}
              handleSearch={handleSearch}
              handleGeolocation={handleGeolocation}
            />
          </Form.Item>
        </Form>
      </Input.Group>
    </div>
  );
}
