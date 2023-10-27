const items = [
    {
      id: 1,
      name: "Category 1",
      children: [
        {
          id: 2,
          name: "Subcategory 1",
        },
        {
          id: 3,
          name: "Subcategory 2",
        },
      ],
    },
    {
      id: 4,
      name: "Category 2",
      children: [
        {
          id: 5,
          name: "Subcategory 3",
        },
      ],
    },
  ];
  
  function Sisa() {
    return (
      <div>
        <NestedDropdown items={items} />
      </div>
    );
  }