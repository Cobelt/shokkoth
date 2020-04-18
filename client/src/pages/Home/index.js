import React from 'react'
import { Link } from 'react-router-dom'

import { HOME_IMG_URI } from '../../constants/URIs'

import './stylesheet.styl'

const Home = () => {
  return (
    <div className="homepage bg-dark-grey relative height-100vh overflow-hidden">
        <Link to="/stuffs/new" className="choice one absolute left-0 min-width-100 height-100 flex justify-flex-start align-items-center z-index-5 " style={{ backgroundImage: `url(${HOME_IMG_URI}/toCreateStuff.jpg)` }}>
            <span className="text-white bold ml-10vw max-width-40" style={{ fontSize: 64 }}>Créer un stuff</span>
        </Link>
        <Link to="/my/stuffs" className="choice two absolute right-0 min-width-100 height-100 flex justify-flex-end align-items-center" style={{ backgroundImage: `url(${HOME_IMG_URI}/toLogin.jpg)` }}>
            <span className="text-white bold mr-10vw max-width-40" style={{ fontSize: 64 }}>Voir mes stuffs</span>
        </Link>
    </div>
  )
}

export default Home
