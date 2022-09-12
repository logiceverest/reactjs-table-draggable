import React, { useState, useEffect } from 'react'
import SortableListItem from "../Item/index.jsx";
import './style.css'

const TableDraggable = ({ data, columns, onDragEnd, editable, onChange }) => {
  const [items, setItems] = useState(data)
  const [labels, setLabels] = useState({})

  useEffect(() => {
    const lbls = {}
    for (const col of columns) {
      lbls[col.field] = col.label
    }
    setLabels({ ...lbls })
  }, [columns])

  const onSortItems = columns => {
    onDragEnd(columns)
    const swappedItems = []
    for (const item of items) {
      const swappedItem = {}
      for (const column of columns) {
        swappedItem[column.field] = item[column.field]
      }
      swappedItems.push(swappedItem)
    }
    setItems([...swappedItems])
  }

  const handleChange = e => {
    onChange(e.target.name, e.target.value)
    setLabels({ ...labels, [e.target.name]: e.target.value })
  }

  const dataList = key => items.map((item, i) => <tr className='table-row' key={i}><td className='table-data'>{item[key]}</td></tr>)
  const list = columns.map((column, i) => <SortableListItem
    key={i}
    onSortItems={onSortItems}
    items={columns}
    sortId={i}
  >
    <thead className="table-header">
      <tr>
        <th>
          {
            editable ? <input
              className='elem'
              type={'text'}
              name={column.field}
              value={labels[column.field]}
              // size={labels[column.field].length}
              onChange={e => handleChange(e)}
            /> : column.label
          }
        </th>
      </tr>
    </thead>
    <tbody className="table-body">
      {dataList(column.field)}
    </tbody>
  </SortableListItem>
  )

  return (
    <div className='list'>
      {list}
    </div>
  )
}

export default TableDraggable