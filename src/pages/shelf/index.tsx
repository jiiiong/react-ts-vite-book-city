import React, { useState } from 'react';
import { ShelfHeader } from './components/header';

const Shelf:React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    return (
      <div
        className='
          h-screen flex flex-col
        '
      >
        {/** nav */}
        <div className="flex-initial">
          <ShelfHeader
            isEditing={isEditing}
            onEditClick={() => setIsEditing(!isEditing)}
          />
        </div>
        {/** content */}
        <div
          className='
          flex-1
          overflow-y-auto
          '
        >
          <div className="h-[990px]"></div>
        </div>
      </div>
    );
}

export default Shelf;
