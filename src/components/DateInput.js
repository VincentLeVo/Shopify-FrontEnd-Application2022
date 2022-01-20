import React, {useRef} from 'react';
import classes from './DateInput.module.css'

const DateInput = (props) => {
const dateRef = useRef('')

function submitHandler(event) {
    event.preventDefault();

    const transformedDate = dateRef.current.value;
    console.log(transformedDate);
    props.onFetchCustomPhoto(transformedDate);
}


  return <>
  <form className={classes.form} onSubmit={submitHandler}>
      <input type='date' id='date' ref={dateRef} />
      <button>Fetch Custom Photo</button> 
  </form>
  
  </>;
};

export default DateInput;
