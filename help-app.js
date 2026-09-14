function HelpApp() {
    try {
        const faqs = [
            {
                q: "Bagaimana cara menggunakan template?",
                a: "Klik salah satu kartu di bagian 'Template Desain Cepat'. Warna, margin, dan tingkat koreksi akan otomatis menyesuaikan dengan gaya yang dipilih.",
                icon: "icon-wand-sparkles"
            },
            {
                q: "Bagaimana cara mengganti warna QR?",
                a: "Buka tab 'Desain' di panel kontrol, lalu pilih 'Warna QR' atau 'Warna Latar' menggunakan pemilih warna atau masukkan kode Hex secara manual.",
                icon: "icon-palette"
            },
            {
                q: "Apa itu Tingkat Koreksi Error?",
                a: "Fitur ini memungkinkan QR tetap terbaca meski sebagian permukaannya rusak atau tertutup logo. Gunakan level 'High' jika Anda menambahkan logo di tengah QR.",
                icon: "icon-shield-check"
            },
            {
                q: "Format apa yang didukung untuk unduhan?",
                a: "Saat ini kami mendukung format PNG berkualitas tinggi (1024px) yang optimal untuk kebutuhan cetak maupun digital.",
                icon: "icon-download"
            },
            {
                q: "Apakah layanan ini berbayar?",
                a: "Tidak, QR Pro adalah generator QR Code sepenuhnya gratis dengan fitur kustomisasi tingkat lanjut tanpa biaya tersembunyi.",
                icon: "icon-circle-dollar-sign"
            }
        ];

        return (
            <div className="min-h-screen pb-20" data-name="help-page" data-file="help-app.js">
                <Header />
                <main className="max-w-4xl mx-auto px-4 mt-12">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-6">
                            <div className="icon-circle-help text-teal-600 text-3xl"></div>
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Pusat Bantuan QR Pro</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Semua yang perlu Anda ketahui tentang pembuatan QR Code yang sempurna dan profesional.</p>
                    </div>

                    <div className="grid gap-6">
                        {faqs.map((faq, i) => (
                            <div 
                                key={i} 
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                                        <div className={`${faq.icon} text-xl text-teal-500`}></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.q}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-white">Masih punya pertanyaan?</h3>
                            <p className="mb-8 opacity-90 text-teal-50">Tim dukungan kami siap membantu Anda mengoptimalkan QR Code Anda.</p>
                            <a 
                                href="mailto:support@qrpro.com"
                                className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg"
                            >
                                <div className="icon-mail"></div>
                                Hubungi Dukungan
                            </a>
                        </div>
                    </div>
                </main>
                <footer className="mt-20 border-t border-slate-200 py-10 text-center text-slate-500">
                    <p>© 2026 QR Pro. Semua Hak Dilindungi.</p>
                </footer>
            </div>
        );
    } catch (error) {
        console.error('HelpApp component error:', error);
        return <div className="p-10 text-center">Terjadi kesalahan saat memuat bantuan.</div>;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HelpApp />);