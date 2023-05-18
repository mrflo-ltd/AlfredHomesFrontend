import ReactTooltip from 'react-tooltip';

export const Tooltip = ({ ...props }) => {
  return <ReactTooltip ref={props?.tooltipRef} {...props} />;
};
