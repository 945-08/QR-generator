const FALLBACK_TEMPLATES = [
  {
    name: 'Ocean Blue',
    color: '#0f172a',
    bgColor: '#ecfeff',
    margin: 2,
    errorCorrectionLevel: 'H',
    description: 'Tampilan premium untuk profil bisnis atau link utama.'
  },
  {
    name: 'Emerald Glow',
    color: '#065f46',
    bgColor: '#ecfdf5',
    margin: 3,
    errorCorrectionLevel: 'H',
    description: 'Warna segar dan modern untuk promo digital.'
  },
  {
    name: 'Sunset Pop',
    color: '#7c2d12',
    bgColor: '#fff7ed',
    margin: 2,
    errorCorrectionLevel: 'Q',
    description: 'Kontras hangat untuk kebutuhan event dan brand.'
  },
  {
    name: 'Violet Luxe',
    color: '#4c1d95',
    bgColor: '#f5f3ff',
    margin: 3,
    errorCorrectionLevel: 'H',
    description: 'Aksen premium dan elegan untuk keperluan formal.'
  },
  {
    name: 'Monochrome',
    color: '#111827',
    bgColor: '#f8fafc',
    margin: 1,
    errorCorrectionLevel: 'M',
    description: 'Desain minimal yang cocok untuk dokumen dan identitas.'
  },
  {
    name: 'Forest Calm',
    color: '#14532d',
    bgColor: '#f0fdf4',
    margin: 2,
    errorCorrectionLevel: 'H',
    description: 'Nuansa alami yang bersih untuk brand ramah lingkungan.'
  },
  {
    name: 'Love Blush',
    color: '#db2777',
    bgColor: '#fff1f2',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'heart',
    description: 'QR berbentuk love dengan warna pink untuk undangan atau hadiah.'
  },
  {
    name: 'Circle Candy',
    color: '#be123c',
    bgColor: '#fff7ed',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'circle',
    description: 'QR bulat dengan warna cerah untuk promosi dan media sosial.'
  },
  {
    name: 'Love Scan Me',
    color: '#9d174d',
    bgColor: '#fdf2f8',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'heart',
    frameEnabled: true,
    framePosition: 'bottom',
    frameStyle: 'rounded',
    frameColor: '#9d174d',
    frameText: 'Scan Me',
    frameTextColor: '#ffffff',
    frameFont: 'Trebuchet MS',
    framePadding: 48,
    description: 'Bentuk love pink lengkap dengan frame dan tulisan Scan Me.'
  },
  {
    name: 'Frame Top',
    color: '#1d4ed8',
    bgColor: '#eff6ff',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'square',
    frameEnabled: true,
    framePosition: 'top',
    frameStyle: 'double',
    frameColor: '#1d4ed8',
    frameText: 'Scan Here',
    frameTextColor: '#ffffff',
    frameFont: 'Arial',
    framePadding: 48,
    description: 'QR kotak dengan frame atas dan tulisan yang mudah diganti.'
  },
  {
    name: 'Rose Heart',
    color: '#be185d',
    bgColor: '#fff1f2',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'heart',
    description: 'Love merah rose dengan kontras lembut untuk momen spesial.'
  },
  {
    name: 'Ocean Circle',
    color: '#0369a1',
    bgColor: '#e0f2fe',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'circle',
    description: 'Bentuk lingkaran biru yang bersih untuk profil dan bisnis.'
  },
  {
    name: 'Mint Scan',
    color: '#047857',
    bgColor: '#ecfdf5',
    margin: 3,
    errorCorrectionLevel: 'H',
    qrShape: 'circle',
    frameEnabled: true,
    framePosition: 'bottom',
    frameStyle: 'rounded',
    frameColor: '#047857',
    frameText: 'Scan Now',
    frameTextColor: '#ffffff',
    frameFont: 'Verdana',
    framePadding: 48,
    description: 'QR lingkaran hijau mint dengan frame bawah yang modern.'
  },
  {
    name: 'Midnight Frame',
    color: '#1e293b',
    bgColor: '#f1f5f9',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'square',
    frameEnabled: true,
    framePosition: 'around',
    frameStyle: 'double',
    frameColor: '#1e293b',
    frameText: 'Open Link',
    frameTextColor: '#ffffff',
    frameFont: 'Georgia',
    framePadding: 56,
    description: 'Frame double yang elegan untuk link bisnis dan dokumen.'
  },
  {
    name: 'WhatsApp Contact',
    color: '#128c7e',
    bgColor: '#f0fdf4',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'whatsapp',
    frameEnabled: true,
    framePosition: 'bottom',
    frameStyle: 'rounded',
    frameColor: '#128c7e',
    frameText: 'Chat WhatsApp',
    frameTextColor: '#ffffff',
    frameFont: 'Arial',
    framePadding: 36,
    templateCategory: 'WhatsApp',
    templateType: 'url',
    templateValue: 'https://wa.me/6281234567890',
    description: 'Template hijau WhatsApp untuk nomor dan link chat langsung.'
  },
  {
    name: 'Instagram Profile',
    color: '#c13584',
    bgColor: '#fff1f8',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'instagram',
    frameEnabled: true,
    framePosition: 'bottom',
    frameStyle: 'rounded',
    frameColor: '#c13584',
    frameText: 'Follow Instagram',
    frameTextColor: '#ffffff',
    frameFont: 'Trebuchet MS',
    framePadding: 36,
    templateCategory: 'Instagram',
    templateType: 'url',
    templateValue: 'https://instagram.com/username',
    description: 'Template pink berbentuk love untuk profil Instagram.'
  },
  {
    name: 'Phone Number',
    color: '#2563eb',
    bgColor: '#eff6ff',
    margin: 2,
    errorCorrectionLevel: 'H',
    qrShape: 'square',
    frameEnabled: true,
    framePosition: 'bottom',
    frameStyle: 'classic',
    frameColor: '#2563eb',
    frameText: 'Call Me',
    frameTextColor: '#ffffff',
    frameFont: 'Verdana',
    framePadding: 36,
    templateCategory: 'Nomor Telepon',
    templateType: 'url',
    templateValue: 'tel:+6281234567890',
    description: 'Template biru untuk membagikan nomor telepon dengan cepat.'
  }
];

