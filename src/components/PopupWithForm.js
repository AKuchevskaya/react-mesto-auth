import React, { useEffect } from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  formName,
  children,
  buttonText,
  isFormValid
}) {

  useEffect(() => {
    if (!isOpen) return;
    
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
  
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen]);

  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          name={formName}
          onSubmit={onSubmit}
          className={`popup__form  popup__${formName}`}
        >
          {children}
        <button type="submit" className={`popup__save ${(!isFormValid) ? 'popup__save_inactive' : ''}`}>
          {buttonText}
        </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
