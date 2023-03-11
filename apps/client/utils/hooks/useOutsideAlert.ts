import { useEffect, useRef } from "react"

interface IUseHook {
  onClickOutside: () => void
}

const useHook = (props: IUseHook) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props?.onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { ref }
}

export default useHook;
