import React from 'react';
import { MenuItem, getMenuData } from './menu.service';

type MenuState = {
  menuItems: MenuItem[];
};

const initialMenuState: MenuState = {
  menuItems: [],
};

const MenuContext = React.createContext(initialMenuState);

export const useMenuItems = () => React.useContext(MenuContext);

type MenuContextProps = {
  children?: React.ReactNode;
};

export const MenuProvider = ({ children }: MenuContextProps) => {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);

  React.useEffect(() => {
    getMenuData()
      .then((items) => {
        setMenuItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MenuContext.Provider
      value={{
        menuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
