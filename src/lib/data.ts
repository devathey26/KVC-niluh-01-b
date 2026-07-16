// CMS-ready data layer for Kavitwo.
// All content collections are typed and centralized here so they can later be
// swapped for Supabase queries without touching component code.

export type AnnouncementCategory = 'Sekolah' | 'Kelas' | 'Acara' | 'Tugas';

export interface Announcement {
  id: string;
  title: string;
  date: string; // ISO
  category: AnnouncementCategory;
  preview: string;
  body: string;
  author: string;
}

export interface ScheduleSlot {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  start: string; // "07:30"
  end: string; // "09:00"
  subject: string;
  teacher: string;
  room: string;
  color: 'brand' | 'cream' | 'emerald' | 'sky' | 'rose' | 'violet';
}

export interface Student {
  id: string;
  name: string;
  nis: string;
  position?: string;
  bio: string;
  photo: string;
  tags: string[];
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  photo: string;
  email: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'Acara' | 'Aktivitas Kelas' | 'Behind The Scenes' | 'Proyek' | 'Kompetisi';
  span?: 'tall' | 'wide' | 'normal';
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'DOC' | 'ZIP' | 'LINK';
  size: string;
  url: string;
  category: 'Materi Belajar' | 'Tugas' | 'Jadwal' | 'Dokumen Sekolah';
}

export interface CalendarEvent {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  title: string;
  type: 'Ujian' | 'Libur' | 'Acara' | 'Deadline';
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

// ---------- Collections ----------

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Pekan Kreatif DKV 2026 — Pengumpulan Karya Dibuka',
    date: '2026-07-20',
    category: 'Acara',
    preview:
      'Pekan kreatif tahunan kembali hadir. Kumpulkan karya visual identity, motion, dan ilustrasi terbaikmu sebelum Jumat.',
    body: 'Pekan Kreatif DKV kembali dengan tiga kategori kompetisi: Visual Identity, Motion Graphics, dan Digital Illustration. Setiap siswa boleh mengumpulkan maksimal dua karya. Finalis akan dipamerkan di galeri sekolah dan dinilai oleh alumni yang sudah berkarier di industri.',
    author: 'Ibu Ayu Pratiwi',
  },
  {
    id: 'a2',
    title: 'Tipografi II — Brief Proyek Ujian Tengah',
    date: '2026-07-18',
    category: 'Tugas',
    preview:
      'Rancang editorial spread 12 halaman menggunakan satu keluarga typeface. Dikumpulkan Rabu depan.',
    body: 'Proyek ujian tengah mengeksplorasi hierarki, ritme, dan keterbatasan dalam satu keluarga typeface. Kumpulkan editorial spread 12 halaman (A4, portrait) beserta rationale 200 kata. PDF siap cetak dan file kerja sama-sama dibutuhkan.',
    author: 'Bapak Made Wirawan',
  },
  {
    id: 'a3',
    title: 'Libur Sekolah — Hari Raya Galungan',
    date: '2026-07-22',
    category: 'Sekolah',
    preview:
      'Kampus tutup dalam rangka Galungan. Materi belajar online tetap tersedia.',
    body: 'Dalam rangka Hari Raya Galungan, kampus akan tutup. Materi belajar online dan perpustakaan digital tetap dapat diakses. Jadwal reguler kembali seperti biasa pada Senin berikutnya.',
    author: 'Tata Usaha Sekolah',
  },
  {
    id: 'a4',
    title: 'Pertemuan Kelas — Sesi Review Portfolio',
    date: '2026-07-24',
    category: 'Kelas',
    preview:
      'Bawa tiga karya terkuat untuk ditinjau teman dan mentor. Ruang C-2 pukul 14.00.',
    body: 'Sesi review portfolio khusus Kelas XI DKV 2. Setiap siswa mempresentasikan tiga karya terkuat untuk masukan terstruktur dari teman dan mentor. Bawa thumbnail cetak dan file kerja di flashdisk.',
    author: 'Ibu Ayu Pratiwi',
  },
  {
    id: 'a5',
    title: 'Kompetisi Design Antar Kelas — Pendaftaran',
    date: '2026-07-26',
    category: 'Acara',
    preview:
      'Tema diumumkan: "Roots & Wings". Daftarkan tim tiga orang sebelum 30 Juli.',
    body: 'Kompetisi design antar kelas tahunan kembali dengan tema "Roots & Wings". Tim berisi tiga orang bertanding di kategori poster, packaging, dan social media. Daftar melalui ketua kelas paling lambat 30 Juli.',
    author: 'OSIS',
  },
  {
    id: 'a6',
    title: 'Teori Warna — Worksheet 04 Dikumpulkan',
    date: '2026-07-19',
    category: 'Tugas',
    preview:
      'Selesaikan latihan color harmony dan kumpulkan lewat portal resources.',
    body: 'Worksheet 04 mencakup analogous, complementary, dan split-complementary harmony. Kumpulkan lewat portal resources dalam satu PDF. Keterlambatan pengumpulan dikenakan pengurangan 10% per hari.',
    author: 'Bapak Ketut Adi',
  },
];

