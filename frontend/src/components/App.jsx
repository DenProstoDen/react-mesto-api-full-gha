import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import { useCallback, useEffect, useState } from "react";
import api from '../utils/Api.js';
import CurrentUserContext from '../context/CurentUserContext.js';
import PopupAvatar from './PopupAvatar.jsx';
import PopupPlace from './PopupPlace.jsx';
import PopupProfile from './PopupProfile.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRouteElement from './Route.jsx';
import InfoTooltip from './Info.jsx';
import imgSuccess from '../images/good.svg';
import imgFail from '../images/bad.svg';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import * as sign from '../utils/Sign.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setAvataPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup ] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)
  const [currentUser, setCurrentUser] =useState({})
  const [cards, setCards] = useState([])
  const [deleteCard, setDeleteCard] = useState('');
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserMail] = useState("");

  const setStateCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsPlacePopupOpen(false)
    setAvataPopupOpen(false)
    setImagePopup(false)
    setDeletePopupOpen(false)
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
  },[])

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, [navigate])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      sign.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserMail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getName(), api.getCards()])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [loggedIn])

  const closePopupByEsc = useCallback ((evt) => {
    if (evt.key === 'Escape') {
      setStateCloseAllPopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  },[setStateCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setStateCloseAllPopups()
    document.removeEventListener('keydown', closePopupByEsc)
  },[setStateCloseAllPopups, closePopupByEsc])

  function setEventListenerForDocument() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerForDocument()
  }

  function handlePlaceClick() {
    setIsPlacePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleAvatarClick() {
    setAvataPopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
    setEventListenerForDocument()
  }

  function handleDelete(cardId) {
    setDeleteCard(cardId)
    setDeletePopupOpen(true)
    setEventListenerForDocument()
  }
  function handleSuccessPopupOpen() {
    setIsSuccessPopupOpen(true);
  }
  function handleFailPopupOpen() {
    setIsFailPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((e) => (e._id === card._id ? newCard : e))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(evt) {
    evt.preventDefault()
    api.deleteCard(deleteCard)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCard
        }))
        closeAllPopups()
      })
    .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
  }

  function handleUpdateUser(userData, reset) {
    api.editProfileInfo(userData)
      .then((res )=> {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
    .catch((error) => console.error(`Ошибка профиля ${error}`))
  }

  function handleUpdateAvatar(userData, reset) {
    api.setNewAvatar(userData)
      .then((res )=> {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
    .catch((error) => console.error(`Ошибка аватара ${error}`))
  }

  function handleAddPlaceSubmit(userData, reset) {
    api.addCard(userData)
      .then((newCard )=> {
        setCards([newCard, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка карточки ${error}`))
  }

  function handleSubmitLogin(password, email) {
    sign.login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        handleLogin();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        handleFailPopupOpen();
        console.log(err);
      })
  }

  function handleSubmitRegister(password, email) {
    sign.register(password, email)
      .then(() => {
        handleSuccessPopupOpen();
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        handleFailPopupOpen();
        console.log(err);
      })
  }

  return (
  <div className="page">
  <CurrentUserContext.Provider value={currentUser}>

      <Header userMail={userEmail} />
      
        <Routes>
          <Route path="/signup" element={
            <Register
              onSignUp={handleSubmitRegister}
            />}
          />
          <Route path="/signin" element={
            <Login
              onSignIn={handleSubmitLogin}
            />}
          />
          <Route path="/"
            element={<ProtectedRouteElement
              element={Main}
              onEditProfile = {handleProfileClick}
              onAddPlace ={handlePlaceClick}
              onEditAvatar = {handleAvatarClick}
              onCardClick = {handleCardClick}
              onDelete = {handleDelete}
              onCardLike={handleCardLike}
              cards={cards}
              loggedIn={loggedIn}
            />}
          />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>

      <Footer />

      <PopupProfile 
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupPlace 
      onAddPlace = {handleAddPlaceSubmit}
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      />
      
      <PopupAvatar 
       onUpdateAvatar={handleUpdateAvatar}
       isOpen = {isEditAvatarPopupOpen}
       onClose = {closeAllPopups}
      />

        <PopupWithForm 
          name='delete' 
          title='Вы уверены?'
          titleButton='Да'
          isOpen = {isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <ImagePopup 
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
        />
        <InfoTooltip
          name="infoTooltip"
          isOpen={isSuccessPopupOpen}
          src={imgSuccess}
          alt="Успех!"
          title="Вы успешно зарегистрировались!"
          onClose={closeAllPopups}
          reg={true}
        />
                <InfoTooltip
          name="infoTooltip"
          isOpen={isFailPopupOpen}
          src={imgFail}
          alt="Ошибка!"
          title="Что-то пошло не так! Попробуйте ещё раз."
          onClose={closeAllPopups}
          reg={false}
        />
    </CurrentUserContext.Provider>
  </div>
  )
}

export default App
