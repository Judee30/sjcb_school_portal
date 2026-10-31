import { useEffect, useRef, useState } from 'react'
import { CalendarDays, BookOpen, Swords, Heart, LockKeyhole, X, Volume2, VolumeX, ArrowLeft, Sparkles, ChevronRight, PawPrint } from 'lucide-react'

type Screen = 'start' | 'loading' | 'home'
type Section = 'calendar' | 'events' | 'rules' | 'subjects' | 'reminders' | 'month' | null

const months = ['June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']
const sampleEvents = [
  { date: 'JUN 12', title: 'Independence Day Celebration', detail: 'Flag ceremony and classroom activities.' },
  { date: 'JUN 18', title: 'Classroom Orientation', detail: 'Meet your classmates and class adviser.' },
  { date: 'JUN 24', title: 'School Spirit Day', detail: 'Wear your section color and join the games.' },
]
const subjects = ['Oral Communication', 'Komunikasyon at Pananaliksik', 'General Mathematics', 'Earth and Life Science', 'Introduction to Philosophy', 'Physical Education']
const monthDetails: Record<string, string[]> = {
  June: ['Opening of Classes', 'Class Orientation', 'Independence Day'],
  July: ['School Club Registration', 'Reading Month Kickoff', 'First Quiz Week'],
  August: ['Buwan ng Wika', 'Science Activity Day', 'Classroom Clean-up'],
  September: ['Teachers’ Appreciation Prep', 'Midterm Review', 'Intramurals Tryouts'],
  October: ['United Nations Day', 'First Semester Exams', 'Semestral Break'],
  November: ['Classes Resume', 'School Organization Week', 'Project Checkpoint'],
  December: ['Christmas Program', 'Gift-Giving Activity', 'Holiday Break'],
  January: ['New Year Assembly', 'Second Semester Starts', 'Goal-Setting Week'],
  February: ['Valentine’s Day Fair', 'Arts and Culture Week', 'Research Checkpoint'],
  March: ['Final Examination Week', 'Recognition Day', 'Closing Activities'],
}

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [section, setSection] = useState<Section>(null)
  const [selectedMonth, setSelectedMonth] = useState('June')
  const [sound, setSound] = useState(true)
  const [loading, setLoading] = useState(0)
  const [petJump, setPetJump] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)

  const beep = (frequency = 560, duration = 0.07) => {
    if (!sound) return
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext
      if (!audioRef.current) audioRef.current = new Ctx()
      const ctx = audioRef.current
      if (ctx.state === 'suspended') void ctx.resume()
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()
      oscillator.type = 'square'
      oscillator.frequency.value = frequency
      gain.gain.setValueAtTime(0.035, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      oscillator.connect(gain); gain.connect(ctx.destination)
      oscillator.start(); oscillator.stop(ctx.currentTime + duration)
    } catch { /* Audio may be unavailable in some browsers. */ }
  }

  const startGame = () => {
    beep(720, 0.12)
    setScreen('loading')
    setLoading(0)
  }

  useEffect(() => {
    if (screen !== 'loading') return
    const timer = window.setInterval(() => {
      setLoading(current => {
        if (current >= 100) {
          window.clearInterval(timer)
          window.setTimeout(() => setScreen('home'), 350)
          return 100
        }
        return Math.min(100, current + 5 + Math.floor(Math.random() * 9))
      })
    }, 115)
    return () => window.clearInterval(timer)
  }, [screen])

  const openSection = (next: Section) => { beep(480, 0.06); setSection(next) }
  const closeSection = () => { beep(340, 0.06); setSection(null) }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      {screen === 'start' && (
        <div className="console start-screen">
          <HeaderTag />
          <Cloud className="cloud cloud-left" /><Cloud className="cloud cloud-right" />
          <div className="star star-a">✦</div><div className="star star-b">✧</div><div className="star star-c">✦</div>
          <div className="start-title"><span>WELCOME TO</span><strong>SJCB ICONS</strong><small>YOUR SCHOOL ADVENTURE BEGINS HERE</small></div>
          <button className="start-button" onClick={startGame}><span className="play-triangle">▶</span> START <Heart size={20} fill="#236c42" /></button>
          <div className="character-row start-characters"><PixelCharacter boy /><PixelCharacter girl /></div>
          <div className="console-bottom"><ConsoleLights /><span className="tiny-pill">A LITTLE PIXEL WORLD ✦</span></div>
          <button className="sound-toggle" onClick={() => setSound(!sound)} aria-label="Toggle sound">{sound ? <Volume2 size={16}/> : <VolumeX size={16}/>}</button>
        </div>
      )}

      {screen === 'loading' && (
        <div className="console loading-screen">
          <HeaderTag label="LOADING • PLEASE WAIT" />
          <Cloud className="cloud cloud-left" /><Cloud className="cloud cloud-right" />
          <div className="loading-scene">
            <PixelCharacter boy />
            <button className={`pet ${petJump ? 'pet-jump' : ''}`} onClick={() => { setPetJump(!petJump); beep(820, .08) }} aria-label="Make pet jump"><span className="pet-ears">⌃⌃</span><span className="pet-face">●ᴥ●</span><span className="pet-body">♧</span><Heart className="pet-heart" size={17} fill="#4c8557"/></button>
            <PixelCharacter girl />
          </div>
          <div className="progress-wrap"><div className="progress-track"><div className="progress-fill" style={{ width: `${loading}%` }}/></div><span>{loading >= 100 ? 'COMPLETE!' : `${loading}% • LOADING YOUR WORLD...`}</span></div>
          <button className="skip-button" onClick={() => { setLoading(100); setScreen('home'); beep(700) }}>CLICK TO SKIP LOADING »</button>
          <div className="console-bottom"><ConsoleLights /></div>
        </div>
      )}

      {screen === 'home' && (
        <div className="console home-screen">
          <HeaderTag />
          <div className="home-topline">
            <BrandBadge />
            <div className="welcome-copy"><strong>WELCOME BACK!</strong><span>WHAT WILL WE DO TODAY? ♥</span></div>
            <button className="sound-toggle inside" onClick={() => setSound(!sound)} aria-label="Toggle sound">{sound ? <Volume2 size={16}/> : <VolumeX size={16}/>}</button>
          </div>
          <div className="home-decor decor-bird">🐦</div><div className="home-decor decor-cloud">☁</div><div className="home-decor decor-bird-two">🐦</div>
          <div className="menu-grid">
            <MenuButton icon={<CalendarDays />} label="SCHOOL" second="CALENDAR" onClick={() => openSection('calendar')} />
            <MenuButton icon={<BookOpen />} label="SCHOOL" second="EVENTS" onClick={() => openSection('events')} />
            <MenuButton icon={<Swords />} label="RULES &" second="REGULATIONS" onClick={() => openSection('rules')} />
            <MenuButton icon={<LockKeyhole />} label="GRADE 11" second="SUBJECTS" onClick={() => openSection('subjects')} />
            <MenuButton icon={<Heart fill="#2e754b" />} label="IMPORTANT" second="REMINDERS" onClick={() => openSection('reminders')} />
          </div>
          <div className="console-bottom"><ConsoleLights /><span className="tiny-pill">SELECT A MENU TO EXPLORE</span><ConsoleLights /></div>
          {section && <Modal section={section} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} onClose={closeSection} onMonth={() => openSection('month')} beep={beep} />}
        </div>
      )}
      <footer className="demo-footer">PIXEL SCHOOL PORTAL <span>•</span> DEMO MODE <span>•</span> NO DATABASE REQUIRED</footer>
    </main>
  )
}