function TemplateList({ onSelect, currentOptions }) {
  const [templates, setTemplates] = React.useState([]);
  const [previewUrls, setPreviewUrls] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchTemplates();
  }, []);

  React.useEffect(() => {
    if (templates.length === 0 || typeof generateQRCodeUrl !== 'function') return;

    let cancelled = false;
    const generatePreviews = async () => {
      const results = await Promise.all(templates.map(async template => {
        try {
          const url = await generateQRCodeUrl({
            value: template.templateValue || 'https://trickle.so',
            type: template.templateType || 'url',
            color: template.color,
            bgColor: template.bgColor,
            margin: template.margin || 2,
            errorCorrectionLevel: template.errorCorrectionLevel || 'H',
            qrShape: template.qrShape || 'square',
            frameEnabled: Boolean(template.frameEnabled),
            framePosition: template.framePosition || 'bottom',
            frameStyle: template.frameStyle || 'rounded',
            frameColor: template.frameColor || '#0f172a',
            frameText: template.frameText || 'Scan Me',
            frameTextColor: template.frameTextColor || '#ffffff',
            frameFont: template.frameFont || 'Arial',
            framePadding: template.framePadding || 36,
            logo: null,
            logoWidth: 80,
            logoHeight: 80
          });
          return [template.name, url];
        } catch (previewError) {
          console.warn(`Template preview failed for ${template.name}:`, previewError);
          return [template.name, null];
        }
      }));

      if (!cancelled) {
        setPreviewUrls(Object.fromEntries(results));
      }
    };

    generatePreviews();
    return () => { cancelled = true; };
  }, [templates]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);

      if (typeof trickleListObjects !== 'function') {
        setTemplates(FALLBACK_TEMPLATES);
        return;
      }

      const response = await trickleListObjects('qr_template');
      if (response && response.items && response.items.length > 0) {
        const mergedTemplates = new Map(FALLBACK_TEMPLATES.map(template => [template.name, template]));
        response.items.forEach(item => {
          const template = item.objectData;
          if (template && template.name) {
            mergedTemplates.set(template.name, template);
          }
        });
        setTemplates(Array.from(mergedTemplates.values()));
      } else {
        setTemplates(FALLBACK_TEMPLATES);
      }
    } catch (err) {
      console.warn('Using fallback templates because remote template source is unavailable:', err);
      setTemplates(FALLBACK_TEMPLATES);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-28 bg-slate-100 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-600 text-sm flex items-center gap-2">
        <div className="icon-triangle-alert"></div>
        {error}
      </div>
    );
  }

  if (templates.length === 0) {
      return (
          <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-200 text-center text-slate-500 text-sm">
              Tidak ada template tersedia saat ini.
          </div>
      );
  }

  try {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-name="template-list" data-file="components/TemplateList.js">
        {templates.map((template, idx) => {
          const isActive = currentOptions.color === template.color &&
            currentOptions.bgColor === template.bgColor &&
            currentOptions.qrShape === (template.qrShape || 'square') &&
            currentOptions.frameEnabled === Boolean(template.frameEnabled);
          
          return (
            <div 
              key={idx}
              onClick={() => onSelect(template)}
              className={`template-card p-4 flex flex-col gap-3 group ${isActive ? 'ring-2 ring-indigo-500 border-transparent bg-indigo-50/50 shadow-sm' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800 truncate pr-2">{template.name}</span>
                {isActive && (
                   <div className="icon-circle-check text-indigo-600 text-lg"></div>
                )}
              </div>
              
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center">
                {previewUrls[template.name] ? (
                  <img
                    src={previewUrls[template.name]}
                    alt={`Preview ${template.name}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-300">
                    <div className="icon-qr-code text-3xl"></div>
                    <span className="text-[9px] font-semibold uppercase">Membuat preview</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-4 h-4 rounded-full border border-white shadow-sm shrink-0" style={{ backgroundColor: template.color }} title="Warna QR"></span>
                  <span className="w-4 h-4 rounded-full border border-white shadow-sm shrink-0" style={{ backgroundColor: template.bgColor }} title="Warna Latar"></span>
                  <span className="text-[10px] text-slate-600 font-medium truncate">Marg: {template.margin} | Err: {template.errorCorrectionLevel}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {template.qrShape && template.qrShape !== 'square' && (
                  <span className="px-2 py-1 rounded-md bg-pink-50 text-pink-700 text-[9px] font-bold uppercase">
                    {template.qrShape === 'heart' ? 'Love' : template.qrShape === 'whatsapp' ? 'WhatsApp' : template.qrShape === 'instagram' ? 'Instagram' : 'Lingkaran'}
                  </span>
                )}
                {template.frameEnabled && (
                  <span className="px-2 py-1 rounded-md bg-teal-50 text-teal-700 text-[9px] font-bold uppercase">
                    Frame {template.framePosition === 'top' ? 'Atas' : template.framePosition === 'around' ? 'Mengelilingi' : 'Bawah'}
                  </span>
                )}
                {template.templateCategory && (
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[9px] font-bold uppercase">
                    {template.templateCategory}
                  </span>
                )}
              </div>
              
              <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2 italic">
                "{template.description}"
              </p>
            </div>
          );
        })}
      </div>
    );
  } catch (err) {
    console.error('TemplateList render error:', err);
    return null;
  }
}