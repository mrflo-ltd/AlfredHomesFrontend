import React from 'react';
import styled from 'styled-components/macro';
import { defaultButtonStyles } from '../components/Button';
import { black, red, white } from '../styles/colors';
import { fontFamily } from '../styles/typography';
import {
  Property,
  PropertyAvailabilityStatus,
  PropertyType,
  formatPrice,
  shouldShowPropertyPrice,
} from './utils';

const TooltipPropertyWrapper = styled.li`
  padding: 4px;

  & + & {
    margin-top: 4px;
  }
`;

const TooltipImage = styled.img`
  width: 76px;
  height: 76px;
  object-fit: cover;
`;

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TooltipHeader = styled.header`
  padding-bottom: 2px;
  border-bottom: 1px solid ${black};
`;

const TooltipTitle = styled.h4`
  margin: 0;
  padding: 0;
  text-align: left;
  font-family: ${fontFamily.text};
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const TooltipMain = styled.div`
  margin-top: 8px;
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
`;

const TooltipButton = styled.button`
  ${defaultButtonStyles};

  width: 100%;
  display: flex;
  text-align: left;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
`;

const PropertyContainer = styled.div<{ $isAvailable: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-family: ${fontFamily.text};
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const PropertyStatus = styled.div`
  margin-left: 8px;
  padding: 2px 4px;
  background-color: ${red};

  color: ${white};
`;

type PropertyTooltipProps = {
  showAvailabilityStatus?: boolean;
  property: Property;
  onPropertyClick: () => void;
};

export const PropertyTooltip = ({
  showAvailabilityStatus = true,
  property,
  onPropertyClick,
}: PropertyTooltipProps) => {
  const isPropertyApartment = property.propertyType === PropertyType.APARTMENT;
  const floors = property.layouts;

  return (
    <TooltipPropertyWrapper key={property.propertyId}>
      <TooltipButton onClick={() => onPropertyClick()}>
        <TooltipImage src={property.cgi?.[0] || ''} alt="" />
        <TooltipContent>
          <TooltipHeader>
            <TooltipTitle>{property.title}</TooltipTitle>
          </TooltipHeader>
          <TooltipMain>
            {isPropertyApartment && floors.length > 0 && (
              <React.Fragment>
                {floors.reduce(
                  (acc, floor) =>
                    acc
                      ? `${acc}, ${floor.title.replace(' Plan', '')}`
                      : `${acc}${floor.title.replace(' Plan', '')}`,
                  ''
                )}
                <br />
              </React.Fragment>
            )}
            {property.bedroomsCount} Bedroom
            {(property.bedroomsCount > 1 || property.bedroomsCount === 0) &&
              's'}
            <br />
            {shouldShowPropertyPrice(property) && (
              <React.Fragment>{formatPrice(property.price)}</React.Fragment>
            )}
          </TooltipMain>

          <PropertyContainer
            $isAvailable={
              property.availabilityStatus ===
              PropertyAvailabilityStatus.AVAILABLE
            }
          >
            <span>View Property</span>
            {showAvailabilityStatus && (
              <PropertyStatus>{property.availabilityStatus}</PropertyStatus>
            )}
          </PropertyContainer>
        </TooltipContent>
      </TooltipButton>
    </TooltipPropertyWrapper>
  );
};