function HeaderTag({ label = 'SJCB  ♥  ICONS' }: { label?: string }) {
  return <div className="top-plate"><span>{label}</span><div className="plate-heart">♥</div></div>
}
function BrandBadge() {
  return <div className="brand-badge"><div className="mini-people"><span>👦🏻</span><span>👧🏻</span></div><div><b>SJCB ICONS</b><small>♥ SCHOOL PORTAL ♥</small></div></div>
}
function Cloud({ className }: { className: string }) {
  return <div className={className}><span /><span /><span /><span /></div>
}
function PixelCharacter({ girl = false, boy = false }: { girl?: boolean; boy?: boolean }) {
  return <div className={`pixel-character ${girl ? 'girl' : ''} ${boy ? 'boy' : ''}`} aria-label={girl ? 'pixel girl character' : 'pixel boy character'}>
    <div className="hair"><i/><i/><i/></div><div className="face"><span className="eye left-eye"/><span className="eye right-eye"/><span className="blush left-blush"/><span className="blush right-blush"/><span className="mouth"/></div>
    <div className="neck"/><div className="body"><span className="collar"/><span className="tie"/></div><div className="arms"><i/><i/></div><div className="legs"><i/><i/></div>
  </div>
}
function ConsoleLights() {
  return <div className="console-lights"><i/><i/><i/></div>
}
function MenuButton({ icon, label, second, onClick }: { icon: React.ReactNode; label: string; second: string; onClick: () => void }) {
  return <button className="menu-button" onClick={onClick}><div className="menu-icon">{icon}</div><span>{label}<br/>{second}</span></button>
}

