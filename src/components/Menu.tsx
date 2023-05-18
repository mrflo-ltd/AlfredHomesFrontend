import React from 'react';
import styled from 'styled-components/macro';
import { defaultButtonStyles } from './Button';
import { ChevronDown, ChevronUp } from './Chevron';
import { fontFamily, Text } from '../styles/typography';
import { red, white, greyDark, greyDarker, black } from '../styles/colors';
import { Category, DesignCategory, Item } from './Menu.types';

const Wrapper = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Categories = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CategoryItem = styled.li`
  &:not(.selected) + & {
    border-top: 1px solid ${greyDarker};
  }
`;

const CategoryButton = styled.button<{
  $isSelected: boolean;
  $canBeExpanded: boolean;
  $hasItems?: boolean;
}>`
  ${defaultButtonStyles};

  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  font-weight: ${(props) => (props.$isSelected ? 600 : 400)};
  color: ${(props) => (props.$isSelected ? red : black)};
  border-bottom-color: ${(props) =>
    props.$isSelected && !props.$hasItems ? red : greyDarker};
  border-bottom-style: solid;
  border-bottom-width: ${(props) => (props.$isSelected ? '2px' : 0)};

  ${(props) =>
    !props.$canBeExpanded &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}
`;

const CategoryTitle = styled.h3`
  font-family: ${fontFamily.text};
  font-size: 14px;
  text-transform: uppercase;
  text-align: left;
`;

const CategoryChevronDown = styled(ChevronDown)`
  margin-bottom: -8px;
  margin-right: 2px;
`;

const CategoryChevronUp = styled(ChevronUp)`
  margin-top: -8px;
  margin-right: 2px;
`;

const Items = styled.ul`
  list-style: none;
  margin: 0 0 18px 0;
  padding: 0;
  border-top: 0;
  border-bottom: 1px solid ${greyDarker};
`;

const ListItem = styled.li`
  & + & {
    border-top: 1px solid ${greyDarker};
  }
`;

export const AccordionItemButton = styled.button<{ $isSelected: boolean }>`
  ${defaultButtonStyles};

  width: 100%;
  padding: 8px;
  text-align: left;
  font-family: ${fontFamily.text};
  font-size: 14px;
  font-weight: ${(props) => (props.$isSelected ? 600 : 400)};
  color: ${(props) => (props.$isSelected ? white : black)};
  background-color: ${(props) =>
    props.$isSelected ? greyDark : 'transparent'};

  &:hover {
    font-weight: 600;
    color: ${white};
    background-color: ${greyDark};
  }
`;

export const AccordionItemTitle = styled.h4``;

type AccordionMenuProps = {
  categories: Category[];
  selectedCategoryId?: string;
  onCategoryClick: (categoryId: string) => void;
  renderItem: (item: Item) => React.ReactNode;
  canBeExpanded?: boolean;
  isExpandedSameAsSelected?: boolean;
};

export const AccordionMenu = ({
  categories,
  selectedCategoryId,
  onCategoryClick,
  renderItem,
  canBeExpanded,
  isExpandedSameAsSelected,
}: AccordionMenuProps) => {
  const [expandedCategoryId, setExpandedCategoryId] = React.useState<
    string | undefined
  >(undefined);

  return (
    <Wrapper>
      <Categories>
        {categories.map((category) => {
          const isCategorySelected = selectedCategoryId === category.categoryId;
          const isCategoryExpanded = isExpandedSameAsSelected
            ? isCategorySelected
            : expandedCategoryId === category.categoryId;

          return (
            <CategoryItem
              className={isCategorySelected ? 'selected' : ''}
              key={category.categoryId}
            >
              <CategoryButton
                $isSelected={isCategorySelected}
                $hasItems={category.items.length > 0}
                $canBeExpanded={
                  category.items.length > 0 || Boolean(canBeExpanded)
                }
                onClick={() => {
                  onCategoryClick(category.categoryId);
                  setExpandedCategoryId(
                    isCategoryExpanded ? undefined : category.categoryId
                  );
                }}
              >
                <CategoryTitle>{category.categoryName}</CategoryTitle>

                {isCategoryExpanded && category.items.length > 0 && (
                  <CategoryChevronDown width="10px" height="10px" />
                )}
                {!isCategoryExpanded && category.items.length > 0 && (
                  <CategoryChevronUp width="10px" height="10px" />
                )}
              </CategoryButton>

              {isCategoryExpanded && category.items.length > 0 && (
                <Items>
                  {category.items.map((item) => (
                    <ListItem key={`${item.name}-${item.id}`}>
                      {renderItem(item)}
                    </ListItem>
                  ))}
                </Items>
              )}
            </CategoryItem>
          );
        })}
      </Categories>
    </Wrapper>
  );
};

const FallbackWrapper = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const FallbackCategoryTitle = styled(CategoryTitle)`
  margin: 0 0 18px 0;
  font-weight: 600;
  color: ${greyDarker};
`;

export const FallbackCategoryItem = styled(CategoryItem)`
  &:not(.selected) + & {
    border-top: 0;
  }
`;

export const FallbackItems = styled(Items)``;

export const FallbackListItem = styled(ListItem)`
  & + & {
    border-top: 0;
  }
`;

export const AccordionItemImage = styled.img`
  width: 120px;
  height: 120px;
  margin: 18px 0;
  object-fit: cover;
`;

export const PlaceAddress = styled.address<{ color?: string }>`
  margin: 0;
  padding: 0 0 6px;
  text-transform: uppercase;
  font-family: ${fontFamily.text};
  font-size: 13px;
  line-height: 1.3;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => props?.color || white};
`;

export const PlaceDescription = styled(Text)<{ color?: string }>`
  margin-top: 20px;
  color: ${(props) => props?.color || white};
`;

export const PlaceTitle = styled.h3<{ color?: string }>`
  margin: 0 0 12px;
  padding: 0;
  font-family: ${fontFamily.display};
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => props?.color || white};
  text-transform: uppercase;
  letter-spacing: 3px;
`;

type FallbackAccordionMenuProps = {
  categories: Category[];
  renderCategory: (category: Category) => React.ReactNode;
};

export const FallbackAccordionMenu = ({
  categories,
  renderCategory,
}: FallbackAccordionMenuProps) => {
  return (
    <FallbackWrapper>
      <Categories>
        {categories.map((category) => (
          <FallbackCategoryItem key={category.categoryId}>
            {renderCategory(category)}
          </FallbackCategoryItem>
        ))}
      </Categories>
    </FallbackWrapper>
  );
};

type DesignMenuProps = {
  categories: DesignCategory[];
  selectedCategoryId?: string;
  onCategoryClick: (categoryId: string) => void;
};

export const DesignMenu = ({
  categories,
  selectedCategoryId,
  onCategoryClick,
}: DesignMenuProps) => {
  return (
    <Wrapper>
      <Categories>
        {categories.map((category) => {
          const isCategorySelected = selectedCategoryId === category.categoryId;

          return (
            <CategoryItem
              className={isCategorySelected ? 'selected' : ''}
              key={category.categoryId}
            >
              <CategoryButton
                $isSelected={isCategorySelected}
                $canBeExpanded={true}
                onClick={() => onCategoryClick(category.categoryId)}
              >
                <CategoryTitle>{category.categoryName}</CategoryTitle>
              </CategoryButton>
            </CategoryItem>
          );
        })}
      </Categories>
    </Wrapper>
  );
};
