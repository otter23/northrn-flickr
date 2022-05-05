import './Splash.css';

import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import Navigation from '../Navigation';
import Footer from '../Footer';

import flickerImage from '../../images/splash-bg-alt.jpg';

export default function SplashPage({ isLoaded }) {
  // const sessionUser = useSelector((state) => state.session.user);

  //setup a setInterval to move through photos to mimic splash page
  // const [bgImage, setBgImage] = useState(flickerImage);
  // setBgImage(flickerImage); //create function and update later

  return (
    <>
      <Navigation />
      <div
        className='splash-background'
        style={{ backgroundImage: `url(${flickerImage})` }}
      >
        <div className='splash-body-container'>
          <h1 className='splash-find-inspiration'> Find your inspiration.</h1>
          <h2>
            Join the Northrn Flickr community, home to tens of billions of
            photos and 2 million groups
          </h2>
          <Link to='/sign-up' className='splash-start-for-free'>
            Start for free
          </Link>
        </div>

        <div className='splash-photo-meta-container'>
          <div className='splash-photo-title'>
            <a href='https://www.flickr.com/photos/137364640@N08/51103074015/'>
              Northern Flicker
            </a>
          </div>
          <div className='splash-photo-username'>
            <a href='https://www.flickr.com/photos/137364640@N08/51103074015/'>
              by Steve Jones
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
