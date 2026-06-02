import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckCircle, 
  Award, 
  Users, 
  Phone, 
  MapPin, 
  Mail, 
  ArrowRight, 
  Filter, 
  Check, 
  Briefcase, 
  ShieldCheck, 
  Star, 
  Smile, 
  Send, 
  Heart, 
  Info, 
  X,
  Building,
  GraduationCap,
  Coins,
  Globe,
  CheckCircle2,
  Bookmark,
  Calendar
} from 'lucide-react';

// ==========================================
// MOCK DATA & INTERFACES
// ==========================================

interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  priceRange: string;
  rating: number;
  tags: string[];
  color: 'pink' | 'mint' | 'yellow' | 'sky';
  icon: React.ComponentType<{ className?: string }>;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  experience: string;
  avatar: string;
  specialty: string;
  tags: string[];
  availability: boolean;
  color: 'pink' | 'mint' | 'yellow' | 'sky';
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  certNo: string;
  category: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'นายหน้าหาบ้านและคอนโดสุดมินิมอล',
    category: 'อสังหาริมทรัพย์',
    description: 'ช่วยค้นหาและคัดสรรที่อยู่อาศัยที่ตรงใจคุณ ทั้งบ้านเดี่ยว คอนโด ใกล้แนวรถไฟฟ้า พร้อมประสานงานเอกสารและการกู้ยืมแบบจบในที่เดียว',
    priceRange: 'เริ่มต้น 15,000 ฿/สัญญา',
    rating: 4.9,
    tags: ['คอนโดน่ารัก', 'สัญญาโปร่งใส', 'ดูแลทุกขั้นตอน'],
    color: 'pink',
    icon: Building
  },
  {
    id: 's2',
    title: 'ที่ปรึกษาวางแผนภาษีบุคคลและธุรกิจ',
    category: 'การเงินและบัญชี',
    description: 'วางแผนจัดการภาษีประหยัดค่าใช้จ่าย จัดทำบัญชีรายเดือน-รายปีอย่างถูกต้อง โดยผู้เชี่ยวชาญที่มีใบรับรองระดับสากล',
    priceRange: 'เริ่มต้น 3,500 ฿/เดือน',
    rating: 4.8,
    tags: ['ประหยัดภาษี', 'ถูกต้องแม่นยำ', 'รายงานรายเดือน'],
    color: 'yellow',
    icon: Coins
  },
  {
    id: 's3',
    title: 'ตัวแทนประสานงานศึกษาต่อต่างประเทศ',
    category: 'การศึกษา',
    description: 'แนะแนวหลักสูตรระดับประถม มัธยม และมหาวิทยาลัยในต่างประเทศ ดูแลทำวีซ่าและเตรียมเอกสารสมัครเรียนครบวงจร',
    priceRange: 'เริ่มต้น 45,000 ฿/แพ็กเกจ',
    rating: 5.0,
    tags: ['เรียนต่อต่างประเทศ', 'ให้คำปรึกษาฟรี', 'ดูแลวีซ่า'],
    color: 'sky',
    icon: GraduationCap
  },
  {
    id: 's4',
    title: 'จัดหาและคัดกรองพนักงานบริการด่วน',
    category: 'จัดหางาน',
    description: 'บริการสรรหาและตรวจสอบประวัติพนักงานขับรถ แม่บ้าน พี่เลี้ยงเด็ก และพนักงานต้อนรับ เพื่อความปลอดภัยสูงสุดของครอบครัวคุณ',
    priceRange: 'เริ่มต้น 8,000 ฿/ท่าน',
    rating: 4.7,
    tags: ['ประวัติตรวจสอบแล้ว', 'เปลี่ยนตัวได้ฟรี', 'บริการรวดเร็ว'],
    color: 'mint',
    icon: Users
  },
  {
    id: 's5',
    title: 'บริการจัดหาที่ดินเพื่อการเกษตรและลงทุน',
    category: 'อสังหาริมทรัพย์',
    description: 'ค้นหาและวิเคราะห์ศักยภาพที่ดินผืนงามเพื่อทำฟาร์ม คาเฟ่พาสเทล หรือการเก็งกำไร ตรวจสอบผังเมืองและสิทธิทางกฎหมายให้ครบถ้วน',
    priceRange: 'เริ่มต้น 50,000 ฿',
    rating: 4.9,
    tags: ['วิเคราะห์ทำเล', 'เช็กผังเมือง', 'โฉนดปลอดภัย'],
    color: 'mint',
    icon: Globe
  },
  {
    id: 's6',
    title: 'โค้ชส่วนตัววางแผนการเงินและเกษียณ',
    category: 'การเงินและบัญชี',
    description: 'จัดพอร์ตการลงทุนอย่างปลอดภัย ออกแบบเส้นทางการเงินเพื่ออิสรภาพวัยเกษียณ ปรับเปลี่ยนตามไลฟ์สไตล์อย่างละมุนละไม',
    priceRange: 'เริ่มต้น 5,000 ฿/แผนงาน',
    rating: 4.9,
    tags: ['วางแผนเกษียณ', 'พอร์ตเสี่ยงต่ำ', 'ดูแลอบอุ่น'],
    color: 'pink',
    icon: Sparkles
  }
];

