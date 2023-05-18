import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { SITEMAP_PATH } from '../global/pages';
import { getMenuData, MenuItem } from '../global/menu.service';
import { NotFoundPage } from '../global/NotFoundPage';

export const PreviewPage = () => {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);

  const params = useParams();

  React.useEffect(() => {
    getMenuData()
      .then((items) => {
        setMenuItems(items || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (menuItems.length === 0) {
    return null;
  }

  const currentPageId = Number(params['*']);
  const currentMenuItem = menuItems.find(
    (menuItem) => menuItem.id === currentPageId
  );

  if (!currentMenuItem) {
    return <NotFoundPage />;
  }

  const currentUrl = currentMenuItem.url.slice(0, -1);

  if (currentMenuItem.type === 'home') {
    return <Navigate to="/" />;
  }

  if (currentMenuItem.type === 'map') {
    return <Navigate to={SITEMAP_PATH} />;
  }

  if (
    currentMenuItem.type === 'developments' ||
    currentMenuItem.type === 'development' ||
    currentMenuItem.type === 'property' ||
    currentMenuItem.type === 'page' ||
    currentMenuItem.type === 'contact'
  ) {
    return <Navigate to={currentUrl} />;
  }

  return <NotFoundPage />;
};
