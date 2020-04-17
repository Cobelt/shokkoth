import { useState, useEffect } from 'react';
import * as cookies from '../utils/cookies';
import { DARK_MODE } from '../constants/cookies';

export const useDarkMode = () => {
  const root = document.getElementById('root')
  const [darkMode, setDarkMode] = useState(cookies.get('DARK_MODE'));

  useEffect(() => {
    if ([true, false].includes(darkMode)) {
      cookies.set(DARK_MODE, darkMode);
      root.classList.toggle('dark-mode', darkMode);
    }

  }, [darkMode])

  return [darkMode, () => setDarkMode(!darkMode)];
}
