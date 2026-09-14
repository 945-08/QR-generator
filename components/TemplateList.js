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
  }
];

function TemplateList({ onSelect, currentOptions }) {
  const [templates, setTemplates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);

      if (typeof trickleListObjects !== 'function') {
        setTemplates(FALLBACK_TEMPLATES);
        return;
      }

      const response = await trickleListObjects('qr_template');
      if (response && response.items && response.items.length > 0) {
        setTemplates(response.items.map(item => item.objectData));
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
          const isActive = currentOptions.color === template.color && currentOptions.bgColor === template.bgColor;
          
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
              
              <div className="flex gap-2 items-center">
                <div className="flex -space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm z-10"
                      style={{ backgroundColor: template.color }}
                      title="Warna QR"
                    ></div>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm z-0"
                      style={{ backgroundColor: template.bgColor }}
                      title="Warna Latar"
                    ></div>
                </div>
                <div className="flex flex-col gap-0.5 ml-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Preset</span>
                    <span className="text-[10px] text-slate-600 font-medium">Marg: {template.margin} | Err: {template.errorCorrectionLevel}</span>
                </div>
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