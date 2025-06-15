import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginInput {
  username: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  const onSubmit = (data: LoginInput) => {
    if (login(data.username, data.password)) {
      navigate(from, { replace: true });
    } else {
      alert('نام کاربری یا گذرواژه اشتباه است');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <h1>ورود</h1>
      <input
        {...register('username', { required: 'نام کاربری الزامی است' })}
        placeholder="نام کاربری"
      />
      {errors.username && (
        <p style={{ color: 'red' }}>{errors.username.message}</p>
      )}
      <input
        type="password"
        {...register('password', { required: 'گذرواژه الزامی است' })}
        placeholder="گذرواژه"
      />
      {errors.password && (
        <p style={{ color: 'red' }}>{errors.password.message}</p>
      )}
      <button type="submit">ورود</button>
    </form>
  );
}

export default LoginPage;

