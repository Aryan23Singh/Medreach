import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Search, ChevronLeft, Bookmark, CheckCircle2, 
  Video, Mic, Camera, PhoneOff, FileText, MoreHorizontal,
  Star, Clock, Languages, Calendar, ShieldCheck, 
  Smartphone, CreditCard, Landmark, ArrowRight,
  Home, ClipboardList, UserRound
} from 'lucide-react';
import { Screen, Doctor } from './types';

// Constants
const PRIMARY_TEAL = '#1D9E75';
const BACKGROUND_LIGHT = '#F8F7F4';
const ACCENT_TEAL_LIGHT = '#E1F5EE';

const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Anita Sharma',
    specialty: 'General Physician',
    qualifications: 'MBBS, MD',
    experience: '12 yrs',
    rating: 4.9,
    reviews: 142,
    fee: 400,
    status: 'Now',
    initials: 'AS',
    avatarColor: 'bg-blue-500'
  }
];

const SEARCH_RESULTS: Doctor[] = [
  {
    id: '2',
    name: 'Dr. Sameer Roy',
    specialty: 'General Physician',
    qualifications: 'MBBS, MD - Internal Medicine',
    experience: '12 yrs',
    rating: 4.8,
    reviews: 1200,
    fee: 500,
    status: 'Now',
    initials: 'SR',
    avatarColor: 'bg-teal-500'
  },
  {
    id: '3',
    name: 'Dr. Ananya Iyer',
    specialty: 'Pulmonologist',
    qualifications: 'MBBS, TDD, FCCP',
    experience: '8 yrs',
    rating: 4.9,
    reviews: 850,
    fee: 600,
    status: 'In 2hrs',
    initials: 'AI',
    avatarColor: 'bg-orange-500'
  },
  {
    id: '4',
    name: 'Dr. Karan Verma',
    specialty: 'Internal Medicine',
    qualifications: 'MBBS, MD',
    experience: '15 yrs',
    rating: 4.7,
    reviews: 2100,
    fee: 450,
    status: 'Now',
    initials: 'KV',
    avatarColor: 'bg-gray-500'
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('SPLASH');

  useEffect(() => {
    if (currentScreen === 'SPLASH') {
      const timer = setTimeout(() => setCurrentScreen('ONBOARDING'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH': return <SplashScreen />;
      case 'ONBOARDING': return <OnboardingScreen onNext={() => setCurrentScreen('LOGIN')} />;
      case 'LOGIN': return <LoginScreen onNext={() => setCurrentScreen('HOME')} onBack={() => setCurrentScreen('ONBOARDING')} />;
      case 'HOME': return <HomeScreen onSearch={() => setCurrentScreen('SEARCH_RESULTS')} onProfile={() => setCurrentScreen('DOCTOR_PROFILE')} />;
      case 'SEARCH_RESULTS': return <SearchResultsScreen onBack={() => setCurrentScreen('HOME')} onSelect={() => setCurrentScreen('DOCTOR_PROFILE')} />;
      case 'DOCTOR_PROFILE': return <DoctorProfileScreen onBack={() => setCurrentScreen('SEARCH_RESULTS')} onBook={() => setCurrentScreen('SLOT_BOOKING')} />;
      case 'SLOT_BOOKING': return <SlotBookingScreen onBack={() => setCurrentScreen('DOCTOR_PROFILE')} onNext={() => setCurrentScreen('PAYMENT')} />;
      case 'PAYMENT': return <PaymentScreen onBack={() => setCurrentScreen('SLOT_BOOKING')} onNext={() => setCurrentScreen('CONFIRMED')} />;
      case 'CONFIRMED': return <ConfirmedScreen onHome={() => setCurrentScreen('HOME')} onVideo={() => setCurrentScreen('VIDEO_CALL')} />;
      case 'VIDEO_CALL': return <VideoCallScreen onEnd={() => setCurrentScreen('HOME')} />;
      default: return <SplashScreen />;
    }
  };

  return (
    <div className="flex justify-center bg-black min-h-screen items-center p-4">
      <div className="w-[390px] h-[844px] bg-[#F8F7F4] overflow-hidden relative shadow-2xl rounded-[48px] border-[8px] border-black">
        <div className="absolute top-0 w-full z-50 px-8 py-4 flex justify-between items-center text-xs font-semibold">
          <span>9:41</span>
          <div className="flex gap-1">
             <div className="w-4 h-4 bg-current rounded-full" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%)' }}></div>
             <div className="text-[10px]">WIFI</div>
             <div className="w-6 h-3 border border-current rounded-[2px] flex items-center p-[1px]">
                <div className="w-full h-full bg-current rounded-[1px]"></div>
             </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- SCREEN COMPONENTS ---

function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center bg-[#1D9E75]"
    >
      <div className="w-[72px] h-[72px] bg-white rounded-[20px] flex items-center justify-center mb-4">
        <span className="text-[#1D9E75] font-bold text-2xl">M+</span>
      </div>
      <h1 className="text-white font-bold text-3xl mb-1">MedReach</h1>
      <p className="text-white/60 text-sm">Your health, simplified.</p>
      <div className="absolute bottom-16 w-full flex justify-center px-24">
        <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="h-full bg-white" 
          />
        </div>
      </div>
    </motion.div>
  );
}

function OnboardingScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -300, opacity: 0 }}
      className="w-full h-full flex flex-col bg-white"
    >
      <div className="h-[45%] bg-[#E1F5EE] flex items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Minimal doctor illustration placeholder */}
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center relative shadow-sm">
                <UserRound size={80} className="text-[#1D9E75]" />
                <div className="absolute top-1/4 right-0 w-12 h-12 bg-[#E1F5EE] rounded-lg border-2 border-[#1D9E75] flex items-center justify-center">
                    <Smartphone size={24} className="text-[#1D9E75]" />
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white rounded-t-[40px]" />
      </div>
      <div className="flex-1 px-8 pt-8 flex flex-col">
        <div className="flex gap-1.5 mb-8">
          <div className="w-6 h-1.5 bg-[#1D9E75] rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
          Find the right doctor, instantly.
        </h2>
        <p className="text-gray-500 mb-auto">
          Search by symptom or specialty. See real fees before you book.
        </p>
        <button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#1D9E75] text-white font-bold rounded-xl mb-4 transition-transform active:scale-95"
        >
          Get started
        </button>
        <div className="text-center pb-8">
          <p className="text-sm text-gray-500">
            Already have an account? <span className="text-[#1D9E75] font-bold cursor-pointer" onClick={onNext}>Log in</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function LoginScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -100, opacity: 0 }}
      className="w-full h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-16">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 mb-6">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter your number</h2>
        <p className="text-gray-500 text-sm mb-8">We'll send you a 6-digit code</p>
        
        <div className="flex gap-3 mb-4">
          <div className="w-[72px] h-[52px] border border-gray-200 rounded-xl flex items-center justify-center gap-1.5 font-bold">
            <span className="text-lg">🇮🇳</span>
            <span>+91</span>
          </div>
          <div className="flex-1 h-[52px] border-2 border-[#1D9E75] rounded-xl flex items-center px-4 font-bold tracking-wider text-xl">
            98765 43210
          </div>
        </div>
        
        <p className="text-[11px] text-gray-400 leading-relaxed mb-8">
          By continuing, you agree to our <span className="text-[#1D9E75] font-semibold">Terms</span> & <span className="text-[#1D9E75] font-semibold">Privacy Policy</span>
        </p>
        
        <button 
          onClick={onNext}
          className="w-full h-[52px] bg-[#1D9E75] text-white font-bold rounded-xl mb-8 active:scale-95 transition-transform"
        >
          Send OTP
        </button>
        
        <div className="flex items-center gap-4 mb-8 text-xs text-gray-400 font-semibold uppercase tracking-wider">
          <div className="flex-1 h-[1px] bg-gray-100" />
          <span>or</span>
          <div className="flex-1 h-[1px] bg-gray-100" />
        </div>
        
        <button className="w-full h-[52px] border border-gray-200 rounded-xl flex items-center justify-center gap-3 font-semibold text-gray-700 active:bg-gray-50 transition-colors">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        
        <div className="mt-auto pt-32 text-center">
             <p className="text-sm text-gray-500">
                New to MedReach? <span className="text-[#1D9E75] font-bold cursor-pointer">Create account</span>
            </p>
        </div>
      </div>
    </motion.div>
  );
}

