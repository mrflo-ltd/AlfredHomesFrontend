import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { CONTACT_PATH, SITEMAP_PATH } from '../global/pages';
import {
  AccordionMenu,
  AccordionItemButton,
  AccordionItemTitle,
  FallbackAccordionMenu,
  PlaceAddress,
  PlaceTitle,
  PlaceDescription,
  AccordionItemImage,
  FallbackCategoryTitle,
  FallbackListItem,
  FallbackItems,
} from '../components/Menu';
import { Category, Item } from '../components/Menu.types';
import { BurgerMenu } from '../components/BurgerMenu';
import {
  ContactButton,
  CloseButton,
  FallbackContactButton,
} from '../components/Button';
import { Navigation } from '../components/Navigation';
import {
  Page,
  PageTitle,
  PageLeftContentWrapper,
  PageRightContentWrapper,
  PageContent,
} from '../components/Page';
import { mapStyles } from './data';
import { getPlaces } from './places.service';
import {
  WINCHESTER_CENTER_LONGITUDE,
  WINCHESTER_CENTER_LATITUDE,
  DEFAULT_MAP_ZOOM_LEVEL,
  getCurrentItem,
} from './utils';
import { black, greyLight, greyDarker, white, red } from '../styles/colors';
import { Text } from '../styles/typography';

import iconAlfredHomes from '../assets/icon-map-alfred-homes.svg';
import iconStation from '../assets/icon-map-station.svg';
import { sendPageView } from '../utils/analyticsUtils';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC7m17X9P4WkA9ZSNL_OyuLp3IpKpQbbPo';

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Map = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .google-maps {
    width: 100%;
    height: 100%;
  }
`;

const DescriptionText = styled(Text)`
  color: ${black};
`;

const AccordionWrapper = styled.div`
  margin-top: 36px;
`;

const PlaceDetail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background-color: ${greyDarker};
  padding: 18px 18px 36px 18px;
  z-index: 1;
  overflow-y: auto;
`;

const PlaceImage = styled.img`
  width: 100%;
  height: auto;
`;

const PlaceContent = styled.div`
  margin-top: 24px;
`;

const PlaceCloseButton = styled(CloseButton)`
  position: absolute;
  bottom: 8px;
  left: 120px;
  transform: translateX(-50%);
  padding: 6px;
  z-index: 1;
`;

const PlaceDetailAddress = styled(PlaceAddress)`
  color: ${greyLight};
  border-bottom: 1px solid ${greyLight};
`;

const DEVELOPMENT_CENTER = {
  lat: 51.075741,
  lng: -1.341431,
};

const STATION_POSITION = {
  lat: 51.0672781,
  lng: -1.3197511,
};

