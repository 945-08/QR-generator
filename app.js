// Important: DO NOT remove this ErrorBoundary component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
            <div className="icon-triangle-alert text-red-500 text-5xl mb-4 mx-auto"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ups! Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-6">Kami mohon maaf, sepertinya ada masalah teknis yang tidak terduga.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [qrOptions, setQrOptions] = React.useState({
    value: 'https://trickle.so',
    type: 'url',
    color: '#000000',
    bgColor: '#ffffff',
    size: 400,
    margin: 2,
    errorCorrectionLevel: 'H',
    logo: null,
    logoWidth: 80,
    logoHeight: 80,
  });

  const [qrUrl, setQrUrl] = React.useState('');
  const [qrError, setQrError] = React.useState('');

  React.useEffect(() => {
    generateQR();
  }, [qrOptions]);

  const generateQR = async () => {
    try {
      setQrError('');
      const url = await generateQRCodeUrl(qrOptions);
      setQrUrl(url);
    } catch (err) {
      console.error('QR Generation error:', err);
      setQrError('Konten QR tidak valid. Periksa kembali isinya.');
      setQrUrl('');
    }
  };

  const applyTemplate = (template) => {
    setQrOptions(prev => ({
      ...prev,
      color: template.color,
      bgColor: template.bgColor,
      errorCorrectionLevel: template.errorCorrectionLevel,
      margin: template.margin
    }));
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrUrl;
    link.click();
  };

  const handleShare = async () => {
    if (!qrUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'QR Code QR Pro', text: qrOptions.value, url: qrOptions.type === 'url' ? qrOptions.value : undefined });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(qrOptions.value);
        window.alert('Konten QR berhasil disalin.');
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Share error:', err);
    }
  };

  const handlePrint = () => {
    if (!qrUrl) return;
    const printWindow = window.open('', '_blank', 'width=700,height=700');
    if (!printWindow) return;
    printWindow.document.write(`<html><head><title>QR Code QR Pro</title></head><body style="display:flex;justify-content:center;align-items:center;min-height:100vh"><img src="${qrUrl}" style="width:512px;height:512px" onload="window.print();window.close()"></body></html>`);
    printWindow.document.close();
  };

  try {
    return (
      <div className="min-h-screen pb-20" data-name="app" data-file="app.js">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side: Controls & Templates */}
            <div className="lg:col-span-7 space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="icon-wand-sparkles text-teal-600 text-xl"></div>
                  <h2 className="text-xl font-bold text-slate-800">Template Desain Cepat</h2>
                </div>
                <TemplateList onSelect={applyTemplate} currentOptions={qrOptions} />
              </section>

              <QRControls options={qrOptions} setOptions={setQrOptions} />
            </div>

            {/* Right Side: Preview */}
            <div className="lg:col-span-5">
              <div className="sticky top-8">
                <QRDisplay 
                  qrUrl={qrUrl} 
                  options={qrOptions} 
                  onDownload={handleDownload}
                  onShare={handleShare}
                  onPrint={handlePrint}
                  error={qrError}
                />
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-20 border-t border-slate-200 py-10 text-center text-[var(--text-muted)]">
          <p>© 2026 QR Pro. Semua Hak Dilindungi. Dibuat dengan presisi tinggi.</p>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);