function HomeScreen({ onSearch, onProfile }: { onSearch: () => void, onProfile: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col bg-[#F8F7F4]"
    >
      <header className="bg-[#1D9E75] px-6 pt-16 pb-8 text-white rounded-b-[40px]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/60 text-sm">Good morning,</p>
            <h2 className="text-xl font-bold">Priya Ramesh</h2>
          </div>
          <div className="relative">
            <Bell size={24} />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-[#1D9E75] rounded-full" />
          </div>
        </div>
        <div 
            onClick={onSearch}
            className="w-full h-[52px] bg-white/20 backdrop-blur-md rounded-xl flex items-center px-4 gap-3 cursor-pointer"
        >
          <Search size={20} className="text-white/60" />
          <span className="text-white/60">Search symptoms or doctor...</span>
        </div>
      </header>

      <main className="flex-1 px-6 pt-6 overflow-y-auto no-scrollbar pb-24">
        <div className="mb-8">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-[#E1F5EE] text-[#1D9E75] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Upcoming Today</span>
              <span className="text-xs text-gray-400 font-bold">2:30 PM</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">AS</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Dr. Anita Sharma</h3>
                <p className="text-gray-400 text-xs">General Physician · Video call</p>
              </div>
              <button 
                onClick={onProfile}
                className="bg-[#1D9E75] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >Join</button>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-4 px-2">Quick access</h3>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { label: 'GP', icon: 'medical_services', color: 'bg-blue-100/50 text-blue-600' },
              { label: 'Skin', icon: 'face_retouching_natural', color: 'bg-purple-100/50 text-purple-600' },
              { label: 'Heart', icon: 'favorite', color: 'bg-red-100/50 text-red-600' },
              { label: 'Mental', icon: 'auto_awesome', color: 'bg-green-100/50 text-green-600' },
            ].map((tile, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-full aspect-square ${tile.color} rounded-2xl flex items-center justify-center mb-2`}>
                   <span className="material-symbols-outlined">{tile.icon}</span>
                </div>
                <span className="text-[11px] font-bold text-gray-400 uppercase">{tile.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-bold text-gray-900">Available now</h3>
            <span className="text-[#1D9E75] font-bold text-sm" onClick={onSearch}>See all</span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Dr. Vijay Kumar', specialty: 'Cardiologist', fee: '₹500', initials: 'VK', color: 'bg-orange-100 text-orange-600' },
              { name: 'Dr. Rita Menon', specialty: 'Dermatologist', fee: '₹600', initials: 'RM', color: 'bg-indigo-100 text-indigo-600' },
            ].map((doc, i) => (
              <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
                <div className={`w-12 h-12 ${doc.color} rounded-2xl flex items-center justify-center font-bold`}>{doc.initials}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">{doc.name}</h4>
                  <p className="text-gray-400 text-[11px] font-medium">{doc.specialty} · {doc.fee}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold">4.8</span>
                    <div className="ml-2 bg-[#E1F5EE] text-[#137D5D] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">Now</div>
                  </div>
                </div>
                <div className="w-10 h-10 bg-[#E1F5EE] rounded-full flex items-center justify-center text-[#1D9E75]">
                    <Video size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <nav className="absolute bottom-0 w-full h-20 bg-white border-t border-gray-100 flex justify-around items-center px-6 rounded-t-3xl shadow-lg">
        <div className="flex flex-col items-center gap-1 text-[#1D9E75]">
          <Home size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300">
          <ClipboardList size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Appts</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300">
          <FileText size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Records</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300">
          <UserRound size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </div>
      </nav>
    </motion.div>
  );
}

function SearchResultsScreen({ onBack, onSelect }: { onBack: () => void, onSelect: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col bg-[#F8F7F4]"
    >
      <header className="bg-white px-6 pt-16 pb-6 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 h-[48px] border-2 border-[#1D9E75] rounded-xl flex items-center px-4 text-sm font-bold">
            Fever and cough
          </div>
          <div className="relative w-10 h-10 bg-[#E1F5EE] rounded-xl flex items-center justify-center text-[#1D9E75]">
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</div>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['Video only', 'Today', 'Under ₹600'].map((f, i) => (
             <div key={i} className="flex-shrink-0 flex items-center gap-1.5 bg-[#E1F5EE] text-[#1D9E75] text-xs font-bold px-3 py-2 rounded-xl">
               {f} <span className="opacity-50">×</span>
             </div>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider"><span className="text-gray-900">18</span> doctors found</span>
          <span className="text-xs text-gray-400 font-bold">Sort: <span className="text-gray-900">Relevance</span></span>
        </div>

        <div className="space-y-4">
          {SEARCH_RESULTS.map((doc) => (
            <div key={doc.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex gap-4 mb-4 relative">
                    <div className={`w-[52px] h-[52px] ${doc.avatarColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl`}>{doc.initials}</div>
                    <div className="flex-1">
                        <h3 className="font-extrabold text-gray-900">{doc.name}</h3>
                        <p className="text-xs text-gray-500 font-bold mt-0.5">{doc.specialty}</p>
                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{doc.qualifications} · {doc.experience} exp</p>
                    </div>
                    <Bookmark size={20} className="text-gray-300 absolute top-0 right-0" />
                </div>
                <div className="flex items-center gap-4 py-3 border-y border-gray-50 mb-4">
                    <div className="flex items-center gap-0.5 font-bold">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" /> 
                        <span className="text-xs">4.8</span>
                    </div>
                    <span className="text-xs text-gray-400 font-bold">(1.2k reviews)</span>
                    <div className="flex-1"></div>
                    <span className="text-sm font-extrabold">₹{doc.fee}</span>
                    <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${doc.status === 'Now' ? 'bg-[#E1F5EE] text-[#137D5D]' : 'bg-orange-50 text-orange-600'}`}>
                        {doc.status}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={onSelect}
                        className="flex-1 h-10 border border-[#1D9E75] text-[#1D9E75] font-bold text-xs rounded-xl active:bg-[#E1F5EE] transition-colors"
                    >View profile</button>
                    <button 
                        onClick={onSelect}
                        className="flex-1 h-10 bg-[#1D9E75] text-white font-bold text-xs rounded-xl shadow-md shadow-teal-100 active:scale-95 transition-transform"
                    >Book now</button>
                </div>
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}

function DoctorProfileScreen({ onBack, onBook }: { onBack: () => void, onBook: () => void }) {
    const doc = DOCTORS[0];
    return (
      <motion.div 
        initial={{ y: 100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="w-full h-full flex flex-col bg-[#F8F7F4]"
      >
        <header className="bg-white px-6 pt-16 pb-6">
          <div className="flex justify-between items-center mb-8">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="font-bold text-gray-900">Doctor profile</h1>
            <Bookmark size={24} />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[72px] h-[72px] rounded-full border-2 border-[#1D9E75] p-0.5 mb-3">
                <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">AS</div>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
                <h2 className="text-xl font-extrabold">{doc.name}</h2>
                <CheckCircle2 size={18} className="text-blue-500 fill-blue-500 text-white" />
            </div>
            <p className="text-sm text-gray-400 font-bold mb-4">{doc.specialty} · {doc.qualifications}</p>
            <div className="flex gap-2 mb-8">
                <div className="bg-[#E1F5EE] text-[#137D5D] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">Available Now</div>
                <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">Hindi, English</div>
            </div>
            
            <div className="w-full grid grid-cols-3 border-t border-gray-50 pt-4">
                <div className="flex flex-col items-center border-r border-gray-50">
                    <span className="font-extrabold text-[#1D9E75]">4.9★</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">142 reviews</span>
                </div>
                <div className="flex flex-col items-center border-r border-gray-50">
                    <span className="font-extrabold text-[#1D9E75]">2300+</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Consults</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-extrabold text-[#1D9E75]">~3 min</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Response</span>
                </div>
            </div>
          </div>
        </header>
  
        <main className="flex-1 p-6 overflow-y-auto no-scrollbar scroll-smooth pb-32">
            <div className="bg-white p-5 rounded-3xl border-2 border-[#1D9E75] mb-6 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="font-extrabold text-gray-900">Video consultation</h3>
                        <p className="text-xs text-gray-400 font-bold mt-0.5">Next: Today at 3:30 PM</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-2xl font-black text-[#1D9E75]">₹400</span>
                        <span className="text-[10px] text-green-500 font-bold">₹0 platform fee</span>
                    </div>
                </div>
                <button 
                  onClick={onBook}
                  className="w-full h-12 bg-[#1D9E75] text-white font-bold rounded-2xl shadow-xl shadow-teal-100 active:scale-95 transition-transform"
                >Book video consult</button>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Patient reviews</h3>
                    <MoreHorizontal size={20} className="text-gray-300" />
                </div>

                {[
                   { name: 'Rahul Kumar', rating: 5, text: 'Dr. Anita is very patient and explains the diagnosis clearly. Highly recommended.', initials: 'RK', color: 'bg-green-100 text-green-600' },
                   { name: 'Sanya Mehta', rating: 5, text: 'Consultation was quick and effective. The doctor was very helpful with my queries.', initials: 'SM', color: 'bg-blue-100 text-blue-600' },
                ].map((rev, i) => (
                    <div key={i} className={`pb-5 mb-5 ${i === 0 ? 'border-b border-gray-50' : ''}`}>
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 ${rev.color} rounded-full flex items-center justify-center text-[10px] font-bold`}>{rev.initials}</div>
                                <span className="text-xs font-bold text-gray-900">{rev.name}</span>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-yellow-400 text-yellow-400" />)}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">"{rev.text}"</p>
                    </div>
                ))}

                <button className="w-full text-center text-[#1D9E75] text-xs font-bold uppercase tracking-wider py-1">See all 142 reviews</button>
            </div>
        </main>
  
        <div className="absolute bottom-0 w-full h-24 bg-white border-t border-gray-100 px-6 flex items-center justify-between rounded-t-3xl shadow-xl z-20">
            <div>
                 <span className="text-[10px] text-gray-400 font-bold uppercase block">Consult Fee</span>
                 <span className="text-xl font-black text-gray-900">₹400</span>
            </div>
            <button 
                onClick={onBook}
                className="bg-[#1D9E75] text-white font-bold h-12 px-10 rounded-2xl shadow-lg shadow-teal-100 active:scale-95 transition-transform"
            >Book now</button>
        </div>
      </motion.div>
    );
  }

function SlotBookingScreen({ onBack, onNext }: { onBack: () => void, onNext: () => void }) {
    return (
        <motion.div 
          initial={{ x: 300, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="w-full h-full flex flex-col bg-white"
        >
            <header className="px-6 pt-16 pb-6">
                <div className="flex items-center gap-3 mb-8">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
                        <ChevronLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold">Select slot</h2>
                </div>
                
                <div className="flex items-center justify-between px-4 mb-8">
                    {[
                        { label: 'Slot', active: true },
                        { label: 'Details', active: false },
                        { label: 'Confirm', active: false },
                    ].map((step, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${step.active ? 'bg-[#1D9E75] text-white' : 'bg-gray-100 text-gray-400 shadow-inner'}`}>{i+1}</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${step.active ? 'text-[#1D9E75]' : 'text-gray-300'}`}>{step.label}</span>
                            </div>
                            {i < 2 && <div className="flex-1 h-[2px] bg-gray-100 mx-2 -mt-4 rounded-full" />}
                        </React.Fragment>
                    ))}
                </div>

                <div className="bg-[#F8F7F4] p-4 rounded-2xl flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold">AS</div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">Dr. Anita Sharma</h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Video consult · <span className="text-[#1D9E75]">₹400</span></p>
                    </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-4 px-2">Select date</h3>
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
                    {[
                        { day: 'Mon', date: '12' },
                        { day: 'Tue', date: '13' },
                        { day: 'Wed', date: '14', active: true },
                        { day: 'Thu', date: '15' },
                        { day: 'Fri', date: '16' },
                    ].map((d, i) => (
                        <div key={i} className={`flex-shrink-0 w-14 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${d.active ? 'bg-[#1D9E75] text-white shadow-lg' : 'bg-[#F8F7F4] text-gray-900 border border-transparent'}`}>
                            <span className={`text-[10px] font-bold uppercase opacity-60`}>{d.day}</span>
                            <span className="text-xl font-bold">{d.date}</span>
                        </div>
                    ))}
                </div>

                <h3 className="font-bold text-gray-900 mb-4 px-2">Morning</h3>
                <div className="grid grid-cols-3 gap-2 px-2 mb-8">
                    {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'].map((t, i) => (
                        <div key={i} className={`h-11 flex items-center justify-center rounded-xl font-bold text-xs border ${t === '10:30 AM' ? 'bg-[#1D9E75] border-[#1D9E75] text-white shadow-md' : 'bg-[#F8F7F4] border-transparent text-gray-900'}`}>
                            {t}
                        </div>
                    ))}
                </div>

                <h3 className="font-bold text-gray-900 mb-4 px-2">Afternoon</h3>
                <div className="grid grid-cols-3 gap-2 px-2">
                    {['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'].map((t, i) => (
                        <div key={i} className={`h-11 flex items-center justify-center rounded-xl font-bold text-xs border ${t === '2:30 PM' ? 'bg-gray-100 border-gray-100 text-gray-300 line-through' : 'bg-[#F8F7F4] border-transparent text-gray-900'}`}>
                            {t}
                        </div>
                    ))}
                </div>
            </header>

            <div className="mt-auto px-6 pb-12">
                <button 
                  onClick={onNext}
                  className="w-full h-[52px] bg-[#1D9E75] text-white font-bold rounded-xl active:scale-95 transition-transform"
                >Continue</button>
            </div>
        </motion.div>
    );
}

function PaymentScreen({ onBack, onNext }: { onBack: () => void, onNext: () => void }) {
    return (
        <motion.div 
          initial={{ x: 300, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="w-full h-full flex flex-col bg-white"
        >
             <header className="px-6 pt-16 pb-6">
                <div className="flex items-center gap-3 mb-8">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
                        <ChevronLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold">Payment</h2>
                </div>

                <div className="bg-[#E1F5EE] p-8 rounded-[32px] flex flex-col items-center mb-8">
                    <span className="text-[10px] font-bold text-[#1D9E75] uppercase tracking-[2px] mb-2">Total amount</span>
                    <h2 className="text-4xl font-black text-[#1D9E75] mb-2">₹400</h2>
                    <p className="text-[11px] font-bold text-[#1D9E75] opacity-60">Dr. Anita Sharma · Wed 14 Mar · 10:30 AM</p>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-4 px-2 tracking-tight">Pay via UPI</h3>
                <div className="grid grid-cols-3 gap-3 mb-4 px-1">
                    {[
                        { name: 'GPay', color: 'bg-blue-600' },
                        { name: 'PhonePe', color: 'bg-purple-600' },
                        { name: 'BHIM', color: 'bg-green-600' },
                    ].map((app, i) => (
                        <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl flex flex-col items-center py-3">
                             <div className={`w-8 h-8 ${app.color} rounded-lg mb-2`} />
                             <span className="text-[10px] font-bold text-gray-400">{app.name}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-white border-[1.5px] border-[#1D9E75] p-4 rounded-2xl flex items-center gap-4 mb-8">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1D9E75] flex items-center justify-center shadow-inner">
                        <div className="w-2.5 h-2.5 bg-[#1D9E75] rounded-full shadow-sm" />
                    </div>
                    <div className="flex-1">
                         <h4 className="font-bold text-gray-900 text-sm">priya@okaxis</h4>
                         <p className="text-[10px] text-gray-400 font-bold uppercase">Default UPI ID</p>
                    </div>
                    <span className="text-xs font-bold text-[#1D9E75]">Change</span>
                </div>

                <div className="flex items-center gap-4 mb-8 text-xs text-gray-400 font-bold uppercase tracking-wider">
                    <div className="flex-1 h-[1px] bg-gray-50" />
                    <span>or pay with</span>
                    <div className="flex-1 h-[1px] bg-gray-50" />
                </div>

                <div className="flex gap-3 mb-12">
                     <div className="flex-1 border border-gray-100 rounded-2xl py-3 flex items-center justify-center gap-2 font-bold text-[11px] text-gray-500 bg-white">
                        <CreditCard size={16} className="text-gray-300" /> Card
                     </div>
                     <div className="flex-1 border border-gray-100 rounded-2xl py-3 flex items-center justify-center gap-2 font-bold text-[11px] text-gray-500 bg-white">
                        <Landmark size={16} className="text-gray-300" /> Banking
                     </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 opacity-40 mb-8">
                     <ShieldCheck size={14} className="text-gray-600" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800">256-bit encrypted · Razorpay</span>
                </div>
             </header>

             <div className="mt-auto px-6 pb-12">
                <button 
                  onClick={onNext}
                  className="w-full h-[52px] bg-[#1D9E75] text-white font-bold rounded-xl active:scale-95 transition-transform shadow-xl shadow-teal-100"
                >Pay ₹400</button>
            </div>
        </motion.div>
    );
}

function ConfirmedScreen({ onHome, onVideo }: { onHome: () => void, onVideo: () => void }) {
    return (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="w-full h-full flex flex-col bg-white"
        >
             <main className="flex-1 px-8 pt-24 flex flex-col items-center">
                 <div className="mb-8 relative">
                     <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-[72px] h-[72px] bg-[#1D9E75] rounded-full flex items-center justify-center shadow-xl shadow-teal-100"
                    >
                         <CheckCircle2 size={40} className="text-white fill-white text-[#1D9E75]" />
                     </motion.div>
                 </div>
                 <h2 className="text-2xl font-black text-gray-900 mb-2">You're all set!</h2>
                 <p className="text-sm text-gray-400 text-center font-medium leading-relaxed mb-10 max-w-[240px]">
                    Your appointment with Dr. Anita Sharma is confirmed
                </p>

                <div className="w-full bg-[#F8F7F4] p-5 rounded-[32px] border border-gray-50 mb-8">
                    {[
                        { l: 'Doctor', v: 'Dr. Anita Sharma' },
                        { l: 'Date', v: 'Tue 14 Mar' },
                        { l: 'Time', v: '10:30 AM' },
                        { l: 'Mode', v: 'Video Call' },
                        { l: 'Fee', v: '₹400 Paid', c: 'text-[#1D9E75]' },
                        { l: 'Booking ID', v: 'MR250847', mono: true },
                    ].map((row, i) => (
                        <div key={i} className={`flex justify-between items-center py-2.5 ${i < 5 ? 'border-b border-white/80' : ''}`}>
                             <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{row.l}</span>
                             <span className={`text-[11px] font-extrabold ${row.c || 'text-gray-900'} ${row.mono ? 'font-mono' : ''}`}>{row.v}</span>
                        </div>
                    ))}
                </div>

                <div className="w-full flex gap-3 mb-8">
                     <button className="flex-1 h-11 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 active:bg-gray-50 transition-colors">Add to calendar</button>
                     <button className="flex-1 h-11 bg-[#1D9E75] rounded-xl text-xs font-bold text-white active:scale-95 transition-transform">Set reminder</button>
                </div>

                <div className="w-full bg-[#E1F5EE] p-5 rounded-3xl">
                     <h4 className="text-[11px] font-black text-[#137D5D] uppercase tracking-widest mb-4">What to expect</h4>
                     <div className="space-y-4">
                        {[
                            'We\'ll notify you 30 mins before',
                            'Prepare your symptoms & questions',
                            'Doctor joins at scheduled time',
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3">
                                <CheckCircle2 size={14} className="text-[#137D5D] shrink-0 mt-0.5" />
                                <p className="text-xs font-bold text-[#137D5D] leading-tight opacity-80">{item}</p>
                            </div>
                        ))}
                     </div>
                </div>
             </main>

             <div className="px-8 pb-12">
                 <button 
                  onClick={onHome}
                  className="w-full text-gray-400 font-bold text-sm tracking-wide uppercase py-3 active:opacity-60 transition-opacity"
                 >Back to home</button>
             </div>
        </motion.div>
    );
}

function VideoCallScreen({ onEnd }: { onEnd: () => void }) {
    return (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="w-full h-full flex flex-col bg-[#0D0D0D] relative"
        >
            <div className="absolute inset-0 bg-[#1A1A2E] z-0 flex flex-col items-center justify-center">
                 <div className="w-24 h-24 bg-[#1D9E75]/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-[80px] h-[80px] bg-[#1D9E75] rounded-full flex items-center justify-center text-white font-black text-3xl">AS</div>
                 </div>
                 <h3 className="text-white font-bold text-lg mb-1 opacity-80">Dr. Anita Sharma</h3>
                 <p className="text-white/40 font-mono text-sm tracking-widest">04:32</p>
            </div>

            <div className="absolute top-[68px] left-6 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[11px] font-bold text-white tracking-tight">Dr. Anita Sharma</span>
            </div>

            <div className="absolute top-[68px] right-6 z-10 w-[72px] h-[100px] bg-gray-900 border-2 border-[#1D9E75] rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
                 <span className="text-white/40 font-bold">PR</span>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                <Video size={300} />
            </div>

            <div className="absolute bottom-0 w-full bg-[#1A1A1A] px-6 pt-8 pb-12 rounded-t-[40px] z-20">
                <div className="flex justify-between items-center mb-6">
                    <button className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
                        <Mic size={24} />
                    </button>
                    <button className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
                        <Camera size={24} />
                    </button>
                    <button 
                         onClick={onEnd}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 transition-transform"
                    >
                        <PhoneOff size={32} />
                    </button>
                    <button className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
                        <FileText size={24} />
                    </button>
                    <button className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
                        <MoreHorizontal size={24} />
                    </button>
                </div>
                <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[2px]">Tap screen to show controls</p>
            </div>
        </motion.div>
    );
}
