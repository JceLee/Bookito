import React, {useState, useEffect} from "react";
import {Button, Drawer} from "antd";
import queryString from "query-string";
import {load_database} from "../../../actions/firebaseAction";
import {firebaseStore} from "../../../config/fbConfig";
import {useDispatch, useSelector} from "react-redux";
import DesignerCardComponent from "./designerCardComponent/DesignerCardComponent";
import DesignerListFilter from "./DesignerListFilter";
import Map from "../../commonComponents/map/Map";
import {CloseOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {designerTags} from "../../../constants/designerTags";
import {designerTypes} from "../../../constants/designerTypes";
import { geocode } from "../../../helpers/geocode";
import { getDistanceFromLatLonInKm } from "../../../helpers/geocode";


export default function DesignerListView(props) {
  const designers = useSelector((state) => state.firestore.designers);
  const dispatch = useDispatch();
  const history = useHistory();

  const [designersCurrent, setDesignersCurrent] = useState([...designers]);
  const [mapVisibleMobile, setMapVisibleMobile] = useState(false);
  const [mapVisibleDesktop, setMapVisibleDesktop] = useState(true);
  const [filterTags, setFilterTags] = useState([]);
  const [checkedFilterTags, setCheckedFilterTags] = useState([]);

  // User location variables
  const [userLocation, setUserLocation] = useState();
  const [defaultLocation] = useState({lat: 34.0522, lng: 118.2437 });

  const handleSearch = (designer) => {
    const route = `/designer_profile?uid=${designer.uid}`;
    history.push(route);
  };

  const updateSortBy = (sortByKey) => {
    switch (sortByKey) {
      case "distance":
        console.log("distance");
        setDesignersCurrent([...designersCurrent].sort((a, b) => {return a.distance - b.distance}));
        break;
      case "review":
        console.log("review");
        break;
      case "priceLow":
        break;
      case "priceHigh":
        break;
      case "new":
        console.log("distance");
        break;
      default:
        break;
    }
  };

  const updateCheckedFilterTags = (checkedTags) => {
    setCheckedFilterTags(checkedTags);
    setDesignersCurrent(designers.filter(designer => Object.keys(designer.services).some(tag => checkedTags.includes(tag))));
  };

  useEffect(() => {
    const params = queryString.parse(props.location.search);
    setFilterTags(designerTags[params["type"]]);
    setCheckedFilterTags(checkedFilterTags);
    firebaseStore
      .collection("users")
      .where("location", "==", params["location"])
      .where("accountTypes", "==", designerTypes.hair)
      .get()
      .then((querySnapshot) => {
        const newDesigners = [];
        querySnapshot.docs.forEach((doc) => {
          newDesigners.push(doc.data());
        });
        dispatch(load_database(newDesigners));
      });

    // Get and set user location
    geocode(props.location.search).then(latLng => {
      if (latLng) {
          setUserLocation(latLng);

          // Calculate and set distance of designers from user location
          designers.forEach(designer => {
            if (designer.latLng) {
              designer.distance = getDistanceFromLatLonInKm(
                designer.latLng.lat, 
                designer.latLng.lng, 
                latLng.lat, 
                latLng.lng);
            }
          });
        } else {
          setUserLocation(defaultLocation);
          console.log("Unable to get location!");
      }
    });


  }, [dispatch, props.location.search]);

  // Desktop map controls
  const openMapDesktop = () => {
    setMapVisibleDesktop(true);
  };
  const closeMapDesktop = () => {
    setMapVisibleDesktop(false);
  };

  // Mobile map controls
  const openMapMobile = () => {
    setMapVisibleMobile(true);
  };
  const closeMapMobile = () => {
    setMapVisibleMobile(false);
  };

  return (
    <>
      <div className="listingContainer">
        {/* Designer listing shrinks using the class "designerContainerMapVisible" when map is open on desktop */}
        <div
          className={
            mapVisibleDesktop
              ? "designerContainerMapVisible designerContainer"
              : "designerContainer"
          }
        >
          <div className="listingBase">
            {/* Controls above the designer listing */}
            <div className="listNavBar">
              <div className="filter">
                <DesignerListFilter
                  filterTags={filterTags}
                  updateCheckedFilterTags={updateCheckedFilterTags}
                  numberOfDesigners={Object.keys(designersCurrent).length}
                  location="Vancouver"
                  updateSortBy={updateSortBy}
                />
              </div>
              {/* Desktop map toggle button - used to show map if closed by the user */}
              <Button
                className="desktopOnly"
                onClick={openMapDesktop}
                hidden={mapVisibleDesktop}
              >
                <span role="img" aria-label="map">
                  🗺️ Show map
                </span>
              </Button>
              {/* Mobile map toggle button - used to open map drawer */}
              <Button className="mobileOnly designerListOpenMapMobile" onClick={openMapMobile}> {/*shape="circle"*/}
                <span role="img" aria-label="map">🗺️ Map</span>
              </Button>
            </div>
            {/* Designer listing */}
            {
            // console.log(designers) &&
            designersCurrent.map((designer, index) => (
              <div key={index} className="designerList">
                <DesignerCardComponent
                  designer={designer}
                  handleSearch={handleSearch}
                />
              </div>
            ))}
          </div>

          <Drawer
            className="mobileOnly"
            // placement="bottom"
            closable={false}
            onClose={closeMapMobile}
            visible={mapVisibleMobile}
            getContainer={false}
          >
            {/* Map close button (top left of the map) */}
            <Button
              className="mapCloseButton mobileOnly"
              type="primary"
              shape="circle"
              onClick={closeMapMobile}
            >
              <CloseOutlined/>
            </Button>
            {/* Map inside drawer */}
            <div className="mapContainer">
              <Map
                isDesktop={false}
                userLocation={userLocation}
                designers={Object.values(designersCurrent)}
              />
            </div>
          </Drawer>
        </div>

        {mapVisibleDesktop && (
          <div className="mapBase desktopOnly">
            {/* Map close button (top left of the map) */}
            <Button
              className="mapCloseButton desktopOnly"
              type="primary"
              shape="circle"
              onClick={closeMapDesktop}
            >
              <CloseOutlined/>
            </Button>
            {/* Map on the right of designer list view */}
            <div className="mapContainer">
              <Map
                isDesktop={true}
                userLocation={userLocation}
                designers={Object.values(designersCurrent)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
