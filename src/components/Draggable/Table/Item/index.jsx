import React from 'react'
import { Sortable, HORIZONTAL } from "../../SortableComposition";

const Item = props => {
    return <table className={'table'} {...props}>{props.children}</table>
}

export default Sortable(Item, HORIZONTAL)