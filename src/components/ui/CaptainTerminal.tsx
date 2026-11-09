import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { PersonalProfile } from '../../data/personalConfig';
import { Terminal, X, CornerDownLeft, Compass } from 'lucide-react';
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
      command: 'init',
      output: (
        <div className="space-y-1 text-[#dfbe7a]">
          <div className="font-mono text-xs sm:text-sm font-bold flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#dfbe7a]" />
            NAVAL SYSTEMS ARCHITECT CLI • HARSH SHANDILYA [v3.0.0-PRO]
          </div>
          <div className="text-[11px] text-[#94a3b8]">
            Telemetry active at coordinates <span className="text-[#dfbe7a]">21°14'N 81°38'E</span>. Type <span className="text-[#dfbe7a] font-bold">help</span> to inspect naval command interfaces.
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
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-[#dfbe7a] font-bold">Available Naval Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[#cbd5e1]">
            <div><span className="text-[#dfbe7a] font-semibold">whoami</span> — Identity, bio & architectural stance</div>
            <div><span className="text-[#dfbe7a] font-semibold">skills</span> — 4-quadrant verified engineering stack</div>
            <div><span className="text-[#dfbe7a] font-semibold">ai / design</span> — 20 AI tools & 260+ design skills</div>
            <div><span className="text-[#dfbe7a] font-semibold">screens</span> — 16 Pre-flight app screen benchmarks</div>
            <div><span className="text-[#dfbe7a] font-semibold">inspo</span> — Top landing, footer & design inspo</div>
            <div><span className="text-[#dfbe7a] font-semibold">projects</span> — 8 flagship production codebases</div>
            <div><span className="text-[#dfbe7a] font-semibold">honors</span> — Hackathon podiums & certifications</div>
            <div><span className="text-[#dfbe7a] font-semibold">resume</span> — Open printable engineering CV</div>
            <div><span className="text-[#dfbe7a] font-semibold">contact</span> — Email, GitHub & LinkedIn coordinates</div>
            <div><span className="text-[#dfbe7a] font-semibold">clear</span> — Wipe terminal output</div>
            <div><span className="text-[#dfbe7a] font-semibold">exit</span> — Close terminal HUD</div>
          </div>
        </div>
      );
    } else if (cmd === 'whoami' || cmd === 'bio' || cmd === 'about') {
      output = (
        <div className="space-y-1.5 text-xs font-mono text-[#cbd5e1]">
          <div className="text-[#dfbe7a] font-bold">{profile.name} — {profile.role}</div>
          <div className="text-[#94a3b8] italic">"{profile.tagline}"</div>
          <p className="pt-1 text-[#94a3b8] leading-relaxed">{profile.aboutBio}</p>
          <div className="text-[11px] text-[#64748b] pt-1">
            Education: {profile.education.degree} ({profile.education.period}) — {profile.education.institution}
          </div>
        </div>
      );
    } else if (cmd === 'skills' || cmd === 'stack' || cmd === 'armory') {
      output = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-[#dfbe7a] font-bold">Verified Production Technical Armory:</div>
          {profile.skills.map((cat) => (
            <div key={cat.category} className="space-y-0.5">
              <div className="text-[#dfbe7a] font-semibold">{cat.category} ({cat.themeLabel}):</div>
              <div className="text-[#94a3b8] pl-3">
                {cat.skills.map((s) => s.name).join(' • ')}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'projects' || cmd === 'voyages' || cmd === 'expeditions') {
      output = (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-[#dfbe7a] font-bold">Flagship Production Expeditions:</div>
          <div className="space-y-1.5 pl-2">
            {profile.projects.map((p, i) => (
              <div key={p.id}>
                <span className="text-[#dfbe7a] font-semibold">[{i + 1}] {p.title}</span>
                <span className="text-[#64748b]"> — {p.metrics}</span>
                <div className="text-[11px] text-[#94a3b8] pl-2">{p.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmd === 'honors' || cmd === 'spoils' || cmd === 'certs') {
      output = (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-[#dfbe7a] font-bold">Naval Honors & Proof of Work:</div>
          {profile.achievements.map((ach) => (
            <div key={ach.id} className="text-[#94a3b8]">
              <span className="text-[#dfbe7a] font-semibold">[{ach.year}] {ach.title}</span> — {ach.issuer}
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'resume' || cmd === 'cv') {
      output = (
        <div className="text-xs font-mono text-emerald-400">
          ✓ Launching printable architectural curriculum vitae modal...
        </div>
      );
      setTimeout(() => onOpenResume(), 300);
    } else if (cmd === 'design' || cmd === 'eye' || cmd === 'godly' || cmd === 'stacks' || cmd === 'ai') {
      output = (
        <div className="space-y-2 text-xs font-mono text-[#cbd5e1]">
          <div className="text-[#dfbe7a] font-bold">20 God-Tier AI & Design Stacks Arsenal:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pl-1">
            <div><span className="text-[#dfbe7a]">1. modulify.ai</span> — Best AI builder, period.</div>
            <div><span className="text-[#dfbe7a]">2. modulify.ai/templates</span> — Free production templates</div>
            <div><span className="text-[#dfbe7a]">3. landdding.com</span> — Top notch landings</div>
            <div><span className="text-[#dfbe7a]">4. motionin.design</span> — 1 prompt 1 website</div>
            <div><span className="text-[#dfbe7a]">5. iconly.design</span> — World's best icons</div>
            <div><span className="text-[#dfbe7a]">6. fontinlogo.com</span> — Fonts behind brands</div>
            <div><span className="text-[#dfbe7a]">7. on.design</span> — Global design community</div>
            <div><span className="text-[#dfbe7a]">8. godly.website</span> — Award websites inspiration</div>
            <div><span className="text-[#dfbe7a]">9. 60fps.design</span> — Mobile UI animations</div>
            <div><span className="text-[#dfbe7a]">10. footer.design</span> — Architectural footer inspiration</div>
            <div><span className="text-[#dfbe7a]">11. recent.design</span> — Next level design trends</div>
            <div><span className="text-[#dfbe7a]">12. backgrounds.supply</span> — Procedural textures</div>
            <div><span className="text-[#dfbe7a]">13. posts.design</span> — Big brands social posts</div>
            <div><span className="text-[#dfbe7a]">14. beui.dev</span> — Animated UI components</div>
            <div><span className="text-[#dfbe7a]">15. wonderlist.design</span> — Figma designs & catalog</div>
            <div><span className="text-[#dfbe7a]">16. mobbin.com</span> — Real app screens (300k+ UI patterns)</div>
            <div><span className="text-[#dfbe7a]">17. sent.dm</span> — Almost free SMS developer infra</div>
            <div><span className="text-[#dfbe7a]">18. logotouse.com</span> — Curated premium logo systems</div>
            <div><span className="text-[#dfbe7a]">19. paperanimation.ai</span> — AI tactile & stop-motion</div>
            <div><span className="text-[#dfbe7a]">20. domaingrowth.co</span> — Top backlinks & SEO launch distribution</div>
          </div>
          <div className="text-[11px] text-[#64748b] pt-1">
            Plus 16 comprehensive design domains (260+ verified skills) active in Chronicle II-B (#design-eye).
          </div>
        </div>
      );
    } else if (cmd === 'screens' || cmd === 'check') {
      output = (
        <div className="space-y-2 text-xs font-mono text-[#cbd5e1]">
          <div className="text-[#dfbe7a] font-bold">Sites I Check Before Designing Any App Screen (Pre-Flight):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] pl-1">
            <div><span className="text-[#dfbe7a]">1. Mobbin</span> (mobbin.com) — 300k+ real app flows</div>
            <div><span className="text-[#dfbe7a]">2. Pageflows</span> (pageflows.com) — Live user interaction videos</div>
            <div><span className="text-[#dfbe7a]">3. Refero</span> (refero.design) — Real product screens by UI element</div>
            <div><span className="text-[#dfbe7a]">4. Screenlane</span> (screenlane.com) — Daily mobile & web inspiration</div>
            <div><span className="text-[#dfbe7a]">5. UI Garage</span> (uigarage.net) — Handpicked multi-platform patterns</div>
            <div><span className="text-[#dfbe7a]">6. Scrnshts</span> (scrnshts.club) — App Store showcase designs</div>
            <div><span className="text-[#dfbe7a]">7. Page UI</span> (pageui.design) — Clean web section components</div>
            <div><span className="text-[#dfbe7a]">8. Collect UI</span> (collectui.com) — Daily UI micro-states</div>
            <div><span className="text-[#dfbe7a]">9. Land-book</span> (land-book.com) — Best landing page structures</div>
            <div><span className="text-[#dfbe7a]">10. Godly</span> (godly.website) — Award-winning dark mode web</div>
            <div><span className="text-[#dfbe7a]">11. Awwwards</span> (awwwards.com) — Global creative direction</div>
            <div><span className="text-[#dfbe7a]">12. Dribbble</span> (dribbble.com) — Visual exploratory craft</div>
            <div><span className="text-[#dfbe7a]">13. Behance</span> (behance.net) — Comprehensive case studies</div>
            <div><span className="text-[#dfbe7a]">14. Pinterest</span> (pinterest.com) — Moodboarding & typography</div>
            <div><span className="text-[#dfbe7a]">15. Muzli</span> (muz.li) — Designer news & trending digest</div>
            <div><span className="text-[#dfbe7a]">16. Codrops</span> (tympanus.net/codrops) — WebGL shaders & CSS kinetics</div>
          </div>
          <div className="text-[11px] text-emerald-400 pt-1">
            ✓ Benchmark against these before writing a single line of UI code.
          </div>
        </div>
      );
    } else if (cmd === 'inspo') {
      output = (
        <div className="space-y-1.5 text-xs font-mono text-[#cbd5e1]">
          <div className="text-[#dfbe7a] font-bold">Top Curated Design Inspo Sites:</div>
          <div className="space-y-1 text-[11px] pl-2">
            <div><span className="text-[#dfbe7a]">1. landdding.com</span> — Top notch landing page architectures</div>
            <div><span className="text-[#dfbe7a]">2. collectui.com</span> — Daily UI components & micro-states</div>
            <div><span className="text-[#dfbe7a]">3. inspora.design</span> — New cutting-edge design releases</div>
            <div><span className="text-[#dfbe7a]">4. footer.design</span> — High-converting architectural footers</div>
            <div><span className="text-[#dfbe7a]">5. land-book.com</span> — Best-in-class product landing inspo</div>
          </div>
        </div>
      );
    } else if (cmd === 'contact' || cmd === 'email') {
      output = (
        <div className="space-y-1 text-xs font-mono text-[#cbd5e1]">
          <div className="text-[#dfbe7a] font-bold">Direct Navigational Coordinates:</div>
          <div>Email: <a href={`mailto:${profile.email}`} className="text-[#dfbe7a] underline">{profile.email}</a></div>
          <div>GitHub: <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-[#dfbe7a] underline">{profile.githubUrl}</a></div>
          <div>LinkedIn: <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#dfbe7a] underline">{profile.linkedinUrl}</a></div>
          <div>Location: {profile.location}</div>
        </div>
      );
    } else if (cmd === 'clear') {
      setEntries([]);
      return;
    } else if (cmd === 'exit' || cmd === 'quit') {
      onClose();
      return;
    } else {
      output = (
        <div className="text-xs font-mono text-rose-400">
          Command not recognized: "{raw}". Type <span className="text-[#dfbe7a] font-bold">help</span> to list valid commands.
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
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal('');
        }
      }
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#05080c] text-[#f1f5f9] border border-[#c5a059]/40 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden font-mono flex flex-col h-[75vh] max-h-[600px] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#090e17] border-b border-[#c5a059]/20">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-[#dfbe7a] font-bold pl-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#dfbe7a]" />
              harsh@architect:~ (zsh)
            </span>
          </div>

          <button
            onClick={() => {
              playAudioFx('click');
              onClose();
            }}
            className="text-[#94a3b8] hover:text-[#dfbe7a] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal History */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {entries.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                <span className="text-[#dfbe7a] font-bold">harsh@naval:~$</span>
                <span className="text-[#f1f5f9]">{entry.command}</span>
              </div>
              <div className="pl-4">{entry.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input Bar */}
        <div className="p-3 bg-[#090e17] border-t border-[#c5a059]/20 flex items-center gap-2">
          <span className="text-[#dfbe7a] font-bold text-xs sm:text-sm pl-2">harsh@naval:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for available commands..."
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-[#f1f5f9] font-mono placeholder:text-[#64748b]"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded bg-[#141f2e] text-[#dfbe7a] hover:bg-[#dfbe7a] hover:text-[#05080c] transition-all cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
