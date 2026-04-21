'use client';

import { useState, useEffect } from 'react';
import WorkoutForm, { WorkoutParams } from '@/components/WorkoutForm';
import ExerciseCard, { Exercise } from '@/components/ExerciseCard';
import { RefreshCw, Dumbbell, Flame, Clock, Calendar, CheckSquare, ChevronRight, Zap, Heart, LogOut, User, Save, FolderOpen, Trash2 } from 'lucide-react';

export interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

interface SavedProgram {
  id: string;
  name: string;
  savedAt: string;
  program: WorkoutDay[];
  completedExercises: string[];
  params: WorkoutParams | null;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loginName, setLoginName] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  const [program, setProgram] = useState<WorkoutDay[] | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<WorkoutParams | null>(null);
  const [savedPrograms, setSavedPrograms] = useState<SavedProgram[]>([]);
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);

  // Helper: get user-scoped localStorage key
  const userKey = (key: string) => `soku_${currentUser}_${key}`;

  // Check for existing user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('soku_current_user');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setIsHydrated(true);
  }, []);

  // Load user-specific data when user changes
  useEffect(() => {
    if (!currentUser) return;

    // Load saved programs library
    const savedLib = localStorage.getItem(userKey('library'));
    if (savedLib) setSavedPrograms(JSON.parse(savedLib));

    // Load active program
    const savedProgram = localStorage.getItem(userKey('program'));
    const savedCompleted = localStorage.getItem(userKey('completed'));
    const savedParams = localStorage.getItem(userKey('params'));
    const savedActiveId = localStorage.getItem(userKey('activeProgramId'));
    
    if (savedProgram) setProgram(JSON.parse(savedProgram));
    if (savedCompleted) setCompletedExercises(JSON.parse(savedCompleted));
    if (savedParams) setLastParams(JSON.parse(savedParams));
    if (savedActiveId) setActiveProgramId(savedActiveId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleLogin = () => {
    const name = loginName.trim();
    if (!name) return;
    localStorage.setItem('soku_current_user', name);
    setCurrentUser(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('soku_current_user');
    setCurrentUser(null);
    setProgram(null);
    setCompletedExercises([]);
    setLastParams(null);
    setLoginName('');
  };

  const generateWorkout = async (params: WorkoutParams) => {
    setIsLoading(true);
    setError(null);
    setActiveDayIndex(0);
    setLastParams(params);
    
    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate workout.');
      }

      const data = await response.json();
      
      // Inject stable IDs
      const newProgram = data.program.map((day: any, dIdx: number) => ({
        ...day,
        exercises: day.exercises.map((ex: any, eIdx: number) => ({
          ...ex,
          id: `day${dIdx}-ex${eIdx}`
        }))
      }));

      setProgram(newProgram);
      setCompletedExercises([]);
      setActiveProgramId(null); // new unsaved program
      
      // Save to user-scoped local storage
      localStorage.setItem(userKey('program'), JSON.stringify(newProgram));
      localStorage.setItem(userKey('completed'), JSON.stringify([]));
      localStorage.setItem(userKey('params'), JSON.stringify(params));
      localStorage.removeItem(userKey('activeProgramId'));
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = (exerciseId: string) => {
    setCompletedExercises(prev => {
      const isDone = prev.includes(exerciseId);
      const newCompleted = isDone 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId];
      
      localStorage.setItem(userKey('completed'), JSON.stringify(newCompleted));

      // Auto-sync to saved library if this program is saved
      if (activeProgramId) {
        const updated = savedPrograms.map(sp => 
          sp.id === activeProgramId 
            ? { ...sp, completedExercises: newCompleted }
            : sp
        );
        setSavedPrograms(updated);
        localStorage.setItem(userKey('library'), JSON.stringify(updated));
      }

      return newCompleted;
    });
  };

  // ─── SAVED PROGRAMS FUNCTIONS ───
  const saveCurrentProgram = () => {
    if (!program || !currentUser) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const focus = lastParams?.muscleFocus || 'Custom';
    const days = program.length;
    const name = `${focus} · ${days}-Day · ${dateStr}`;

    // If it's already saved (has activeProgramId), update it
    if (activeProgramId) {
      const updated = savedPrograms.map(sp => 
        sp.id === activeProgramId 
          ? { ...sp, program, completedExercises, params: lastParams }
          : sp
      );
      setSavedPrograms(updated);
      localStorage.setItem(userKey('library'), JSON.stringify(updated));
      return;
    }

    const newSaved: SavedProgram = {
      id: `prog_${Date.now()}`,
      name,
      savedAt: now.toISOString(),
      program,
      completedExercises,
      params: lastParams,
    };

    const updated = [newSaved, ...savedPrograms];
    setSavedPrograms(updated);
    setActiveProgramId(newSaved.id);
    localStorage.setItem(userKey('library'), JSON.stringify(updated));
    localStorage.setItem(userKey('activeProgramId'), newSaved.id);
  };

  const loadSavedProgram = (sp: SavedProgram) => {
    setProgram(sp.program);
    setCompletedExercises(sp.completedExercises);
    setLastParams(sp.params);
    setActiveDayIndex(0);
    setActiveProgramId(sp.id);
    setError(null);

    localStorage.setItem(userKey('program'), JSON.stringify(sp.program));
    localStorage.setItem(userKey('completed'), JSON.stringify(sp.completedExercises));
    if (sp.params) localStorage.setItem(userKey('params'), JSON.stringify(sp.params));
    localStorage.setItem(userKey('activeProgramId'), sp.id);
  };

  const deleteSavedProgram = (id: string) => {
    const updated = savedPrograms.filter(sp => sp.id !== id);
    setSavedPrograms(updated);
    localStorage.setItem(userKey('library'), JSON.stringify(updated));
    if (activeProgramId === id) {
      setActiveProgramId(null);
      localStorage.removeItem(userKey('activeProgramId'));
    }
  };

  const activeDay = program ? program[activeDayIndex] : null;
  const totalSets = activeDay ? activeDay.exercises.reduce((sum, ex) => sum + ex.sets, 0) : 0;
  const dayProgress = activeDay ? activeDay.exercises.filter(ex => ex.id && completedExercises.includes(ex.id)).length : 0;
  const totalExercisesForDay = activeDay?.exercises.length || 0;
  const isDayComplete = dayProgress > 0 && dayProgress === totalExercisesForDay;

  // Don't render until hydrated to avoid flicker
  if (!isHydrated) return null;

  // ─── LOGIN SCREEN ───
  if (!currentUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '24px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', borderRadius: '24px', overflow: 'hidden' }}>
          {/* Background photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/hero-gym.png" 
            alt="Gym" 
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.97) 30%, rgba(5,5,8,0.7) 70%, rgba(5,5,8,0.4) 100%)' }} />
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, padding: '60px 40px 48px' }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/soku-logo.png" 
                alt="Soku Fitness" 
                style={{ width: 72, height: 72, borderRadius: '16px', margin: '0 auto 16px', display: 'block' }} 
              />
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>
                Welcome to <span className="text-gradient">Soku Fitness</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
                Your personal AI workout planner
              </p>
            </div>

            {/* Name input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <User size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name to get started"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="select-field"
                style={{ 
                  width: '100%', padding: '14px 18px', fontSize: '1.05rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px', color: 'white', outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                autoFocus
              />
            </div>
            
            <button
              className="btn-primary"
              onClick={handleLogin}
              disabled={!loginName.trim()}
              style={{ 
                width: '100%', padding: '14px', fontSize: '1.05rem', fontWeight: 700,
                opacity: loginName.trim() ? 1 : 0.4, cursor: loginName.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              <Zap size={18} /> Start Training
            </button>

            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: '16px' }}>
              Your progress is saved locally on this device
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-layout">
      {/* Sidebar Form */}
      <div>
        <WorkoutForm onSubmit={generateWorkout} isLoading={isLoading} />
      </div>

      {/* Main Content Area */}
      <div>
        {/* User greeting bar */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          marginBottom: '20px', padding: '12px 18px', borderRadius: '12px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
            👋 Welcome back, <strong style={{ color: 'var(--accent-secondary)' }}>{currentUser}</strong>
          </span>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer', fontSize: '0.85rem', padding: '6px 10px',
              borderRadius: '8px', transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'none'; }}
          >
            <LogOut size={14} /> Log out
          </button>
        </div>

        {isLoading && (
          <div className="glass-panel" style={{ padding: '80px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="loader-ring" style={{ marginBottom: '24px' }}>
              <RefreshCw size={40} color="var(--accent-color)" style={{ animation: 'spin 1.5s linear infinite' }} />
            </div>
            <h2 className="text-gradient" style={{ fontSize: '1.5rem' }}>Designing Your Perfect Routine...</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '400px' }}>
              Our AI personal trainer is crafting an optimized {lastParams?.daysPerWeek || 'weekly'} plan for your {lastParams?.goal?.toLowerCase() || 'fitness'} goals.
            </p>
          </div>
        )}

        {error && (
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--danger-color)' }}>
            <h3 style={{ color: 'var(--danger-color)', marginBottom: '8px' }}>Error</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
          </div>
        )}

        {!isLoading && !error && !program && (
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: '420px', display: 'flex', alignItems: 'flex-end' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/hero-gym.png" 
              alt="Gym background"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Dark gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.5) 50%, rgba(5,5,8,0.15) 100%)' }} />
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '600px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '20px', padding: '6px 14px', marginBottom: '16px' }}>
                <Dumbbell size={14} color="var(--accent-color)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-color)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI-Powered</span>
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px' }}>
                Ready to <span className="text-gradient">Transform?</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '0' }}>
                Fill in your details on the left. Soku Fitness will craft a fully personalized program with anatomical exercise demos tailored to your age, weight, and goals.
              </p>
            </div>
          </div>
        )}

        {/* Saved Programs Library */}
        {!isLoading && !program && savedPrograms.length > 0 && (
          <div className="glass-panel" style={{ padding: '24px', marginTop: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '1.1rem', fontWeight: 700 }}>
              <FolderOpen size={20} color="var(--accent-color)" /> My Saved Programs
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {savedPrograms.map(sp => {
                const savedDate = new Date(sp.savedAt);
                const relativeDate = savedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                const totalEx = sp.program.reduce((s, d) => s + d.exercises.length, 0);
                const doneCount = sp.completedExercises.length;
                const progress = totalEx > 0 ? Math.round((doneCount / totalEx) * 100) : 0;
                return (
                  <div key={sp.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.background = 'rgba(139,92,246,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    onClick={() => loadSavedProgram(sp)}
                  >
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{sp.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '12px' }}>
                        <span>{relativeDate}</span>
                        <span>{sp.program.length} days</span>
                        <span style={{ color: progress === 100 ? '#10b981' : 'rgba(255,255,255,0.4)' }}>
                          {progress}% complete
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* Progress bar */}
                      <div style={{ width: '60px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', borderRadius: '3px', background: progress === 100 ? '#10b981' : 'var(--accent-color)', transition: 'width 0.3s' }} />
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSavedProgram(sp.id); }}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!isLoading && program && activeDay && (
          <div className="animate-fade-in" style={{ maxWidth: '100%', minWidth: 0 }}>
             {/* Program Title & Days Navigation */}
             <div style={{ marginBottom: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                 <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Your <span className="text-gradient">Program</span></h2>
                 <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                   <button 
                     onClick={saveCurrentProgram}
                     style={{
                       display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                       background: activeProgramId ? 'rgba(16,185,129,0.15)' : 'rgba(139,92,246,0.15)',
                       color: activeProgramId ? '#34d399' : 'var(--accent-color)',
                       border: `1px solid ${activeProgramId ? 'rgba(16,185,129,0.3)' : 'rgba(139,92,246,0.3)'}`,
                       borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                       transition: 'all 0.2s'
                     }}
                   >
                     <Save size={14} /> {activeProgramId ? 'Saved ✓' : 'Save Program'}
                   </button>
                   <button 
                      className="btn-regenerate"
                      onClick={() => lastParams && generateWorkout(lastParams)}
                      disabled={isLoading}
                    >
                      <RefreshCw size={14} /> Regenerate
                    </button>
                  </div>
                </div>
               
               {/* Day Tabs */}
               <div className="day-tabs-container" style={{ display: 'flex', gap: '8px', marginTop: '20px', paddingBottom: '8px', maxWidth: '100%', flexWrap: 'wrap' }}>
                 {program.map((day, idx) => {
                    const dayExercises = day.exercises.length;
                    const dayCompletions = day.exercises.filter(ex => ex.id && completedExercises.includes(ex.id)).length;
                    const isDone = dayExercises > 0 && dayCompletions === dayExercises;

                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveDayIndex(idx)}
                        style={{
                          background: activeDayIndex === idx ? 'var(--accent-color)' : isDone ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-color)',
                          color: activeDayIndex === idx ? 'white' : isDone ? '#34d399' : 'var(--text-primary)',
                          border: `1px solid ${activeDayIndex === idx ? 'var(--accent-color)' : isDone ? 'rgba(16, 185, 129, 0.3)' : 'var(--surface-border)'}`,
                          padding: '10px 16px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s',
                          opacity: activeDayIndex !== idx && !isDone ? 0.7 : 1
                        }}
                      >
                        {isDone ? <CheckSquare size={16} /> : <Calendar size={16} />}
                        {day.dayName}
                      </button>
                    )
                 })}
               </div>
             </div>

             {/* Active Day Header — photo banner */}
             <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px', minHeight: '140px', display: 'flex', alignItems: 'flex-end' }}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src="/day-banner.png" 
                 alt="Gym session" 
                 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
               />
               {/* Dark gradient overlay */}
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,8,0.92) 0%, rgba(5,5,8,0.6) 60%, rgba(5,5,8,0.2) 100%)' }} />
               {/* Content */}
               <div style={{ position: 'relative', zIndex: 1, padding: '24px 28px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                 <div>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-secondary)', marginBottom: '4px' }}>
                     {activeDay.dayName}
                   </h3>
                   <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', marginBottom: '12px' }}>
                     {activeDay.focus}
                   </p>
                   <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                     <div className="stat-chip" style={{ padding: '4px 12px', fontSize: '0.85rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                       <Dumbbell size={14} />
                       <span>{dayProgress} / {totalExercisesForDay} Completed</span>
                     </div>
                     <div className="stat-chip" style={{ padding: '4px 12px', fontSize: '0.85rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                       <Flame size={14} />
                       <span>{totalSets} Total Sets</span>
                     </div>
                   </div>
                 </div>
                 {isDayComplete && (
                   <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '14px', borderRadius: '50%', backdropFilter: 'blur(8px)', border: '1px solid rgba(16,185,129,0.4)' }}>
                     <CheckSquare size={32} color="#10b981" />
                   </div>
                 )}
               </div>
             </div>

             {/* Exercise Cards — grouped by phase */}
             <div>
               {(() => {
                 let lastPhase = '';
                 let phaseIndex = 0;
                 return activeDay.exercises.map((ex, index) => {
                   const phase = ex.phase || 'main';
                   let sectionHeader = null;
                   if (phase !== lastPhase) {
                     lastPhase = phase;
                     phaseIndex = 0;
                     const phaseConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
                       warmup: { label: '🔥 Warm-Up', icon: <Zap size={18} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                       main: { label: '💪 Main Workout', icon: <Dumbbell size={18} />, color: 'var(--accent-color)', bg: 'rgba(139,92,246,0.1)' },
                       cardio: { label: '❤️ Cardio & Cooldown', icon: <Heart size={18} />, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
                     };
                     const cfg = phaseConfig[phase] || phaseConfig.main;
                     sectionHeader = (
                       <div key={`phase-${phase}`} style={{
                         display: 'flex', alignItems: 'center', gap: '12px',
                         margin: index === 0 ? '0 0 16px 0' : '32px 0 16px 0',
                         padding: '12px 20px', borderRadius: '12px',
                         background: cfg.bg, borderLeft: `3px solid ${cfg.color}`
                       }}>
                         <span style={{ color: cfg.color }}>{cfg.icon}</span>
                         <span style={{ fontWeight: 700, fontSize: '1.05rem', color: cfg.color, letterSpacing: '0.02em' }}>{cfg.label}</span>
                       </div>
                     );
                   }
                   phaseIndex++;
                   return (
                     <div key={ex.id || index}>
                       {sectionHeader}
                       <ExerciseCard
                         exercise={ex}
                         index={phaseIndex - 1}
                         isCompleted={ex.id ? completedExercises.includes(ex.id) : false}
                         onToggleComplete={() => ex.id && toggleComplete(ex.id)}
                       />
                     </div>
                   );
                 });
               })()}
             </div>
             
             {/* Next Day Navigation */}
             {isDayComplete && activeDayIndex < program.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setActiveDayIndex(activeDayIndex + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Start Next Day <ChevronRight size={18} />
                  </button>
                </div>
             )}
             
             {/* Program Complete Banner */}
             {isDayComplete && activeDayIndex === program.length - 1 && (
               <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', marginTop: '32px', minHeight: '280px', display: 'flex', alignItems: 'center' }}>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="/victory-banner.png" alt="Program Complete" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,5,8,0.9) 0%, rgba(139,92,246,0.3) 100%)' }} />
                 <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center', width: '100%' }}>
                   <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🏆</div>
                   <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Program <span className="text-gradient">Complete!</span></h3>
                   <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>You crushed every session this week. Ready for your next challenge?</p>
                   <button 
                     className="btn-primary"
                     onClick={() => lastParams && generateWorkout(lastParams)}
                   >
                     <RefreshCw size={16} /> Generate New Program
                   </button>
                 </div>
               </div>
             )}
          </div>
        )}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 100% { transform: rotate(360deg); } }
          
          .pulse-success {
            animation: pulse-green 2s infinite;
          }
          
          @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); border-radius: 50%; }
            70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); border-radius: 50%; }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-radius: 50%; }
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </div>
  );
}
