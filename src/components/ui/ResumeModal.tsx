import React from 'react';
import { createPortal } from 'react-dom';
import type { PersonalProfile } from '../../data/personalConfig';
import { X, Printer, ExternalLink, Mail, MapPin, Award, BookOpen, Layers, Code2, Globe } from 'lucide-react';
import { playAudioFx } from './AudioEngine';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PersonalProfile;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playAudioFx('seal');
    window.print();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#f5ebd7] text-[#1c130c] border-4 border-[#8b5a2b] rounded-lg shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-10 animate-scaleUp font-fell"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header Bar (Excluded during print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#8b5a2b]/40 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#a01d12] text-[#ffd56b] font-cinzel text-xs font-bold rounded uppercase">
              Curriculum Vitae
            </span>
            <span className="text-xs font-cinzel text-[#61472e]">
              Official Verified Profile
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#171310] hover:bg-[#8b5a2b] text-[#ffd56b] hover:text-white rounded text-xs font-cinzel font-bold tracking-wider uppercase transition-colors cursor-pointer shadow"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={() => {
                playAudioFx('click');
                onClose();
              }}
              className="w-8 h-8 rounded-full wax-seal flex items-center justify-center text-[#e8dcc0] hover:text-white cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b-2 border-[#8b5a2b]/30 pb-6">
            <h1 className="text-4xl sm:text-5xl font-pirate text-[#a01d12] tracking-wider mb-1">
              {profile.name}
            </h1>
            <p className="text-base sm:text-lg font-cinzel font-bold text-[#171310] uppercase tracking-wide">
              {profile.role}
            </p>
            <p className="text-xs font-fell italic text-[#523d24] mt-1 max-w-2xl mx-auto">
              "{profile.tagline}"
            </p>

            {/* Coordinates / Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-3 text-xs font-cinzel text-[#2d1e13]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#a01d12]" />
                {profile.location}
              </span>
              <span>•</span>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-[#a01d12]">
                <Mail className="w-3.5 h-3.5 text-[#a01d12]" />
                {profile.email}
              </a>
              <span>•</span>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#a01d12]">
                <Code2 className="w-3.5 h-3.5 text-[#a01d12]" />
                GitHub
              </a>
              <span>•</span>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#a01d12]">
                <Globe className="w-3.5 h-3.5 text-[#a01d12]" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-lg font-cinzel font-bold uppercase text-[#a01d12] border-b border-[#8b5a2b]/30 pb-1 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-[#211710] text-justify">
              {profile.aboutBio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-cinzel font-bold uppercase text-[#a01d12] border-b border-[#8b5a2b]/30 pb-1 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" /> Education & Pedigree
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-cinzel font-bold text-[#171310]">
              <span>{profile.education.degree}</span>
              <span className="text-[#a01d12]">{profile.education.period}</span>
            </div>
            <div className="text-xs font-cinzel text-[#523d24]">
              {profile.education.institution} • <span className="font-bold text-[#171310]">{profile.education.grade}</span>
            </div>
            <p className="text-xs italic text-[#382618] mt-1">
              {profile.education.details}
            </p>
          </div>

          {/* Technical Armory */}
          <div>
            <h2 className="text-lg font-cinzel font-bold uppercase text-[#a01d12] border-b border-[#8b5a2b]/30 pb-1 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Technical Skills & Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-cinzel">
              {profile.skills.map((cat) => (
                <div key={cat.category} className="p-2.5 bg-[#e8dcbe]/40 rounded border border-[#8b5a2b]/30">
                  <div className="font-bold text-[#a01d12] uppercase mb-1">{cat.category}</div>
                  <div className="text-[#261b11] leading-relaxed">
                    {cat.skills.map((s) => s.name).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Production Projects */}
          <div>
            <h2 className="text-lg font-cinzel font-bold uppercase text-[#a01d12] border-b border-[#8b5a2b]/30 pb-1 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> Selected Flagship Projects
            </h2>
            <div className="space-y-3.5">
              {profile.projects.slice(0, 4).map((p) => (
                <div key={p.id} className="text-xs">
                  <div className="flex items-center justify-between font-cinzel font-bold text-[#171310]">
                    <span className="text-sm text-[#a01d12]">{p.title}</span>
                    <span className="text-[10px] text-[#523d24]">{p.metrics}</span>
                  </div>
                  <div className="text-[11px] font-cinzel text-[#543b22] italic mb-1">
                    Tech Stack: {p.techStack.join(', ')}
                  </div>
                  <p className="text-xs text-[#2b1f15] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Hackathons */}
          <div>
            <h2 className="text-lg font-cinzel font-bold uppercase text-[#a01d12] border-b border-[#8b5a2b]/30 pb-1 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" /> Hackathons & Certifications
            </h2>
            <ul className="space-y-1.5 text-xs text-[#24170f]">
              {profile.achievements.map((ach) => (
                <li key={ach.id} className="flex items-start gap-2">
                  <span className="text-[#a01d12] font-bold">•</span>
                  <div>
                    <span className="font-cinzel font-bold">{ach.title}</span> ({ach.year}) — {ach.issuer}: {ach.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
