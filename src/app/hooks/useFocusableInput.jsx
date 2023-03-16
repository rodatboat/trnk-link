import { useRef, useEffect } from "react";

/**
 * Use to focus a (focusable) component that is not visible on render
 * See https://stackoverflow.com/questions/40132775/autofocus-textfield-using-react-material-ui
 */
export function useFocusableInput(shouldFocus) {
    const inputRef = useRef(null);
    const setInputRef = (instance) => {
        inputRef.current = instance;
    };

    useEffect(() => {
      let timeout;
      if (shouldFocus) {
        timeout = setTimeout(() => {
          // @ts-ignore
          inputRef.current.focus();
        });
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }, [shouldFocus]);

    return {
      setInputRef,
    };
  }