import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";

function NestedDropdown({ items }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    // do something with the item
    console.log("Item clicked:", item);
    handleClose();
  };

  const renderItems = (items) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <div key={item.id}>
            <MenuItem onClick={handleClick}>{item.name}</MenuItem>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {renderItems(item.children)}
            </Menu>
          </div>
        );
      } else {
        return (
          <MenuItem key={item.id} onClick={() => handleItemClick(item)}>
            {item.name}
          </MenuItem>
        );
      }
    });
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Departments
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderItems(items)}
      </Menu>
    </div>
  );
}

export default NestedDropdown;