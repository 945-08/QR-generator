function QRDisplay({ qrUrl, options, onDownload, onShare, onPrint, error }) {
  try {
    return (
      <div className="card text-center" data-name="qr-display" data-file="components/QRDisplay.js">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Pratinjau QR Code</h3>
        
        <div className="relative inline-block p-8 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
          <div className="bg-white p-2 rounded-lg shadow-inner">
            {qrUrl ? <img
              src={qrUrl}
              alt="Generated QR Code" 
              className="w-[280px] h-[280px] mx-auto transition-all duration-500 hover:scale-105"
            /> : <div className="w-[280px] h-[280px] flex items-center justify-center text-sm text-red-600">Menunggu konten valid</div>}
          </div>
          
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
            <div className="icon-check text-xl"></div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onDownload}
            className="btn-primary w-full group relative overflow-hidden"
          >
            <div className="icon-download text-xl group-hover:translate-y-0.5 transition-transform"></div>
            <span>Unduh PNG</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity"></div>
          </button>
          
          <div className="flex gap-3">
            <button onClick={onShare} disabled={!qrUrl} className="flex-1 py-3 px-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
              <div className="icon-share-2 text-lg"></div>
              Bagikan
            </button>
            <button onClick={onPrint} disabled={!qrUrl} className="flex-1 py-3 px-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
              <div className="icon-printer text-lg"></div>
              Cetak
            </button>
          </div>
        </div>

        {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
          <div className="text-left">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Ukuran</p>
            <p className="text-sm font-bold text-slate-700">1024 x 1024 px</p>
          </div>
          <div className="text-left">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Format</p>
            <p className="text-sm font-bold text-slate-700">High Quality PNG</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('QRDisplay component error:', error);
    return null;
  }
}