import React from 'react';
import { PropertyType, ResidenceType } from './utils';

type ResidenceSelectionState = {
  selectedPropertyType?: PropertyType;
  setSelectedPropertyType: React.Dispatch<
    React.SetStateAction<PropertyType | undefined>
  >;
  selectedDevelopmentId?: string;
  setSelectedDevelopmentId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedResidenceType?: ResidenceType;
  setSelectedResidenceType: React.Dispatch<
    React.SetStateAction<ResidenceType | undefined>
  >;
  selectedPropertyId?: string;
  setSelectedPropertyId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const initialResidenceSelectionState: ResidenceSelectionState = {
  selectedPropertyType: undefined,
  setSelectedPropertyType: () => {},
  selectedDevelopmentId: undefined,
  setSelectedDevelopmentId: () => {},
  selectedResidenceType: undefined,
  setSelectedResidenceType: () => {},
  selectedPropertyId: undefined,
  setSelectedPropertyId: () => {},
};

const ResidenceSelectionContext = React.createContext(
  initialResidenceSelectionState
);

export const useResidenceSelection = () =>
  React.useContext(ResidenceSelectionContext);

type ResidenceSelectionProps = {
  children?: React.ReactNode;
};

export const ResidenceSelectionProvider = ({
  children,
}: ResidenceSelectionProps) => {
  const [selectedPropertyType, setSelectedPropertyType] = React.useState<
    PropertyType | undefined
  >(undefined);
  const [selectedDevelopmentId, setSelectedDevelopmentId] = React.useState<
    string | undefined
  >(undefined);
  const [selectedResidenceType, setSelectedResidenceType] = React.useState<
    ResidenceType | undefined
  >(undefined);
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<
    string | undefined
  >(undefined);

  return (
    <ResidenceSelectionContext.Provider
      value={{
        selectedPropertyType,
        setSelectedPropertyType,
        selectedDevelopmentId,
        setSelectedDevelopmentId,
        selectedResidenceType,
        setSelectedResidenceType,
        selectedPropertyId,
        setSelectedPropertyId,
      }}
    >
      {children}
    </ResidenceSelectionContext.Provider>
  );
};