export const SitemapPage = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [googleMap, setGoogleMap] = React.useState<google.maps.Map | undefined>(
    undefined
  );
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | undefined
  >(undefined);
  const [selectedItemId, setSelectedItemId] = React.useState<
    string | undefined
  >(undefined);
  const [isPopupOpened, setIsPopupOpened] = React.useState(false);

  sendPageView(SITEMAP_PATH);

  const navigate = useNavigate();

  React.useEffect(() => {
    getPlaces()
      .then((places) => {
        setCategories(
          (places?.map?.placeCategories || []).map((category) => ({
            ...category,
            categoryId: `${category.categoryId}`,
            items: category.items.map((item) => ({
              ...item,
              address: item?.location?.fullAddress || '',
              categoryId: `${item.categoryId}`,
            })),
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pageTitle = 'An enviable location';

  React.useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const currentCategory = categories.find(
    (category) => category.categoryId === selectedCategoryId
  );

  const currentItem = getCurrentItem(
    currentCategory?.items || [],
    selectedItemId
  );

  const allItems = categories.flatMap((category) => category.items);

  const filteredItems = React.useMemo(() => {
    return selectedItemId !== undefined
      ? allItems.filter((item) => item.id === selectedItemId)
      : selectedCategoryId !== undefined
      ? allItems.filter((item) => item.categoryId === selectedCategoryId)
      : [];
  }, [allItems, selectedCategoryId, selectedItemId]);

  React.useEffect(() => {
    if (googleMap) {
      const getBoundsFromLocations = (items: Item[]) => {
        return items.reduce((acc, item) => {
          if (item?.location) {
            acc.extend({
              lat: item.location.latitude,
              lng: item.location.longitude,
            });
          }

          return acc;
        }, new google.maps.LatLngBounds(DEVELOPMENT_CENTER));
      };

      const bounds = getBoundsFromLocations(filteredItems);
      bounds.extend(STATION_POSITION);
      googleMap.fitBounds(bounds);
    }
  }, [googleMap, filteredItems]);

  const LogoMarker = () => (
    <Marker
      key="logo-marker"
      icon={{
        scaledSize: new google.maps.Size(36, 36),
        url: iconAlfredHomes,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
      }}
      position={DEVELOPMENT_CENTER}
    />
  );

  const StationMarker = () => (
    <Marker
      key="station-marker"
      icon={{
        scaledSize: new google.maps.Size(20, 20),
        url: iconStation,
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
      }}
      position={STATION_POSITION}
    />
  );

  return (
    <Page>
      <BurgerMenu />

      <Navigation />

      <Main>
        <PageLeftContentWrapper>
          <PageContent>
            <PageTitle color={black}>{pageTitle}</PageTitle>
            <DescriptionText>
              Our collection of new homes at Langham Place and Greenwood are
              well-placed to access all that Winchester has to offer. On the
              doorstep are excellent local amenities including Waitrose, a
              doctor’s surgery, post office and pharmacy. The city centre
              itself, with its eclectic mix of shops and eateries is
              approximately a couple of miles away and for nature lovers, the
              wide expanse of Farley Mount Country Park is just a short drive or
              bike ride. The main line station is just a few minutes’ by car, as
              is access to key road networks to take you further afield.
            </DescriptionText>

            <AccordionWrapper>
              <AccordionMenu
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onCategoryClick={(categoryId) => {
                  setSelectedCategoryId(
                    selectedCategoryId === categoryId ? undefined : categoryId
                  );
                  setSelectedItemId(undefined);
                }}
                renderItem={(item) => (
                  <AccordionItemButton
                    $isSelected={selectedItemId === item.id}
                    onClick={() => {
                      setSelectedItemId(
                        selectedItemId === item.id ? undefined : item.id
                      );
                      setIsPopupOpened(true);
                    }}
                  >
                    <AccordionItemTitle>{item.name}</AccordionItemTitle>
                  </AccordionItemButton>
                )}
                isExpandedSameAsSelected
              />
              <FallbackAccordionMenu
                categories={categories}
                renderCategory={(category) => (
                  <React.Fragment>
                    <FallbackCategoryTitle>
                      {category.categoryName}
                    </FallbackCategoryTitle>

                    <FallbackItems>
                      {category.items.map((item) => (
                        <FallbackListItem key={`${item.name}-${item.id}`}>
                          <PlaceTitle color={greyDarker}>
                            {item.name}
                          </PlaceTitle>
                          {item?.address && (
                            <PlaceAddress color={greyDarker}>
                              {item.address}
                            </PlaceAddress>
                          )}

                          {item?.description && (
                            <PlaceDescription
                              color={greyDarker}
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          )}

                          {item.images.map((imagePath, index) => (
                            <AccordionItemImage
                              key={`${imagePath}-${index}`}
                              src={imagePath}
                              alt={item.name}
                            />
                          ))}
                        </FallbackListItem>
                      ))}
                    </FallbackItems>
                  </React.Fragment>
                )}
              />
            </AccordionWrapper>
            <FallbackContactButton onClick={() => navigate(CONTACT_PATH)}>
              Contact
            </FallbackContactButton>
          </PageContent>
        </PageLeftContentWrapper>

        <PageRightContentWrapper>
          <Map>
            {currentItem !== undefined && isPopupOpened && (
              <React.Fragment>
                <PlaceDetail>
                  {currentItem.images.map((imagePath, index) => (
                    <PlaceImage
                      key={`${imagePath}-${index}`}
                      src={imagePath}
                      alt={currentItem.name}
                    />
                  ))}

                  <PlaceContent>
                    <PlaceTitle>{currentItem.name}</PlaceTitle>
                    {currentItem?.address && (
                      <PlaceDetailAddress color={greyLight}>
                        {currentItem.address}
                      </PlaceDetailAddress>
                    )}

                    {currentItem?.description && (
                      <PlaceDescription
                        dangerouslySetInnerHTML={{
                          __html: currentItem.description,
                        }}
                      />
                    )}
                  </PlaceContent>
                </PlaceDetail>
                <PlaceCloseButton
                  onClick={() => {
                    // setSelectedItemId(undefined);
                    setIsPopupOpened(false);
                  }}
                />
              </React.Fragment>
            )}

            {isLoaded && (
              <GoogleMap
                mapContainerClassName="google-maps"
                zoom={DEFAULT_MAP_ZOOM_LEVEL}
                center={DEVELOPMENT_CENTER}
                options={{
                  styles: mapStyles,
                  zoomControl: true,
                  fullscreenControl: false,
                  keyboardShortcuts: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
                onLoad={(map) => setGoogleMap(map)}
              >
                <React.Fragment>
                  <LogoMarker />
                  <StationMarker />

                  {filteredItems.map((item) => (
                    <Marker
                      key={item.id}
                      icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: red,
                        fillOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: white,
                      }}
                      position={{
                        lat:
                          item?.location?.latitude ||
                          WINCHESTER_CENTER_LATITUDE,
                        lng:
                          item?.location?.longitude ||
                          WINCHESTER_CENTER_LONGITUDE,
                      }}
                      onClick={() => {
                        setSelectedCategoryId(item.categoryId);
                        setSelectedItemId(item.id);
                        setIsPopupOpened(true);
                      }}
                    />
                  ))}
                </React.Fragment>
              </GoogleMap>
            )}
          </Map>
        </PageRightContentWrapper>
      </Main>

      <ContactButton onClick={() => navigate(CONTACT_PATH)}>
        Contact
      </ContactButton>
    </Page>
  );
};
