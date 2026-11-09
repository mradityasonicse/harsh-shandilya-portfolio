import React, { useState, useMemo } from 'react';
import { SectionBanner } from '../ui/SectionBanner';
import {
  GOD_TIER_RESOURCES,
  APP_SCREEN_SITES,
  DESIGN_EYE_ARCHETYPES,
  type GodTierResource,
} from '../../data/designEyeData';
import { DESIGN_DOMAINS } from '../../data/designSkillsData';
import {
  ExternalLink,
  Sparkles,
  Layers,
  Eye,
  CheckCircle2,
  Copy,
  Check,
  Search,
  ArrowRight,
  ShieldCheck,
  X,
  CreditCard,
  MonitorCheck,
} from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

export const DesignEyeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'screens' | 'domains' | 'archetypes'>('resources');
  const [resourceCategory, setResourceCategory] = useState<string>('All');
  const [screenCategory, setScreenCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomainId, setSelectedDomainId] = useState<string>(DESIGN_DOMAINS[0].id);
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>(DESIGN_EYE_ARCHETYPES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectResource, setInspectResource] = useState<GodTierResource | null>(null);

  // Filtered 19 God-Tier AI & Design Tools
  const filteredResources = useMemo(() => {
    return GOD_TIER_RESOURCES.filter((res) => {
      const matchesCategory = resourceCategory === 'All' || res.category === resourceCategory;
      const matchesSearch =
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.skillsUnlocked.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [resourceCategory, searchQuery]);

  // Filtered 16 Pre-flight Screen Sites
  const filteredScreenSites = useMemo(() => {
    return APP_SCREEN_SITES.filter((site) => {
      const matchesCategory = screenCategory === 'All' || site.category === screenCategory;
      const matchesSearch =
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.primaryHighlight.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [screenCategory, searchQuery]);

  const selectedDomain = useMemo(() => {
    return DESIGN_DOMAINS.find((d) => d.id === selectedDomainId) || DESIGN_DOMAINS[0];
  }, [selectedDomainId]);

  const selectedArchetype = useMemo(() => {
    return DESIGN_EYE_ARCHETYPES.find((a) => a.id === selectedArchetypeId) || DESIGN_EYE_ARCHETYPES[0];
  }, [selectedArchetypeId]);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    playAudioFx('seal');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resourceCategories = [
    'All',
    'Builder & Templates',
    'Landings & Awards',
    'Motion & Animation',
    'Typography & Icons',
    'App & Product',
    'Growth & Infra',
  ];

  const screenCategories = [
    'All',
    'User Flows & Screens',
    'Award & Art Direction',
    'Components & Micro-UI',
    'Visual & 3D Craft',
    'Trend Radar',
  ];

  return (
    <section id="design-eye" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      {/* 1. Master Section Banner */}
      <SectionBanner
        number="CHRONICLE II-B"
        title="The Sovereign Design Eye & AI Stack Arsenal"
        subtitle="A permanent, god-tier matrix of 19 AI design platforms, 16 app screen pre-flight benchmarks, 16 design domains (260+ skills), and 4 award-winning visual archetypes"
      />

      {/* 2. Mode Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8 mb-10">
        <button
          onClick={() => {
            playAudioFx('click');
            setActiveTab('resources');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeTab === 'resources'
              ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_25px_rgba(223,190,122,0.45)] scale-105'
              : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/30 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          19 AI Design Stacks
        </button>

        <button
          onClick={() => {
            playAudioFx('click');
            setActiveTab('screens');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeTab === 'screens'
              ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_25px_rgba(223,190,122,0.45)] scale-105'
              : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/30 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
          }`}
        >
          <MonitorCheck className="w-3.5 h-3.5" />
          16 Screen Benchmarks
        </button>

        <button
          onClick={() => {
            playAudioFx('click');
            setActiveTab('domains');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeTab === 'domains'
              ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_25px_rgba(223,190,122,0.45)] scale-105'
              : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/30 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          16 Domains (260+ Skills)
        </button>

        <button
          onClick={() => {
            playAudioFx('click');
            setActiveTab('archetypes');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeTab === 'archetypes'
              ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_25px_rgba(223,190,122,0.45)] scale-105'
              : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/30 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          4 Visual Archetypes
        </button>
      </div>

      {/* =========================================================================
          TAB 1: 19 GOD-TIER AI & DESIGN STACKS
         ========================================================================= */}
      {activeTab === 'resources' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0a1018]/90 border border-[#c5a059]/25 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 19 AI tools, domain, or skills unlocked..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#05080c] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-[#f1f5f9] placeholder:text-[#64748b] focus:outline-none focus:border-[#dfbe7a] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {resourceCategories.map((cat) => {
                const isActive = resourceCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      playAudioFx('click');
                      setResourceCategory(cat);
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#dfbe7a]/20 border border-[#dfbe7a] text-[#dfbe7a] font-semibold'
                        : 'bg-[#05080c]/60 border border-white/5 text-[#94a3b8] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between px-2 text-xs font-mono text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dfbe7a] animate-pulse" />
              Showing <span className="text-[#dfbe7a] font-bold">{filteredResources.length}</span> curated AI & design powerhouses
            </div>
            <div className="hidden sm:block text-[#64748b]">
              Designing with AI? Save this • 100% production utility
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredResources.map((res) => {
              const isCopied = copiedId === res.id;
              return (
                <div
                  key={res.id}
                  onMouseEnter={() => playAudioFx('click')}
                  className="group relative rounded-2xl p-5 bg-[#0a1018]/90 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden backdrop-blur-xl hover:-translate-y-1"
                >
                  <div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: res.primaryColor }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-[#dfbe7a] bg-[#dfbe7a]/10 border border-[#dfbe7a]/30 px-2 py-0.5 rounded-md">
                        #{String(res.number).padStart(2, '0')}
                      </span>
                      {res.featuredBadge && (
                        <span className="text-[9px] font-mono tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                          {res.featuredBadge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-heading font-bold text-[#f1f5f9] group-hover:text-[#dfbe7a] transition-colors flex items-center justify-between">
                      {res.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#c5a059] mt-0.5 mb-2 font-medium">
                      {res.domain}
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#05080c]/80 border border-white/5 mb-3">
                      <p className="text-xs font-heading font-semibold text-[#f8fafc] italic">
                        "{res.tagline}"
                      </p>
                    </div>

                    <p className="text-[11px] text-[#94a3b8] font-sans leading-relaxed mb-4 line-clamp-2 font-light">
                      {res.description}
                    </p>

                    <div className="space-y-1.5 mb-5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#64748b] block">
                        Superpower Stacks:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {res.skillsUnlocked.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono text-[#cbd5e1] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md group-hover:border-[#dfbe7a]/40 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                    <button
                      onClick={() => handleCopyLink(res.url, res.id)}
                      title="Copy URL"
                      className="p-2 rounded-lg bg-[#05080c] border border-white/10 text-[#94a3b8] hover:text-[#dfbe7a] hover:border-[#dfbe7a]/40 transition-all cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => {
                        playAudioFx('click');
                        setInspectResource(res);
                      }}
                      className="text-[11px] font-mono text-[#94a3b8] hover:text-[#dfbe7a] px-2.5 py-1.5 rounded-lg border border-transparent hover:border-[#c5a059]/30 transition-all cursor-pointer"
                    >
                      Inspect Specs
                    </button>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playAudioFx('seal')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] text-xs font-mono font-bold hover:shadow-[0_0_15px_rgba(223,190,122,0.4)] transition-all cursor-pointer ml-auto"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: 16 APP SCREEN PRE-FLIGHT BENCHMARKS (Sites Checked Before Any Screen)
         ========================================================================= */}
      {activeTab === 'screens' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-[#0a1018]/90 border border-[#c5a059]/25 backdrop-blur-xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfbe7a] block mb-1">
                Zero-Vibe-Coding Pre-Flight Gate
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Sites I Check Before Designing Any App Screen
              </h3>
              <p className="text-xs text-[#94a3b8] font-sans mt-1">
                Mandatory operational rule: Never design an app screen blindly. Always benchmark against these 16 verified archives.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {screenCategories.map((cat) => {
                const isActive = screenCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      playAudioFx('click');
                      setScreenCategory(cat);
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#dfbe7a]/20 border border-[#dfbe7a] text-[#dfbe7a] font-semibold'
                        : 'bg-[#05080c]/60 border border-white/5 text-[#94a3b8] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of 16 Screen Benchmark Sites */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredScreenSites.map((site) => {
              const isCopied = copiedId === site.id;
              return (
                <div
                  key={site.id}
                  onMouseEnter={() => playAudioFx('click')}
                  className="rounded-2xl p-5 bg-[#0a1018]/90 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 shadow-lg flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-[#dfbe7a] bg-[#dfbe7a]/10 border border-[#dfbe7a]/30 px-2 py-0.5 rounded-md">
                        #{String(site.number).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase">
                        {site.category}
                      </span>
                    </div>

                    <h4 className="text-lg font-heading font-bold text-white group-hover:text-[#dfbe7a] transition-colors">
                      {site.name}
                    </h4>
                    <div className="text-[11px] font-mono text-[#c5a059] mb-3">
                      {site.domain}
                    </div>

                    <div className="p-3 rounded-xl bg-[#05080c] border border-white/5 mb-3">
                      <span className="text-[9px] font-mono uppercase text-[#64748b] block mb-1">
                        Screen Inspection Focus:
                      </span>
                      <p className="text-xs font-sans text-[#f1f5f9] leading-relaxed">
                        {site.purpose}
                      </p>
                    </div>

                    <p className="text-[11px] font-sans text-[#94a3b8] leading-relaxed mb-4">
                      <span className="text-[#dfbe7a] font-semibold">Highlight: </span>
                      {site.primaryHighlight}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                    <button
                      onClick={() => handleCopyLink(site.url, site.id)}
                      title="Copy URL"
                      className="p-2 rounded-lg bg-[#05080c] border border-white/10 text-[#94a3b8] hover:text-[#dfbe7a] transition-all cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playAudioFx('seal')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0e1622] hover:bg-[#dfbe7a] border border-[#c5a059]/40 hover:border-[#dfbe7a] text-xs font-mono text-[#dfbe7a] hover:text-[#05080c] font-bold transition-all cursor-pointer ml-auto"
                    >
                      Open {site.name} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: 16 COMPREHENSIVE DESIGN DOMAINS (260+ Verified Skills)
         ========================================================================= */}
      {activeTab === 'domains' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="p-3 rounded-2xl bg-[#0a1018]/90 border border-[#c5a059]/25 backdrop-blur-xl shadow-lg flex items-center gap-2 overflow-x-auto">
            {DESIGN_DOMAINS.map((dom) => {
              const isSelected = dom.id === selectedDomainId;
              return (
                <button
                  key={dom.id}
                  onClick={() => {
                    playAudioFx('click');
                    setSelectedDomainId(dom.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-md'
                      : 'bg-[#05080c] text-[#94a3b8] border border-white/5 hover:border-[#dfbe7a]/40 hover:text-white'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                    {dom.number}
                  </span>
                  {dom.shortTitle}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0a1018] via-[#0e1622] to-[#05080c] border border-[#c5a059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c5a059]/15 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-[#dfbe7a] bg-[#dfbe7a]/10 border border-[#dfbe7a]/30 px-3 py-1 rounded-full uppercase">
                    Domain #{String(selectedDomain.number).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-widest">
                    {selectedDomain.themeLabel}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#f1f5f9]">
                  {selectedDomain.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {selectedDomain.skills.length} Verified Skills
                </span>
              </div>
            </div>

            <p className="text-sm font-sans text-[#cbd5e1] max-w-3xl leading-relaxed mb-8 font-light">
              "{selectedDomain.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {selectedDomain.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-xl bg-[#05080c]/90 border border-white/5 hover:border-[#dfbe7a]/50 transition-all flex flex-col justify-between group/skill shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-heading font-bold text-[#f1f5f9] group-hover/skill:text-[#dfbe7a] transition-colors flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe7a]" />
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#dfbe7a] font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-[#141f2e] rounded-full overflow-hidden my-1.5 relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#64748b] font-mono pt-1">
                    <span className="uppercase tracking-wider text-[#94a3b8]">{skill.tag}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: 4 GOD-LEVEL VISUAL ARCHETYPES
         ========================================================================= */}
      {activeTab === 'archetypes' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DESIGN_EYE_ARCHETYPES.map((arch) => {
              const isSelected = arch.id === selectedArchetypeId;
              return (
                <button
                  key={arch.id}
                  onClick={() => {
                    playAudioFx('click');
                    setSelectedArchetypeId(arch.id);
                  }}
                  className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#0e1622] border-[#dfbe7a] shadow-[0_0_30px_rgba(223,190,122,0.25)] scale-[1.02]'
                      : 'bg-[#0a1018]/80 border-white/10 hover:border-[#c5a059]/40 text-[#94a3b8]'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#dfbe7a] mb-1">
                    {arch.category}
                  </div>
                  <h4 className="text-base font-heading font-bold text-[#f1f5f9] mb-1">
                    {arch.title}
                  </h4>
                  <p className="text-[11px] text-[#94a3b8] font-sans line-clamp-2">
                    {arch.subtitle}
                  </p>
                  {isSelected && (
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-[#dfbe7a] font-semibold">
                      <span>Active Sandbox</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0a1018]/90 border border-[#c5a059]/30 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfbe7a] block mb-1">
                  Design Eye Specification
                </span>
                <h3 className="text-2xl font-heading font-bold text-[#f1f5f9]">
                  {selectedArchetype.title}
                </h3>
                <p className="text-xs font-mono text-[#c5a059] mt-0.5">
                  {selectedArchetype.aesthetic}
                </p>
              </div>

              <p className="text-xs font-sans text-[#94a3b8] leading-relaxed font-light">
                {selectedArchetype.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-xs font-heading font-bold text-[#f1f5f9] block">
                  Mandatory Execution Rules:
                </span>
                <ul className="space-y-1.5">
                  {selectedArchetype.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-[#cbd5e1] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe7a] mt-1.5 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3 font-mono text-[11px]">
                <div>
                  <span className="text-[#64748b] block">Font Pairing:</span>
                  <span className="text-[#dfbe7a] font-semibold">{selectedArchetype.visualSpec.fontPairing}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block">Geometry & Radius:</span>
                  <span className="text-[#cbd5e1]">{selectedArchetype.visualSpec.geometry}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block">Motion Physics:</span>
                  <span className="text-[#cbd5e1]">{selectedArchetype.visualSpec.motionPhysics}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block mb-1.5">Color Tokens:</span>
                  <div className="flex items-center gap-2">
                    {selectedArchetype.visualSpec.palette.map((color, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[10px] text-[#94a3b8]">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-[#05080c] border border-[#c5a059]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden min-h-[460px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#dfbe7a]/5 via-transparent to-cyan-500/5 pointer-events-none" />

              {selectedArchetype.id === 'white-memory' && (
                <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-2xl space-y-4 border border-neutral-200">
                  <div className="flex items-center justify-between border-b border-black/10 pb-3 text-[10px] font-mono tracking-widest uppercase">
                    <span>MOMENTS // 01</span>
                    <span>OCT 2026 • ISSUE 04</span>
                  </div>
                  <h2 className="text-3xl font-serif font-normal tracking-tight text-neutral-900 leading-none">
                    White Memory.
                  </h2>
                  <p className="text-xs font-mono text-neutral-600 leading-relaxed">
                    A study on deliberate negative space, architectural balance, and the elimination of visual noise.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="h-16 bg-neutral-950 rounded flex items-center justify-center text-[10px] font-mono text-white">
                      GRID 01
                    </div>
                    <div className="h-16 bg-neutral-100 rounded border border-neutral-300 flex items-center justify-center text-[10px] font-mono text-neutral-800">
                      GRID 02
                    </div>
                    <div className="h-16 bg-[#c5a059] rounded flex items-center justify-center text-[10px] font-mono text-black font-bold">
                      GOLD 03
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-neutral-500">
                    <span>COORDINATES: 21°14'N 81°38'E</span>
                    <span className="font-bold underline cursor-pointer">READ ESSAY →</span>
                  </div>
                </div>
              )}

              {selectedArchetype.id === 'matcha-3d' && (
                <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#0b241c] to-[#040f0c] border border-emerald-500/30 shadow-[0_20px_50px_rgba(16,185,129,0.25)] text-center relative group">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full inline-block mb-4">
                    SPATIAL ARTIFACT • MATCHA ORIGIN
                  </span>
                  <div className="w-32 h-44 mx-auto my-4 rounded-2xl bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857] shadow-[0_20px_40px_rgba(16,185,129,0.4)] flex flex-col items-center justify-between p-4 transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 border border-white/20">
                    <span className="text-[9px] font-mono text-white tracking-widest">CEREMONIAL</span>
                    <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white font-bold text-xs">
                      抹茶
                    </div>
                    <span className="text-[10px] font-mono text-white font-bold">300G • ORGANIC</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mt-2">
                    Matcha Botanical Harvest
                  </h3>
                  <p className="text-xs text-emerald-200/80 font-sans mt-1">
                    Organic shade-grown stone-ground tencha with real-time WebGL specular refraction.
                  </p>
                </div>
              )}

              {selectedArchetype.id === 'editorial-fashion' && (
                <div className="w-full max-w-md p-6 rounded-2xl bg-[#140c10] border border-rose-500/30 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-mono text-rose-400 mb-3">
                    <span>HAUTE COUTURE 2026</span>
                    <span>STUDIO FREIGHT EDITORIAL</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white tracking-tight leading-none mb-3">
                    Aesthetic Synthesis.
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="h-28 rounded-xl bg-gradient-to-tr from-rose-900 to-amber-900 border border-white/10 flex items-center justify-center text-xs font-mono text-white font-bold">
                      EXPOSURE A
                    </div>
                    <div className="h-28 rounded-xl bg-gradient-to-bl from-purple-900 to-black border border-white/10 flex items-center justify-center text-xs font-mono text-white font-bold">
                      EXPOSURE B
                    </div>
                  </div>
                  <p className="text-xs text-[#94a3b8] font-sans">
                    Seamless synthesis of micro-animations, duotone grading, and asymmetric typography grids.
                  </p>
                </div>
              )}

              {selectedArchetype.id === 'fintech-glass' && (
                <div className="w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-[#111827]/90 via-[#0b1320]/95 to-[#05080c] border border-[#dfbe7a]/60 shadow-[0_25px_60px_rgba(223,190,122,0.3)] backdrop-blur-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent via-[#dfbe7a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#c5a059] to-[#dfbe7a] flex items-center justify-center shadow-md">
                        <CreditCard className="w-4 h-4 text-[#05080c]" />
                      </div>
                      <span className="text-xs font-heading font-bold text-white tracking-wider">
                        SOVEREIGN RESERVE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#dfbe7a] border border-[#dfbe7a]/40 px-2 py-0.5 rounded-full">
                      PLATINUM
                    </span>
                  </div>

                  <div className="w-11 h-8 rounded-md bg-gradient-to-br from-[#dfbe7a] via-[#c5a059] to-[#8d6f30] border border-white/30 shadow-inner mb-6 relative z-10 flex items-center justify-center">
                    <div className="w-6 h-4 border border-black/20 rounded-sm" />
                  </div>

                  <div className="text-base font-mono tracking-widest text-[#f1f5f9] mb-4 relative z-10">
                    •••• •••• •••• 2026
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono relative z-10 border-t border-white/10 pt-3">
                    <div>
                      <span className="text-[#64748b] text-[9px] block">CARDHOLDER</span>
                      <span className="text-white font-semibold">HARSH SHANDILYA</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] text-[9px] block">EXPIRY</span>
                      <span className="text-[#dfbe7a]">11 / 2030</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INSPECTION MODAL FOR TOOLS
         ========================================================================= */}
      {inspectResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0a1018] border border-[#dfbe7a] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] space-y-6">
            <button
              onClick={() => setInspectResource(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#dfbe7a] bg-[#dfbe7a]/10 border border-[#dfbe7a]/30 px-2.5 py-0.5 rounded-md">
                  #{String(inspectResource.number).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider">
                  {inspectResource.category}
                </span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {inspectResource.name}
              </h3>
              <p className="text-xs font-mono text-[#c5a059] mt-0.5">
                {inspectResource.domain}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#05080c] border border-white/10">
              <span className="text-[10px] font-mono uppercase text-[#64748b] block mb-1">
                Curator Verdict:
              </span>
              <p className="text-sm font-heading font-semibold text-[#f1f5f9] italic">
                "{inspectResource.tagline}"
              </p>
            </div>

            <p className="text-xs text-[#cbd5e1] leading-relaxed font-light">
              {inspectResource.description}
            </p>

            <div>
              <span className="text-xs font-heading font-bold text-[#f1f5f9] block mb-2">
                Engineering & Design Superpowers:
              </span>
              <div className="flex flex-wrap gap-2">
                {inspectResource.skillsUnlocked.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-[#dfbe7a] bg-[#dfbe7a]/10 border border-[#dfbe7a]/30 px-3 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleCopyLink(inspectResource.url, inspectResource.id)}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#94a3b8] hover:text-[#dfbe7a] cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Resource Link
              </button>

              <a
                href={inspectResource.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playAudioFx('seal')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] text-xs font-mono font-bold hover:shadow-[0_0_20px_rgba(223,190,122,0.45)] transition-all cursor-pointer"
              >
                Launch {inspectResource.name} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
