import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

export default function InputControl(inprops) {
  
    let {type, inputRef, width, onWheel, ...props} = inprops;

    const style = width&&{
      width
    }

    const divRef = useRef()

    useEffect(() => {
      if (onWheel && divRef.current) {
        divRef.current.addEventListener('wheel', e => e.preventDefault(), {passive:false})
      }
    }, [divRef.current])

    return <div className={type} ref={divRef}>
      <input type='text' ref={inputRef} {...props} spellCheck='false' style={style} onWheel={onWheel}/>
    </div>;

}

InputControl.propTypes = {
  type: PropTypes.oneOf(['number', 'text']),
};

InputControl.defaultProps = {
  type: 'text'
};