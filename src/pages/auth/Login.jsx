import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import LoadingModal from '../../modal/LoadingModal';
import { authLogin, resetHistory } from '../../redux/slice/auth';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(
      authLogin({
        email: data.email,
        password: data.password,
      })
    );
  };

  const deletMessage = () => {
    if (auth.isRejected) {
      dispatch(resetHistory());
    }
  };

  useEffect(() => {
    if (auth.isFulfilled) {
      dispatch(resetHistory());
      navigate('/home');
    }
  }, [auth.isFulfilled, navigate, dispatch]);

  return (
    <>
      <LoadingModal
        isOpen={auth?.isPending}
        message="Memproses masuk..."
      />

      <div className="flex w-full flex-col justify-center items-center p-4 text-dark">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-dark">
            ShortLink
          </span>
        </div>

        <div className="w-full max-w-md bg-secondary rounded-2xl shadow-sm border border-black/5 p-8">
          <h1 className="text-xl font-bold text-dark mb-1">Welcome Back</h1>
          <p className="text-xs text-dark-gray mb-6">
            Please enter your details to sign in.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-dark mb-2"
              >
                Email Address
              </label>
              <input
                onInput={deletMessage}
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 bg-black/2 border border-black/10 rounded-xl text-sm outline-none focus:bg-secondary focus:border-primary transition-all placeholder:text-dark-gray/60"
                {...register('email', {
                  required: 'Email wajib diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Format email tidak valid',
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-red mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-dark"
                >
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  onInput={deletMessage}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="• • • • • • • •"
                  className="w-full px-3.5 py-2.5 bg-black/2 border border-black/10 rounded-xl text-sm outline-none focus:bg-secondary focus:border-primary transition-all placeholder:text-dark-gray/60 pr-12"
                  {...register('password', {
                    required: 'Password wajib diisi',
                  })}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-gray hover:text-dark text-xs font-medium"
                >
                  {showPassword ? <LuEye /> : <LuEyeClosed />}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-red mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-secondary font-medium py-2.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all text-sm mt-2 cursor-pointer"
            >
              Log In
              <FaArrowRight />
            </button>

            <div className="flex items-center justify-center">
              {auth.isRejected && (
                <span className="text-xs text-red mt-1 block">
                  {auth.message}
                </span>
              )}
              {auth.isFulfilled && (
                <span className="text-xs text-green mt-1 block">
                  {auth.message}
                </span>
              )}
            </div>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/5"></div>
            </div>
            <span className="relative bg-secondary px-3 text-[10px] uppercase font-bold tracking-wider text-dark-gray/60">
              OR CONTINUE WITH
            </span>
          </div>

          <button
            type="button"
            className="w-full border border-black/10 bg-secondary hover:bg-black/2 text-dark text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FcGoogle className="text-base" />
            Sign in with Google
          </button>
        </div>

        <p className="text-xs text-dark-gray mt-6">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
