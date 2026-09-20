function QRControls({ options, setOptions }) {
  const [activeTab, setActiveTab] = React.useState('content');

  const updateOption = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        window.alert('Pilih file gambar yang valid.');
        return;
      }
      if (file.size > 1024 * 1024) {
        window.alert('Ukuran logo maksimal 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        updateOption('logo', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const types = [
    { id: 'url', label: 'URL', icon: 'icon-link' },
    { id: 'text', label: 'Teks', icon: 'icon-file-text' },
    { id: 'email', label: 'Email', icon: 'icon-mail' },
    { id: 'wifi', label: 'WiFi', icon: 'icon-wifi' },
    { id: 'vcard', label: 'VCard', icon: 'icon-user' }
  ];

  try {
    return (
      <div className="space-y-6" data-name="qr-controls" data-file="components/QRControls.js">
        <div className="card">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
            <button
              onClick={() => setActiveTab('content')}
              className={`tab-btn ${activeTab === 'content' ? 'tab-btn-active' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <div className="icon-pencil text-lg"></div>
              Konten
            </button>
            <button 
              onClick={() => setActiveTab('design')}
              className={`tab-btn ${activeTab === 'design' ? 'tab-btn-active' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <div className="icon-palette text-lg"></div>
              Desain
            </button>
            <button 
              onClick={() => setActiveTab('frame')}
              className={`tab-btn ${activeTab === 'frame' ? 'tab-btn-active' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <div className="icon-square text-lg"></div>
              Frame
            </button>
            <button
              onClick={() => setActiveTab('logo')}
              className={`tab-btn ${activeTab === 'logo' ? 'tab-btn-active' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <div className="icon-image text-lg"></div>
              Logo
            </button>
          </div>

          {activeTab === 'content' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {types.map(t => (
                  <button
                    key={t.id}
                    onClick={() => updateOption('type', t.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    options.type === t.id 
                    ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm' 
                    : 'border-slate-200 text-slate-500 hover:border-teal-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`${t.icon} text-xl`}></div>
                    <span className="text-xs font-bold">{t.label}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {options.type === 'url' ? 'Masukkan URL' : 'Masukkan Konten'}
                </label>
                <textarea
                  value={options.value}
                  onChange={(e) => updateOption('value', e.target.value)}
                  className="input-field min-h-[120px]"
                  placeholder={options.type === 'url' ? 'https://example.com' : options.type === 'email' ? 'nama@contoh.com' : options.type === 'wifi' ? 'WIFI:T:WPA;S:NamaWiFi;P:KataSandi;;' : options.type === 'vcard' ? 'BEGIN:VCARD\nVERSION:3.0\nFN:Nama\nEND:VCARD' : 'Ketik di sini...'}
                />
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Warna QR</label>
                <div className="flex gap-3 items-center">
                  <input 
                    type="color" 
                    value={options.color}
                    onChange={(e) => updateOption('color', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-none p-0"
                  />
                  <input 
                    type="text" 
                    value={options.color}
                    onChange={(e) => updateOption('color', e.target.value)}
                    className="input-field text-center font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Warna Latar</label>
                <div className="flex gap-3 items-center">
                  <input 
                    type="color" 
                    value={options.bgColor}
                    onChange={(e) => updateOption('bgColor', e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-none p-0"
                  />
                  <input 
                    type="text" 
                    value={options.bgColor}
                    onChange={(e) => updateOption('bgColor', e.target.value)}
                    className="input-field text-center font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tingkat Koreksi Error</label>
                <select 
                  value={options.errorCorrectionLevel}
                  onChange={(e) => updateOption('errorCorrectionLevel', e.target.value)}
                  className="input-field"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%) - Rekomendasi untuk Logo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Margin</label>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={options.margin}
                  onChange={(e) => updateOption('margin', parseInt(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Rapat</span>
                  <span>Lebar</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Bentuk QR</label>
                <select
                  value={options.qrShape}
                  onChange={(e) => updateOption('qrShape', e.target.value)}
                  className="input-field"
                >
                  <option value="square">Kotak</option>
                  <option value="circle">Lingkaran</option>
                  <option value="heart">Love</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>

            </div>
          )}

          {activeTab === 'frame' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between gap-4 mb-3">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">ADD FRAME</label>
                <button
                  type="button"
                  onClick={() => updateOption('frameEnabled', !options.frameEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${options.frameEnabled ? 'bg-teal-600' : 'bg-slate-200'}`}
                  aria-label="Toggle frame"
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ${options.frameEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>

              {options.frameEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Posisi Frame</label>
                    <select
                      value={options.framePosition}
                      onChange={(e) => updateOption('framePosition', e.target.value)}
                      className="input-field"
                    >
                      <option value="top">Di Atas QR</option>
                      <option value="bottom">Di Bawah QR</option>
                      <option value="around">Mengelilingi QR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Gaya Frame</label>
                    <select
                      value={options.frameStyle}
                      onChange={(e) => updateOption('frameStyle', e.target.value)}
                      className="input-field"
                    >
                      <option value="classic">Classic</option>
                      <option value="rounded">Rounded</option>
                      <option value="double">Double Border</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tulisan Frame</label>
                    <input
                      type="text"
                      value={options.frameText}
                      onChange={(e) => updateOption('frameText', e.target.value)}
                      className="input-field"
                      placeholder="Scan Me"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Font Tulisan</label>
                    <select
                      value={options.frameFont}
                      onChange={(e) => updateOption('frameFont', e.target.value)}
                      className="input-field"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Tahoma">Tahoma</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Impact">Impact</option>
                      <option value="Trebuchet MS">Trebuchet MS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Warna Frame</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={options.frameColor}
                        onChange={(e) => updateOption('frameColor', e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-none p-0"
                      />
                      <input
                        type="text"
                        value={options.frameColor}
                        onChange={(e) => updateOption('frameColor', e.target.value)}
                        className="input-field text-center font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Warna Teks</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={options.frameTextColor}
                        onChange={(e) => updateOption('frameTextColor', e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-none p-0"
                      />
                      <input
                        type="text"
                        value={options.frameTextColor}
                        onChange={(e) => updateOption('frameTextColor', e.target.value)}
                        className="input-field text-center font-mono"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Padding Frame ({options.framePadding}px)</label>
                    <input
                      type="range"
                      min="20"
                      max="120"
                      value={options.framePadding}
                      onChange={(e) => updateOption('framePadding', parseInt(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'logo' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div 
                className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => document.getElementById('logo-upload').click()}
              >
                <input 
                  id="logo-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                {options.logo ? (
                  <div className="relative group">
                    <img src={options.logo} className="h-20 w-20 object-contain rounded-lg shadow-md" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateOption('logo', null); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <div className="icon-x text-xs"></div>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="icon-cloud-upload text-slate-400 text-4xl mb-3"></div>
                    <p className="text-slate-600 font-medium">Klik untuk unggah logo</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, SVG (Maks. 1MB)</p>
                  </>
                )}
              </div>

              {options.logo && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Ukuran Logo ({options.logoWidth}px)</label>
                    <input 
                      type="range" 
                      min="20" 
                      max="150" 
                      value={options.logoWidth}
                      onChange={(e) => {
                        updateOption('logoWidth', parseInt(e.target.value));
                        updateOption('logoHeight', parseInt(e.target.value));
                      }}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <div className="bg-teal-50 p-4 rounded-xl flex items-center gap-3">
                    <div className="icon-info text-teal-500 text-xl"></div>
                    <p className="text-xs text-teal-700 leading-tight">
                      Logo akan diletakkan di tengah QR. Pastikan tingkat koreksi Error diatur ke "High".
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('QRControls component error:', error);
    return null;
  }
}