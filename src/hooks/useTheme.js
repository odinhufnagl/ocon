import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
