'use client';
import { useState } from 'react';

export default function MotionToggle() {
  const [paused, setPaused] = useState(false);
  return <button type="button" className="motion-toggle" aria-pressed={paused} onClick={() => { const next = !paused; setPaused(next); document.documentElement.classList.toggle('motion-paused', next); }}>{paused ? 'Play motion ▷' : 'Pause motion Ⅱ'}</button>;
}
