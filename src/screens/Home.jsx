import React, { useState } from 'react';
import { Search, Mic, Flame } from 'lucide-react';
import { MOCK_USER, FEATURED_LESSON, QUESTIONS } from '../data.js';

export default function Home({ setScreen, setSelectedWord, xp, streak }) {
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
      {/* ...rest of Home UI, refactored from App.jsx... */}
    </div>
  );
}
