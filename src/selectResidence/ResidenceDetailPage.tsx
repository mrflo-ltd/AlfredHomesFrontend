import React from 'react';
import styled from 'styled-components/macro';
import { useParams, useNavigate } from 'react-router-dom';
import { timingFunctions, transparentize } from 'polished';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { SELECT_YOUR_RESIDENCE_PATH } from '../global/pages';
import { InternalLink, ExternalLink } from '../components/Link';
import { FullWidthLoaderWrapper, Loader } from '../components/Loader';
import {
  defaultButtonStyles,
  FallbackContactButton,
} from '../components/Button';
import { CONTACT_PATH } from '../global/pages';
import {
  AccordionMenu,
  AccordionItemButton,
  FallbackAccordionMenu,
  AccordionItemTitle,
  FallbackCategoryTitle,
  FallbackItems,
} from '../components/Menu';
import { PageContent, PageTitle, PageContentWrapper } from '../components/Page';
import {
  black,
  greyDarker,
  greyLighter,
  greyLight,
  red,
  white,
} from '../styles/colors';
import { fontFamily, Text, ContentText } from '../styles/typography';
import {
  LayoutType,
  Property,
  PropertyDetailsCategory,
  PropertySummarySpecification,
  Development,
  formatPrice,
  FloorplanLayout,
  shouldShowPropertyPrice,
} from './utils';
import { getParagraphsFromText } from '../utils/stringUtils';
import { sendPageView } from '../utils/analyticsUtils';

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContentWrapper = styled(PageContentWrapper)`
  width: 40%;
  padding-left: 72px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-bottom: 72px;
    padding-right: 72px;
  }

  @media only screen and (max-width: 480px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const RightContentWrapper = styled(PageContentWrapper)`
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  padding: 100px 108px 108px 36px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const AccordionMenuWrapper = styled.div`
  margin-top: 18px;
`;

const Summary = styled.div``;

const SummaryTitle = styled(PageTitle)`
  color: ${black};

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const SummaryText = styled(Text)`
  margin-bottom: 24px;
  color: ${black};
`;

const SummaryItems = styled.ul`
  list-style: none;
  margin: 24px 0 0 0;
  padding: 0;

  @media only screen and (max-width: 768px) {
    margin-top: 0;
  }
`;

const SummaryItem = styled.li`
  & + & {
    margin-top: 12px;
  }
`;

const SubItems = styled(SummaryItems)`
  margin: 0;
