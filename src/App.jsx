import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Flame, 
  Zap, 
  Home as HomeIcon, 
  Gamepad2, 
  Compass, 
  User, 
  Search, 
  Mic,
  Star,
  BookOpen,
  Bookmark,
  ChevronRight,
  Trophy,
  Sun,
  Moon,
  CheckCircle2,
  Play
} from 'lucide-react';
import { MOCK_USER, WORD_MASTERY, RECENT_ACTIVITY, FEATURED_LESSON, QUESTIONS, WORD_DETAILS } from './data.js';

// --- Components ---

const TopBar = ({ xp }) => (
  <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-background/60 backdrop-blur-xl border-b border-outline-variant/5">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
        <Flame className="text-primary w-6 h-6 fill-current" />
      </div>
      <h1 className="text-text-main font-headline font-black tracking-tighter text-2xl">MozhiSense</h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="bg-surface-container-high px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant/10 shadow-[0_0_15px_rgba(var(--primary),0.1)]">
        <span className="text-primary font-mono font-black text-xs uppercase tracking-widest">{xp} XP</span>
      </div>
      <Menu className="text-text-muted w-6 h-6 cursor-pointer hover:text-primary transition-colors" />
    </div>
  </header>
);

const BottomNav = ({ currentScreen, setScreen }) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: HomeIcon },
    { id: 'play', label: 'PLAY', icon: Gamepad2 },
    { id: 'explore', label: 'EXPLORE', icon: Compass },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50 flex justify-around items-center h-16 px-6 glass-nav rounded-2xl shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`relative flex flex-col items-center justify-center transition-all duration-500 ${
              isActive ? 'text-primary' : 'text-text-muted hover:text-text-main'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} />
            <span className="font-mono text-[8px] font-black tracking-[0.2em]">{item.label}</span>
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

// --- Screens ---

const HomeScreen = ({ setScreen, setSelectedWord, xp, streak }) => {
  const [search, setSearch] = useState('');
  
  const handleWordClick = (word) => {
    setSelectedWord(word);
    setScreen('explore');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      handleWordClick(search.trim());
    }
  };

  return (
    <div className="space-y-12 pb-12">
      <section className="space-y-3">
        <h2 className="tamil-text text-5xl font-black text-text-main leading-[1.1] tracking-tighter">
          வணக்கம், <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">{MOCK_USER.name}</span>! 👋
        </h2>
        <p className="mono-text text-text-muted text-[10px] tracking-[0.4em] uppercase font-bold">The Art of Tamil Semantics</p>
        {/* ...existing code... */}
      </section>

      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="text-text-muted w-5 h-5 group-focus-within:text-primary transition-colors" />
        </div>
        <input 
          className="w-full bg-surface-container border border-outline-variant/10 rounded-2xl py-6 pl-16 pr-14 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 text-text-main placeholder:text-text-muted/40 mono-text text-sm transition-all shadow-sm" 
          placeholder='Search root words...' 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button type="button" className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 transition-all active:scale-95">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </form>

      <section className="flex flex-wrap gap-2">
        {['படி', 'ஆறு', 'கல்', 'திங்கள்', 'வாய்'].map(word => (
          <button 
            key={word} 
            onClick={() => handleWordClick(word)}
            className="bg-surface-container-high px-5 py-2.5 rounded-xl font-[Noto_Sans_Tamil] text-lg text-text-main hover:text-primary hover:bg-primary/5 border border-outline-variant/5 transition-all cursor-pointer active:scale-95"
          >
            {word}
          </button>
        ))}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hardware-card flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Flame className="w-20 h-20 text-primary" />
          </div>
          <div className="flex justify-between items-start">
            <span className="mono-text text-[10px] text-primary font-black tracking-[0.3em] uppercase">Daily Streak</span>
          </div>
          <div className="mt-8 flex items-baseline gap-2">
            <span className="text-6xl font-black text-text-main font-[Sora] tracking-tighter">{streak}</span>
            <span className="text-primary font-mono text-xs font-black tracking-widest uppercase">Days Active</span>
          </div>
        </div>

        <div className="hardware-card space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-text-muted font-black tracking-[0.3em] uppercase">XP Mastery</span>
            <span className="font-mono text-[10px] text-primary font-black">LVL {Math.floor(xp / 500) + 1}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-text-main font-[Sora]">{xp % 500}</span>
            <span className="text-text-muted text-xs font-mono font-bold">/ 500 XP</span>
          </div>
          <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(xp % 500) / 500 * 100}%` }}
              className="h-full bg-primary rounded-full relative shadow-[0_0_15px_var(--primary)]"
            />
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <h3 className="mono-text text-[10px] text-text-muted font-black tracking-[0.4em] uppercase">Featured Journey</h3>
          <span className="text-primary text-[10px] font-black tracking-widest uppercase cursor-pointer hover:underline">View All</span>
        </div>
        <div className="hardware-card group cursor-pointer hover:scale-[1.01] transition-transform duration-500">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-primary/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
              <div className="w-28 h-28 rounded-full bg-surface-container-high flex items-center justify-center shadow-2xl border border-outline-variant/10">
                <span className="font-[Noto_Sans_Tamil] text-5xl text-primary font-black">{FEATURED_LESSON.word}</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary text-[9px] font-black px-3 py-1 rounded-lg font-mono uppercase tracking-widest">{FEATURED_LESSON.type}</span>
                <span className="text-text-muted text-[10px] font-mono font-bold tracking-widest">{FEATURED_LESSON.duration}</span>
              </div>
              <h4 className="text-3xl font-black text-text-main sora-text leading-tight tracking-tighter">{FEATURED_LESSON.title}</h4>
                              <h4 className="text-3xl font-black text-text-main font-[Sora] leading-tight tracking-tighter">{FEATURED_LESSON.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed font-medium">{FEATURED_LESSON.description}</p>
              <div className="pt-4">
                <button 
                  onClick={() => setScreen('play')}
                  className="bg-text-main text-background font-mono font-black text-[10px] px-10 py-4 rounded-xl uppercase tracking-[0.3em] shadow-xl hover:bg-primary hover:text-on-primary transition-all active:scale-95"
                >
                  Begin Module
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8">
        <div className="hardware-card !p-0 overflow-hidden rounded-3xl border-none shadow-2xl group">
          <div className="relative h-64 md:h-80 w-full">
            <img 
              src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80" 
              alt="Ancient Tamil Temple Architecture" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="font-mono text-[9px] text-primary font-black tracking-[0.4em] uppercase mb-2">Heritage Integration</p>
              <h4 className="font-[Sora] text-2xl font-black text-text-main tracking-tight">Rooted in Tradition</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlayScreen = ({ addXp, streak, setStreak }) => {
  const [subTab, setSubTab] = useState('challenge');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const dropZoneRef = useRef(null);
  
  const currentQuestion = QUESTIONS[currentQuestionIdx];

  const handleDragEnd = (_event, info, idx) => {
    if (showFeedback) return;
    
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const rect = dropZone.getBoundingClientRect();
    const { x, y } = info.point;

    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      setSelectedOption(idx);
    }
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentQuestion.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      addXp(10);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setCurrentQuestionIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  return (
    <div className="max-w-3xl mx-auto pb-24">
      <nav className="flex justify-between items-center mb-12 bg-surface-container p-1.5 rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
        {[
          { id: 'challenge', label: 'CHALLENGE' },
          { id: 'practice', label: 'PRACTICE' },
          { id: 'review', label: 'REVIEW' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex-1 py-4 text-center mono-text text-[10px] tracking-[0.3em] font-black rounded-xl transition-all duration-500 ${
              subTab === tab.id 
                ? 'bg-text-main text-background shadow-lg' 
                : 'text-text-muted hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {subTab === 'challenge' && (
          <motion.div 
            key="challenge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-surface-container rounded-xl border border-outline-variant/5">
                <Flame className="text-primary w-4 h-4 fill-current" />
                <span className="mono-text text-xs font-black text-text-main">STREAK: {streak}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/5 rounded-xl border border-primary/20">
                <Zap className="text-primary w-4 h-4 fill-current" />
                <span className="mono-text text-xs font-black text-primary">+10 XP</span>
              </div>
            </div>

            <div className="h-1.5 w-full bg-surface-container rounded-full mb-16 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }}
                className="h-full bg-primary shadow-[0_0_10px_var(--primary)]"
              />
            </div>

            <section className="hardware-card relative overflow-hidden mb-12">
              <div className="text-center mb-12">
                <div className="flex flex-col items-center gap-1 mb-6">
                  <span className="mono-text text-[9px] tracking-[0.3em] text-primary uppercase font-black">Challenge</span>
                  <h3 className="sora-text text-base font-black text-text-main tracking-tight">Complete the Sentence</h3>
                </div>
                
                <div className="tamil-text text-2xl md:text-3xl font-black flex flex-wrap justify-center items-center gap-y-6 leading-tight tracking-tighter text-text-main">
                  <span>{currentQuestion.sentenceBefore}</span>
                  <div 
                    ref={dropZoneRef}
                    className={`mx-4 w-48 h-14 border-2 border-dashed rounded-xl flex items-center justify-center transition-all duration-500 ${selectedOption !== null ? 'border-primary bg-primary/5' : 'border-text-muted/20 bg-surface-container-high'}`}
                  >
                    {selectedOption !== null ? (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-primary tamil-text text-2xl"
                      >
                        {currentQuestion.options[selectedOption]}
                      </motion.span>
                    ) : (
                      <span className="text-text-muted/30 text-[9px] mono-text uppercase tracking-[0.3em] font-black">Drop Here</span>
                    )}
                  </div>
                  <span>{currentQuestion.sentenceAfter}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <motion.div
                    key={idx}
                    drag={!showFeedback}
                    dragSnapToOrigin
                    onDragEnd={(e, info) => handleDragEnd(e, info, idx)}
                    whileDrag={{ scale: 1.05, zIndex: 50 }}
                    className="relative"
                  >
                    <button 
                      onClick={() => !showFeedback && setSelectedOption(idx)}
                      disabled={showFeedback}
                      className={`w-full group p-4 md:p-6 rounded-xl transition-all duration-500 border-2 active:scale-95 flex items-center justify-center md:justify-between ${
                        selectedOption === idx 
                          ? 'bg-primary/5 border-primary shadow-lg shadow-primary/5' 
                          : 'bg-surface-container-high border-transparent hover:border-text-muted/20'
                      } ${showFeedback && idx === currentQuestion.correctIndex ? 'border-primary bg-primary/10' : ''} ${showFeedback && selectedOption === idx && idx !== currentQuestion.correctIndex ? 'border-red-500/50 bg-red-500/5' : ''}`}
                    >
                      <div className={`tamil-text text-sm md:text-base transition-colors text-center md:text-left ${selectedOption === idx ? 'text-primary' : 'text-text-main'}`}>{option}</div>
                      <div className={`hidden md:flex w-5 h-5 rounded-full border-2 items-center justify-center transition-all flex-shrink-0 ${selectedOption === idx ? 'border-primary bg-primary' : 'border-text-muted/20'}`}>
                        {selectedOption === idx && <CheckCircle2 className="w-3 h-3 text-background" />}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="space-y-6">
              {!showFeedback ? (
                <button 
                  onClick={handleCheck}
                  disabled={selectedOption === null}
                  className="w-full py-6 bg-text-main text-background mono-text font-black tracking-[0.4em] text-xs rounded-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-30 disabled:scale-100 hover:bg-primary hover:text-on-primary"
                >
                  VALIDATE RESPONSE
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className="w-full py-6 bg-primary text-on-primary mono-text font-black tracking-[0.4em] text-xs rounded-2xl shadow-2xl transition-all active:scale-95 hover:brightness-110"
                >
                  CONTINUE JOURNEY
                </button>
              )}
              
              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-6 rounded-2xl flex items-start gap-4 border ${isCorrect ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-red-500/5 border-red-500/20 text-red-500'}`}
                  >
                    <div className="mt-1">
                      {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-black mono-text text-[10px] uppercase tracking-[0.2em] mb-1">{isCorrect ? 'Precision Achieved' : 'Learning Opportunity'}</p>
                      <p className="font-bold text-sm leading-relaxed">{isCorrect ? 'Excellent semantic alignment. You earned 10 XP.' : currentQuestion.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {subTab === 'practice' && (
          <motion.div 
            key="practice"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-10"
          >
            <div className="hardware-card bg-primary/5 border-primary/20 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <BookOpen className="text-on-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="sora-text font-black text-2xl tracking-tight">Sense Explorer</h3>
                  <p className="mono-text text-[9px] text-primary font-black tracking-[0.3em] uppercase">WordNet Semantic Mapping</p>
                </div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                Tamil words are polysemous. Practice identifying the correct sense based on morphological cues and sentence structure.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/5">
                  <span className="mono-text text-[10px] font-black text-text-muted uppercase tracking-widest">Root Word</span>
                  <span className="tamil-text text-xl font-black text-primary">படி (Padi)</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { sense: 'To Read / Study', pos: 'Verb', example: 'பாடம் படி' },
                    { sense: 'Staircase / Step', pos: 'Noun', example: 'படி ஏறு' },
                    { sense: 'A Measure', pos: 'Noun', example: 'படி அரிசி' }
                  ].map((item, i) => (
                    <div key={i} className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 group hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-1 rounded-md mono-text uppercase tracking-widest">{item.pos}</span>
                        <div className="w-8 h-8 rounded-full border border-outline-variant/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                          <Play className="w-3 h-3 text-text-muted group-hover:text-on-primary" />
                        </div>
                      </div>
                      <h4 className="text-xl font-black text-text-main mb-2">{item.sense}</h4>
                      <p className="tamil-text text-lg text-text-muted opacity-60">{item.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="hardware-card space-y-4">
                <h4 className="mono-text text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Morphology Drill</h4>
                <p className="text-xs text-text-muted leading-relaxed">Decompose root words into their inflected forms across tense and gender.</p>
                <button className="w-full py-4 bg-surface-container text-text-main mono-text text-[9px] font-black tracking-[0.3em] rounded-xl border border-outline-variant/10 hover:bg-primary hover:text-on-primary transition-all">START DRILL</button>
              </div>
              <div className="hardware-card space-y-4">
                <h4 className="mono-text text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">POS Verification</h4>
                <p className="text-xs text-text-muted leading-relaxed">Identify the Part-of-Speech category for ambiguous words in complex syntax.</p>
                <button className="w-full py-4 bg-surface-container text-text-main mono-text text-[9px] font-black tracking-[0.3em] rounded-xl border border-outline-variant/10 hover:bg-primary hover:text-on-primary transition-all">START VERIFICATION</button>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'review' && (
          <motion.div 
            key="review"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-10"
          >
            <div className="flex justify-between items-end">
              <div>
                <h3 className="sora-text font-black text-3xl tracking-tight">Adaptive Recovery</h3>
                <p className="mono-text text-[9px] text-primary font-black tracking-[0.3em] uppercase">Weak Spot Identification Engine</p>
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                <span className="mono-text text-xs font-black text-primary">8 WEAK LINKS</span>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { word: 'ஆறு', error: 'Confusion between "River" and "Number 6"', frequency: 3, score: 42 },
                { word: 'கல்', error: 'Incorrect morphological inflection in past tense', frequency: 2, score: 58 }
              ].map((item, i) => (
                <div key={i} className="hardware-card relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6">
                    <div className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center">
                      <span className="mono-text text-[10px] font-black text-primary">{item.score}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
                      <span className="tamil-text text-3xl font-black text-text-main">{item.word}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-text-main">Semantic Drift Detected</h4>
                      <p className="text-xs text-text-muted max-w-md">{item.error}</p>
                      <div className="flex items-center gap-3 pt-2">
                        <span className="mono-text text-[8px] font-black text-primary uppercase tracking-widest">Retested {item.frequency}x</span>
                        <div className="w-1 h-1 bg-text-muted/30 rounded-full"></div>
                        <span className="mono-text text-[8px] font-black text-text-muted uppercase tracking-widest">Priority: High</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-outline-variant/5 flex gap-4">
                    <button className="flex-1 py-3 bg-text-main text-background mono-text text-[9px] font-black tracking-[0.3em] rounded-xl hover:bg-primary hover:text-on-primary transition-all">RETEST NOW</button>
                    <button className="px-6 py-3 bg-surface-container text-text-muted mono-text text-[9px] font-black tracking-[0.3em] rounded-xl border border-outline-variant/10 hover:text-text-main transition-all">ANALYZE</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hardware-card bg-surface-container-low border-dashed border-primary/30">
              <div className="flex flex-col items-center text-center space-y-4 py-6">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/20">
                  <Zap className="text-primary w-8 h-8" />
                </div>
                <h4 className="sora-text font-black text-xl">Perplexity Optimization</h4>
                <p className="text-xs text-text-muted max-w-sm leading-relaxed">
                  Our iNLTK perplexity gate has flagged these semantic anchors for re-validation. Complete these to stabilize your lexical graph.
                </p>
                <button className="px-10 py-4 bg-primary text-on-primary mono-text text-[10px] font-black tracking-[0.4em] rounded-xl shadow-2xl hover:brightness-110 transition-all">
                  STABILIZE GRAPH
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExploreScreen = ({ selectedWord, setSelectedWord }) => {
  const detail = WORD_DETAILS[selectedWord] || WORD_DETAILS['படி'];

  return (
    <div className="space-y-12 pb-20">
      <section className="relative w-full h-[380px] flex items-center justify-center overflow-hidden hardware-card !p-0 border-none bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.05),transparent_70%)]"></div>
        
        {/* Tech Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <motion.div 
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-full h-[2px] bg-primary shadow-[0_0_15px_var(--primary)]"
          />
        </div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <motion.line 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            x1="50%" y1="50%" x2="25%" y2="25%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" 
          />
          <motion.line 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            x1="50%" y1="50%" x2="75%" y2="35%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" 
          />
          <motion.line 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            x1="50%" y1="50%" x2="50%" y2="75%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" 
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            layoutId="root-word"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-text-main flex items-center justify-center ring-4 ring-primary/10 shadow-[0_0_30px_rgba(var(--primary),0.2)]"
          >
            <span className="tamil-text text-3xl md:text-4xl font-black text-background">{detail.word}</span>
          </motion.div>
          <div className="mt-4 px-3 py-1 bg-surface-container rounded-lg border border-outline-variant/10 shadow-sm">
            <span className="mono-text text-[8px] tracking-[0.3em] text-text-muted uppercase font-black">Semantic Core</span>
          </div>
        </div>

        {/* Floating Nodes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => setSelectedWord('படிக்க')}
          className="absolute left-[18%] top-[20%] flex flex-col items-center group cursor-pointer"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface-container-high flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500 shadow-lg">
            <span className="tamil-text text-lg md:text-xl font-black text-primary">படிக்க</span>
          </div>
          <div className="mt-2 px-2 py-0.5 bg-primary/10 rounded-md border border-primary/20">
            <span className="mono-text text-[7px] tracking-[0.2em] text-primary uppercase font-black">VERB</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setSelectedWord('ஆறு')}
          className="absolute right-[18%] top-[30%] flex flex-col items-center group cursor-pointer"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface-container-high flex items-center justify-center border border-text-muted/20 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500 shadow-lg">
            <span className="tamil-text text-lg md:text-xl font-black text-text-main">ஆறு</span>
          </div>
          <div className="mt-2 px-2 py-0.5 bg-surface-container rounded-md border border-outline-variant/10">
            <span className="mono-text text-[7px] tracking-[0.2em] text-text-muted uppercase font-black">DERIVATIVE</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-[15%] left-[48%] -translate-x-1/2 flex flex-col items-center group cursor-pointer"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-surface-container-high flex items-center justify-center border border-text-muted/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
            <span className="tamil-text text-lg md:text-xl font-black text-text-main">கல்</span>
          </div>
          <div className="mt-2 px-2 py-0.5 bg-surface-container rounded-md border border-outline-variant/10">
            <span className="mono-text text-[7px] tracking-[0.2em] text-text-muted uppercase font-black">ANALOGY</span>
          </div>
        </motion.div>
      </section>

      <motion.section 
        key={detail.word}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto space-y-8"
      >
        <div className="hardware-card relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BookOpen className="w-32 h-32" />
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex items-baseline gap-6">
              <h2 className="tamil-text text-6xl font-black premium-gradient-text">{detail.word}</h2>
              <span className="mono-text text-sm text-text-muted font-bold tracking-widest">[{detail.transliteration}]</span>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <p className="mono-text text-primary uppercase text-[10px] font-black tracking-[0.4em]">Primary Definition</p>
                <p className="text-text-main text-2xl font-black leading-tight">{detail.meaning}</p>
              </div>
              
              <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/10 relative group">
                <div className="absolute top-4 right-4">
                  <Mic className="text-primary/20 w-5 h-5" />
                </div>
                <p className="mono-text text-text-muted uppercase text-[9px] font-black tracking-[0.4em] mb-4">Contextual Application</p>
                <p className="tamil-text text-3xl text-primary font-black leading-relaxed mb-4">{detail.exampleTamil}</p>
                <p className="text-sm text-text-muted font-medium italic border-l-2 border-primary/20 pl-4">{detail.exampleEnglish}</p>
              </div>

              <div className="space-y-4">
                <p className="mono-text text-primary uppercase text-[10px] font-black tracking-[0.4em]">Morphological Architecture</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {detail.morphology.map((form, i) => (
                    <div key={i} className="bg-surface-container p-5 rounded-xl border border-outline-variant/5 hover:border-primary/20 transition-colors group">
                      <p className="mono-text text-[9px] text-text-muted mb-2 uppercase tracking-widest font-black group-hover:text-primary transition-colors">{form.label}</p>
                      <p className="tamil-text text-2xl text-text-main font-black">{form.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button 
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(detail.word);
                  utterance.lang = 'ta-IN';
                  window.speechSynthesis.speak(utterance);
                }}
                className="bg-text-main text-background mono-text py-5 rounded-2xl uppercase font-black text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-xl"
              >
                AUDITORY GUIDE
                <Mic className="w-5 h-5" />
              </button>
              <button className="border-2 border-text-main/10 text-text-main mono-text py-5 rounded-2xl uppercase font-black text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-surface-container transition-all active:scale-95">
                ARCHIVE WORD
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="hardware-card flex flex-col justify-between">
            <h3 className="mono-text text-[10px] text-text-muted font-black tracking-[0.4em] mb-6">USAGE VELOCITY</h3>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black sora-text text-primary tracking-tighter">{detail.frequency}</span>
              <div className="flex gap-1.5 mb-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-1.5 rounded-full ${i <= (detail.frequency === 'High' ? 3 : 2) ? 'bg-primary' : 'bg-primary/10'}`} style={{ height: `${i * 8}px` }}></div>
                ))}
              </div>
            </div>
          </div>
          <div className="hardware-card flex flex-col justify-between">
            <h3 className="mono-text text-[10px] text-text-muted font-black tracking-[0.4em] mb-6">SEMANTIC RELIANCE</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Star className="text-primary w-6 h-6 fill-current" />
              </div>
              <span className="text-xl font-black sora-text text-text-main tracking-tight">{detail.reliance}</span>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const ProfileScreen = ({ theme, setTheme, xp, streak }) => (
  <div className="space-y-12 pb-20">
    <section className="flex flex-col items-center text-center space-y-6">
      <div className="relative group">
        <div className="w-40 h-40 rounded-3xl overflow-hidden ring-8 ring-primary/5 p-1 transition-transform duration-700 group-hover:rotate-3">
          <img 
            alt="User profile" 
            className="w-full h-full object-cover rounded-2xl" 
            src={MOCK_USER.avatar}
            referrerPolicy="no-referrer"
          />
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-3 -right-3 bg-text-main text-background px-5 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] mono-text shadow-2xl border border-white/10"
        >
          LVL {Math.floor(xp / 500) + 1}
        </motion.div>
      </div>
      <div className="space-y-2">
        <h1 className="sora-text font-black text-4xl tracking-tighter tamil-text text-text-main">{MOCK_USER.tamilName}</h1>
        <p className="mono-text text-primary text-[10px] tracking-[0.4em] uppercase font-black opacity-80">{MOCK_USER.name} · Senior Linguist</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { id: 'dark', label: 'Lunar (Gold)', icon: Moon },
          { id: 'light', label: 'Solar (Green)', icon: Sun },
          { id: 'white-green', label: 'White with Green', icon: Sun }
        ].map((t) => (
          <button 
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all active:scale-95 shadow-lg group ${
              theme === t.id 
                ? 'bg-primary text-on-primary border-primary' 
                : 'bg-surface-container border-outline-variant/10 hover:border-primary/30'
            }`}
          >
            <t.icon className={`w-4 h-4 ${theme === t.id ? 'text-on-primary' : 'text-primary'}`} />
            <span className="mono-text text-[9px] font-black uppercase tracking-[0.2em]">
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </section>

    <section className="grid grid-cols-3 gap-4">
      {[
        { icon: Flame, value: streak, label: 'Streak', color: 'text-primary' },
        { icon: Trophy, value: xp.toLocaleString(), label: 'Total XP', color: 'text-primary' },
        { icon: Zap, value: `${MOCK_USER.accuracy}%`, label: 'Accuracy', color: 'text-primary' }
      ].map((stat, i) => (
        <div key={i} className="hardware-card !p-6 flex flex-col items-center justify-center space-y-2 group hover:scale-[1.02] transition-transform">
          <stat.icon className={`${stat.color} w-5 h-5 fill-current`} />
          <span className="mono-text text-xl font-black text-text-main leading-none">{stat.value}</span>
          <span className="mono-text text-[8px] text-text-muted uppercase tracking-[0.2em] font-black">{stat.label}</span>
        </div>
      ))}
    </section>

    <section className="space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="sora-text font-bold text-sm tracking-widest uppercase text-outline">Word Mastery</h2>
        <span className="mono-text text-[10px] text-primary cursor-pointer">VIEW ALL</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WORD_MASTERY.map((item, idx) => (
          <div key={idx} className="bg-surface-container p-5 rounded-xl flex flex-col items-center space-y-4 relative overflow-hidden">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-background stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                <path 
                  className={`${item.color === 'primary' ? 'text-primary' : 'text-secondary'} stroke-current`} 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  strokeDasharray={`${item.percentage}, 100`} 
                  strokeLinecap="round" 
                  strokeWidth="3"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                ></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="mono-text text-xs font-bold text-text-main">{item.percentage}%</span>
              </div>
            </div>
            <div className="text-center">
              <div className="tamil-text text-2xl font-bold leading-tight text-text-main">{item.word}</div>
              <div className="mono-text text-[10px] text-text-muted uppercase">{item.transliteration}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="sora-text font-bold text-sm tracking-widest uppercase text-outline">Recent Activity</h2>
      <div className="space-y-4">
        {RECENT_ACTIVITY.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl group transition-all duration-300">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.type === 'game' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
              {activity.type === 'game' ? <Gamepad2 className="w-5 h-5" /> : <Star className="w-5 h-5 fill-current" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-main">{activity.title}: <span className={`mono-text ${activity.type === 'game' ? 'text-primary' : 'text-secondary'}`}>{activity.detail}</span></p>
              <p className="mono-text text-[10px] text-text-muted uppercase">{activity.time}</p>
            </div>
            {activity.xp && <div className="mono-text text-xs font-bold text-primary">+{activity.xp} XP</div>}
            {activity.type === 'badge' && <ChevronRight className="text-secondary w-5 h-5" />}
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default function App() {
  const [screen, setScreen] = useState('home');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('mozhi-theme');
    return saved || 'dark';
  });
  const [xp, setXp] = useState(() => Number(localStorage.getItem('mozhi-xp')) || 250);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('mozhi-streak')) || 5);
  const [selectedWord, setSelectedWord] = useState('படி');

  useEffect(() => {
    localStorage.setItem('mozhi-theme', theme);
    document.documentElement.classList.remove('light', 'dark', 'white-green');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('mozhi-xp', xp.toString());
    localStorage.setItem('mozhi-streak', streak.toString());
  }, [xp, streak]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  const [showLevelUp, setShowLevelUp] = useState(false);

  const addXp = (amount) => {
    const oldLevel = Math.floor(xp / 500) + 1;
    const newXp = xp + amount;
    const newLevel = Math.floor(newXp / 500) + 1;
    
    setXp(newXp);
    
    if (newLevel > oldLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen setScreen={setScreen} setSelectedWord={setSelectedWord} xp={xp} streak={streak} />;
      case 'play': return <PlayScreen addXp={addXp} streak={streak} setStreak={setStreak} />;
      case 'explore': return <ExploreScreen selectedWord={selectedWord} setSelectedWord={setSelectedWord} />;
      case 'profile': return <ProfileScreen theme={theme} setTheme={setTheme} xp={xp} streak={streak} />;
      default: return <HomeScreen setScreen={setScreen} setSelectedWord={setSelectedWord} xp={xp} streak={streak} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main pb-32 transition-colors duration-300">
      <TopBar xp={xp} />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav currentScreen={screen} setScreen={setScreen} />
      
      <AnimatePresence>
        {showLevelUp && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-secondary text-on-secondary px-8 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-2 border-4 border-white/20"
          >
            <Trophy className="w-12 h-12" />
            <div className="text-center">
              <h3 className="font-headline font-black text-3xl uppercase tracking-tighter premium-gradient-text">LEVEL UP!</h3>
              <p className="mono-text text-[10px] font-black tracking-[0.4em] opacity-80">PHASE {Math.floor(xp / 500) + 1} INITIATED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
