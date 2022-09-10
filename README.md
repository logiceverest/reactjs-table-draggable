# reactjs-table-draggable

`reactjs-table-draggable` is a reactjs library for dealing with table columns for sorting them.

## Installation

Use the package manager [npm](https://docs.npmjs.com/about-npm) to install `reactjs-table-draggable`.

```bash
npm install reactjs-table-draggable
```

## Usage

```JavaScript
import { useState } from 'react';
import { TableDraggable } from "reactjs-table-draggable";

function App() {
  const [columns, setColumns] = useState([
    { field: 'id', label: 'ID' },
    { field: 'first_name', label: 'First Name' },
    { field: 'last_name', label: 'Last Name' },
    { field: 'address', label: 'Address' },
  ])

  const handleChange = (field, label) => {
    for (const col of columns) {
      if (col.field === field) {
        col.label = label
      }
    }
    setColumns([...columns])
  }

  const onDragEnd = columns => {
    setColumns([...columns])
  }

  const rows = [
    { id: 1, first_name: 'Jhon', last_name: 'Doe', address: 'New York, USA' },
    { id: 2, first_name: 'Jane', last_name: 'Doe', address: 'Washington, USA' },
  ]

  return (
    <TableDraggable
      data={rows}
      editable={true}
      onChange={handleChange}
      columns={columns}
      onDragEnd={onDragEnd}
    />
  );
}

export default App;
```