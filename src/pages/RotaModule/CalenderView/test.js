// App.js

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import './App.css';

const ItemTypes = {
  CARD: 'card',
};

const Tablee = ({ items, onDrop }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        minHeight: '200px',
      }}
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => e.dataTransfer.setData(ItemTypes.CARD, JSON.stringify(item))}
          style={{ margin: '5px', padding: '10px', backgroundColor: '#f0f0f0', cursor: 'move' }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [table1, setTable1] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);

  const [table2, setTable2] = useState([]);

  const handleDrop = (e) => {
    const droppedItem = JSON.parse(e.dataTransfer.getData(ItemTypes.CARD));
    setTable2([...table2, droppedItem]);

    // Remove the item from the source Tablee
    const updatedTable1 = table1.filter((item) => item.id !== droppedItem.id);
    setTable1(updatedTable1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Drag and Drop Example</h1>
        <div style={{ display: 'flex' }}>
          <Tablee items={table1} onDrop={handleDrop} />
          <Tablee items={table2} onDrop={handleDrop} />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
