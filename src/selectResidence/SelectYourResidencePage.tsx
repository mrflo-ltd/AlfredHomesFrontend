import React from 'react';
import styled from 'styled-components/macro';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CONTACT_PATH, SELECT_YOUR_RESIDENCE_PATH } from '../global/pages';
import { BurgerMenu } from '../components/BurgerMenu';
import {
  CloseButton,
  ContactButton,
  defaultButtonStyles,
  FallbackContactButton,
} from '../components/Button';
import { FullWidthLoaderWrapper, Loader } from '../components/Loader';
import { Navigation } from '../components/Navigation';
import {
  Page,
  PageContent,
  PageLeftContentWrapper,
  PageRightContentWrapper,
  PageTitle,
} from '../components/Page';
import { Tooltip } from '../components/Tooltip';
import {
  ResidenceSelectionProvider,
  useResidenceSelection,
} from './ResidenceSelectionContext';
import { ResidenceDetailPage } from './ResidenceDetailPage';
import { PropertyTooltip } from './PropertyTooltip';
import { black, red, white } from '../styles/colors';
import { ThemeType } from '../styles/themes';
import { fontFamily } from '../styles/typography';
import {
  Development,
  DEVELOPMENT_TYPE_TO_URL_MAP,
  getPropertiesByResidenceType,
  isIncludedInProperties,
  Property,
  RESIDENCE_TO_SVG_PATH_MAP,
  ResidenceType,
  PropertyAvailabilityStatus,
} from './utils';
import { propertyCategories } from './data';
import { getResidences, ResidencesResponse } from './residences.service';

import mobileSiteplan from '../assets/img-mobile-sitemap.jpg';
import { sendPageView } from '../utils/analyticsUtils';

const Siteplan = React.lazy(() => import('./Siteplan'));

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;

const RightContentWrapper = styled(PageRightContentWrapper)<{
  $isDisplayed?: boolean;
}>`
  padding-right: 36px;

  .custom-tooltip {
    background-color: ${white} !important;
    opacity: 1 !important;
    border-radius: 0;
    padding: 0;
    box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.4);
    z-index: 24 !important;

    ${(props) =>
      !props.$isDisplayed &&
      `
      opacity: 0 !important;
      visibility: hidden !important;
    `}
  }
`;

const Title = styled(PageTitle)`
  font-size: 45px;
`;

const Menu = styled.div`
  & + & {
    margin-top: 36px;
  }
`;

const TooltipCloseButton = styled(CloseButton)`
  top: 0;
  right: 0;
`;

const MenuTitle = styled.h3`
  font-family: ${fontFamily.text};
  font-size: 12px;
  font-weight: 600;
  color: ${black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SelectMenu = styled.ul`
  list-style: none;
  margin: 12px 0 0 0;
  padding: 0;
`;

const MenuItem = styled.li``;

const MenuItemButton = styled.button<{
  $isSelected: boolean;
}>`
  ${defaultButtonStyles};

  width: 100%;
  padding: 5px 0;
  text-align: left;
  font-family: ${fontFamily.text};
  font-size: 12px;
  font-weight: ${(props) => (props.$isSelected ? 600 : 400)};
  color: ${(props) => (props.$isSelected ? red : black)};
  text-transform: uppercase;
  border-bottom-style: solid;
  border-bottom-width: ${(props) => (props.$isSelected ? '2px' : '1px')};
  border-bottom-color: ${(props) => (props.$isSelected ? red : black)};
`;

const PropertyMenuItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PropertyMenuItemButton = styled(MenuItemButton)<{
  $isAvailable: boolean;
}>`
  display: flex;
  flex-direction: column;
`;

const Path = styled.path<{ $isIncluded?: boolean }>`
  pointer-events: fill;
  fill-opacity: 0;
  opacity: ${(props) => (props.$isIncluded ? 1 : 0)};
  ${(props) =>
    props.$isIncluded
      ? `
    cursor: pointer;
  `
      : `
    pointer-events: none;
  `}

  &:focus {
    outline: none;
    stroke: ${red};
  }
`;

const TooltipWrapper = styled.div`
  margin-bottom: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
`;

const TooltipProperties = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PropertyStatus = styled.div`
  font-family: ${fontFamily.text};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${red};
`;

const MobileSiteplan = styled.div`
  margin-top: 36px;
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const SiteplanImage = styled.img`
  width: 100%;
  height: auto;
`;