const STAFFS: Staff[] = [
  {
    id: 'st1',
    name: 'น้องพิมมี่ พัชรพร',
    role: 'ผู้เชี่ยวชาญด้านอสังหาริมทรัพย์น่ารัก',
    rating: 4.9,
    reviews: 124,
    experience: '6 ปีในวงการอสังหาฯ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256',
    specialty: 'เชี่ยวชาญคอนโดสไตล์คาเฟ่และทาวน์โฮมชานเมือง',
    tags: ['น่ารักสดใส', 'ตอบไวมาก', 'เจรจาเก่ง'],
    availability: true,
    color: 'pink'
  },
  {
    id: 'st2',
    name: 'คุณนพ นพรัตน์',
    role: 'นักวางแผนภาษีและบัญชีมือฉกาจ',
    rating: 4.8,
    reviews: 98,
    experience: '8 ปีด้านภาษีนิติบุคคล',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
    specialty: 'ช่วยธุรกิจขนาดกลางและเล็กประหยัดภาษีอย่างถูกหลักกฎหมาย',
    tags: ['ใส่ใจรายละเอียด', 'ใจดีมาก', 'ข้อมูลแน่น'],
    availability: true,
    color: 'yellow'
  },
  {
    id: 'st3',
    name: 'ครูแอนนี่ ศศิธร',
    role: 'ที่ปรึกษาแนะแนวศึกษาต่อต่างประเทศ',
    rating: 5.0,
    reviews: 145,
    experience: '10 ปีในการเรียนต่อยุโรปและอเมริกา',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256',
    specialty: 'ผู้เชี่ยวชาญการเตรียมพอร์ตโฟลิโอและซ้อมสัมภาษณ์ชิงทุน',
    tags: ['ใจดีอบอุ่น', 'เตรียมละเอียด', 'ประวัติผ่านฉลุย'],
    availability: true,
    color: 'sky'
  },
  {
    id: 'st4',
    name: 'น้องมินท์ ธนวัฒน์',
    role: 'นักสแกนความปลอดภัยและจัดหางานบริการ',
    rating: 4.7,
    reviews: 86,
    experience: '5 ปีด้านงานบุคคลและสรรหาพนักงาน',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256',
    specialty: 'คัดเลือกบุคลากรผ่านการตรวจสอบประวัติอาชญากรรมอย่างเข้มงวด',
    tags: ['ทำงานเป๊ะ', 'ใส่ใจจรรยาบรรณ', 'บริการไวมาก'],
    availability: false,
    color: 'mint'
  }
];

const CERTIFICATES: Certificate[] = [
  {
    id: 'c1',
    title: 'ใบอนุญาตนายหน้าอสังหาริมทรัพย์ระดับยอดเยี่ยม (REBA)',
    issuer: 'สมาคมนายหน้าอสังหาริมทรัพย์ไทย',
    year: '2568',
    certNo: 'REBA-2026-9988',
    category: 'อสังหาริมทรัพย์',
    description: 'รับรองความรู้ความสามารถตามมาตรฐานจรรยาบรรณวิชาชีพนายหน้าอสังหาฯ และกฎหมายซื้อขายทรัพย์สินอย่างเป็นธรรม'
  },
  {
    id: 'c2',
    title: 'ขึ้นทะเบียนผู้สอบบัญชีภาษีอากรอย่างเป็นทางการ (Tax Auditor)',
    issuer: 'กรมสรรพากร ประเทศไทย',
    year: '2567',
    certNo: 'TA-LIC-88776',
    category: 'การเงินและบัญชี',
    description: 'ได้รับสิทธิ์ในการตรวจสอบและรับรองงบการเงินของผู้เสียภาษีอย่างเป็นทางการตามข้อกำหนดของสรรพากร'
  },
  {
    id: 'c3',
    title: 'ตัวแทนแนะแนวการศึกษานานาชาติที่ได้รับการยอมรับ (ICEF Agent Trained)',
    issuer: 'สถาบันการศึกษาเพื่อการฝึกอบรมนานาชาติ (ICEF)',
    year: '2568',
    certNo: 'IATC-00995',
    category: 'การศึกษา',
    description: 'มาตรฐานระดับโลกสำหรับตัวแทนให้คำปรึกษาการศึกษาต่อต่างประเทศ มอบสิทธิ์ในการส่งนักเรียนเข้าศึกษาต่อในสถาบันพันธมิตร'
  }
];

