function LoadingModal({ isOpen, message = 'Loading...' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity">
      <div className="bg-secondary p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 max-w-xs w-full mx-4 border border-black/5 animate-in fade-in zoom-in duration-200">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

        <p className="text-sm font-medium text-dark text-center">{message}</p>
      </div>
    </div>
  );
}

export default LoadingModal;