type ResidencesPageProps = {
  title: string;
  developments: Development[];
};

const ResidencesPage = ({ developments, title }: ResidencesPageProps) => {
  const {
    selectedPropertyType,
    setSelectedPropertyType,
    selectedDevelopmentId,
    setSelectedDevelopmentId,
    selectedResidenceType,
    setSelectedResidenceType,
    selectedPropertyId,
    setSelectedPropertyId,
  } = useResidenceSelection();

  sendPageView(SELECT_YOUR_RESIDENCE_PATH);

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  const navigate = useNavigate();

  const tooltipRef = React.useRef(null);

  const handleResidenceClick = (residenceType: ResidenceType) => {
    setSelectedResidenceType(
      selectedResidenceType === residenceType ? undefined : residenceType
    );
  };

  const developmentsByFilters = developments.filter((development) =>
    development.properties.some(
      (property) => property.propertyType === selectedPropertyType
    )
  );

  const filteredProperties = developments.reduce<Property[]>(
    (acc, development) => {
      const matchingProperties = development.properties.filter((property) => {
        let predicate = true;
        if (selectedDevelopmentId !== undefined) {
          predicate =
            predicate && selectedDevelopmentId === property.developmentId;
        }

        if (selectedPropertyType !== undefined) {
          predicate =
            predicate && selectedPropertyType === property.propertyType;
        }

        return predicate;
      });
      return [...acc, ...matchingProperties];
    },
    []
  );

  const selectedProperty = selectedPropertyId
    ? filteredProperties.find(
        (property) => `${property.propertyId}` === `${selectedPropertyId}`
      )
    : undefined;
  const selectedPropertyDevelopment = developments.find(
    (development) =>
      development.developmentId === selectedProperty?.developmentId
  );
  const selectedPropertyDevelopmentPath =
    selectedPropertyDevelopment?.developmentType
      ? DEVELOPMENT_TYPE_TO_URL_MAP[selectedPropertyDevelopment.developmentType]
      : '';

  return (
    <Main>
      <PageLeftContentWrapper width="38%">
        <PageContent>
          {title && <Title color={black}>{title}</Title>}

          <Menu>
            <MenuTitle>Select Property type</MenuTitle>
            <SelectMenu>
              {propertyCategories.map((propertyCategory) => (
                <MenuItem key={propertyCategory.propertyCategoryId}>
                  <MenuItemButton
                    $isSelected={
                      selectedPropertyType === propertyCategory.propertyType
                    }
                    onClick={() => {
                      setSelectedPropertyType(
                        selectedPropertyType === propertyCategory.propertyType
                          ? undefined
                          : propertyCategory.propertyType
                      );
                      setSelectedDevelopmentId(undefined);
                      setSelectedResidenceType(undefined);
                    }}
                  >
                    {propertyCategory.title}
                  </MenuItemButton>
                </MenuItem>
              ))}
            </SelectMenu>
          </Menu>

          {developmentsByFilters.length > 0 && (
            <Menu>
              <MenuTitle>Property Name/Number</MenuTitle>
              <SelectMenu>
                {filteredProperties.map((property, index) => {
                  return (
                    <MenuItem key={`${property.propertyId}-${index}`}>
                      <PropertyMenuItemButton
                        $isSelected={
                          selectedPropertyId === `${property.propertyId}`
                        }
                        $isAvailable={
                          property.availabilityStatus ===
                          PropertyAvailabilityStatus.AVAILABLE
                        }
                        onClick={() =>
                          setSelectedPropertyId(`${property.propertyId}`)
                        }
                      >
                        <PropertyMenuItem>
                          <span>{property.title}</span>
                          <PropertyStatus>
                            {property.availabilityStatus}
                          </PropertyStatus>
                        </PropertyMenuItem>
                      </PropertyMenuItemButton>

                      {selectedProperty &&
                        selectedProperty.propertyId === property.propertyId && (
                          <TooltipWrapper>
                            <TooltipProperties>
                              <PropertyTooltip
                                showAvailabilityStatus={true}
                                property={selectedProperty}
                                onPropertyClick={() =>
                                  navigate(
                                    `${SELECT_YOUR_RESIDENCE_PATH}/${selectedPropertyDevelopmentPath}/${selectedProperty.propertyId}`
                                  )
                                }
                              />
                            </TooltipProperties>
                          </TooltipWrapper>
                        )}
                    </MenuItem>
                  );
                })}
              </SelectMenu>
            </Menu>
          )}

          <MobileSiteplan>
            <SiteplanImage src={mobileSiteplan} alt="Mobile sitemap" />
          </MobileSiteplan>

          <FallbackContactButton onClick={() => navigate(CONTACT_PATH)}>
            Contact
          </FallbackContactButton>
        </PageContent>
      </PageLeftContentWrapper>

      <RightContentWrapper
        $isDisplayed={Boolean(selectedResidenceType)}
        width="62%"
      >
        {/* <p>Sold out</p> */}
        <React.Suspense
          fallback={
            <FullWidthLoaderWrapper>
              <Loader color={red} />
            </FullWidthLoaderWrapper>
          }
        >
          <React.Fragment>
            <Tooltip
              id="property-tooltip"
              effect="solid"
              type="light"
              className="custom-tooltip"
              clickable={true}
              getContent={(residenceType: ResidenceType) => {
                if (!selectedResidenceType) {
                  return;
                }

                const propertiesByResidencyType = getPropertiesByResidenceType(
                  filteredProperties,
                  residenceType
                );

                return (
                  <div ref={tooltipRef}>
                    <TooltipCloseButton
                      width="16px"
                      height="16px"
                      padding="0px"
                      lineWidth="12px"
                      color={black}
                      onClick={() => setSelectedResidenceType(undefined)}
                    />
                    <TooltipProperties>
                      {propertiesByResidencyType.map(
                        (property, propertyIndex) => {
                          const development = developments.find(
                            (development) =>
                              development.developmentId ===
                              property.developmentId
                          );
                          const developmentPath = development?.developmentType
                            ? DEVELOPMENT_TYPE_TO_URL_MAP[
                                development.developmentType
                              ]
                            : '';

                          return (
                            <PropertyTooltip
                              key={`${property.propertyId}-${propertyIndex}`}
                              property={property}
                              onPropertyClick={() =>
                                navigate(
                                  `${SELECT_YOUR_RESIDENCE_PATH}/${developmentPath}/${property.propertyId}`
                                )
                              }
                            />
                          );
                        }
                      )}
                    </TooltipProperties>
                  </div>
                );
              }}
            />
            <Siteplan>
              {Object.entries(RESIDENCE_TO_SVG_PATH_MAP).map(
                ([residenceType, svgPath]) => {
                  return (
                    <Path
                      key={residenceType}
                      data-tip={residenceType}
                      data-name={residenceType}
                      data-for="property-tooltip"
                      data-event="click"
                      className="cls-8"
                      d={svgPath}
                      id={residenceType}
                      $isIncluded={isIncludedInProperties(
                        filteredProperties,
                        residenceType as ResidenceType
                      )}
                      onTouchStart={() =>
                        handleResidenceClick(residenceType as ResidenceType)
                      }
                      onMouseDown={() =>
                        handleResidenceClick(residenceType as ResidenceType)
                      }
                    />
                  );
                }
              )}
            </Siteplan>
          </React.Fragment>
        </React.Suspense>
      </RightContentWrapper>
    </Main>
  );
};

type ResidenceData = ResidencesResponse;

export const SelectYourResidencePage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [content, setContent] = React.useState<ResidenceData | undefined>(
    undefined
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    getResidences()
      .then((residencesData) => {
        setContent(residencesData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const developments = (content?.developments || []).map((development) => ({
    ...development,
    developmentId: `${development.id}`,
    properties: development.properties.map((property) => ({
      ...property,
      developmentId: `${property.developmentId}`,
    })),
  }));

  const title = content?.name || '';

  return (
    <Page>
      <BurgerMenu themeType={ThemeType.THEME_LIGHT} />

      <Navigation themeType={ThemeType.THEME_LIGHT} />

      <ResidenceSelectionProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ResidencesPage developments={developments} title={title} />
            }
          />
          <Route
            path={`/:developmentType/:propertyId`}
            element={
              <ResidenceDetailPage
                developments={developments}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to={SELECT_YOUR_RESIDENCE_PATH} replace />}
          />
        </Routes>
      </ResidenceSelectionProvider>

      <ContactButton onClick={() => navigate(CONTACT_PATH)}>
        Contact
      </ContactButton>
    </Page>
  );
};
