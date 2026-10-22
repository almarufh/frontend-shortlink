import { useEffect, useState } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FaChartSimple, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import {
  IoCalendarNumber,
  IoFilterSharp,
  IoLink,
  IoSearch,
} from 'react-icons/io5';
import { MdContentCopy } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { delLinks, getMyLinks } from '../redux/slice/links';

export default function MyLinks() {
  const dispatch = useDispatch();

  const { links, isPending, isRejected, message } = useSelector(
    (state) => state.links || {}
  );

  const linksList = Array.isArray(links) ? links : links?.data || [];

  const [copiedUrl, setCopiedUrl] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getMyLinks());
  }, [dispatch]);

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedUrl(textToCopy);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    dispatch(delLinks(id));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch(getAllLinks({ search: searchQuery }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="mt-14 pb-12 bg-gray min-h-screen flex flex-col items-center px-4">
      <div className="flex flex-col w-full max-w-2xl">
        <header className="flex flex-col gap-6">
          <div className="flex justify-between items-end mt-10">
            <section className="flex text-left flex-col gap-1">
              <h1 className="text-2xl font-bold text-dark">My Links</h1>
              <p className="text-xs md:text-sm text-dark-gray">
                Manage and track your shortened digital assets.
              </p>
            </section>

            <section className="flex flex-col text-right gap-0.5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-dark-gray/70">
                TOTAL ACTIVE
              </h3>
              <p className="text-xl font-bold text-primary">
                {linksList.length}
              </p>
            </section>
          </div>

          <div>
            <form
              onSubmit={handleSearch}
              className="flex shadow-xs border border-black/5 rounded-xl bg-secondary h-12 overflow-hidden items-center"
            >
              <div className="w-11 h-full flex items-center justify-center text-dark-gray/60 text-lg">
                <IoSearch />
              </div>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or URL..."
                className="flex-1 h-full outline-none text-xs md:text-sm text-dark placeholder:text-dark-gray/50 bg-transparent pr-2"
                type="text"
                name="search"
                id="search"
              />
              <button
                type="submit"
                className="w-11 h-full flex items-center justify-center text-dark-gray/60 hover:text-dark transition-colors cursor-pointer"
              >
                <IoFilterSharp />
              </button>
            </form>
          </div>
        </header>

        <main className="flex flex-col gap-4 mt-8 w-full">
          {isPending && !deletingId ? (
            <div className="flex flex-col items-center justify-center w-full h-64 bg-secondary rounded-2xl border border-black/5 text-dark-gray">
              <CgSpinnerTwo className="animate-spin text-2xl text-primary" />
              <p className="text-xs font-medium mt-2">Loading links...</p>
            </div>
          ) : isRejected && !linksList.length ? (
            <div className="flex flex-col items-center justify-center w-full h-64 bg-secondary rounded-2xl border border-black/5 text-red-500">
              <p className="text-sm font-medium">
                {message || 'Gagal memuat data'}
              </p>
            </div>
          ) : linksList.length > 0 ? (
            linksList.map((item) => {
              const itemId = item.id || item._id;
              const shortUrl = item.shorted_url || item.short_url;
              const originalUrl = item.original_url || item.url;
              const createdAt = item.createdAt || item.created_at;

              return (
                <div
                  key={itemId}
                  className="flex items-center justify-between bg-secondary shadow-xs border border-black/5 rounded-2xl p-5 hover:border-black/10 transition-all gap-4"
                >
                  <div className="flex flex-col gap-1.5 text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2 font-semibold text-xs md:text-sm text-primary truncate">
                      <IoLink className="text-base" />
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline truncate"
                      >
                        {shortUrl}
                      </a>
                    </div>

                    <p className="text-xs text-dark-gray/80 truncate">
                      {originalUrl}
                    </p>

                    <div className="flex items-center gap-5 text-[11px] font-semibold text-dark-gray/60 mt-1">
                      <section className="flex gap-1.5 items-center">
                        <IoCalendarNumber className="text-xs" />
                        <span>{formatDate(createdAt)}</span>
                      </section>
                      <section className="flex gap-1.5 items-center">
                        <FaChartSimple className="text-xs text-primary" />
                        <span>{item.clicks || 0} CLICKS</span>
                      </section>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    {copiedUrl === shortUrl && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark text-secondary text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md animate-in fade-in duration-150">
                        COPIED
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCopy(shortUrl)}
                      className="p-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-all cursor-pointer"
                      title="Copy Short URL"
                    >
                      <MdContentCopy className="text-base" />
                    </button>

                    <button
                      type="button"
                      disabled={isPending && deletingId === itemId}
                      onClick={() => handleDelete(itemId)}
                      className="p-2.5 text-dark-gray/60 hover:text-red hover:bg-red/10 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                      title="Delete Link"
                    >
                      {isPending && deletingId === itemId ? (
                        <CgSpinnerTwo className="animate-spin text-base text-red" />
                      ) : (
                        <RiDeleteBin6Line className="text-base hover:text-red transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-64 bg-secondary rounded-2xl border border-black/5 text-dark-gray">
              <p className="text-sm font-medium">
                Links are <span className="font-bold text-dark">Empty</span>
              </p>
            </div>
          )}
        </main>

        <footer className="h-16 mt-6 flex justify-between items-center w-full text-xs font-medium text-dark-gray">
          <button className="flex items-center gap-1.5 hover:text-dark transition-colors cursor-pointer">
            <FaChevronLeft className="text-[10px]" />
            <span>Prev Page</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-dark transition-colors cursor-pointer">
            <span>Next Page</span>
            <FaChevronRight className="text-[10px]" />
          </button>
        </footer>
      </div>
    </div>
  );
}