export const schedule: ScheduleSlot[] = [
  { id: 's1', day: 'Mon', start: '07:30', end: '09:00', subject: 'Tipografi II', teacher: 'Bapak Made Wirawan', room: 'C-2', color: 'brand' },
  { id: 's2', day: 'Mon', start: '09:15', end: '10:45', subject: 'Teori Warna', teacher: 'Bapak Ketut Adi', room: 'C-2', color: 'sky' },
  { id: 's3', day: 'Mon', start: '11:00', end: '12:30', subject: 'Fotografi', teacher: 'Ibu Ayu Pratiwi', room: 'Studio A', color: 'cream' },
  { id: 's4', day: 'Mon', start: '13:30', end: '15:00', subject: 'Bahasa Inggris', teacher: 'Ibu Ni Luh Sari', room: 'B-5', color: 'emerald' },

  { id: 's5', day: 'Tue', start: '07:30', end: '09:00', subject: 'Ilustrasi', teacher: 'Bapak Putu Danu', room: 'C-3', color: 'rose' },
  { id: 's6', day: 'Tue', start: '09:15', end: '10:45', subject: 'Motion Graphics', teacher: 'Bapak Made Wirawan', room: 'Lab 1', color: 'violet' },
  { id: 's7', day: 'Tue', start: '11:00', end: '12:30', subject: 'PPKn', teacher: 'Bapak Wayan Jaya', room: 'B-3', color: 'emerald' },
  { id: 's8', day: 'Tue', start: '13:30', end: '15:00', subject: 'Fotografi', teacher: 'Ibu Ayu Pratiwi', room: 'Studio A', color: 'cream' },

  { id: 's9', day: 'Wed', start: '07:30', end: '09:00', subject: 'Branding', teacher: 'Bapak Putu Danu', room: 'C-3', color: 'brand' },
  { id: 's10', day: 'Wed', start: '09:15', end: '10:45', subject: 'Tipografi II', teacher: 'Bapak Made Wirawan', room: 'C-2', color: 'sky' },
  { id: 's11', day: 'Wed', start: '11:00', end: '12:30', subject: 'Matematika', teacher: 'Bapak Gede Harta', room: 'B-1', color: 'emerald' },
  { id: 's12', day: 'Wed', start: '13:30', end: '15:00', subject: 'Ilustrasi', teacher: 'Bapak Putu Danu', room: 'C-3', color: 'rose' },

  { id: 's13', day: 'Thu', start: '07:30', end: '09:00', subject: 'Motion Graphics', teacher: 'Bapak Made Wirawan', room: 'Lab 1', color: 'violet' },
  { id: 's14', day: 'Thu', start: '09:15', end: '10:45', subject: 'Teori Warna', teacher: 'Bapak Ketut Adi', room: 'C-2', color: 'sky' },
  { id: 's15', day: 'Thu', start: '11:00', end: '12:30', subject: 'Bahasa Inggris', teacher: 'Ibu Ni Luh Sari', room: 'B-5', color: 'emerald' },
  { id: 's16', day: 'Thu', start: '13:30', end: '15:00', subject: 'Branding', teacher: 'Bapak Putu Danu', room: 'C-3', color: 'brand' },

  { id: 's17', day: 'Fri', start: '07:30', end: '09:00', subject: 'Fotografi', teacher: 'Ibu Ayu Pratiwi', room: 'Studio A', color: 'cream' },
  { id: 's18', day: 'Fri', start: '09:15', end: '10:45', subject: 'Ilustrasi', teacher: 'Bapak Putu Danu', room: 'C-3', color: 'rose' },
  { id: 's19', day: 'Fri', start: '11:00', end: '12:30', subject: 'Agama', teacher: 'Bapak Wayan Jaya', room: 'B-3', color: 'emerald' },
  { id: 's20', day: 'Fri', start: '13:30', end: '15:00', subject: 'Project Lab', teacher: 'Bapak Made Wirawan', room: 'Lab 1', color: 'violet' },
];