`;

const SummaryItemTitle = styled.h4`
  margin: 0 0 12px 0;
  padding: 0;
  color: ${black};
  font-family: ${fontFamily.text};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const SubItem = styled.li`
  display: flex;
  align-items: flex-start;
  font-family: ${fontFamily.text};
  font-size: 12px;
  font-weight: 400;
  color: ${black};

  & + & {
    margin-top: 10px;
  }

  &:before {
    content: '';
    display: block;
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    background-color: ${transparentize(0.4, greyLight)};
    border-radius: 50%;
    margin-top: 2px;
    margin-right: 18px;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, auto) minmax(120px, auto);
  grid-template-rows: repeat(3, minmax(120px, auto));
  column-gap: 10px;
  row-gap: 10px;
  margin-top: 18px;
  margin-left: 18px;

  @media only screen and (max-width: 1024px) {
    margin-top: 36px;
  }

  @media only screen and (max-width: 768px) {
    margin-left: 0;
    padding-bottom: 24px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CGIWrapper = styled.div`
  position: relative;
  overflow: hidden;

  .zoom-wrapper {
    height: 100%;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;

const ZoomControls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 8;
`;

const ZoomButton = styled.button`
  ${defaultButtonStyles};

  padding: 8px 12px;
  font-size: 18px;
  font-weight: 300;
  border: 1px solid ${greyDarker};
  color: ${greyDarker};
  background-color: ${white};

  &:hover {
    transition: background-color 333ms ${timingFunctions('easeOutExpo')};
    background-color: ${greyLighter};
  }
`;

const ZoomInButton = styled(ZoomButton)`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const ZoomOutButton = styled(ZoomButton)`
  border-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const CGIImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  @media only screen and (max-width: 768px) {
    padding-bottom: 24px;
  }
`;

const ItemButton = styled(AccordionItemButton)`
  text-transform: uppercase;
  padding-left: 0;
  padding-right: 0;
  pointer-events: none;
`;

const ItemTitle = styled(AccordionItemTitle)`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  column-gap: 10px;
`;

const TitleText = styled.div`
  font-size: 12px;
`;

const Footer = styled.footer`
  margin-top: 36px;
`;

const MinimapImage = styled.img`
  width: 240px;
  height: auto;
`;

const ActionMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 18px;
  font-family: ${fontFamily.text};
  font-size: 10px;
  line-height: 1.4;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const BackLink = styled(InternalLink)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${black};

  &:after {
    content: '';
    display: inline-block;
    width: 2px;
    height: 10px;
    margin: 0 12px 0 10px;
    background-color: ${greyLight};
  }
`;

const Sitemap = styled.div``;

const DesktopExternalLink = styled(ExternalLink)`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileExternalLink = styled(ExternalLink)`
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const PrintLink = styled(ExternalLink)`
  flex-shrink: 0;
  position: relative;
  align-items: center;
  color: ${red};
`;

const Disclaimer = styled(Text)`
  margin: 18px 0 0 0;
  padding: 0;
  font-size: 10px;
  color: ${greyLight};
`;

const DesktopLinkText = styled.span`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileLinkText = styled.span`
  display: none;

  @media only screen and (max-width: 768px) {
    display: inline;
  }
`;

const FallbackMenu = styled.div`
  padding-top: 18px;
`;

const RoomItem = styled.li`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  -webkit-column-gap: 10px;
  column-gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid ${greyDarker};
`;

const RoomText = styled(Text)`
  text-transform: uppercase;
  color: ${greyDarker};
`;

type LayoutProps = {
  property: Property;
};

const LayoutCGI = ({ property }: LayoutProps) => {
  const caption = property.description;
  const imagePath = property.cgi?.[0] || '';
  return <CGIImage src={imagePath} alt={caption} />;
};

type ZoomContainerProps = {
  imagePath: string;
  caption: string;
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
};

const ZoomContainer = ({
  imagePath,
  caption,
  zoomIn,
  zoomOut,
  resetTransform,
}: ZoomContainerProps) => {
  React.useEffect(() => {
    resetTransform();
  }, [imagePath]);

  return (
    <React.Fragment>
      <ZoomControls>
        <ZoomInButton onClick={() => zoomIn()}>+</ZoomInButton>
        <ZoomOutButton onClick={() => zoomOut()}>–</ZoomOutButton>
      </ZoomControls>

      <TransformComponent wrapperClass="zoom-wrapper">
        <CGIImage src={imagePath || ''} alt={caption} />
      </TransformComponent>
    </React.Fragment>
  );
};

type LayoutFloorPlanProps = {
  propertyLayout: FloorplanLayout;
  category: PropertyDetailsCategory;
};

const LayoutFloorPlan = ({
  propertyLayout,
  category,
}: LayoutFloorPlanProps) => {
  const imagePath = propertyLayout.floorPlans?.[0];
  const caption = propertyLayout.title;

  const initialScale = propertyLayout.initialZoomLevel;

  return (
    <CGIWrapper>
      <TransformWrapper
        initialScale={initialScale}
        minScale={initialScale}
        maxScale={5}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => {
          return (
            <ZoomContainer
              imagePath={imagePath}
              caption={caption}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              resetTransform={resetTransform}
            />
          );
        }}
      </TransformWrapper>
    </CGIWrapper>
  );
};

const LayoutPageContent = styled(PageContent)`
  padding-bottom: 0;
  padding-left: 0;

  @media only screen and (max-width: 1024px) {
    flex: none;
    overflow-y: unset;
    height: auto;
  }

  @media only screen and (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LayoutItems = styled(FallbackItems)`
  border-bottom: 0;