function Modal({ section, selectedMonth, setSelectedMonth, onClose, onMonth, beep }: {
  section: Section; selectedMonth: string; setSelectedMonth: (month: string) => void; onClose: () => void; onMonth: () => void; beep: (frequency?: number, duration?: number) => void
}) {
  const titles: Record<string, string> = {
    calendar: 'SCHOOL CALENDAR', events: 'SCHOOL EVENTS', rules: 'RULES & REGULATIONS',
    subjects: 'GRADE 11 SUBJECTS', reminders: 'IMPORTANT REMINDERS', month: `${selectedMonth.toUpperCase()} FOLDER`,
  }
  return <div className="modal-shade" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
    <section className="content-window">
      <div className="window-title"><span>♥ {titles[section || 'calendar']} ♥</span><button onClick={onClose} aria-label="Close"><X size={17}/></button></div>
      <div className="window-content">
        {section === 'calendar' && <>
          <p className="pixel-intro">CHOOSE A MONTH TO OPEN YOUR SCHOOL FOLDER.</p>
          <div className="folder-grid">{months.map(month => <button key={month} className="folder-card" onClick={() => { setSelectedMonth(month); beep(600); onMonth() }}><FolderIcon/><span>{month.toUpperCase()}</span></button>)}</div>
        </>}
        {section === 'month' && <>
          <button className="back-link" onClick={() => { beep(390); onClose() }}><ArrowLeft size={14}/> BACK TO MENU</button>
          <p className="pixel-intro">SAMPLE ACTIVITIES & IMPORTANT DATES</p>
          <ul className="pixel-list">{(monthDetails[selectedMonth] || []).map((item, i) => <li key={item}><span className="list-date">{String(i + 1).padStart(2, '0')}</span><span>{item}</span><Sparkles size={15}/></li>)}</ul>
          <p className="demo-note">✦ Sample content for presentation purposes.</p>
        </>}
        {section === 'events' && <><p className="pixel-intro">WHAT'S HAPPENING AROUND SCHOOL?</p><div className="event-list">{sampleEvents.map(event => <article className="event-card" key={event.title}><strong>{event.date}</strong><div><b>{event.title}</b><p>{event.detail}</p></div></article>)}</div></>}
        {section === 'rules' && <><p className="pixel-intro">OUR LITTLE GUIDE TO A GREAT SCHOOL DAY</p><ul className="pixel-list">{['Be respectful to everyone.', 'Arrive on time and be prepared.', 'Keep classrooms clean and organized.', 'Follow school policies and teacher instructions.', 'Use gadgets responsibly during class.'].map((x, i) => <li key={x}><span className="list-date">{i + 1}</span><span>{x}</span><Heart size={14}/></li>)}</ul></>}
        {section === 'subjects' && <><p className="pixel-intro">GRADE 11 • SAMPLE SUBJECT LIST</p><div className="subject-grid">{subjects.map((subject, i) => <div className="subject-card" key={subject}><span>{['📘','📝','➗','🌎','💭','🏃'][i]}</span><b>{subject}</b></div>)}</div></>}
        {section === 'reminders' && <><p className="pixel-intro">A LITTLE REMINDER FOR YOU ♥</p><div className="reminder-hero"><Heart size={38} fill="#51bf7a"/><h3>YOU'VE GOT THIS!</h3><p>Every hour you spend learning brings you one step closer to your dreams.</p></div><ul className="pixel-list">{['Check your schedule every morning.', 'Bring your school ID and required materials.', 'Submit activities before the deadline.', 'Take breaks, drink water, and be kind to yourself.'].map((x, i) => <li key={x}><span className="list-date">♥</span><span>{x}</span></li>)}</ul></>}
      </div>
      <div className="window-footer"><span>♥ SJCB ICONS</span><span>DEMO CONTENT ONLY</span></div>
    </section>
  </div>
}
function FolderIcon() {
  return <span className="folder-icon"><i/><i/><i/></span>
}

export default App
