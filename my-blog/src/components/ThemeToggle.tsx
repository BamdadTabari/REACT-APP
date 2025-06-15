import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️ حالت روشن' : '🌙 حالت تیره'}
      </button>
      {isAuthenticated && (
        <button style={{ marginLeft: '0.5rem' }} onClick={logout}>
          خروج
        </button>
      )}
    </div>
  );
}

export default ThemeToggle;

