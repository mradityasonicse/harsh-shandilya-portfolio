import React from 'react';
import { createPortal } from 'react-dom';
import type { PersonalProfile } from '../../data/personalConfig';
import { X, Printer, Download, Mail, Phone, MapPin, Code2, Globe, CheckCircle2, Shield, ExternalLink } from 'lucide-react';
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
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#090e17] text-[#f1f5f9] border border-[#c5a059]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-10 animate-scaleUp font-sans print:bg-white print:text-black print:border-none print:p-0 print:m-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Header Bar (Excluded during print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c5a059]/20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#dfbe7a]/15 text-[#dfbe7a] font-mono text-xs font-bold rounded-full border border-[#dfbe7a]/30 uppercase">
              Curriculum Vitae
            </span>
            <span className="text-xs font-mono text-[#94a3b8]">
              Harsh Kumar Shandilya • Official Resume
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/Harsh_Resume.pdf"
              download="Harsh_Kumar_Shandilya_Resume.pdf"
              onClick={() => playAudioFx('seal')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0e1622] hover:bg-[#141f2e] text-[#dfbe7a] border border-[#c5a059]/40 text-xs font-heading font-bold uppercase transition-all cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 brass-btn rounded-xl text-xs font-heading font-bold uppercase transition-all cursor-pointer shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={() => {
                playAudioFx('click');
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-[#05080c] border border-white/10 hover:border-[#dfbe7a] flex items-center justify-center text-[#94a3b8] hover:text-[#dfbe7a] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b border-[#c5a059]/20 print:border-black/20 pb-6">
            <h1 className="text-3xl sm:text-4xl font-h1 font-black text-[#f1f5f9] print:text-black tracking-[-0.04em] mb-1">
              {profile.name}
            </h1>
            <p className="text-sm sm:text-base font-heading font-medium text-[#dfbe7a] print:text-neutral-800 uppercase tracking-normal">
              {profile.role}
            </p>
            <p className="text-xs font-mono text-[#94a3b8] print:text-neutral-600 mt-1">
              {profile.subRole}
            </p>

            {/* Coordinates / Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-3 text-xs font-mono text-[#94a3b8] print:text-neutral-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#dfbe7a] print:text-black" />
                {profile.location}
              </span>
              <span>•</span>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1 text-[#dfbe7a] hover:underline print:text-black">
                <Mail className="w-3.5 h-3.5" />
                {profile.email}
              </a>
              {profile.phone && (
                <>
                  <span>•</span>
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-1 hover:text-[#dfbe7a] print:text-black">
                    <Phone className="w-3.5 h-3.5" />
                    {profile.phone}
                  </a>
                </>
              )}
              <span>•</span>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#dfbe7a] print:text-black">
                <Code2 className="w-3.5 h-3.5" />
                GitHub
              </a>
              <span>•</span>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#dfbe7a] print:text-black">
                <Globe className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Profile / Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold text-[#dfbe7a] print:text-neutral-900 uppercase tracking-wider mb-2">
              Profile Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#cbd5e1] print:text-neutral-800 font-sans leading-relaxed">
              {profile.aboutBio}
            </p>
          </div>

          {/* Work Experience / Student Leadership */}
          <div>
            <h2 className="text-xs font-mono font-bold text-[#dfbe7a] print:text-neutral-900 uppercase tracking-wider mb-3">
              Work Experience & Community Leadership
            </h2>
            <div className="space-y-4">
              {profile.experience.map((exp) => (
                <div key={exp.role} className="p-4 rounded-xl bg-[#05080c]/60 print:bg-neutral-50 border border-white/5 print:border-neutral-200">
                  <div className="flex justify-between items-start text-xs sm:text-sm font-semibold text-[#f1f5f9] print:text-black">
                    <span className="text-[#dfbe7a] font-bold">{exp.role}</span>
                    <span className="font-mono text-[#94a3b8] print:text-neutral-800 text-xs">{exp.period}</span>
                  </div>
                  <div className="text-xs text-[#cbd5e1] print:text-neutral-600 mb-2 font-medium">
                    {exp.organization} • {exp.location}
                  </div>
                  <div className="space-y-1">
                    {exp.achievements.map((ach) => (
                      <div key={ach} className="flex items-start gap-2 text-xs text-[#94a3b8] print:text-neutral-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold text-[#dfbe7a] print:text-neutral-900 uppercase tracking-wider mb-2">
              Education
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#05080c]/60 print:bg-neutral-50 border border-white/5 print:border-neutral-200">
                <div className="flex justify-between items-start text-xs sm:text-sm font-semibold text-[#f1f5f9] print:text-black">
                  <span>{profile.education.degree}</span>
                  <span className="font-mono text-[#dfbe7a] print:text-neutral-800">{profile.education.period}</span>
                </div>
                <div className="text-xs text-[#94a3b8] print:text-neutral-600 mt-0.5">
                  {profile.education.institution} • <span className="text-emerald-400 print:text-black font-semibold">{profile.education.grade}</span>
                </div>
                <p className="text-xs text-[#64748b] print:text-neutral-700 mt-1">
                  {profile.education.details}
                </p>
              </div>

              {profile.secondaryEducation && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.secondaryEducation.map((sec) => (
                    <div key={sec.level} className="p-3 rounded-xl bg-[#05080c]/40 print:bg-neutral-50 border border-white/5 print:border-neutral-200 text-xs">
                      <div className="font-bold text-[#f1f5f9] print:text-black">{sec.level}</div>
                      <div className="text-[#94a3b8] print:text-neutral-600">{sec.school}</div>
                      <div className="text-[#dfbe7a] font-mono text-[11px] mt-0.5">{sec.period}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold text-[#dfbe7a] print:text-neutral-900 uppercase tracking-wider mb-2">
              Technical Skills & Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {profile.skills.map((cat) => (
                <div key={cat.category} className="p-3 rounded-xl bg-[#05080c]/60 print:bg-neutral-50 border border-white/5 print:border-neutral-200">
                  <div className="font-bold text-[#dfbe7a] print:text-black mb-1.5">{cat.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="px-2 py-0.5 rounded bg-[#141f2e] text-[#cbd5e1] print:bg-neutral-200 print:text-black text-[11px] font-mono">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold text-[#dfbe7a] print:text-neutral-900 uppercase tracking-wider mb-3">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.projects.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-[#05080c]/60 print:bg-neutral-50 border border-white/5 print:border-neutral-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#f1f5f9] print:text-black font-heading flex items-center justify-between">
                      <span>{p.title}</span>
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#dfbe7a] hover:underline inline-flex items-center gap-1 text-[11px] font-mono">
                        Link <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-[11px] font-mono text-[#dfbe7a] print:text-neutral-800 mt-0.5">{p.metrics}</div>
                    <p className="text-xs text-[#94a3b8] print:text-neutral-700 mt-1 leading-relaxed">{p.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-[#05080c] text-[10px] font-mono text-[#cbd5e1] rounded border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold text-[#dfbe7a] print:text-neutral-900 uppercase tracking-wider mb-3">
              Verified Certificates & Honors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {profile.achievements.map((ach) => (
                <a
                  key={ach.id}
                  href={ach.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#05080c]/60 hover:bg-[#141f2e] print:bg-neutral-50 border border-white/5 hover:border-[#dfbe7a]/40 print:border-neutral-200 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[#dfbe7a] shrink-0" />
                    <div>
                      <div className="font-semibold text-[#f1f5f9] print:text-black group-hover:text-[#dfbe7a] transition-colors">{ach.title}</div>
                      <div className="text-[11px] text-[#94a3b8] print:text-neutral-600 font-mono">{ach.issuer}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#dfbe7a] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
