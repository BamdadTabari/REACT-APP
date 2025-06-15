import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ حالت روشن' : '🌙 حالت تیره'}
    </button>
  );
}

export default ThemeToggle;
