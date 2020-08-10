import React from 'react';
import DesignerNavItem from './DesignerNavItem.jsx';

const NavItems = ['Home', 'Works', 'Price', 'Hours', 'Reviews', 'Location'];

const DesignerNav = (props) => {
  const { height } = props;
  return (
    <nav>
      <ul className='designerNav'>
        {NavItems.map((NavItem) => {
          return (
            <DesignerNavItem key={NavItem} height={height}>
              {NavItem}
            </DesignerNavItem>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesignerNav;
