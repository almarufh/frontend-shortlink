import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { MdLink } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import LoadingModal from '../../modal/LoadingModal';
import { authRegister, resetHistory } from '../../redux/slice/auth';

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState({
    password: false,
    confirm: false,
  });

  const toggleShow = (key) => {
    setShow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navigate = useNavigate();

  const passwordValue = watch('password');

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    dispatch(
      authRegister({
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
      console.log('first');
      dispatch(resetHistory());
      navigate('/auth/login');
    }
  }, [auth.isFulfilled]);

  return (
    <>
      <LoadingModal
        isOpen={auth?.isPending}
        message="Memproses pendaftaran..."
      />

      <div className="flex flex-col justify-center items-center p-4 text-dark">
        <div className="mb-6 px-2 bg-primary/2 text-primary rounded-2xl shadow-sm border border-primary/20 flex items-center justify-center">
          <MdLink />
        </div>

        <h1 className="text-2xl font-bold text-dark mb-1">Create Account</h1>
        <p className="text-sm text-dark-gray mb-8">
          Join the elite architects of the web.
        </p>

        <div className="w-full max-w-md bg-secondary rounded-2xl shadow-sm border border-black/5 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
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
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-dark mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  onInput={deletMessage}
                  id="password"
                  type={show.password ? 'text' : 'password'}
                  placeholder="• • • • • • • •"
                  className="w-full px-3.5 py-2.5 bg-black/2 border border-black/10 rounded-xl text-sm outline-none focus:bg-secondary focus:border-primary transition-all placeholder:text-dark-gray/60 pr-12"
                  {...register('password', {
                    required: 'Password wajib diisi',
                    minLength: {
                      value: 8,
                      message: 'Password minimal 8 karakter',
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => toggleShow('password')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-gray hover:text-dark text-xs font-medium"
                >
                  {show.password ? <LuEye /> : <LuEyeClosed />}
                </button>
              </div>
              {errors.password ? (
                <span className="text-xs text-red mt-1 block">
                  {errors.password.message}
                </span>
              ) : (
                <span className="text-[10px] font-semibold tracking-wider text-dark-gray/70 uppercase mt-1.5 block">
                  MINIMUM 8 CHARACTERS
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="block text-xs font-semibold text-dark mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  onInput={deletMessage}
                  id="confirm"
                  type={show.confirm ? 'text' : 'password'}
                  placeholder="• • • • • • • •"
                  className="w-full px-3.5 py-2.5 bg-black/2 border border-black/10 rounded-xl text-sm outline-none focus:bg-secondary focus:border-primary transition-all placeholder:text-dark-gray/60 pr-12"
                  {...register('confirm', {
                    required: 'Konfirmasi password wajib diisi',
                    validate: (value) =>
                      value === passwordValue || 'Password tidak cocok',
                  })}
                />
                <button
                  type="button"
                  onClick={() => toggleShow('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-gray hover:text-dark text-xs font-medium"
                >
                  {show.confirm ? <LuEye /> : <LuEyeClosed />}
                </button>
              </div>
              {errors.confirm && (
                <span className="text-xs text-red mt-1 block">
                  {errors.confirm.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-secondary font-medium py-2.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all text-sm mt-2 cursor-pointer"
            >
              Sign Up
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

          <p className="text-[11px] text-center text-dark-gray mt-6 leading-relaxed">
            By signing up, you agree to our{' '}
            <a
              href="#"
              className="text-primary hover:underline font-medium"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <p className="text-xs text-dark-gray mt-6">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-primary font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
