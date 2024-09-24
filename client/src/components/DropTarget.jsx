import React, { memo } from 'react';
import { useDrop } from 'react-dnd';

const ItemType = {
    ITEM: 'item',
};

const DropTarget = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType.ITEM,
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                height: '400px',
                width: '400px',
                border: '1px solid black',
                backgroundColor: isOver ? 'lightgreen' : 'white',
            }}
        >
            Drop items here
        </div>
    );
};

export default memo(DropTarget);
