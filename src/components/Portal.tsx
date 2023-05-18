import ReactDOM from 'react-dom';

const MODAL_ID = 'modal-root';

const addPortal = () => {
  const portal = document.createElement('div');
  portal.id = MODAL_ID;
  document.body.appendChild(portal);
  return portal;
};

const getPortal = () => {
  return document.getElementById(MODAL_ID) || addPortal();
};

type PortalPropTypes = {
  children: React.ReactNode;
};

export const Portal = ({ children }: PortalPropTypes) => {
  return ReactDOM.createPortal(children, getPortal());
};
