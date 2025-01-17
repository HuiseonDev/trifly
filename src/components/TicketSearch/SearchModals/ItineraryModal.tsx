import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const ItineraryModal = ({
  children,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (isOpen && isMobile) {
      document
        .querySelector("html")!
        .setAttribute("style", "overflow: hidden;");
    } else {
      document.querySelector("html")!.removeAttribute("style");
    }

    return () => {
      document.querySelector("html")!.removeAttribute("style");
    };
  }, [isOpen, isMobile]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      // 클릭한 영역이 모달 내부가 아니면 모달 닫기
      handleClose(false);
      setIsOpen(false);
      document.querySelector("html")!.removeAttribute("style");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // 정리
    };
  }, [isOpen]);

  return <div ref={modalRef}>{children}</div>;
};

export default ItineraryModal;
