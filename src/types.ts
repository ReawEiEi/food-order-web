type Menu = {
  ID: string;
  MenuName: string;
  RestaurantID: string;
};

type MenuItem = {
  ID: string;
  MenuID: string;
  MenuItemName: string;
  MenuItemPrice: number;
  MenuItemDescription: string | null;
  MenuItemImageKey: string | null;
};

type MenuWithItems = {
  menu: Menu;
  items: MenuItem[];
};