`;

const LayoutCategoryTitle = styled(FallbackCategoryTitle)`
  @media only screen and (max-width: 768px) {
    font-family: ${fontFamily.display};
    margin-bottom: 24px;
    font-size: 32px;
    letter-spacing: 1px;
    font-weight: 400;
    line-height: 1.1;
    text-align: left;
    color: ${black};
    color: ${greyLight};
    text-transform: none;
  }
`;

type LayoutSummaryProps = {
  specification: PropertySummarySpecification;
};

const LayoutSummary = ({ specification }: LayoutSummaryProps) => {
  const summaryItems = specification?.summaryItems || [];
  const imagePaths = specification?.imagePaths || [];

  return (
    <LayoutWrapper>
      <SummaryWrapper>
        <LayoutPageContent>
          <Summary>
            <SummaryTitle>{specification.title}</SummaryTitle>
            {specification?.summary && (
              <SummaryText
                dangerouslySetInnerHTML={{ __html: specification.summary }}
              />
            )}

            {summaryItems.length > 0 && (
              <SummaryItems>
                {summaryItems.map((item, index) => (
                  <SummaryItem key={`${item.title}-${index}`}>
                    {item.title && (
                      <SummaryItemTitle>{item.title}</SummaryItemTitle>
                    )}

                    <SubItems>
                      {(item?.items || []).map((subItem, subItemIndex) => (
                        <SubItem key={`${subItem}-${subItemIndex}`}>
                          {subItem}
                        </SubItem>
                      ))}
                    </SubItems>
                  </SummaryItem>
                ))}
              </SummaryItems>
            )}
          </Summary>
        </LayoutPageContent>
      </SummaryWrapper>

      {imagePaths.length > 0 && (
        <ImageGrid>
          {imagePaths.map((imagePath, index) => (
            <Image key={`${imagePath}-${index}`} src={imagePath} alt="" />
          ))}
        </ImageGrid>
      )}
    </LayoutWrapper>
  );
};

type ResidenceDetailContentProps = {
  property: Property;
  categories: PropertyDetailsCategory[];
  selectedCategoryId?: string;
  setSelectedCategoryId: (
    value: React.SetStateAction<string | undefined>
  ) => void;
};

const ResidenceDetailContent = ({
  property,
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: ResidenceDetailContentProps) => {
  sendPageView(`${SELECT_YOUR_RESIDENCE_PATH}/${property.propertyId}`);

  React.useEffect(() => {
    if (property.title) {
      document.title = property.title;
    }
  }, [property.title]);

  const navigate = useNavigate();

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const selectedPropertyContent = (property?.propertyContents || []).find(
    (content) => content.id === selectedCategory?.id
  );
  const selectedPropertyLayout = (property?.layouts || []).find(
    (layout) => layout.id === selectedCategory?.id
  );

  const mappedCategories = categories.map((category) => ({
    categoryName: category.title,
    categoryId: category.id,
    items: category.rooms.map((room) => ({
      id: `${room.id}`,
      categoryId: category.id,
      name: room.title,
      images: [],
      details: {
        dimensionsMeters: room.dimensionsMeters,
        dimensionsFeet: room.dimensionsFeet,
      },
    })),
  }));

  const propertyDescriptionParagraphs = getParagraphsFromText(
    property?.description
  );

  return (
    <Main>
      <React.Fragment>
        <LeftContentWrapper>
          <PageContent>
            {property.title && (
              <PageTitle color={black}>{property.title}</PageTitle>
            )}

            {propertyDescriptionParagraphs.map((paragraph, index) => {
              return (
                <ContentText
                  key={`property-${property.propertyId}-${index}`}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              );
            })}

            {property.disclaimer && (
              <ContentText>
                <strong>GIA</strong> {property.disclaimer}
              </ContentText>
            )}

            {shouldShowPropertyPrice(property) && (
              <ContentText>
                <strong>GUIDE PRICE</strong> {formatPrice(property.price)}
              </ContentText>
            )}

            {categories.length > 0 && (
              <AccordionMenuWrapper>
                <AccordionMenu
                  canBeExpanded
                  selectedCategoryId={selectedCategoryId}
                  categories={mappedCategories}
                  onCategoryClick={(categoryId) => {
                    setSelectedCategoryId(categoryId);
                  }}
                  renderItem={(item) => {
                    return (
                      <ItemButton $isSelected={false}>
                        <ItemTitle>
                          <TitleText>{item.name}</TitleText>
                          <TitleText>
                            {item?.details?.dimensionsMeters}
                          </TitleText>
                          <TitleText>{item?.details?.dimensionsFeet}</TitleText>
                        </ItemTitle>
                      </ItemButton>
                    );
                  }}
                />
                <FallbackAccordionMenu
                  categories={mappedCategories}
                  renderCategory={(category) => {
                    const propertyCategory = categories.find(
                      (c) => c.id === category.categoryId
                    );
                    const propertyContent = (
                      property.propertyContents || []
                    ).find((content) => content.id === propertyCategory?.id);
                    const propertyLayout = (property.layouts || []).find(
                      (layout) => layout.id === propertyCategory?.id
                    );

                    return (
                      <FallbackMenu>
                        <LayoutCategoryTitle>
                          {category.categoryName}
                        </LayoutCategoryTitle>

                        {propertyCategory && propertyCategory.rooms.length > 0 && (
                          <LayoutItems>
                            {propertyCategory.rooms.map((room, index) => (
                              <RoomItem key={`${room.id}-${index}`}>
                                <RoomText color={greyDarker}>
                                  {room.title}
                                </RoomText>
                                <RoomText>{room.dimensionsMeters}</RoomText>
                                <RoomText>{room.dimensionsFeet}</RoomText>
                              </RoomItem>
                            ))}
                          </LayoutItems>
                        )}

                        {propertyCategory &&
                          property &&
                          propertyCategory.layoutType ===
                            LayoutType.LAYOUT_CGI && (
                            <LayoutCGI property={property} />
                          )}
                        {propertyCategory &&
                          propertyLayout &&
                          propertyCategory.layoutType ===
                            LayoutType.LAYOUT_FLOORPLAN && (
                            <LayoutFloorPlan
                              propertyLayout={propertyLayout}
                              category={propertyCategory}
                            />
                          )}
                        {propertyCategory &&
                          propertyContent &&
                          propertyCategory.layoutType ===
                            LayoutType.LAYOUT_SPEC && (
                            <LayoutSummary
                              specification={{
                                title: propertyContent.title,
                                summary: propertyContent.description,
                                summaryItems: propertyContent.listOfItems,
                                imagePaths: propertyContent.images,
                              }}
                            />
                          )}
                      </FallbackMenu>
                    );
                  }}
                />
              </AccordionMenuWrapper>
            )}

            <Footer>
              <Sitemap>
                <DesktopExternalLink href={SELECT_YOUR_RESIDENCE_PATH}>
                  {property.minimapImagePath && (
                    <MinimapImage src={property.minimapImagePath} alt="" />
                  )}
                </DesktopExternalLink>

                {property.minimapImagePath && (
                  <MobileExternalLink
                    href={property.minimapImagePath}
                    target="_blank"
                  >
                    <MinimapImage src={property.minimapImagePath} alt="" />
                  </MobileExternalLink>
                )}
              </Sitemap>

              <ActionMenu>
                <BackLink to={SELECT_YOUR_RESIDENCE_PATH}>
                  <DesktopLinkText>Select another home</DesktopLinkText>
                  <MobileLinkText>Select your Home</MobileLinkText>
                </BackLink>

                {property.pdfPath?.[0] && (
                  <PrintLink href={property.pdfPath[0]} target="_blank">
                    Print Particulars
                  </PrintLink>
                )}
              </ActionMenu>

              <Disclaimer>
                All information, furniture layouts and measurements are for
                guidance purposes only. Floorplans not to scale.
              </Disclaimer>
            </Footer>

            <FallbackContactButton onClick={() => navigate(CONTACT_PATH)}>
              Contact
            </FallbackContactButton>
          </PageContent>
        </LeftContentWrapper>

        <RightContentWrapper>
          {selectedCategory &&
            property &&
            selectedCategory.layoutType === LayoutType.LAYOUT_CGI && (
              <LayoutCGI property={property} />
            )}
          {selectedCategory &&
            selectedPropertyLayout &&
            selectedCategory.layoutType === LayoutType.LAYOUT_FLOORPLAN && (
              <LayoutFloorPlan
                propertyLayout={selectedPropertyLayout}
                category={selectedCategory}
              />
            )}
          {selectedCategory &&
            selectedPropertyContent &&
            selectedCategory.layoutType === LayoutType.LAYOUT_SPEC && (
              <LayoutSummary
                specification={{
                  title: selectedPropertyContent.title,
                  summary: selectedPropertyContent.description,
                  summaryItems: selectedPropertyContent.listOfItems,
                  imagePaths: selectedPropertyContent.images,
                }}
              />
            )}
        </RightContentWrapper>
      </React.Fragment>
    </Main>
  );
};

type ResidenceDetailPageParams = {
  developmentType: string;
  propertyId: string;
};

type ResidenceDetailProps = {
  isLoading: boolean;
  developments: Development[];
};

export const ResidenceDetailPage = ({
  isLoading,
  developments,
}: ResidenceDetailProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | undefined
  >(undefined);

  const params = useParams<ResidenceDetailPageParams>();

  const currentProperty = developments
    .flatMap((development) => development.properties)
    .find((property) => {
      if (params?.propertyId === undefined) {
        return false;
      }

      return property.propertyId === Number(params.propertyId);
    });

  const cgiCategories = (currentProperty?.cgi || []).map((cgi, index) => ({
    id: `${index}`,
    title: 'CGI',
    layoutType: LayoutType.LAYOUT_CGI,
    rooms: [],
  }));
  const layoutCategories = (currentProperty?.layouts || []).map((layout) => ({
    id: layout.id,
    title: layout.title,
    layoutType: LayoutType.LAYOUT_FLOORPLAN,
    rooms: layout.rooms,
  }));
  const specificationCategories = (currentProperty?.propertyContents || []).map(
    (content) => ({
      id: content.id,
      title: content.title,
      layoutType: LayoutType.LAYOUT_SPEC,
      rooms: [],
    })
  );

  const categories = [
    ...cgiCategories,
    ...layoutCategories,
    ...specificationCategories,
  ];

  const firstCategoryId = categories?.[0]?.id;

  React.useEffect(() => {
    setSelectedCategoryId(firstCategoryId);
  }, [firstCategoryId]);

  if (isLoading) {
    return (
      <Main>
        <FullWidthLoaderWrapper>
          <Loader color={red} />
        </FullWidthLoaderWrapper>
      </Main>
    );
  }

  if (!currentProperty) {
    return (
      <Main>
        <LeftContentWrapper>
          <PageContent>
            <ContentText>Property not found</ContentText>
          </PageContent>
        </LeftContentWrapper>
      </Main>
    );
  }

  const currentPropertyDevelopment = developments.find((development) => {
    return development.developmentId === currentProperty.developmentId;
  });

  if (!currentPropertyDevelopment) {
    return (
      <Main>
        <LeftContentWrapper>
          <PageContent>
            <ContentText>Property not found</ContentText>
          </PageContent>
        </LeftContentWrapper>
      </Main>
    );
  }

  return (
    <ResidenceDetailContent
      selectedCategoryId={selectedCategoryId}
      property={currentProperty}
      categories={categories}
      setSelectedCategoryId={setSelectedCategoryId}
    />
  );
};
