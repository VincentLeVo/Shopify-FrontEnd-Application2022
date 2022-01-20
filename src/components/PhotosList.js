import React from 'react';

import Photo from './Photo';
import classes from './PhotosList.module.css';

const PhotosList = (props) => {
  return (
    <ul className={classes['photos-list']}>
      {props.photos.map((photo) => (
        <Photo
          key={photo.id}
          date={photo.date}
          title={photo.title}
          url={photo.url}
        />
      ))}
    </ul>
  );
};

export default PhotosList;
