import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [isNameValid, setNameValidity] = useState(false);
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState("");
  const [isDescriptionValid, setDescriptionValidity] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");

  const [isFormValid, setValidityForm] = useState(false)

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    const input = e.target;

    setName(input.value);
    setNameValidity(input.validity.valid);
            if (!isNameValid) {
              setNameError(input.validationMessage);
            } else {
              setNameError("");
            }
  }
  function handleChangeDescription(e) {
    const input = e.target;

    setDescription(input.value);
    setDescriptionValidity(input.validity.valid);
      if (!isDescriptionValid) {
          setDescriptionError(input.validationMessage);
      } else {
          setDescriptionError("");
      }
  }

  useEffect(() => {
    if ((isNameValid && isDescriptionValid)) {
      setValidityForm(true)
    } else {
      setValidityForm(false)
    }
  }, [isNameValid, isDescriptionValid])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-redaction"
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      formName="form-redaction"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        onChange={handleChangeName}
        type="text"
        name="name"
        value={name || ""}
        placeholder="ФИО"
        className={`popup__input popup__input_type_name ${!isNameValid ? 'popup__input_type_error' : ''}`}
        id="name-input"
        required
        minLength="2"
        maxLength="40"
      />
      <span className={`name-input-error ${!isNameValid ? 'popup__error' : ''}`}>{nameError}</span>

      <input
        onChange={handleChangeDescription}
        type="text"
        name="vocation"
        value={description || ""}
        placeholder="О себе"
        className={`popup__input popup__input_type_vocation ${!isDescriptionValid ? 'popup__input_type_error' : ''}`}
        id="vocation-input"
        required
        minLength="2"
        maxLength="200"
      />
      <span className={`vocation-input-error ${!isDescriptionValid ? 'popup__error' : ''}`}>{descriptionError}</span>
      
    </PopupWithForm>
  );
}

export default EditProfilePopup;
