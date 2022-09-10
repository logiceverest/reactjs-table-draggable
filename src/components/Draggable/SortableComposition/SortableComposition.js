import React from "react";
import { swapArrayElements, isMouseBeyond } from "./helper";
import PropTypes from 'prop-types';

export const VERTICAL = 'VERTICAL'
export const HORIZONTAL = 'HORIZONTAL'

export let draggingIndex = null

export const SortableComposition = (Component, flowDirection = VERTICAL) => {

    const Sortable = props => {

        const sortEnd = e => {
            e.preventDefault()
            draggingIndex = null
        }

        const sortStart = e => {
            draggingIndex = e.currentTarget.dataset.id
            let dt = e.dataTransfer
            if (dt !== undefined) {
                const elem = e.target.innerHTML
                e.dataTransfer.setData('text', elem)
                if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
                    dt.setDragImage(e.target, 0, 0)
                }
            }
        }

        const dragOver = e => {
            e.preventDefault();
            const { moveInMIddle } = props
            const overEl = e.currentTarget //underlying element
            const indexDragged = Number(overEl.dataset.id) //index of underlying element in the set DOM elements
            const indexFrom = Number(draggingIndex)
            const { height, width, top, left } = overEl.getBoundingClientRect()
            const positionX = e.clientX
            const positionY = e.clientY
            let mouseBeyond
            let { items } = props


            if (flowDirection === VERTICAL) {
                mouseBeyond = isMouseBeyond(positionY, top, height, moveInMIddle)
            }

            if (flowDirection === HORIZONTAL) {
                mouseBeyond = isMouseBeyond(positionX, left, width, moveInMIddle)
            }

            if (indexDragged !== indexFrom && mouseBeyond) {
                const swapedItems = swapArrayElements(items, indexFrom, indexDragged)
                draggingIndex = indexDragged
                props.onSortItems(swapedItems)
            }
        }

        let newProps = Object.assign({}, props)
        delete newProps.moveInMIddle
        delete newProps.onSortItems
        delete newProps.items
        const { sortId, ...propss } = newProps
        return (
            <Component
                draggable={true}
                onDragOver={dragOver}
                onDragStart={sortStart}
                onDragEnd={sortEnd}
                onTouchStart={sortStart}
                onTouchMove={dragOver}
                onTouchEnd={sortEnd}
                data-id={sortId}
                {...propss}
            />
        )
    }

    Sortable.propTypes = {
        items: PropTypes.array.isRequired,
        onSortItems: PropTypes.func.isRequired,
        sortId: PropTypes.number,
        moveInMIddle: PropTypes.bool
    }

    Sortable.defaultProps = {
        moveInMIddle: false
    }

    return Sortable
}