import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { PersonalProfile } from '../../data/personalConfig';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { playAudioFx } from './AudioEngine';

interface CaptainTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  profile: PersonalProfile;
}

interface CommandEntry {
  command: string;
  output: React.ReactNode;
}

export const CaptainTerminal: React.FC<CaptainTerminalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  profile,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [entries, setEntries] = useState<CommandEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-[#ffd56b]">
          <div className="font-mono text-xs sm:text-sm">
            ☠️ HARSH SYSTEMS ARCHITECT CLI [v2.4.0-godmode]
          </div>
          <div className="text-[11px] text-[#e8dcc0]/80">
            Type <span className="text-[#ff7a1a] font-bold">help</span> to view available nautical commands, or <span className="text-[#ff7a1a] font-bold">skills</span>, <span className="text-[#ff7a1a] font-bold">projects</span>, <span className="text-[#ff7a1a] font-bold">resume</span>.
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      playAudioFx('click');
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  if (!isOpen) return null;

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory((prev) => [...prev, raw]);
    setHistoryIdx(-1);
    setInputVal('');
    playAudioFx('click');

    let output: React.ReactNode = null;

    if (cmd === 'help') {
      output = (
        <div className="space-y-1 text-xs">
          <div className="text-[#ff7a1a] font-bold">Available Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[#e8dcc0]/90">
            <div><span className="text-[#ffd56b] font-bold">whoami</span> — Identity & Engineering manifesto</div>
            <div><span className="text-[#ffd56b] font-bold">skills</span> — Technical armory & stack matrix</div>
            <div><span className="text-[#ffd56b] font-bold">projects</span> — 8 flagship production codebases</div>
            <div><span className="text-[#ffd56b] font-bold">spoils</span> — Hackathons & certifications</div>
            <div><span className="text-[#ffd56b] font-bold">resume</span> — Open parchment printable resume</div>
            <div><span className="text-[#ffd56b] font-bold">contact</span> — Email, GitHub & LinkedIn links</div>
            <div><span className="text-[#ffd56b] font-bold">sound &lt;fx&gt;</span> — Play (cannon, bell, thunder, creak)</div>
            <div><span className="text-[#ffd56b] font-bold">matrix</span> — Stream golden pirate code</div>
            <div><span className="text-[#ffd56b] font-bold">clear</span> — Wipe terminal output</div>
            <div><span className="text-[#ffd56b] font-bold">exit</span> — Close terminal HUD</div>
          </div>
        </div>
      );
    } else if (cmd === 'whoami' || cmd === 'bio' || cmd === 'about') {
      output = (
        <div className="space-y-1 text-xs text-[#e8dcc0]">
          <div className="text-[#ffd56b] font-bold">{profile.name} — {profile.role}</div>
          <div className="text-[#ff7a1a] italic font-fell">"{profile.tagline}"</div>
          <p className="pt-1 text-[#e8dcc0]/85">{profile.aboutBio}</p>
          <div className="text-[11px] text-[#b39b6d] pt-1">
            Education: {profile.education.degree} ({profile.education.period}) — {profile.education.institution}
          </div>
        </div>
      );
    } else if (cmd === 'skills') {
      output = (
        <div className="space-y-2 text-xs">
          <div className="text-[#ffd56b] font-bold">Technical Armory & Competencies:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profile.skills.map((cat) => (
              <div key={cat.category} className="p-2 bg-[#120e0a] border border-[#8b5a2b]/60 rounded">
                <div className="text-[#ff7a1a] font-bold uppercase">{cat.category}</div>
                <div className="text-[#d8c49a] text-[11px]">{cat.skills.map(s => s.name).join(' • ')}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmd === 'projects') {
      output = (
        <div className="space-y-2 text-xs">
          <div className="text-[#ffd56b] font-bold">Flagship Production Systems ({profile.projects.length}):</div>
          <div className="space-y-1.5">
            {profile.projects.map((p, idx) => (
              <div key={p.id} className="text-[#e8dcc0]">
                <span className="text-[#ff7a1a] font-mono">[{idx + 1}]</span>{' '}
                <span className="text-[#ffd56b] font-bold">{p.title}</span> —{' '}
                <span className="text-[#b39b6d] italic">{p.tagline}</span>{' '}
                <span className="text-[10px] text-emerald-400">({p.metrics})</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmd === 'spoils' || cmd === 'achievements') {
      output = (
        <div className="space-y-1.5 text-xs text-[#e8dcc0]">
          <div className="text-[#ffd56b] font-bold">Spoils of War & Certifications:</div>
          {profile.achievements.map((ach) => (
            <div key={ach.id} className="flex items-start gap-1.5">
              <span className="text-[#ff7a1a]">⚔️</span>
              <div>
                <span className="text-[#ffd56b] font-bold">{ach.title}</span> ({ach.year}) — {ach.issuer}
                <div className="text-[10px] text-[#b39b6d]">{ach.description}</div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'resume') {
      output = (
        <div className="text-xs text-emerald-400">
          Opening official printable Curriculum Vitae on parchment...
        </div>
      );
      setTimeout(() => {
        onClose();
        onOpenResume();
      }, 500);
    } else if (cmd === 'contact') {
      output = (
        <div className="space-y-1 text-xs text-[#e8dcc0]">
          <div className="text-[#ffd56b] font-bold">Direct Channels:</div>
          <div>Email: <a href={`mailto:${profile.email}`} className="text-[#ff7a1a] hover:underline">{profile.email}</a></div>
          <div>Location: <span className="text-[#d8c49a]">{profile.location}</span></div>
          <div>GitHub: <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-[#ffd56b] hover:underline">{profile.githubUrl}</a></div>
          <div>LinkedIn: <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#ffd56b] hover:underline">{profile.linkedinUrl}</a></div>
        </div>
      );
    } else if (cmd.startsWith('sound')) {
      const parts = cmd.split(' ');
      const fx = (parts[1] || 'cannon') as 'cannon' | 'bell' | 'thunder' | 'creak' | 'seal' | 'page';
      playAudioFx(fx);
      output = <div className="text-xs text-[#ffd56b]">Synthesized nautical SFX: [{fx}]</div>;
    } else if (cmd === 'matrix') {
      playAudioFx('cannon');
      output = (
        <div className="text-[10px] font-mono text-[#ffd56b] leading-tight space-y-0.5">
          <div>01001000 01000001 01010010 01010011 01001000 [HARSH]</div>
          <div>10101100 00110101 11010010 00110011 [DISTRIBUTED ARCHITECTURE]</div>
          <div>00110001 00100000 01010111 01000101 [THREE.JS WEBGL GLSL 120FPS]</div>
          <div>11100011 11001100 10101010 11110000 [ZERO AI SLOP - VERIFIED]</div>
          <div className="text-emerald-400">STATUS: ALL 24 SYSTEMS REPORTING GREEN</div>
        </div>
      );
    } else if (cmd === 'clear') {
      setEntries([]);
      return;
    } else if (cmd === 'exit' || cmd === 'quit') {
      onClose();
      return;
    } else if (cmd === 'sudo') {
      output = (
        <div className="text-xs text-[#a01d12] font-bold">
          Permission denied: Davy Jones owns root privileges on this galleon.
        </div>
      );
    } else {
      output = (
        <div className="text-xs text-[#e8dcc0]">
          Command not recognized: <span className="text-[#a01d12] font-bold">{raw}</span>. Type <span className="text-[#ffd56b] font-bold">help</span> for available commands.
        </div>
      );
    }

    setEntries((prev) => [...prev, { command: raw, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(historyIdx - 1, 0);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= history.length) {
          setHistoryIdx(-1);
          setInputVal('');
        } else {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[560px] bg-[#0b0906] border-2 border-[#c9a227] rounded-xl shadow-[0_0_50px_rgba(201,162,39,0.35)] flex flex-col overflow-hidden animate-scaleUp font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="h-10 bg-[#171310] border-b border-[#c9a227]/40 px-4 flex items-center justify-between text-xs text-[#d8c49a] shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#ff7a1a]" />
            <span className="font-bold text-[#ffd56b] font-cinzel">Captain's Command Bridge [CLI]</span>
            <span className="text-[10px] text-[#b39b6d] hidden sm:inline">• press ESC to close</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <button
              onClick={() => {
                playAudioFx('click');
                onClose();
              }}
              className="p-1 text-[#d8c49a] hover:text-[#ff7a1a] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed selection:bg-[#a01d12] selection:text-white">
          {entries.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              {entry.command !== 'welcome' && (
                <div className="flex items-center gap-2 text-[#b39b6d]">
                  <span className="text-[#a01d12] font-bold">harsh@pearl</span>
                  <span className="text-[#c9a227]">:</span>
                  <span className="text-[#ffd56b]">~</span>
                  <span className="text-[#e8dcc0]">$</span>
                  <span className="text-[#ffd56b] font-bold">{entry.command}</span>
                </div>
              )}
              <div>{entry.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-[#120e0a] border-t border-[#c9a227]/40 flex items-center gap-2 shrink-0">
          <span className="text-[#a01d12] font-bold text-xs">harsh@pearl</span>
          <span className="text-[#c9a227]">:</span>
          <span className="text-[#ffd56b]">~</span>
          <span className="text-[#e8dcc0]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-[#ffd56b] text-xs outline-none caret-[#ff7a1a]"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="px-2.5 py-1 bg-[#a01d12] hover:bg-[#ff7a1a] text-[#ffd56b] hover:text-black rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
