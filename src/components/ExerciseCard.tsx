'use client';

import { useState } from 'react';
import { Info, ChevronDown, ChevronUp, ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MuscleMap from './MuscleMap';

interface Alternative {
  name: string;
  reason: string;
  demoImages: { image0: string; image1: string } | null;
}

export interface Exercise {
  id?: string;
  name: string;
  phase?: string;
  sets: number;
  reps: string;
  rest: string;
  tips: string;
  targetMuscles: string[];
  demoImages: { image0: string; image1: string } | null;
  alternatives: Alternative[];
}

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export default function ExerciseCard({ exercise, index, isCompleted = false, onToggleComplete }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeDemo, setActiveDemo] = useState<{ image0: string; image1: string } | null>(exercise.demoImages);
  const [activeName, setActiveName] = useState(exercise.name);
  
  const switchToExercise = (name: string, images: { image0: string; image1: string } | null) => {
    setActiveName(name);
    setActiveDemo(images);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
      className={`exercise-card glass-panel ${isCompleted ? 'completed' : ''}`} 
      style={{ 
        marginBottom: '16px', 
        overflow: 'hidden',
        opacity: isCompleted ? 0.6 : 1,
        transition: 'opacity 0.3s ease'
      }}
    >
      {/* Card Header */}
      <div 
        style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ flex: 1, display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          {onToggleComplete && (
            <div 
              style={{ flexShrink: 0, marginTop: '4px' }}
              onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}
            >
              <CheckCircle2 
                size={28} 
                color={isCompleted ? 'var(--success-color)' : 'rgba(255,255,255,0.2)'}
                className={isCompleted ? 'pulse-success' : ''}
                style={{ cursor: 'pointer', transition: 'color 0.2s ease' }}
              />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span className="exercise-number">{index + 1}</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, textDecoration: isCompleted ? 'line-through' : 'none' }}>
                {exercise.name}
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge">{exercise.sets} Sets</span>
              <span className="badge badge-cyan">{exercise.reps} Reps</span>
              <span className="badge badge-green">{exercise.rest} Rest</span>
              {exercise.targetMuscles?.map((muscle, i) => (
                <span key={i} className="badge badge-muscle">{muscle}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, marginLeft: '12px' }}>
          {exercise.demoImages && (
            <img 
              src={exercise.demoImages.image1} 
              alt={exercise.name}
              style={{ 
                width: '64px', 
                height: '64px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                border: '1px solid var(--surface-border)',
                background: 'rgba(0,0,0,0.2)'
              }}
            />
          )}
          {expanded ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 24px 24px' }}>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                
                {/* Demo Animation */}
                {activeDemo && (
                  <div className="demo-container">
                    <div className="demo-animation" key={activeName}>
                      <img 
                        src={activeDemo.image0} 
                        alt={`${activeName} position 1`}
                        className="demo-frame demo-frame-0"
                      />
                      <img 
                        src={activeDemo.image1} 
                        alt={`${activeName} position 2`}
                        className="demo-frame demo-frame-1"
                      />
                    </div>
                    <div className="demo-label">{activeName}</div>
                  </div>
                )}

                {/* Muscle Map */}
                <div style={{ flexShrink: 0 }}>
                  <MuscleMap targetMuscles={exercise.targetMuscles} />
                </div>

                {/* Tips + Alternatives */}
                <div style={{ flex: 1, minWidth: '250px' }}>
                  {/* Pro Tip */}
                  <div style={{ 
                    background: 'rgba(139, 92, 246, 0.08)', 
                    borderRadius: '10px', 
                    padding: '14px 16px', 
                    borderLeft: '3px solid var(--accent-color)', 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '10px',
                    marginBottom: '16px',
                  }}>
                    <Info size={18} style={{ marginTop: '1px', flexShrink: 0, color: 'var(--accent-color)' }} />
                    <div>
                      <p style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro Tip</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {exercise.tips}
                      </p>
                    </div>
                  </div>

                  {/* Alternatives */}
                  {exercise.alternatives && exercise.alternatives.length > 0 && (
                    <div>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                        <ArrowRightLeft size={14} /> Alternatives
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {exercise.alternatives.map((alt, i) => (
                          <div 
                            key={i} 
                            className="alt-card"
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              if (alt.demoImages) switchToExercise(alt.name, alt.demoImages);
                            }}
                            style={{ cursor: alt.demoImages ? 'pointer' : 'default' }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{alt.name}</span>
                              {alt.demoImages && (
                                <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: 500 }}>View demo →</span>
                              )}
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '4px' }}>
                              {alt.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!activeDemo && !exercise.demoImages && (
                    <div style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '10px', 
                      padding: '20px', 
                      textAlign: 'center',
                      border: '1px dashed var(--surface-border)'
                    }}>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        No demo image available for this exercise.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
