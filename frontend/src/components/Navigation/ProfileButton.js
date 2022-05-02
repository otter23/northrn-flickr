import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  //dropdown click handler
  const openMenu = () => {
    //do nothing if menu already showed
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    //if showMenu is already closed, do nothing
    if (!showMenu) return;

    const closeMenu = ({ target }) => {
      //TO DO add active element conditional need to use ref on the menu here
      setShowMenu(false);
    };

    //add event listener to entire document
    //however should really actively check
    document.addEventListener('click', closeMenu);

    //cleanup function
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  //logout click handler
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>Welcome {user.username}</button>
      {showMenu && (
        <ul className='profile-dropdown'>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