export const students: Student[] = [
  { id: 'st1', name: 'Arya Pratama', nis: '2411001', position: 'Ketua Kelas', bio: 'Penggemar editorial design. Suka grid system dan layout yang tenang.', photo: 'https://images.pexels.com/photos/6148101/pexels-photo-6148101.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Editorial', 'Tipografi'] },
  { id: 'st2', name: 'Kadek Sari Dewi', nis: '2411002', position: 'Wakil Ketua', bio: 'Spesialis warna dan branding. Percaya keterbatasan adalah kekuatan.', photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Branding', 'Warna'] },
  { id: 'st3', name: 'Putra Mahendra', nis: '2411003', bio: 'Penggerak motion graphics. Selalu keyframe sesuatu di waktu luang.', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Motion'] },
  { id: 'st4', name: 'Luh Ayu Saraswati', nis: '2411004', position: 'Bendahara', bio: 'Ilustrator yang suka risograph dan tekstur buatan tangan.', photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Ilustrasi'] },
  { id: 'st5', name: 'Bima Saputra', nis: '2411005', bio: 'Pecinta fotografi. Bawa dua kamera dan satu pendirian yang keras.', photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Fotografi'] },
  { id: 'st6', name: 'Citra Lestari', nis: '2411006', bio: 'Packaging dan print production. Hidup untuk margin bleed yang sempurna.', photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Packaging', 'Print'] },
  { id: 'st7', name: 'Dewa Anjasmara', nis: '2411007', bio: 'Penjelajah UI/UX. Merancang layar yang tenang dan jelas.', photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['UI/UX'] },
  { id: 'st8', name: 'Eka Wulandari', nis: '2411008', position: 'Sekretaris', bio: 'Suka editorial spread dan caption yang rapi. Pencatat catatan andalan.', photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Editorial'] },
  { id: 'st9', name: 'Fajar Nugroho', nis: '2411009', bio: '3D dan type in motion. Cinema 4D di malam hari.', photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['3D', 'Motion'] },
  { id: 'st10', name: 'Gita Maheswari', nis: '2411010', bio: 'Strategis brand in training. Tanya "kenapa" sebelum "gimana".', photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Branding', 'Strategi'] },
  { id: 'st11', name: 'Hendra Wijaya', nis: '2411011', bio: 'Suka poster, type lantang, dan jalan pulang yang sunyi.', photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Poster', 'Type'] },
  { id: 'st12', name: 'Intan Permata', nis: '2411012', bio: 'Ilustrasi dengan nuansa botani. Selalu menggambar dedaunan.', photo: 'https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=600', tags: ['Ilustrasi'] },
];

export const teachers: Teacher[] = [
  { id: 't1', name: 'Ibu Ayu Pratiwi', subject: 'Fotografi & Wali Kelas', photo: 'https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg?auto=compress&cs=tinysrgb&w=600', email: 'ayu.pratiwi@baliglobal.sch.id' },
  { id: 't2', name: 'Bapak Made Wirawan', subject: 'Tipografi & Motion', photo: 'https://images.pexels.com/photos/8617715/pexels-photo-8617715.jpeg?auto=compress&cs=tinysrgb&w=600', email: 'made.wirawan@baliglobal.sch.id' },
  { id: 't3', name: 'Bapak Putu Danu', subject: 'Ilustrasi & Branding', photo: 'https://images.pexels.com/photos/8550865/pexels-photo-8550865.jpeg?auto=compress&cs=tinysrgb&w=600', email: 'putu.danu@baliglobal.sch.id' },
  { id: 't4', name: 'Bapak Ketut Adi', subject: 'Teori Warna', photo: 'https://images.pexels.com/photos/8550863/pexels-photo-8550863.jpeg?auto=compress&cs=tinysrgb&w=600', email: 'ketut.adi@baliglobal.sch.id' },
];

export const gallery: GalleryItem[] = [
  { id: 'g1', src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Sesi kritik di studio', category: 'Aktivitas Kelas', span: 'tall' },
  { id: 'g2', src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Pembukaan Pekan Kreatif', category: 'Acara', span: 'wide' },
  { id: 'g3', src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Workshop teori warna', category: 'Aktivitas Kelas' },
  { id: 'g4', src: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Di balik lensa', category: 'Behind The Scenes' },
  { id: 'g5', src: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Draf editorial spread', category: 'Proyek', span: 'tall' },
  { id: 'g6', src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Kompetisi antar kelas', category: 'Kompetisi' },
  { id: 'g7', src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Motion lab', category: 'Behind The Scenes' },
  { id: 'g8', src: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Final branding', category: 'Proyek', span: 'wide' },
  { id: 'g9', src: 'https://images.pexels.com/photos/3184427/pexels-photo-3184427.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Galeri malam', category: 'Acara' },
  { id: 'g10', src: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=900', title: 'Spesimen type', category: 'Proyek' },
];

export const resources: ResourceItem[] = [
  { id: 'r1', title: 'Tipografi II — Reader Pack', description: 'Type pairing, aturan hierarki, dan template spesimen.', type: 'PDF', size: '4.2 MB', url: '#', category: 'Materi Belajar' },
  { id: 'r2', title: 'Worksheet Teori Warna', description: 'Empat worksheet lengkap dengan plat referensi.', type: 'PDF', size: '6.8 MB', url: '#', category: 'Materi Belajar' },
  { id: 'r3', title: 'Brief Editorial Ujian Tengah', description: 'Brief proyek, rubrik, dan template pengumpulan.', type: 'DOC', size: '1.1 MB', url: '#', category: 'Tugas' },
  { id: 'r4', title: 'Aset Motion Graphics', description: 'File AEP awal, font, dan klip contoh.', type: 'ZIP', size: '48 MB', url: '#', category: 'Tugas' },
  { id: 'r5', title: 'Jadwal Mingguan — Semester 4', description: 'Jadwal cetak A3, sudah berkode warna.', type: 'PDF', size: '0.8 MB', url: '#', category: 'Jadwal' },
  { id: 'r6', title: 'Tata Tertib Sekolah', description: 'Buku siswa dan kebijakan terbaru.', type: 'PDF', size: '2.3 MB', url: '#', category: 'Dokumen Sekolah' },
  { id: 'r7', title: 'Perpustakaan Resource — Notion', description: 'Tautan kurasi, referensi, dan rekaman.', type: 'LINK', size: 'Eksternal', url: '#', category: 'Materi Belajar' },
  { id: 'r8', title: 'Template Portfolio — Figma', description: 'File portfolio bersih untuk sesi review.', type: 'LINK', size: 'Eksternal', url: '#', category: 'Tugas' },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'c1', date: '2026-07-18', title: 'Ujian tengah Tipografi II', type: 'Deadline' },
  { id: 'c2', date: '2026-07-19', title: 'WS-04 Teori Warna dikumpulkan', type: 'Deadline' },
  { id: 'c3', date: '2026-07-20', title: 'Pengumpulan Pekan Kreatif dibuka', type: 'Acara' },
  { id: 'c4', date: '2026-07-22', title: 'Libur Galungan', type: 'Libur' },
  { id: 'c5', date: '2026-07-24', title: 'Sesi review portfolio', type: 'Acara' },
  { id: 'c6', date: '2026-07-26', title: 'Pendaftaran kompetisi antar kelas', type: 'Acara' },
  { id: 'c7', date: '2026-07-28', title: 'Quiz Motion Graphics', type: 'Ujian' },
  { id: 'c8', date: '2026-07-30', title: 'Batas pendaftaran kompetisi antar kelas', type: 'Deadline' },
  { id: 'c9', date: '2026-08-03', title: 'Ujian tengah Teori Warna', type: 'Ujian' },
  { id: 'c10', date: '2026-08-17', title: 'Hari Kemerdekaan — kampus tutup', type: 'Libur' },
];

export const stats: StatItem[] = [
  { label: 'Siswa', value: 30, icon: 'users' },
  { label: 'Mapel', value: 10, icon: 'book' },
];

export const navItems = [
  { label: 'Beranda', href: '#home' },
  { label: 'Jadwal', href: '#schedule' },
  { label: 'Pengumuman', href: '#announcements' },
  { label: 'Galeri', href: '#gallery' },
  { label: 'Siswa', href: '#students' },
  { label: 'Guru', href: '#teachers' },
  { label: 'Resources', href: '#resources' },
  { label: 'Tentang', href: '#about' },
] as const;

export const subjectColorMap: Record<ScheduleSlot['color'], { bg: string; dot: string; text: string; ring: string }> = {
  brand: { bg: 'bg-brand-500/15', dot: 'bg-brand-400', text: 'text-brand-200', ring: 'ring-brand-400/40' },
  cream: { bg: 'bg-cream-400/15', dot: 'bg-cream-400', text: 'text-cream-200', ring: 'ring-cream-400/40' },
  emerald: { bg: 'bg-emerald-500/15', dot: 'bg-emerald-400', text: 'text-emerald-200', ring: 'ring-emerald-400/40' },
  sky: { bg: 'bg-sky-500/15', dot: 'bg-sky-400', text: 'text-sky-200', ring: 'ring-sky-400/40' },
  rose: { bg: 'bg-rose-500/15', dot: 'bg-rose-400', text: 'text-rose-200', ring: 'ring-rose-400/40' },
  violet: { bg: 'bg-violet-500/15', dot: 'bg-violet-400', text: 'text-violet-200', ring: 'ring-violet-400/40' },
};

export const eventTypeMap: Record<CalendarEvent['type'], { dot: string; chip: string; label: string }> = {
  Ujian: { dot: 'bg-rose-400', chip: 'bg-rose-500/15 text-rose-200 border-rose-400/30', label: 'Ujian' },
  Libur: { dot: 'bg-emerald-400', chip: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30', label: 'Libur' },
  Acara: { dot: 'bg-brand-400', chip: 'bg-brand-500/15 text-brand-200 border-brand-400/30', label: 'Acara' },
  Deadline: { dot: 'bg-sky-400', chip: 'bg-sky-500/15 text-sky-200 border-sky-400/30', label: 'Deadline' },
};

export const categoryColorMap: Record<AnnouncementCategory, string> = {
  Sekolah: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
  Kelas: 'bg-sky-500/15 text-sky-200 border-sky-400/30',
  Acara: 'bg-brand-500/15 text-brand-200 border-brand-400/30',
  Tugas: 'bg-rose-500/15 text-rose-200 border-rose-400/30',
};

// Target hitung mundur kelulusan — mudah diganti.
export const graduationTarget = new Date('2027-06-12T08:00:00+08:00');
