import { useState } from "react";

const ReactTuts = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "One pound of salt",
    },
    {
      id: 2,
      checked: false,
      item: "item 2",
    },
    {
      id: 3,
      checked: false,
      item: "item 3",
    },
  ]);

  const handleCheck = (id) => {
    console.log(`Key: ${id}`)
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setItems(listItems)
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li className="item" key={item.id}>
            <input
              id={item.item}
              type="checkbox"
              checked={item.checked === true}
              onChange={() => handleCheck(item.id)}
            />
            <label htmlFor={item.item}>{item.item}</label>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactTuts;
