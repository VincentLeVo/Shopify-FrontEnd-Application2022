import React, {useState} from 'react';
import classes from './Photo.module.css';

const Photo = (props) => {
  const [isLiked, setLiked] = useState(false);

  const clickButtonHandler = () => {
    setLiked(!isLiked)
  }

  return (
    <li className={classes.photo}>
      <h2>{props.title}</h2>
      <h3>{props.date}</h3>
      <img alt={"Photo: " + props.title} src={props.url}></img>
      <button className={isLiked ? classes.isLiked : classes.notLiked } onClick={clickButtonHandler}>♥</button>
    </li>
  );
};

export default Photo;