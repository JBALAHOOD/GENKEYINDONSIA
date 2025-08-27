import React from 'react';
import { Shield, RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import Button from '../components/Button';
import { Card, CardHeader, CardContent, CardTitle } from '../components/Card';
import Input from '../components/Input';
import Slider from '../components/Slider';
import Checkbox from '../components/Checkbox';

const PasswordGenerator = () => {
  const {
    password,
    length,
    options,
    isGenerating,
    isCopied,
    copyFeedback,
    passwordStrength,
    generatePassword,
    handleOptionChange,
    handleLengthChange,
    copyToClipboard
  } = usePasswordGenerator();

  const characterOptions = [
    { key: 'uppercase', label: 'Huruf Besar', desc: 'A-Z' },
    { key: 'lowercase', label: 'Huruf Kecil', desc: 'a-z' },
    { key: 'numbers', label: 'Angka', desc: '0-9' },
    { key: 'symbols', label: 'Simbol', desc: '!@#$%^&*()_+-=[]{}|;:,.<>?' }
  ];

  const securityResources = [
    {
      name: "Have I Been Pwned?",
      desc: "Periksa apakah email Anda telah bocor dalam pelanggaran data.",
      url: "https://haveibeenpwned.com/",
      icon: "H"
    },
    {
      name: "OWASP Foundation",
      desc: "Standar global untuk keamanan aplikasi web.",
      url: "https://owasp.org/",
      icon: "O"
    },
    {
      name: "EFF's Surveillance Self-Defense",
      desc: "Panduan untuk melindungi diri dari pengawasan online.",
      url: "https://ssd.eff.org/",
      icon: "E"
    },
    {
      name: "NIST Cybersecurity Framework",
      desc: "Framework keamanan siber dari National Institute of Standards.",
      url: "https://www.nist.gov/cyberframework",
      icon: "N"
    },
    {
      name: "KeePass Password Manager",
      desc: "Manajer kata sandi open-source yang aman dan gratis.",
      url: "https://keepass.info/",
      icon: "K"
    },
    {
      name: "Bitwarden",
      desc: "Solusi manajemen kata sandi untuk individu dan bisnis.",
      url: "https://bitwarden.com/",
      icon: "B"
    },
    {
      name: "Google Security Checkup",
      desc: "Periksa dan tingkatkan keamanan akun Google Anda.",
      url: "https://myaccount.google.com/security-checkup",
      icon: "G"
    },
    {
      name: "Microsoft Security",
      desc: "Pusat keamanan dan perlindungan dari Microsoft.",
      url: "https://www.microsoft.com/security",
      icon: "M"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4 fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Pembuat Sandi Kuat
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed slide-up">
            Buat kata sandi acak yang aman dalam hitungan detik
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="slide-up">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-8 px-8 pt-10">
                <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                  Generator Kata Sandi
                </CardTitle>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sesuaikan pengaturan di bawah untuk menghasilkan kata sandi yang sempurna
                </p>
              </CardHeader>
              
              <CardContent className="px-8 pb-10 space-y-8">
                {/* Password Length */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-700">
                      Panjang Kata Sandi
                    </label>
                    <div className="bg-blue-50 px-3 py-1 rounded-full">
                      <span className="text-blue-700 font-bold text-sm">
                        {length} karakter
                      </span>
                    </div>
                  </div>
                  <div className="px-3">
                    <Slider
                      value={length}
                      onChange={handleLengthChange}
                      max={32}
                      min={8}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>8</span>
                      <span>32</span>
                    </div>
                  </div>
                </div>

                {/* Character Options */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Jenis Karakter
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {characterOptions.map((option) => (
                      <div
                        key={option.key}
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={option.key}
                          checked={options[option.key]}
                          onChange={(checked) => handleOptionChange(option.key, checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={option.key}
                            className="text-sm font-medium text-gray-800 cursor-pointer block"
                          >
                            {option.label}
                          </label>
                          <p className="text-xs text-gray-500 mt-1">
                            {option.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-4">
                  <Button
                    onClick={generatePassword}
                    disabled={isGenerating}
                    className="w-full py-6 text-lg font-semibold"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Menghasilkan...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Hasilkan Kata Sandi
                      </>
                    )}
                  </Button>
                </div>

                {/* Password Output */}
                {password && (
                  <div className="space-y-3 fade-in">
                    <label className="text-sm font-semibold text-gray-700">
                      Kata Sandi Anda
                    </label>
                    <div className="relative">
                      <Input
                        value={password}
                        readOnly
                        className="pr-12 text-center font-mono text-lg py-4 bg-gray-50 border-2"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={copyToClipboard}
                          className={`h-8 w-8 hover:bg-blue-50 ${isCopied ? 'pulse-success' : ''}`}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-blue-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Password Strength */}
                    {passwordStrength && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Kekuatan Sandi:</span>
                          <span className={`text-sm font-semibold ${passwordStrength.color}`}>
                            {passwordStrength.level}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.score >= 70 ? 'bg-green-500' :
                              passwordStrength.score >= 50 ? 'bg-blue-500' :
                              passwordStrength.score >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${passwordStrength.score}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {copyFeedback && (
                      <p className={`text-sm text-center font-medium fade-in ${
                        isCopied ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isCopied ? '✓ ' : '✗ '}{copyFeedback}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Security Tips */}
          <div className="mt-12 text-center slide-up">
            <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  Tips Keamanan
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Gunakan kata sandi unik untuk setiap akun</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Simpan kata sandi di tempat yang aman</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Ubah kata sandi secara berkala</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Aktifkan autentikasi dua faktor</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Security Resources */}
          <div className="mt-12 slide-up">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-semibold text-gray-800">
                  <ExternalLink className="w-5 h-5 text-blue-500" />
                  Sumber Daya Keamanan
                </CardTitle>
                <p className="text-sm text-gray-500 !mt-2">
                  Tingkatkan keamanan digital Anda dengan sumber daya tepercaya berikut.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {securityResources.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{link.name}</p>
                      <p className="text-sm text-gray-600">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Tentang GenKey Indonesia</h4>
              <p className="text-sm text-gray-600 mb-3">
                Generator kata sandi yang aman dan gratis untuk melindungi akun digital Anda. 
                Dibuat dengan teknologi terdepan untuk keamanan maksimal.
              </p>
              <div className="flex gap-2">
                <a href="https://github.com/genkeyindonesia" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 text-sm">GitHub</a>
                <span className="text-gray-400">•</span>
                <a href="https://twitter.com/GenKeyIndonesia" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 text-sm">Twitter</a>
              </div>
            </div>
            
            {/* Security Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Keamanan Siber</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.cisa.gov/cybersecurity" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">CISA Cybersecurity</a>
                <a href="https://www.sans.org/" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">SANS Institute</a>
                <a href="https://www.cybersecurity.gov.au/" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">Australian Cyber Security</a>
                <a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">UK National Cyber Security</a>
              </div>
            </div>
            
            {/* Password Tools */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Alat Keamanan</h4>
              <div className="space-y-2 text-sm">
                <a href="https://1password.com/" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">1Password</a>
                <a href="https://www.lastpass.com/" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">LastPass</a>
                <a href="https://authy.com/" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">Authy 2FA</a>
                <a href="https://www.yubico.com/" target="_blank" rel="noopener noreferrer" 
                   className="block text-gray-600 hover:text-blue-600">YubiKey Hardware</a>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              © 2025 GenKey Indonesia - Generator Kata Sandi Aman. Semua Hak Dilindungi.
            </p>
            <p className="text-xs text-gray-500">
              Dibuat untuk meningkatkan keamanan digital di Indonesia. 
              <a href="https://www.bssn.go.id/" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:text-blue-800 ml-1">BSSN Indonesia</a> • 
              <a href="https://id.wikipedia.org/wiki/Keamanan_siber" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 hover:text-blue-800 ml-1">Keamanan Siber</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PasswordGenerator;