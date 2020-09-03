import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { reverseGeocode } from "../../../helpers/geocode";
import { useHistory } from "react-router-dom";
import SearchBar from "../../commonComponents/mobileSearchBar/SearchBar";

export default function SearchBarSection() {
  const [designerType, setDesignerType] = useState();
  const [address, setAddress] = useState("");
  const [form] = Form.useForm();

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

  return (
    <div className="searchBarSection">
      <img
        className="searchBarSectionImg"
        src="https://images.unsplash.com/photo-1512206375328-39c0d295e698?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"
        width="100%"
        height="100%"
        alt="searchBarSectionImg"
      />
      {/* main page */}
      <Form form={form} id="searchBarForm">
        <Form.Item
          name="addressInput"
          initialValue=""
          rules={[{ required: true }]}
        >
          <SearchBar
            address={address}
            clearAddress={clearAddress}
            handleAddressChange={handleAddressChange}
            handleAddressSelect={handleAddressSelect}
            handleSearch={handleSearch}
            handleGeolocation={handleGeolocation}
            id="searchBarOnMainPage"
          />
        </Form.Item>
      </Form>
    </div>
  );
}
