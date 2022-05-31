import { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import Header from "./Header";
import * as Auth from "../utils/Auth.js";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData]= useState({email:""});
  const history = useHistory();

  useEffect(() => {
    Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      api.getInitialCards(),
      api.getProfile(),
    ])
      .then(([cards, currentUser]) => {
        setCards(cards);
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpened: true,
      name: card.name,
      link: card.link,
    });
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }
  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpened: false });
  }

  function handleLogin({ email, password }){
    return Auth.authorize(email, password)
    .then((data) => {
      if(data.token) {
        localStorage.setItem('token', data.token)
        
        tokenCheck()
      }
    })
  }

  function handleRegister({ email, password }){
    return Auth.register(email, password)
    .then((res) => {
      console.log(res)
      //const { email } = 
      //if(data.token) {
        //localStorage.setItem('token', data.token)
        //setLoggedIn(true)

        history.push("/signin")
     // }
    })
    
  }

  function tokenCheck() {
    if(localStorage.getItem('jwt')) {
      let token = localStorage.getItem('jwt');
      Auth.getContent(token)
      .then((res) => {
        if (res) {
          let userData = {
            email: res.email
          }
          setLoggedIn(true)
          setUserData(userData)
        }
      })
    }
  }
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData({email: ""});
    history.push("/signin");
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push("/")
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header 
        loggedIn={loggedIn}
        userData={userData}  
        signOut={signOut} />
        <Switch>
          <ProtectedRoute 
          exact path="/"
          loggedIn={loggedIn}
          >
            <Main 
            cards={cards}
            onCardClick={handleCardClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}/>
            <Footer />
          </ProtectedRoute>
          
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="question"
          onClose={closeAllPopups}
          title="Вы уверены?"
          formName="form-question"
          buttonText="Да"
        />

        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
