import './SearchPage.css';
import React from 'react';

import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';

export default function SearchPage({ isLoaded }) {
  //subscribe to redux photos state
  const photos = useSelector((state) => state.photos.allPhotos);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      <div className='search-row-two'>
        <ul className='search-row-two-inner'>
          <li className='search-search-link-container'>
            <NavLink
              to={`/search`}
              className={(state) =>
                state ? 'search-search-link-active' : 'inactive'
              }
            >
              <span>Photos</span>
            </NavLink>
          </li>
          <li className='search-trending'>
            <div>
              <span>People</span>
            </div>
          </li>
          <li className='search-events'>
            <div>
              <span>Groups</span>
            </div>
          </li>
        </ul>
      </div>

      <div className='search-body-container'>
        <div className='search-text'>Everyone's photos</div>

        <div className='search-photo-list-container'>
          <ul className='search-photo-list-inner-container'>
            {photos &&
              photos?.map((image) => {
                return (
                  <li key={image?.id}>
                    <Link to={`/photos/${image?.userId}/${image?.id}`}>
                      <img src={image?.imageUrl} alt='bird(s)'></img>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}
