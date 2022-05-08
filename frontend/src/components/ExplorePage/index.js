import './Explore.css';
import React from 'react';

import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';

export default function UserProfilePage({ isLoaded }) {
  //subscribe to redux photos state
  const photos = useSelector((state) => state.photos.allPhotos);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      <div className='explore-row-two'>
        <ul className='explore-row-two-inner'>
          <li className='explore-explore-link-container'>
            <NavLink
              to={`/explore`}
              className={(state) =>
                state ? 'explore-explore-link-active' : 'inactive'
              }
            >
              <span>Explore</span>
            </NavLink>
          </li>
          <li className='explore-trending'>
            <div>
              <span>Trending</span>
            </div>
          </li>
          <li className='explore-events'>
            <div>
              <span>Events</span>
            </div>
          </li>
        </ul>
      </div>

      <div className='explore-body-container'>
        <div className='explore-text'>Explore</div>

        <div className='explore-photo-list-container'>
          <ul className='explore-photo-list-inner-container'>
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
