import { useForm } from 'react-hook-form';
import { FaBolt, FaCheckCircle, FaLink, FaPen, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { createShortURL } from '../redux/slice/links';

function LandingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: '',
    },
  });

  const dispatch = useDispatch();
  const links = useSelector((state) => state.links);

  const onSubmit = (data) => {
    console.log('Shortening URL:', data.url);
    dispatch(
      createShortURL({
        original_url: data.url,
      })
    );
  };

  return (
    <div className="min-h-screen bg-secondary text-dark font-sans">
      <section className="bg-dark text-secondary pt-24 pb-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Shorten URLs. <span className="text-primary">Share Easily.</span>
          </h1>

          <p className="text-dark-gray/80 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            Create short, memorable links for your team communications.
            Transform long, cumbersome URLs into powerful digital assets that
            drive engagement.
          </p>

          <div className="flex items-center gap-4 mb-14">
            <Link
              to="/auth/register"
              className="bg-primary hover:opacity-90 text-secondary font-medium px-6 py-2.5 rounded-xl text-sm transition-all shadow-sm"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="border border-white/20 hover:border-white/40 text-secondary font-medium px-6 py-2.5 rounded-xl text-sm transition-all"
            >
              Learn More
            </a>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl bg-secondary rounded-2xl p-2 md:p-3 shadow-2xl flex flex-col border border-white/10"
          >
            <div className="w-full flex items-center gap-2">
              <div className="pl-3 text-dark-gray/60">
                <FaLink className="text-base" />
              </div>
              <input
                type="text"
                placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                {...register('url', {
                  required: 'URL wajib diisi',
                  pattern: {
                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i,
                    message: 'Format URL tidak valid',
                  },
                })}
                className="flex-1 bg-transparent text-dark text-xs md:text-sm outline-none px-2 placeholder:text-dark-gray/50"
              />
              <button
                type="submit"
                className="bg-primary hover:opacity-90 text-secondary font-medium px-6 py-2.5 rounded-xl text-xs md:text-sm transition-all cursor-pointer flex-shrink-0"
              >
                Shorten
              </button>
            </div>

            {errors.url && (
              <span className="text-xs text-red-500 pl-3 pt-1.5 text-left font-medium">
                {errors.url.message}
              </span>
            )}
          </form>
        </div>
      </section>

      <section
        id="features"
        className="py-20 bg-gray/30 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-primary block mb-2">
              ARCHITECTURAL FEATURES
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-dark">
              Built for Enterprise Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary p-8 rounded-2xl shadow-xs border border-black/5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-6 text-sm">
                <FaBolt />
              </div>
              <h3 className="text-base font-bold text-dark mb-2">
                Easy Create
              </h3>
              <p className="text-xs text-dark-gray leading-relaxed mb-6">
                Instantly generate high-performance short links with a single
                click or through our surgical API endpoints.
              </p>
              <div className="w-8 h-1 bg-primary/20 rounded-full" />
            </div>

            <div className="bg-secondary p-8 rounded-2xl shadow-xs border border-black/5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 text-sm">
                <FaPen />
              </div>
              <h3 className="text-base font-bold text-dark mb-2">
                Custom Slugs
              </h3>
              <p className="text-xs text-dark-gray leading-relaxed mb-6">
                Maintain brand authority with readable, custom link endings that
                resonate with your digital audience.
              </p>
              <div className="w-8 h-1 bg-indigo-200 rounded-full" />
            </div>

            <div className="bg-secondary p-8 rounded-2xl shadow-xs border border-black/5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 text-sm">
                <FaUsers />
              </div>
              <h3 className="text-base font-bold text-dark mb-2">Team Ready</h3>
              <p className="text-xs text-dark-gray leading-relaxed mb-6">
                Collaborate across departments with shared workspaces,
                permissions, and unified analytics dashboards.
              </p>
              <div className="w-8 h-1 bg-orange-200 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/5">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
              alt="Analytics Dashboard"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-dark-gray/70 block">
              DATA DRIVEN INSIGHTS
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold text-dark leading-tight">
              Observe your link architecture in real-time.
            </h2>

            <p className="text-xs md:text-sm text-dark-gray leading-relaxed">
              Every click is a data point. Our dashboard provides surgical
              precision into where your traffic originates, who is engaging, and
              how your team communications are performing across the globe.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-dark">
                <FaCheckCircle className="text-primary text-base" />
                <span>Geographic Distribution Maps</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-dark">
                <FaCheckCircle className="text-primary text-base" />
                <span>Device & Browser Breakdown</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-dark">
                <FaCheckCircle className="text-primary text-base" />
                <span>UTM Parameter Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
