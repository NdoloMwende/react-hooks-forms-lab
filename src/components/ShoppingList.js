import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearchChange] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemsList, setItemsList] = useState(items || []);
  const [itemCategory, setItemCategory] = useState("Produce");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

   function handleSearchChange(e) {
    setSearchChange(e.target.value);
  }
  
  function handleNewItem(e){
    setItemName(e.target.value);
  }

  function onItemFormSubmit (newItem) {    
    setItemsList((prev) => [...prev, newItem]);
    setItemName("");
    setItemCategory("Produce");
  }

  function handleItemCategoryChange (e) {
    setItemCategory(e.target.value);
  }

  const itemsToDisplay = itemsList.filter((item) => {
    const categoryMatches =
      selectedCategory === "All" || item.category === selectedCategory;
    
      
      const searchMatches = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

  return categoryMatches && searchMatches;
});
 

  return (
    <div className="ShoppingList">
      <ItemForm
        itemName={itemName}
        itemCategory={itemCategory}
        onItemNameChange={handleNewItem}
        onItemCategoryChange={handleItemCategoryChange}
        onItemFormSubmit={onItemFormSubmit}       
      />
      <Filter
        search={search} 
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
       />
      <ul  className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
