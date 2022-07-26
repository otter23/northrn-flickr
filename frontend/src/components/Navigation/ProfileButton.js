import './ProfileButton.css';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import userIcon from '../../images/demoUser-icon-small.jpg';

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const menu = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  //dropdown click handler
  const openMenu = () => {
    //do nothing if menu already showed
    if (showMenu) return;
    //else update show menu state
    setShowMenu(true);
  };

  //Check status of menu
  useEffect(() => {
    //if menu already closed do nothing
    if (!showMenu) return;

    const closeMenu = ({ target }) => {
      //     setShowMenu(false);
      //could do something wih "activeElement instead
      if (target !== menu.current && !menu.current?.contains(target)) {
        setShowMenu((prev) => !prev);
      }
    };
    //add event listener to entire document
    document.addEventListener('click', closeMenu);

    //cleanup function
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  //logout click handler
  const logout = (e) => {
    e.preventDefault();
    //removes user from jwt cookie
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='nav-user-image-container' onClick={openMenu}>
        {/* <div class='material-symbols-outlined'>photo_camera</div> */}
        <div
          className={`nav-user-image default`}
          style={{ backgroundImage: `url(${userIcon})` }}
        >
          {showMenu && (
            <>
              <div className='nav-user-dropdown-arrow'></div>
              <div className='nav-user-dropdown-container' ref={menu}>
                {/* Top row */}
                <div className={`nav-user-message-list-item`}>
                  <div className={`nav-user-message-img default`}></div>
                  <div className={`nav-user-message-right`}>
                    <div className={`nav-user-message-displayName`}>
                      {`Welcome ${user?.username}!`}
                    </div>
                  </div>
                </div>
                {/* Middle row */}
                <div className='nav-user-dropdown-developed'>
                  <div className='nav-user-dropdown-developed-text'>
                    Developed by Elan Katz
                  </div>
                  <div className='nav-user-dropdown-developed-images'>
                    <a
                      className='nav-user-dropdown-github'
                      href='https://github.com/otter23'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {' '}
                    </a>
                    <a
                      className='nav-user-dropdown-github-fork'
                      href='https://github.com/otter23/slackluster'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {' '}
                    </a>
                    <a
                      className='nav-user-dropdown-linkedIn'
                      href='https://www.linkedin.com/in/elankatz/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {' '}
                    </a>
                    <a
                      className='nav-user-dropdown-angellist'
                      href='https://angel.co/u/elankatz'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {' '}
                    </a>
                  </div>
                </div>

                <div className='nav-user-logout'>
                  <button className='nav-user-logout-btn' onClick={logout}>
                    <div className='nav-user-logout-btn-text'>Log out</div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </button>
    </>
  );
}

export default ProfileButton;
