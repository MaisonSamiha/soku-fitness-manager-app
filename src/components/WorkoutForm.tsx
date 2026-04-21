'use client';

import { useState } from 'react';
import { Dumbbell, Activity, Timer, Zap, Target, MessageSquare, User, Scale, CalendarDays } from 'lucide-react';

export type WorkoutParams = {
  age: string;
  weight: string;
  daysPerWeek: string;
  muscleFocus: string;
  equipment: string;
  experienceLevel: string;
  duration: string;
  goal: string;
  notes: string;
};

interface WorkoutFormProps {
  onSubmit: (params: WorkoutParams) => void;
  isLoading: boolean;
}

export default function WorkoutForm({ onSubmit, isLoading }: WorkoutFormProps) {
  const [params, setParams] = useState<WorkoutParams>({
    age: '',
    weight: '',
    daysPerWeek: '3 Days',
    muscleFocus: 'Full Body',
    equipment: 'Full Gym',
    experienceLevel: 'Intermediate',
    duration: '45 mins',
    goal: 'Muscle Building',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <div className="glass-panel" style={{ padding: 0, position: 'sticky', top: '24px', overflow: 'hidden' }}>
      {/* Barbell hero shot */}
      <div style={{ position: 'relative', height: '130px', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/sidebar-barbell.png" 
          alt="Barbell" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.85) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '14px', left: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 800 }}>
            <Zap size={22} color="var(--accent-color)" />
            Customize Routine
          </h2>
        </div>
      </div>

      <div style={{ padding: '20px 24px 24px' }}>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CalendarDays size={16} /> Days Per Week
          </label>
          <select 
            name="daysPerWeek" 
            className="select-field" 
            value={params.daysPerWeek}
            onChange={handleChange}
          >
            <option>1 Day</option>
            <option>2 Days</option>
            <option>3 Days</option>
            <option>4 Days</option>
            <option>5 Days</option>
            <option>6 Days</option>
            <option>7 Days</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> Age
            </label>
            <input 
              type="number"
              name="age" 
              className="input-field" 
              value={params.age}
              onChange={handleChange}
              placeholder="e.g. 25"
              min="1"
            />
          </div>

          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={16} /> Weight
            </label>
            <input 
              type="text"
              name="weight" 
              className="input-field" 
              value={params.weight}
              onChange={handleChange}
              placeholder="e.g. 75 kg"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={16} /> Target Muscle Group
          </label>
          <select 
            name="muscleFocus" 
            className="select-field" 
            value={params.muscleFocus}
            onChange={handleChange}
          >
            <option>Full Body</option>
            <option>Chest & Triceps</option>
            <option>Back & Biceps</option>
            <option>Legs & Glutes</option>
            <option>Legs & Core</option>
            <option>Shoulders & Arms</option>
            <option>Shoulders</option>
            <option>Abs & Core</option>
            <option>Upper Body</option>
            <option>Lower Body</option>
            <option>Push (Chest/Shoulders/Triceps)</option>
            <option>Pull (Back/Biceps)</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Dumbbell size={16} /> Available Equipment
          </label>
          <select 
            name="equipment" 
            className="select-field" 
            value={params.equipment}
            onChange={handleChange}
          >
            <option>Full Gym</option>
            <option>Dumbbells Only</option>
            <option>Barbell & Rack</option>
            <option>Bodyweight Only</option>
            <option>Resistance Bands</option>
            <option>Kettlebells</option>
            <option>Cable Machine</option>
            <option>Dumbbells + Bench</option>
            <option>Home Gym (Mixed)</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} /> Experience Level
          </label>
          <select 
            name="experienceLevel" 
            className="select-field"
            value={params.experienceLevel}
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Target size={16} /> Training Goal
          </label>
          <select 
            name="goal" 
            className="select-field"
            value={params.goal}
            onChange={handleChange}
          >
            <option>Muscle Building</option>
            <option>Strength & Power</option>
            <option>Fat Loss & Conditioning</option>
            <option>Endurance</option>
            <option>Flexibility & Mobility</option>
            <option>General Fitness</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Timer size={16} /> Duration
          </label>
          <select 
            name="duration" 
            className="select-field"
            value={params.duration}
            onChange={handleChange}
          >
            <option>15 mins</option>
            <option>30 mins</option>
            <option>45 mins</option>
            <option>60 mins</option>
            <option>90 mins</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={16} /> Special Requests
          </label>
          <textarea 
            name="notes" 
            className="input-field"
            value={params.notes}
            onChange={handleChange}
            placeholder="e.g. I have a lower back injury, focus on compound lifts, include supersets..."
            rows={3}
            style={{ resize: 'vertical', minHeight: '60px' }}
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '8px' }}
          disabled={isLoading}
        >
          {isLoading ? 'Generating Routine...' : 'Generate AI Workout'}
        </button>
      </form>
      </div>
    </div>
  );
}
