import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current.focus();
    },
    resetInput: () => {
      inputRef.current.value = "";
    }
  }));

  return <input ref={inputRef} type="text" {...props} />;
});

export default CustomInput;