import React, { memo } from 'react';
import { useDrag } from 'react-dnd';

const ItemType = {
  ITEM: 'item',
};

const DraggableItem = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.ITEM,
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {name}
    </div>
  );
};

export default memo(DraggableItem);