export default function App() {
  // ==========================================
  // APP STATES
  // ==========================================
  const [activeTab, setActiveTab] = useState<'all' | 'property' | 'finance' | 'education' | 'jobs'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Toast Message state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'heart' } | null>(null);

  // Requirements Matching Form states
  const [selectedIndustry, setSelectedIndustry] = useState('อสังหาริมทรัพย์');
  const [budgetTier, setBudgetTier] = useState('แฮปปี้คลาสสิก (ปานกลาง)');
  const [urgencyLevel, setUrgencyLevel] = useState('ชิลๆ สบายๆ (1-2 สัปดาห์)');
  const [matchingResult, setMatchingResult] = useState<{
    matchedStaff: Staff;
    matchedService: Service;
    matchScore: number;
  } | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  // Selected Certificate Detail Modal
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactService, setContactService] = useState('นายหน้าหาบ้านและคอนโดสุดมินิมอล');

  // ==========================================
  // TOAST HANDLER
  // ==========================================
  const showToast = (message: string, type: 'success' | 'info' | 'heart' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // ==========================================
  // SEARCH & FILTER LOGIC
  // ==========================================
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Filter by Tab
      const matchesTab = 
        activeTab === 'all' ||
        (activeTab === 'property' && service.category === 'อสังหาริมทรัพย์') ||
        (activeTab === 'finance' && service.category === 'การเงินและบัญชี') ||
        (activeTab === 'education' && service.category === 'การศึกษา') ||
        (activeTab === 'jobs' && service.category === 'จัดหางาน');

      // Filter by Search Query
      const matchesSearch = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // ==========================================
  // MATCHING ALGORITHM SIMULATION
  // ==========================================
  const handleStartMatching = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setMatchingResult(null);

    setTimeout(() => {
      // Find staff related to this category if possible, or fallback
      let potentialStaff = STAFFS.filter(s => {
        if (selectedIndustry === 'อสังหาริมทรัพย์') return s.color === 'pink';
        if (selectedIndustry === 'การเงินและบัญชี') return s.color === 'yellow';
        if (selectedIndustry === 'การศึกษา') return s.color === 'sky';
        return s.color === 'mint';
      });

      if (potentialStaff.length === 0) potentialStaff = STAFFS;
      const matchedStaff = potentialStaff[Math.floor(Math.random() * potentialStaff.length)];

      // Find services related
      let potentialServices = SERVICES.filter(s => s.category === selectedIndustry);
      if (potentialServices.length === 0) potentialServices = SERVICES;
      const matchedService = potentialServices[Math.floor(Math.random() * potentialServices.length)];

      const score = Math.floor(Math.random() * 8) + 93; // 93% - 100% score

      setMatchingResult({
        matchedStaff,
        matchedService,
        matchScore: score
      });
      setIsMatching(false);
      showToast('ระบบได้ค้นหานายหน้าคู่ใจให้คุณสำเร็จแล้วค่า! ✨', 'heart');
    }, 1500);
  };

  // ==========================================
  // CONTACT SUBMISSION HANDLER
  // ==========================================
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactPhone) {
      showToast('กรุณากรอกข้อมูลสำคัญให้ครบถ้วนก่อนส่งนะคะ 🥺', 'info');
      return;
    }
    
    // Simulate successful API call
    showToast(`ส่งข้อความสำเร็จแล้วค่ะ คุณ ${contactName}! ทีมงานพาสเทลจะรีบติดต่อกลับด่วนที่สุดน้า 🌸`, 'success');
    
    // Clear Form
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMessage('');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#FFF5F7] via-[#FFFBF0] to-[#EFFFFD] text-slate-700 font-sans selection:bg-pink-200 antialiased overflow-x-hidden">
      
      {/* BACKGROUND DECORATIONS (Pastel Bubbles) */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-pink-200/40 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-96 right-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 left-1/3 w-60 h-60 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[800px] left-10 w-44 h-44 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* ==========================================
          HEADER / NAVIGATION
          ========================================== */}
      <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-md border-b border-pink-100/60 transition-all duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-tr from-pink-300 via-amber-200 to-sky-300 rounded-full flex items-center justify-center shadow-md shadow-pink-100 group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-bold bg-linear-to-r from-pink-500 via-purple-400 to-sky-500 bg-clip-text text-transparent">
                Axon CuteBroker
              </span>
              <p className="text-[10px] text-pink-400/80 tracking-widest uppercase font-medium">✨ Premium Pastel Broker ✨</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#services" className="hover:text-pink-500 transition-colors duration-200 flex items-center gap-1">
              <span>ค้นหาบริการ</span>
            </a>
            <a href="#matching" className="hover:text-pink-500 transition-colors duration-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>ระบบจับคู่อัจฉริยะ</span>
            </a>
            <a href="#certificates" className="hover:text-pink-500 transition-colors duration-200">คลังใบรับรอง</a>
            <a href="#staffs" className="hover:text-pink-500 transition-colors duration-200">สตาฟผู้เชี่ยวชาญ</a>
            <a href="#contact" className="hover:text-pink-500 transition-colors duration-200">ติดต่อสอบถาม</a>
          </nav>

          {/* Contact Badge Button */}
          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              className="px-5 py-2.5 bg-linear-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 text-white font-bold rounded-full text-xs shadow-md shadow-pink-200/80 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>โทรหาเราเลย</span>
            </a>
          </div>
        </div>
      </header>

      {/* ==========================================
          HERO BANNER
          ========================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100/60 border border-pink-200/50 rounded-full text-pink-600 text-xs font-extrabold animate-bounce">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
                <span>ตัวแทนอันดับหนึ่งในใจคุณ น่ารัก เป็นมิตร เชื่อถือได้ 100%</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                พบเจอนายหน้าและสตาฟ <br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-pink-500 via-amber-400 to-sky-500 bg-clip-text text-transparent">
                  สายพาสเทลแสนหวาน
                </span> <br />
                ผู้พร้อมช่วยเหลือคุณในทุกก้าว!
              </h1>

              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                เราเชื่อว่าบริการที่ดีไม่จำเป็นต้องตึงเครียดเสมอไป! มาร่วมเปิดประสบการณ์ค้นหาและจัดการความต้องการด้านการอยู่อาศัย การเงิน ภาษี และการศึกษาต่างประเทศ ผ่านทีมนายหน้าผู้เชี่ยวชาญพร้อมใบอนุญาตที่ถูกต้อง อบอุ่น และเป็นมิตรสูงสุดค่า ✨
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#matching" 
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-pink-400 via-amber-300 to-sky-400 hover:opacity-90 text-white font-black text-sm rounded-2xl shadow-xl shadow-pink-100/50 transition-all duration-300 text-center flex items-center justify-center gap-2.5 transform hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <span>ลองจับคู่นายหน้าคู่ใจฟรี!</span>
                </a>
                <a 
                  href="#services" 
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-pink-50/50 text-pink-500 font-bold text-sm rounded-2xl border-2 border-pink-100 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <span>สำรวจบริการทั้งหมด</span>
                  <ArrowRight className="w-4 h-4 text-pink-400" />
                </a>
              </div>

              {/* Stats badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-pink-100/40">
                <div className="text-center lg:text-left">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-pink-500">2,500+</span>
                  <span className="text-xs text-slate-400 font-semibold">แมตช์สำเร็จแล้ว</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-sky-500">4.9 / 5.0</span>
                  <span className="text-xs text-slate-400 font-semibold">คะแนนรีวิวเฉลี่ย</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-amber-500">100%</span>
                  <span className="text-xs text-slate-400 font-semibold">ความปลอดภัยถูกกฎหมาย</span>
                </div>
              </div>

            </div>

            {/* Right Column Visual Image Card Grid */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              
              {/* Backglow Circle */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/30 to-sky-300/30 rounded-[40px] rotate-3 blur-md scale-95 pointer-events-none"></div>

              {/* Immersive Mock Image Visual */}
              <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-[32px] border-4 border-pink-100/50 shadow-2xl space-y-6">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-sky-300 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-pink-400 bg-pink-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5" />
                    <span>แฮปปี้ไลฟ์</span>
                  </span>
                </div>

                {/* Main Illustration Area */}
                <div className="aspect-video w-full rounded-2xl bg-linear-to-br from-pink-100/60 via-amber-50/50 to-sky-100/60 flex flex-col items-center justify-center p-6 border border-dashed border-pink-200 relative overflow-hidden group">
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-200/40 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-2 left-2 w-10 h-10 bg-pink-200/50 rounded-full"></div>

                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-pink-100 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-pink-400 fill-pink-100" />
                  </div>
                  
                  <span className="mt-4 font-black text-slate-700 text-sm">บริการด้วยหัวใจ มีรอยยิ้มนำทาง</span>
                  <p className="text-[11px] text-slate-400 text-center mt-1">คัดเฉพาะสตาฟที่น่ารักและมีความสุขที่สุดเพื่อคุณ</p>

                  {/* Rating indicator overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs py-1 px-2 rounded-lg border border-pink-100 flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-bold text-slate-600">5.0 อบอุ่นใจ</span>
                  </div>
                </div>

                {/* Live Match Notification Banner Mock */}
                <div className="bg-pink-50/70 p-3.5 rounded-xl border border-pink-100/70 flex items-center gap-3">
                  <div className="w-9 h-9 bg-pink-200 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                    🎀
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-700 truncate">คุณรินรดา พึ่งได้รับจับคู่สำเร็จ!</p>
                    <p className="text-[10px] text-slate-400">กับผู้เชี่ยวชาญคอนโดสไตล์คาเฟ่ (98% Match)</p>
                  </div>
                  <span className="text-[10px] font-bold text-pink-400 shrink-0">1 นาทีที่แล้ว</span>
                </div>

              </div>

              {/* Decorative side cards */}
              <div className="hidden sm:block absolute -right-6 -bottom-6 w-36 bg-amber-100/90 border border-amber-200/50 p-3 rounded-2xl shadow-md rotate-6 transform transition-transform hover:rotate-0 duration-300">
                <div className="flex items-center gap-1.5 mb-1 text-amber-600">
                  <Award className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase">ปลอดภัย</span>
                </div>
                <p className="text-[11px] text-slate-600 font-bold leading-tight">มีใบอนุญาตจดทะเบียนพาณิชย์ทุกสายงาน</p>
              </div>

              <div className="hidden sm:block absolute -left-8 top-10 w-40 bg-sky-100/90 border border-sky-200/50 p-3.5 rounded-2xl shadow-md -rotate-6 transform transition-transform hover:rotate-0 duration-300">
                <div className="flex items-center gap-1.5 mb-1 text-sky-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase">รวดเร็วทันใจ</span>
                </div>
                <p className="text-[11px] text-slate-600 font-bold leading-tight">ติดต่อสตาฟเร็วทันใจใน 15 นาที</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          REQUIREMENTS MATCHING PANEL (INTERACTIVE WIDGET)
          ========================================== */}
      <section id="matching" className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="px-3.5 py-1.5 bg-yellow-100 border border-yellow-200 text-yellow-700 rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Smart matching system</span>
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-3">
              แผงจับคู่อัจฉริยะกับผู้ให้บริการที่ใช่
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              ประหยัดเวลาค้นหา! ระบุความต้องการของคุณ แล้วระบายนายหน้าอัจฉริยะจะคัดสรรบริการและสตาฟที่เหมาะสมที่สุดกับคุณทันทีค่ะ
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border-4 border-yellow-100 shadow-xl shadow-yellow-100/20 relative overflow-hidden">
            
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl pointer-events-none"></div>
            
            <form onSubmit={handleStartMatching} className="space-y-6 relative">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Category */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-pink-400" />
                    <span>1. ประเภทธุรกิจ/บริการ</span>
                  </label>
                  <select 
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold transition-colors duration-200"
                  >
                    <option value="อสังหาริมทรัพย์">🏡 อสังหาริมทรัพย์</option>
                    <option value="การเงินและบัญชี">💰 การเงินและบัญชี</option>
                    <option value="การศึกษา">🎓 การศึกษาต่อต่างประเทศ</option>
                    <option value="จัดหางาน">💼 จัดหางานและการบริการ</option>
                  </select>
                </div>

                {/* 2. Budget Tier */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-yellow-500" />
                    <span>2. ระดับงบประมาณ</span>
                  </label>
                  <select 
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold transition-colors duration-200"
                  >
                    <option value="มินิมอลพาสเทล (ประหยัด)">🌸 มินิมอลพาสเทล (ประหยัดงบ)</option>
                    <option value="แฮปปี้คลาสสิก (ปานกลาง)">🧸 แฮปปี้คลาสสิก (ยอดนิยม)</option>
                    <option value="พรีเมียมแกรนด์ (หรูหรา)">💎 พรีเมียมแกรนด์ (ดูแลส่วนตัว)</option>
                  </select>
                </div>

                {/* 3. Urgency */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>3. ระดับความเร่งด่วน</span>
                  </label>
                  <select 
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold transition-colors duration-200"
                  >
                    <option value="ชิลๆ สบายๆ (1-2 สัปดาห์)">☕ ชิลๆ สบายๆ (1-2 สัปดาห์)</option>
                    <option value="ด่วนปานกลาง (ภายใน 1 สัปดาห์)">⏰ ด่วนปานกลาง (ภายใน 7 วัน)</option>
                    <option value="ด่วนจี๋มะพร้าวแก้ว (ภายใน 3 วัน)">⚡ ด่วนจี๋มะพร้าวแก้ว (ใน 3 วัน)</option>
                  </select>
                </div>

              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isMatching}
                  className="px-8 py-4 bg-linear-to-r from-amber-400 to-pink-400 hover:from-amber-500 hover:to-pink-500 disabled:from-slate-200 disabled:to-slate-300 text-white font-black rounded-2xl shadow-md shadow-pink-100 transition-all duration-300 flex items-center gap-2 transform active:scale-95 cursor-pointer"
                >
                  {isMatching ? (
                    <>
                      <div className="w-4.5 h-4.5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>กำลังวิเคราะห์และหาคู่แท้...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4.5 h-4.5 text-yellow-200 animate-bounce" />
                      <span>เริ่มต้นค้นหานายหน้าที่เหมาะสมที่สุด</span>
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Simulated Result Box */}
            {matchingResult && (
              <div className="mt-8 pt-8 border-t-2 border-dashed border-pink-100/80 animate-fade-in-down">
                <div className="bg-linear-to-br from-[#FFF5F7] to-[#FFFBF0] rounded-2xl p-5 border-2 border-pink-100 relative">
                  
                  {/* Badge */}
                  <div className="absolute -top-3.5 left-6 bg-pink-400 text-white font-extrabold text-[10px] px-3.5 py-1 rounded-full uppercase tracking-widest shadow-xs flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>จับคู่สำเร็จ {matchingResult.matchScore}% Perfect Match!</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-2">
                    
                    {/* Staff matched */}
                    <div className="flex items-center gap-4 bg-white/70 p-3 rounded-xl border border-pink-100/50">
                      <img 
                        src={matchingResult.matchedStaff.avatar} 
                        alt={matchingResult.matchedStaff.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                      />
                      <div>
                        <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest block">สตาฟแนะแนวมืออาชีพ</span>
                        <h4 className="font-bold text-slate-800 text-sm">{matchingResult.matchedStaff.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{matchingResult.matchedStaff.role}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold text-slate-600">{matchingResult.matchedStaff.rating} ({matchingResult.matchedStaff.reviews} รีวิว)</span>
                        </div>
                      </div>
                    </div>

                    {/* Service matched */}
                    <div className="space-y-1 bg-white/70 p-3.5 rounded-xl border border-pink-100/50">
                      <div className="flex items-center gap-1.5 text-pink-500">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-xs font-extrabold">บริการแนะนำ:</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm">{matchingResult.matchedService.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{matchingResult.matchedService.description}</p>
                      <p className="text-[11px] font-bold text-pink-400 pt-1">{matchingResult.matchedService.priceRange}</p>
                    </div>

                  </div>

                  {/* CTAs for Match */}
                  <div className="mt-5 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <span className="text-xs text-slate-400 font-semibold text-center sm:text-right">พึงพอใจกับการจับคู่นี้ไหมคะ?</span>
                    <button 
                      onClick={() => {
                        setContactService(matchingResult.matchedService.title);
                        showToast(`เลือกบริการ "${matchingResult.matchedService.title}" ลงในแบบฟอร์มแล้วค่ะ`, 'info');
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto px-5 py-2 bg-pink-400 hover:bg-pink-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <span>จองคิว / ติดต่อบริการนี้เลย</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ==========================================
          SERVICES DISCOVERY SECTION
          ========================================== */}
      <section id="services" className="py-16 bg-white/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 bg-pink-100 border border-pink-200 text-pink-600 rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>บริการนายหน้าและผู้ช่วยรอบด้าน</span>
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-3">
              คลังบริการคัดสรรเพื่อรอยยิ้มของคุณ
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              ค้นหาและคัดกรองบริการตัวแทนนายหน้ามืออาชีพ ดูแลด้วยความซื่อสัตย์ ปลอดภัย ว่องไวสุดๆ น้า
            </p>
          </div>

          {/* Interactive Filters & Search bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center md:justify-start">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4.5 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
                  activeTab === 'all' 
                  ? 'bg-pink-400 text-white shadow-md shadow-pink-100' 
                  : 'bg-white hover:bg-pink-50 text-slate-500 border border-pink-100/50'
                }`}
              >
                🌈 ทุกบริการ
              </button>
              <button
                onClick={() => setActiveTab('property')}
                className={`px-4.5 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
                  activeTab === 'property' 
                  ? 'bg-pink-400 text-white shadow-md shadow-pink-100' 
                  : 'bg-white hover:bg-pink-50 text-slate-500 border border-pink-100/50'
                }`}
              >
                🏡 อสังหาริมทรัพย์
              </button>
              <button
                onClick={() => setActiveTab('finance')}
                className={`px-4.5 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
                  activeTab === 'finance' 
                  ? 'bg-yellow-400 text-white shadow-md shadow-yellow-100' 
                  : 'bg-white hover:bg-yellow-50 text-slate-500 border border-yellow-100/50'
                }`}
              >
                💰 การเงินและบัญชี
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-4.5 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
                  activeTab === 'education' 
                  ? 'bg-sky-400 text-white shadow-md shadow-sky-100' 
                  : 'bg-white hover:bg-sky-50 text-slate-500 border border-sky-100/50'
                }`}
              >
                🎓 การศึกษา
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-4.5 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
                  activeTab === 'jobs' 
                  ? 'bg-emerald-400 text-white shadow-md shadow-emerald-100' 
                  : 'bg-white hover:bg-emerald-50 text-slate-500 border border-emerald-100/50'
                }`}
              >
                💼 จัดหางาน
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-xs shrink-0">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder="ค้นหาบริการหรือแท็กคีย์เวิร์ด..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-pink-100 rounded-xl pl-9.5 pr-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-pink-300 font-semibold"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-pink-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Cards Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-pink-100">
              <span className="text-4xl">🧸</span>
              <p className="text-sm font-bold text-slate-400 mt-2">ไม่พบรายการบริการที่ตรงกับการค้นหาของคุณเลยค่ะ</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="mt-4 px-4 py-2 bg-pink-400 text-white rounded-xl text-xs font-bold"
              >
                รีเซ็ตการค้นหา
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                
                // Pastel color configuration
                let bgClass = "bg-pink-50/50 border-pink-100/80 hover:shadow-pink-100/50";
                let textClass = "text-pink-500";
                let badgeClass = "bg-pink-100 text-pink-600";
                let btnClass = "bg-pink-400 hover:bg-pink-500";

                if (service.color === 'yellow') {
                  bgClass = "bg-yellow-50/50 border-yellow-100/80 hover:shadow-yellow-100/50";
                  textClass = "text-yellow-600";
                  badgeClass = "bg-yellow-100 text-yellow-700";
                  btnClass = "bg-yellow-400 hover:bg-yellow-500";
                } else if (service.color === 'sky') {
                  bgClass = "bg-sky-50/50 border-sky-100/80 hover:shadow-sky-100/50";
                  textClass = "text-sky-500";
                  badgeClass = "bg-sky-100 text-sky-600";
                  btnClass = "bg-sky-400 hover:bg-sky-500";
                } else if (service.color === 'mint') {
                  bgClass = "bg-emerald-50/50 border-emerald-100/80 hover:shadow-emerald-100/50";
                  textClass = "text-emerald-600";
                  badgeClass = "bg-emerald-100 text-emerald-700";
                  btnClass = "bg-emerald-400 hover:bg-emerald-500";
                }

                return (
                  <div 
                    key={service.id}
                    className={`bg-white rounded-3xl border-2 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${bgClass}`}
                  >
                    <div>
                      {/* Badge category & rating */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${badgeClass}`}>
                          {service.category}
                        </span>
                        <div className="flex items-center gap-1 text-slate-500 bg-white px-2 py-0.5 rounded-lg text-xs border border-slate-100">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-slate-700">{service.rating}</span>
                        </div>
                      </div>

                      {/* Header Title with Icon */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-xs`}>
                          <IconComponent className={`w-5 h-5 ${textClass}`} />
                        </div>
                        <h3 className="font-black text-slate-800 text-base leading-snug group-hover:text-pink-500 transition-colors">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.tags.map((tag, idx) => (
                          <span key={idx} className="bg-white/80 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-100">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Info & Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <span className="block text-[10px] text-slate-400 font-medium">ค่าบริการแสนสบายกระเป๋า</span>
                        <span className={`text-xs font-extrabold ${textClass}`}>{service.priceRange}</span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setContactService(service.title);
                          showToast(`เลือกบริการ "${service.title}" แล้วน้า สอบถามข้อมูลได้ในแบบฟอร์มเลยค่ะ`, 'success');
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`px-4.5 py-2 text-white font-extrabold text-[11px] rounded-xl shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-1 ${btnClass}`}
                      >
                        <span>สนใจบริการ</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ==========================================
          CERTIFICATES SHOWCASE (HIGH-TRUST BADGES)
          ========================================== */}
      <section id="certificates" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 bg-sky-100 border border-sky-200 text-sky-600 rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>การรับรองและใบอนุญาตอย่างเป็นทางการ</span>
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-3">
              คลังใบรับรองและความน่าเชื่อถือของเรา
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              เพื่อความอุ่นใจและถูกต้องตามมาตรฐานกฎหมาย เราคัดเฉพาะสตาฟที่มีคุณสมบัติครบและใบรับรองของแท้เท่านั้นค่ะ
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CERTIFICATES.map((cert) => (
              <div 
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-white rounded-3xl border border-sky-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative group"
              >
                {/* Decorative Cert Icon */}
                <div className="absolute top-6 right-6 text-sky-200 group-hover:text-sky-300 transition-colors">
                  <ShieldCheck className="w-10 h-10 stroke-[1.5]" />
                </div>

                <span className="text-[10px] text-sky-400 font-black tracking-widest uppercase block mb-1">
                  YEAR {cert.year}
                </span>

                <h3 className="font-black text-slate-800 text-sm leading-snug group-hover:text-sky-500 transition-colors mb-2 pr-10">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-400 font-semibold mb-3">
                  ออกโดย: {cert.issuer}
                </p>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {cert.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold">เลขทะเบียน: {cert.certNo}</span>
                  <span className="text-[10px] font-black text-sky-500 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>ดูรายละเอียด</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cute assurance badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-linear-to-r from-pink-50 to-sky-50 border border-pink-100/50 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-xs font-bold text-slate-600 text-left">
                เอกสารและใบอนุญาตทั้งหมดผ่านการสแกนและยืนยันตัวตนทางกฎหมายแล้ว ปลอดภัยหายห่วง 100% ค่ะ
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          STAFF SHOWCASE (EXPERT INTRODUCTIONS)
          ========================================== */}
      <section id="staffs" className="py-16 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>ทีมสตาฟใจดี ยินดีให้บริการค่ะ</span>
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-3">
              แนะนำตัวแทนนายหน้าผู้เชี่ยวชาญพิเศษ
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              พร้อมพรั่งด้วยทัศนคติการบริการที่ละมุนละไม เป็นมิตร ใส่ใจ มีความรับผิดชอบ และยินดีให้คำปรึกษาตลอดวันค่า
            </p>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STAFFS.map((staff) => {
              // Custom colors matching styling
              let themeColor = "border-pink-100 hover:shadow-pink-100 bg-pink-50/20";
              let badgeColor = "bg-pink-100 text-pink-600";
              let heartColor = "text-pink-400";

              if (staff.color === 'yellow') {
                themeColor = "border-yellow-100 hover:shadow-yellow-100 bg-yellow-50/20";
                badgeColor = "bg-yellow-100 text-yellow-700";
                heartColor = "text-yellow-400";
              } else if (staff.color === 'sky') {
                themeColor = "border-sky-100 hover:shadow-sky-100 bg-sky-50/20";
                badgeColor = "bg-sky-100 text-sky-600";
                heartColor = "text-sky-400";
              } else if (staff.color === 'mint') {
                themeColor = "border-emerald-100 hover:shadow-emerald-100 bg-emerald-50/20";
                badgeColor = "bg-emerald-100 text-emerald-700";
                heartColor = "text-emerald-400";
              }

              return (
                <div 
                  key={staff.id}
                  className={`bg-white rounded-[32px] border-2 p-5 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${themeColor}`}
                >
                  
                  {/* Avatar wrapper */}
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <img 
                      src={staff.avatar} 
                      alt={staff.name} 
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                    />
                    
                    {/* Active/Offline status indicator */}
                    <span className={`absolute bottom-1 right-1 w-4.5 h-4.5 rounded-full border-3 border-white flex items-center justify-center text-[8px] font-bold ${
                      staff.availability ? 'bg-emerald-400' : 'bg-slate-300'
                    }`} title={staff.availability ? 'พร้อมตอบคำถามทันที' : 'ติดสายบริการ'}>
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="inline-flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-extrabold text-slate-700">{staff.rating} ({staff.reviews} รีวิว)</span>
                  </div>

                  <h3 className="font-black text-slate-800 text-base">{staff.name}</h3>
                  <p className="text-[11px] font-bold text-slate-400 mt-0.5">{staff.role}</p>

                  <div className="my-3 py-2 border-t border-b border-dashed border-slate-100 text-left">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      🎯 <strong className="text-slate-700">จุดเด่น:</strong> {staff.specialty}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                      🕒 ประสบการณ์: {staff.experience}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {staff.tags.map((t, idx) => (
                      <span key={idx} className={`text-[9px] font-black px-2 py-0.5 rounded-md ${badgeColor}`}>
                        🎀 {t}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <button 
                    onClick={() => {
                      setContactMessage(`ต้องการรับคำปรึกษาพิเศษส่วนตัวกับคุณ ${staff.name} เป็นกรณีพิเศษค่ะ 💖`);
                      showToast(`เชื่อมโยงคิวขอคำปรึกษากับคุณ ${staff.name} ในกล่องข้อความแล้วค่ะ`, 'heart');
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-2.5 bg-slate-50 hover:bg-pink-50 hover:text-pink-500 text-slate-600 font-extrabold text-[11px] rounded-xl transition-all duration-200 border border-slate-100 flex items-center justify-center gap-1.5"
                  >
                    <Heart className={`w-3.5 h-3.5 ${heartColor} fill-current`} />
                    <span>ขอรับบริการส่วนตัว</span>
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================
          CONTACT FORM SECTION
          ========================================== */}
      <section id="contact" className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="px-3.5 py-1.5 bg-pink-100 border border-pink-200 text-pink-600 rounded-full text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>ติดต่อส่งข้อความถึงพวกเรา</span>
            </span>
            <h2 className="text-3xl font-black text-slate-800 mt-3">
              นัดหมายปรึกษาฟรีกับนายหน้าพาสเทล
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              อยากสอบถามข้อมูลเพิ่มเติม หรือให้หาบริการแบบด่วนพิเศษ กรอกรายละเอียดตรงนี้ได้เลยค่ะ
            </p>
          </div>

          <div className="bg-white rounded-[40px] border-4 border-pink-100/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Cute absolute graphic */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-2xl pointer-events-none"></div>

            <form onSubmit={handleContactSubmit} className="space-y-6 relative">
              
              {/* Select Service of Interest */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-pink-400" />
                  <span>ประเภทบริการที่คุณพึงพอใจต้องการปรึกษา</span>
                </label>
                <select 
                  value={contactService}
                  onChange={(e) => setContactService(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold"
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="อื่นๆ (ระบุในรายละเอียดได้เลยค่ะ)">🌸 อื่นๆ (ต้องการรับคำขอปรึกษาพิเศษด้านอื่นๆ)</option>
                </select>
              </div>

              {/* Grid 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest">
                    ชื่อของคุณผู้รักความสุข
                  </label>
                  <input 
                    type="text" 
                    placeholder="กรอกชื่อแสนน่ารักของคุณ..."
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold placeholder-slate-400"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest">
                    ที่อยู่อีเมล (Email)
                    <span className="text-pink-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="เช่น hello@cutebroker.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold placeholder-slate-400"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest">
                    เบอร์โทรศัพท์ติดต่อกลับ
                  </label>
                  <input 
                    type="tel" 
                    placeholder="เช่น 081-XXXXXXX"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                    className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold placeholder-slate-400"
                  />
                </div>

              </div>

              {/* Message Details */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest">
                  เล่าความต้องการเบื้องต้นของคุณให้เราฟังสักนิดสิคะ 🌸
                </label>
                <textarea 
                  rows={4}
                  placeholder="เช่น ต้องการจัดหาบ้านเดี่ยวใกล้สถานี BTS แถวอารีย์ งบประมาณไม่เกิน 30,000 บาท/เดือน ด่วนภายในต้นเดือนหน้าค่ะ..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-pink-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-pink-300 font-semibold placeholder-slate-400 leading-relaxed"
                ></textarea>
              </div>

              {/* Information assurance */}
              <div className="flex items-start gap-2.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p>
                  ข้อมูลส่วนบุคคลของท่านจะได้รับการเก็บรักษาไว้เป็นความลับสูงสุดตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) เพื่อใช้วางแผนประสานงานสตาฟเท่านั้น ไม่มีประวัติการเปิดเผยต่อสาธารณะ
                </p>
              </div>

              {/* Submit btn */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 text-white font-black rounded-2xl shadow-xl shadow-pink-100 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span>ส่งแบบฟอร์มติดต่องานด่วน</span>
                </button>
              </div>

            </form>

          </div>

        </div>
      </section>

      {/* ==========================================
          FOOTER / FOOTNOTE
          ========================================== */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Logo area */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-linear-to-tr from-pink-300 to-sky-300 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-lg font-bold text-white bg-linear-to-r from-pink-400 to-sky-400 bg-clip-text text-transparent">
                  Axon CuteBroker
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                บริการนายหน้าแบบพรีเมียมในสไตล์น่ารักสดใส ให้ทุกความกังวลของคุณสลายไปด้วยการประสานงานที่มีมาตรฐานและถูกต้องตามกฎหมายทุกประการ
              </p>
              <div className="flex items-center gap-3 pt-2 text-slate-500">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                <span className="text-xs font-semibold">สร้างด้วยใจรักในพาสเทล</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">เมนูนำทางด่วน</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#services" className="hover:text-pink-300 transition-colors">ค้นหาบริการนายหน้า</a></li>
                <li><a href="#matching" className="hover:text-pink-300 transition-colors">แผงวิเคราะห์จับคู่ด่วน</a></li>
                <li><a href="#certificates" className="hover:text-pink-300 transition-colors">ใบรับรองและสมาคมพันธมิตร</a></li>
                <li><a href="#staffs" className="hover:text-pink-300 transition-colors">ผู้เชี่ยวชาญส่วนบุคคล</a></li>
              </ul>
            </div>

            {/* Support Categories */}
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">บริการที่เราเชี่ยวชาญ</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#services" className="hover:text-pink-300 transition-colors">ซื้อ-ขายคอนโดมีรสนิยม</a></li>
                <li><a href="#services" className="hover:text-pink-300 transition-colors">ที่ปรึกษาประหยัดภาษีธุรกิจ</a></li>
                <li><a href="#services" className="hover:text-pink-300 transition-colors">ขอทุนการศึกษาต่อยุโรป-สิงคโปร์</a></li>
                <li><a href="#services" className="hover:text-pink-300 transition-colors">จัดหาพนักงานผ่านตรวจสอบประวัติ</a></li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="space-y-3 text-xs">
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">สำนักงานใหญ่พาสเทล</h4>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                <span>ชั้น 15, อาคารพาสเทลทาวเวอร์, แขวงพญาไท, เขตพญาไท, กรุงเทพฯ 10400</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>support@axon-cutebroker.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>02-345-6789 (วันจันทร์-อาทิตย์: 09:00 - 21:00 น.)</span>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2569 Axon UI CuteBroker Generator. สงวนลิขสิทธิ์ตามกฎหมายไทย.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">เงื่อนไขการใช้บริการ</a>
              <span>•</span>
              <a href="#" className="hover:underline">นโยบายความเป็นส่วนตัว (PDPA)</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ==========================================
          TOAST NOTIFICATION MODAL
          ========================================== */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className="bg-white/95 backdrop-blur-md border-2 border-pink-200 p-4.5 rounded-2xl shadow-2xl flex items-center gap-3.5 max-w-sm">
            
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-pink-100 text-pink-500">
              {toast.type === 'success' && <Check className="w-4.5 h-4.5" />}
              {toast.type === 'info' && <Info className="w-4.5 h-4.5" />}
              {toast.type === 'heart' && <Heart className="w-4.5 h-4.5 fill-current text-pink-500" />}
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold text-slate-700 leading-tight">
                {toast.message}
              </p>
            </div>

            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          CERTIFICATE DETAIL POPUP MODAL
          ========================================== */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          
          <div className="bg-white rounded-[32px] border-4 border-sky-100 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-pink-100 text-slate-400 hover:text-pink-600 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="space-y-6 text-center">
              
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto text-sky-500">
                <Award className="w-9 h-9" />
              </div>

              <div>
                <span className="px-2.5 py-1 bg-sky-100 text-sky-600 rounded-full text-[10px] font-black uppercase tracking-wider inline-block">
                  ใบรับรองวิชาชีพอย่างเป็นทางการ
                </span>
                <h3 className="text-xl font-black text-slate-800 mt-3 leading-snug">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-sky-500 font-bold mt-1">
                  สมาคม / สถาบันผู้ออกหลักสูตร: {selectedCert.issuer}
                </p>
              </div>

              {/* Digital Certificate Plate Mock */}
              <div className="bg-slate-50 border-2 border-dashed border-sky-200/60 rounded-2xl p-4 text-left">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-3">
                  <span>Certificate ID: {selectedCert.certNo}</span>
                  <span>ปีที่ได้รับ: {selectedCert.year}</span>
                </div>
                
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {selectedCert.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-[10px] bg-sky-50/50 p-2 rounded-lg border border-sky-100/50">
                  <span className="text-sky-600 font-bold">สถานะความน่าเชื่อถือ: Verified ✔</span>
                  <span className="text-slate-400">อัปเดตล่าสุด: เมษายน 2569</span>
                </div>
              </div>

              {/* Assurance statement */}
              <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>สแกนข้อมูลและเก็บสำเนาไว้บนระบบบล็อกเชนเพื่อตรวจสอบความจริง</span>
              </div>

              {/* Action */}
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-700 font-extrabold text-xs rounded-xl transition-all"
                >
                  ปิดหน้าต่างนี้
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}