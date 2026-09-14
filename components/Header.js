function Header() {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const isActive = (path) => {
    return window.location.pathname.includes(path);
  };

  try {
    return (
      <header className="bg-white border-b border-slate-100 py-4" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('index.html')}>
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
              <div className="icon-qr-code text-white text-2xl"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">QR Pro</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Advanced Generator</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">© Created by Ahdan Mushad Zillal</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
                onClick={() => navigateTo('index.html')} 
                className={`text-sm font-semibold transition-colors ${!isActive('help.html') ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`}
            >
                Generator
            </button>
            <button 
                onClick={() => navigateTo('help.html')} 
                className={`text-sm font-semibold transition-colors ${isActive('help.html') ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`}
            >
                Bantuan
            </button>
          </nav>

          <button onClick={() => window.open('https://github.com/945-08/QR-generator', '_blank', 'noopener,noreferrer')} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all">
            Hubungkan API
          </button>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}