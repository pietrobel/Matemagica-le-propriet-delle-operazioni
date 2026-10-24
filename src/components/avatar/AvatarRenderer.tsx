import React from 'react';
import { AvatarConfig } from '../../types/math';

interface AvatarRendererProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  isTalking?: boolean;
  isCelebrating?: boolean;
  speechBubble?: string;
  showShadow?: boolean;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  config,
  size = 120,
  className = '',
  isTalking = false,
  isCelebrating = false,
  speechBubble,
  showShadow = true
}) => {
  const {
    archetype = 'fox',
    primaryColor = '#F97316',
    hairStyle = 'spiky',
    hairColor = '#EA580C',
    outfit = 'hoodie',
    outfitColor = '#3B82F6',
    accessory = 'glasses',
    expression = 'happy'
  } = config;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {/* Optional Speech Bubble from Avatar Companion */}
      {speechBubble && (
        <div 
          className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md border border-amber-200 whitespace-nowrap animate-bounce-subtle pointer-events-none"
        >
          {speechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-amber-200 rotate-45" />
        </div>
      )}

      {/* Main SVG Avatar Container */}
      <div 
        style={{ width: size, height: size }}
        className={`relative transition-transform duration-200 ${
          isCelebrating ? 'animate-bounce' : isTalking ? 'animate-pulse' : ''
        }`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-sm select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id={`bgGrad-${archetype}`} cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
            </radialGradient>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="astroGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Ground soft shadow */}
          {showShadow && (
            <ellipse cx="100" cy="188" rx="60" ry="10" fill="#000000" opacity="0.12" />
          )}

          {/* 1. BODY / OUTFIT BASE (Torso, Shoulders & Clothes) */}
          <g id="torso-and-outfit">
            {/* Base Neck */}
            <rect x="90" y="125" width="20" height="22" rx="4" fill={primaryColor} />

            {/* Torso Silhouette */}
            <path
              d="M 50 178 C 50 145, 75 135, 100 135 C 125 135, 150 145, 150 178 Z"
              fill={outfitColor}
            />

            {/* Outfit Specific Accents */}
            {outfit === 'astronaut' && (
              <g>
                {/* Tech Collar Ring */}
                <ellipse cx="100" cy="138" rx="34" ry="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                {/* Badge Panel */}
                <rect x="85" y="148" width="30" height="18" rx="4" fill="#0F172A" />
                <circle cx="93" cy="157" r="3" fill="#38BDF8" />
                <path d="M 100 154 L 108 154 M 100 160 L 106 160" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}

            {outfit === 'scientist' && (
              <g>
                {/* White Lab Coat Lapels */}
                <path d="M 80 135 L 90 178 L 70 178 Z" fill="#F8FAFC" />
                <path d="M 120 135 L 110 178 L 130 178 Z" fill="#F8FAFC" />
                {/* Shirt & Cute Tie inside */}
                <path d="M 95 138 L 105 138 L 102 152 L 100 156 L 98 152 Z" fill="#EF4444" />
                {/* Pen in pocket */}
                <rect x="72" y="152" width="12" height="14" rx="2" fill="#E2E8F0" />
                <line x1="78" y1="147" x2="78" y2="155" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {outfit === 'hoodie' && (
              <g>
                {/* Hood folds & Kangaroo Pocket */}
                <path d="M 82 135 Q 100 148 118 135" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.6" />
                <path d="M 94 142 L 94 158 M 106 142 L 106 158" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                {/* Math Symbol on chest */}
                <circle cx="100" cy="160" r="10" fill="#FFFFFF" opacity="0.25" />
                <text x="100" y="164" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#FFFFFF">∑</text>
              </g>
            )}

            {outfit === 'magician' && (
              <g>
                {/* Cape lapel with gold trims */}
                <path d="M 60 148 C 65 140, 90 136, 100 140 C 110 136, 135 140, 140 148" stroke="url(#goldGrad)" strokeWidth="3" fill="none" />
                <polygon points="100,138 103,144 109,144 104,148 106,154 100,150 94,154 96,148 91,144 97,144" fill="url(#goldGrad)" />
              </g>
            )}

            {outfit === 'athlete' && (
              <g>
                {/* Sport V-neck and Lucky Number */}
                <path d="M 88 135 L 100 146 L 112 135" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                <text x="100" y="166" fontSize="16" fontWeight="900" textAnchor="middle" fill="#FFFFFF">7</text>
              </g>
            )}

            {outfit === 'math_tee' && (
              <g>
                {/* Cool math operators floating */}
                <text x="86" y="160" fontSize="11" fontWeight="bold" fill="#FFFFFF" opacity="0.9">+</text>
                <text x="114" y="160" fontSize="11" fontWeight="bold" fill="#FFFFFF" opacity="0.9">×</text>
                <text x="100" y="170" fontSize="11" fontWeight="bold" fill="#FFFFFF" opacity="0.9">=</text>
              </g>
            )}

            {outfit === 'salopette' && (
              <g>
                {/* Inner Shirt Collar */}
                <path d="M 85 135 Q 100 144 115 135" stroke="#FFFFFF" strokeWidth="4" fill="none" />
                {/* Denim Dungaree Straps */}
                <rect x="74" y="136" width="10" height="42" fill="#1E3A8A" rx="2" />
                <rect x="116" y="136" width="10" height="42" fill="#1E3A8A" rx="2" />
                {/* Brass Buttons */}
                <circle cx="79" cy="150" r="3" fill="#F59E0B" />
                <circle cx="121" cy="150" r="3" fill="#F59E0B" />
                {/* Center Bib Pocket with Math Star */}
                <rect x="86" y="152" width="28" height="22" rx="3" fill="#1E40AF" />
                <text x="100" y="167" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#FDE047">★</text>
              </g>
            )}

            {outfit === 'starry_dress' && (
              <g>
                {/* Delicate Scalloped Neckline */}
                <path d="M 80 135 Q 90 142 100 137 Q 110 142 120 135" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
                {/* Little Twinkling Stars */}
                <polygon points="76,155 78,159 82,160 79,163 80,167 76,165 72,167 73,163 70,160 74,159" fill="#FDE047" />
                <polygon points="124,155 126,159 130,160 127,163 128,167 124,165 120,167 121,163 118,160 122,159" fill="#FDE047" />
                <polygon points="100,162 102,165 105,166 103,168 103,171 100,170 97,171 97,168 95,166 98,165" fill="#FDE047" />
                {/* Satin Ribbon Belt */}
                <line x1="60" y1="172" x2="140" y2="172" stroke="#FDE047" strokeWidth="2.5" />
              </g>
            )}

            {outfit === 'superhero' && (
              <g>
                {/* Superhero Cape silhouette behind torso */}
                <path d="M 52 142 L 38 180 L 162 180 L 148 142 Z" fill="#DC2626" opacity="0.9" />
                {/* Superhero Diamond Chest Emblem */}
                <polygon points="100,146 116,158 100,172 84,158" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
                <text x="100" y="163" fontSize="12" fontWeight="900" textAnchor="middle" fill="#DC2626">M</text>
                {/* Golden Hero Belt */}
                <rect x="65" y="173" width="70" height="5" fill="#F59E0B" rx="1" />
              </g>
            )}
          </g>

          {/* 2. HEAD & EARS / ARCHETYPE STRUCTURE */}
          <g id="head-base">
            {archetype === 'fox' && (
              <g>
                {/* Fox Pointy Ears */}
                <polygon points="56,70 42,22 84,46" fill={primaryColor} />
                <polygon points="58,66 48,32 78,48" fill="#FDE047" opacity="0.7" />
                <polygon points="144,70 158,22 116,46" fill={primaryColor} />
                <polygon points="142,66 152,32 122,48" fill="#FDE047" opacity="0.7" />

                {/* Fox Head Shape */}
                <path
                  d="M 50 85 C 50 45, 150 45, 150 85 C 150 115, 130 135, 100 135 C 70 135, 50 115, 50 85 Z"
                  fill={primaryColor}
                />
                {/* Fluffy white cheeks */}
                <path d="M 50 95 C 44 105, 56 122, 75 125 C 85 125, 75 105, 62 95 Z" fill="#FFFFFF" />
                <path d="M 150 95 C 156 105, 144 122, 125 125 C 115 125, 125 105, 138 95 Z" fill="#FFFFFF" />
                <ellipse cx="100" cy="118" rx="20" ry="14" fill="#FFFFFF" />
                {/* Black Nose */}
                <ellipse cx="100" cy="112" rx="6" ry="4" fill="#1E293B" />
              </g>
            )}

            {archetype === 'owl' && (
              <g>
                {/* Owl Tufts / Horns */}
                <polygon points="62,60 52,28 78,44" fill={primaryColor} />
                <polygon points="138,60 148,28 122,44" fill={primaryColor} />
                {/* Owl Rounded Head */}
                <ellipse cx="100" cy="85" rx="50" ry="45" fill={primaryColor} />
                {/* Eye rings */}
                <circle cx="80" cy="85" r="22" fill="#FFFFFF" />
                <circle cx="120" cy="85" r="22" fill="#FFFFFF" />
                {/* Beak */}
                <polygon points="95,95 105,95 100,108" fill="#F59E0B" />
              </g>
            )}

            {archetype === 'robot' && (
              <g>
                {/* Antenna */}
                <line x1="100" y1="42" x2="100" y2="24" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="20" r="7" fill="#F59E0B" className="animate-pulse" />
                {/* Bolt Ears */}
                <rect x="42" y="75" width="10" height="20" rx="3" fill="#64748B" />
                <rect x="148" y="75" width="10" height="20" rx="3" fill="#64748B" />
                {/* Robot Rectangular Rounded Head */}
                <rect x="52" y="44" width="96" height="82" rx="24" fill={primaryColor} />
                {/* Screen Visor */}
                <rect x="62" y="56" width="76" height="52" rx="14" fill="#0F172A" />
              </g>
            )}

            {archetype === 'kid_boy' && (
              <g>
                {/* Round Ears */}
                <circle cx="52" cy="90" r="12" fill={primaryColor} />
                <circle cx="148" cy="90" r="12" fill={primaryColor} />
                {/* Head */}
                <ellipse cx="100" cy="86" rx="46" ry="44" fill={primaryColor} />
                {/* Rosy Cheeks */}
                <circle cx="68" cy="100" r="8" fill="#F43F5E" opacity="0.25" />
                <circle cx="132" cy="100" r="8" fill="#F43F5E" opacity="0.25" />
                {/* Nose */}
                <ellipse cx="100" cy="92" rx="3" ry="2" fill="#B45309" opacity="0.4" />
              </g>
            )}

            {archetype === 'kid_girl' && (
              <g>
                {/* Round Ears */}
                <circle cx="52" cy="90" r="12" fill={primaryColor} />
                <circle cx="148" cy="90" r="12" fill={primaryColor} />
                {/* Head */}
                <ellipse cx="100" cy="86" rx="46" ry="44" fill={primaryColor} />
                {/* Rosy Cheeks */}
                <circle cx="68" cy="98" r="9" fill="#FB7185" opacity="0.3" />
                <circle cx="132" cy="98" r="9" fill="#FB7185" opacity="0.3" />
                {/* Sweet small Nose */}
                <ellipse cx="100" cy="92" rx="2.5" ry="2" fill="#BE185D" opacity="0.3" />
              </g>
            )}
          </g>

          {/* 3. HAIR (If not none) */}
          <g id="hair">
            {hairStyle === 'spiky' && (
              <path
                d="M 54 65 C 50 35, 75 30, 85 24 C 95 35, 105 20, 115 24 C 125 35, 145 32, 146 65 C 135 52, 115 50, 100 52 C 85 50, 65 52, 54 65 Z"
                fill={hairColor}
              />
            )}

            {hairStyle === 'curls' && (
              <g fill={hairColor}>
                <circle cx="60" cy="50" r="16" />
                <circle cx="80" cy="40" r="18" />
                <circle cx="100" cy="36" r="18" />
                <circle cx="120" cy="40" r="18" />
                <circle cx="140" cy="50" r="16" />
                <circle cx="52" cy="65" r="12" />
                <circle cx="148" cy="65" r="12" />
              </g>
            )}

            {hairStyle === 'bob' && (
              <path
                d="M 50 82 C 48 42, 65 32, 100 32 C 135 32, 152 42, 150 82 C 145 92, 138 65, 130 58 C 110 52, 90 52, 70 58 C 62 65, 55 92, 50 82 Z"
                fill={hairColor}
              />
            )}

            {hairStyle === 'braids' && (
              <g fill={hairColor}>
                {/* Bangs */}
                <path d="M 55 65 C 65 42, 135 42, 145 65 C 125 56, 75 56, 55 65 Z" />
                {/* Left Braid */}
                <ellipse cx="44" cy="90" rx="8" ry="12" />
                <ellipse cx="42" cy="110" rx="7" ry="10" />
                <circle cx="42" cy="122" r="5" fill="#F43F5E" />
                {/* Right Braid */}
                <ellipse cx="156" cy="90" rx="8" ry="12" />
                <ellipse cx="158" cy="110" rx="7" ry="10" />
                <circle cx="158" cy="122" r="5" fill="#F43F5E" />
              </g>
            )}

            {hairStyle === 'cap' && (
              <g>
                {/* Cap dome */}
                <path d="M 52 64 C 55 36, 145 36, 148 64 Z" fill={hairColor} />
                {/* Cap visor pointing side */}
                <path d="M 125 60 C 155 60, 168 68, 165 74 C 145 74, 130 68, 125 60 Z" fill="#F59E0B" />
                <circle cx="100" cy="38" r="4" fill="#F59E0B" />
              </g>
            )}

            {hairStyle === 'crest' && (
              <path
                d="M 94 48 L 97 18 L 103 18 L 106 48 Z"
                fill={hairColor}
              />
            )}

            {hairStyle === 'ponytail' && (
              <g fill={hairColor}>
                {/* Sleek front bangs */}
                <path d="M 54 68 C 65 38, 135 38, 146 68 C 130 52, 70 52, 54 68 Z" />
                {/* High Ponytail arching to the side */}
                <path d="M 132 46 C 160 30, 178 50, 172 86 C 165 105, 150 95, 154 75 C 158 58, 144 48, 132 46 Z" />
                {/* Colorful Hair Scrunchie */}
                <circle cx="134" cy="46" r="6" fill="#F43F5E" />
              </g>
            )}

            {hairStyle === 'top_bun' && (
              <g fill={hairColor}>
                {/* Rounded Top Bun */}
                <ellipse cx="100" cy="24" rx="18" ry="16" />
                {/* Ribbon around bun */}
                <rect x="88" y="32" width="24" height="5" rx="2" fill="#EC4899" />
                {/* Soft framing bangs */}
                <path d="M 54 70 C 60 40, 140 40, 146 70 C 128 54, 72 54, 54 70 Z" />
                <path d="M 52 70 Q 56 90 60 96" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 148 70 Q 144 90 140 96" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            )}

            {hairStyle === 'long_waves' && (
              <g fill={hairColor}>
                {/* Volume on top */}
                <path d="M 50 68 C 55 30, 145 30, 150 68 C 130 50, 70 50, 50 68 Z" />
                {/* Left flowing long waves down over shoulders */}
                <path d="M 52 68 C 36 90, 34 125, 46 155 C 50 162, 56 160, 54 150 C 48 128, 48 95, 62 76 Z" />
                {/* Right flowing long waves down over shoulders */}
                <path d="M 148 68 C 164 90, 166 125, 154 155 C 150 162, 144 160, 146 150 C 152 128, 152 95, 138 76 Z" />
              </g>
            )}

            {hairStyle === 'twin_pigtails' && (
              <g fill={hairColor}>
                {/* Central neat part bangs */}
                <path d="M 55 66 C 70 42, 98 54, 100 58 C 102 54, 130 42, 145 66 C 125 54, 75 54, 55 66 Z" />
                {/* Left High Pigtail */}
                <ellipse cx="44" cy="56" rx="14" ry="18" transform="rotate(-15 44 56)" />
                <circle cx="54" cy="62" r="5" fill="#3B82F6" />
                {/* Right High Pigtail */}
                <ellipse cx="156" cy="56" rx="14" ry="18" transform="rotate(15 156 56)" />
                <circle cx="146" cy="62" r="5" fill="#3B82F6" />
              </g>
            )}
          </g>

          {/* 4. EYES & EXPRESSION */}
          <g id="face-expression">
            {archetype === 'robot' ? (
              // ROBOT EXPRESSIONS: Tech Visor Screen
              <g fill="#38BDF8">
                {/* Robot Eyes */}
                {(expression === 'happy' || !['happy', 'wink', 'starry', 'sweet_smile', 'determined', 'focused'].includes(expression)) && (
                  <>
                    <path d="M 74 78 Q 84 68 94 78" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M 106 78 Q 116 68 126 78" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
                    {/* Smiling Digital Mouth */}
                    <path d="M 88 95 Q 100 103 112 95" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  </>
                )}

                {expression === 'sweet_smile' && (
                  <>
                    <path d="M 76 80 Q 84 73 92 80" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M 108 80 Q 116 73 124 80" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <circle cx="68" cy="84" r="3" fill="#FB7185" />
                    <circle cx="132" cy="84" r="3" fill="#FB7185" />
                    {/* Sweet Digital Smile */}
                    <path d="M 90 96 Q 100 101 110 96" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </>
                )}

                {expression === 'wink' && (
                  <>
                    <circle cx="84" cy="76" r="6" fill="#38BDF8" />
                    <circle cx="82" cy="74" r="2" fill="#FFFFFF" />
                    <line x1="108" y1="76" x2="124" y2="76" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                    {/* Cheeky Asymmetric Smirk */}
                    <path d="M 88 97 Q 100 102 114 94" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  </>
                )}

                {expression === 'starry' && (
                  <>
                    <polygon points="84,68 86,74 92,76 86,78 84,84 82,78 76,76 82,74" fill="#FCD34D" />
                    <polygon points="116,68 118,74 124,76 118,78 116,84 114,78 108,76 114,74" fill="#FCD34D" />
                    {/* Wide Open Happy Digital Mouth */}
                    <path d="M 88 94 Q 100 104 112 94 Z" fill="#38BDF8" />
                  </>
                )}

                {expression === 'determined' && (
                  <>
                    <polygon points="74,72 94,77 94,83 74,77" fill="#38BDF8" />
                    <polygon points="126,72 106,77 106,83 126,77" fill="#38BDF8" />
                    {/* Bold Confident Grid Smirk */}
                    <path d="M 86 96 L 114 96 L 111 101 L 89 101 Z" fill="#38BDF8" />
                  </>
                )}

                {expression === 'focused' && (
                  <>
                    <rect x="74" y="74" width="18" height="6" rx="2" fill="#38BDF8" />
                    <circle cx="83" cy="77" r="2" fill="#FFFFFF" />
                    <rect x="108" y="74" width="18" height="6" rx="2" fill="#38BDF8" />
                    <circle cx="117" cy="77" r="2" fill="#FFFFFF" />
                    {/* Focused Straight Data Bar Mouth */}
                    <rect x="90" y="96" width="20" height="4" rx="2" fill="#38BDF8" />
                  </>
                )}
              </g>
            ) : (
              // ORGANIC EXPRESSIONS: Fox, Owl, Kid Boy, Kid Girl
              <g>
                {/* 1. HAPPY */}
                {(expression === 'happy' || !['happy', 'wink', 'starry', 'sweet_smile', 'determined', 'focused'].includes(expression)) && (
                  <>
                    {/* Left Eye */}
                    <ellipse cx={archetype === 'owl' ? 80 : 82} cy={archetype === 'owl' ? 84 : 86} rx="6" ry="8" fill="#1E293B" />
                    <circle cx={archetype === 'owl' ? 78 : 80} cy={archetype === 'owl' ? 81 : 83} r="2.5" fill="#FFFFFF" />
                    {/* Right Eye */}
                    <ellipse cx={archetype === 'owl' ? 120 : 118} cy={archetype === 'owl' ? 84 : 86} rx="6" ry="8" fill="#1E293B" />
                    <circle cx={archetype === 'owl' ? 118 : 116} cy={archetype === 'owl' ? 81 : 83} r="2.5" fill="#FFFFFF" />

                    {/* Mouth based on Archetype */}
                    {archetype === 'fox' ? (
                      <path d="M 100 114 L 100 117 M 92 118 Q 96 122 100 118 Q 104 122 108 118" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    ) : archetype !== 'owl' ? (
                      <path d="M 88 104 Q 100 114 112 104" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
                    ) : null}
                  </>
                )}

                {/* 2. SWEET SMILE */}
                {expression === 'sweet_smile' && (
                  <>
                    <path
                      d={archetype === 'owl' ? "M 72 85 Q 80 77 88 85" : "M 76 86 Q 82 80 88 86"}
                      stroke="#1E293B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d={archetype === 'owl' ? "M 112 85 Q 120 77 128 85" : "M 112 86 Q 118 80 124 86"}
                      stroke="#1E293B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Rosy blush cheeks */}
                    <circle cx={archetype === 'owl' ? 68 : 70} cy="94" r="6" fill="#FB7185" opacity="0.4" />
                    <circle cx={archetype === 'owl' ? 132 : 130} cy="94" r="6" fill="#FB7185" opacity="0.4" />

                    {archetype === 'fox' ? (
                      <path d="M 93 118 Q 96 121 100 118 Q 104 121 107 118" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    ) : archetype !== 'owl' ? (
                      <path d="M 90 105 Q 100 113 110 105" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    ) : null}
                  </>
                )}

                {/* 3. WINK */}
                {expression === 'wink' && (
                  <>
                    {/* Left Eye Open */}
                    <ellipse cx={archetype === 'owl' ? 80 : 82} cy={archetype === 'owl' ? 84 : 86} rx="6" ry="8" fill="#1E293B" />
                    <circle cx={archetype === 'owl' ? 78 : 80} cy={archetype === 'owl' ? 81 : 83} r="2.5" fill="#FFFFFF" />
                    {/* Right Eye Wink */}
                    <path
                      d={archetype === 'owl' ? "M 110 85 Q 120 75 130 85" : "M 110 86 Q 118 78 126 86"}
                      stroke="#1E293B"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {archetype === 'fox' ? (
                      <g>
                        <path d="M 100 114 L 100 117 M 93 118 Q 100 124 109 118" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <path d="M 97 120 Q 100 125 103 120 Z" fill="#EF4444" />
                      </g>
                    ) : archetype !== 'owl' ? (
                      <path d="M 88 104 Q 100 118 114 102" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="#EF4444" />
                    ) : null}
                  </>
                )}

                {/* 4. STARRY */}
                {expression === 'starry' && (
                  <>
                    {/* Sparkling Golden Eyes */}
                    <polygon
                      points={archetype === 'owl' 
                        ? "80,77 82,83 88,85 83,88 85,94 80,90 75,94 77,88 72,85 78,83"
                        : "82,78 84,84 90,86 85,89 87,95 82,91 77,95 79,89 74,86 80,84"}
                      fill="#F59E0B"
                    />
                    <polygon
                      points={archetype === 'owl'
                        ? "120,77 122,83 128,85 123,88 125,94 120,90 115,94 117,88 112,85 118,83"
                        : "118,78 120,84 126,86 121,89 123,95 118,91 113,95 115,89 110,86 116,84"}
                      fill="#F59E0B"
                    />

                    {archetype === 'fox' ? (
                      <path d="M 93 117 Q 100 125 107 117 Z" fill="#EF4444" stroke="#1E293B" strokeWidth="1.8" />
                    ) : archetype !== 'owl' ? (
                      <ellipse cx="100" cy="107" rx="8" ry="6" fill="#EF4444" stroke="#1E293B" strokeWidth="1.5" />
                    ) : null}
                  </>
                )}

                {/* 5. DETERMINED */}
                {expression === 'determined' && (
                  <>
                    {/* Eyebrows */}
                    <line
                      x1={archetype === 'owl' ? "68" : "72"}
                      y1={archetype === 'owl' ? "72" : "74"}
                      x2={archetype === 'owl' ? "90" : "88"}
                      y2={archetype === 'owl' ? "78" : "78"}
                      stroke="#1E293B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1={archetype === 'owl' ? "132" : "128"}
                      y1={archetype === 'owl' ? "72" : "74"}
                      x2={archetype === 'owl' ? "110" : "112"}
                      y2={archetype === 'owl' ? "78" : "78"}
                      stroke="#1E293B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <ellipse cx={archetype === 'owl' ? 80 : 82} cy="86" rx="5" ry="7" fill="#1E293B" />
                    <circle cx={archetype === 'owl' ? 79 : 81} cy="83" r="2" fill="#FFFFFF" />
                    <ellipse cx={archetype === 'owl' ? 120 : 118} cy="86" rx="5" ry="7" fill="#1E293B" />
                    <circle cx={archetype === 'owl' ? 119 : 117} cy="83" r="2" fill="#FFFFFF" />

                    {archetype === 'fox' ? (
                      <path d="M 92 119 Q 100 124 108 117" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    ) : archetype !== 'owl' ? (
                      <path d="M 88 103 Q 100 116 112 103 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
                    ) : null}
                  </>
                )}

                {/* 6. FOCUSED */}
                {expression === 'focused' && (
                  <>
                    {/* Eyebrows */}
                    <line
                      x1={archetype === 'owl' ? "70" : "74"}
                      y1={archetype === 'owl' ? "74" : "75"}
                      x2={archetype === 'owl' ? "90" : "89"}
                      y2={archetype === 'owl' ? "76" : "78"}
                      stroke="#1E293B"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1={archetype === 'owl' ? "130" : "126"}
                      y1={archetype === 'owl' ? "74" : "75"}
                      x2={archetype === 'owl' ? "110" : "111"}
                      y2={archetype === 'owl' ? "76" : "78"}
                      stroke="#1E293B"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <ellipse cx={archetype === 'owl' ? 80 : 82} cy={archetype === 'owl' ? 84 : 86} rx="5.5" ry="7.5" fill="#1E293B" />
                    <circle cx={archetype === 'owl' ? 79 : 81} cy={archetype === 'owl' ? 82 : 84} r="2.2" fill="#FFFFFF" />
                    <ellipse cx={archetype === 'owl' ? 120 : 118} cy={archetype === 'owl' ? 84 : 86} rx="5.5" ry="7.5" fill="#1E293B" />
                    <circle cx={archetype === 'owl' ? 119 : 117} cy={archetype === 'owl' ? 82 : 84} r="2.2" fill="#FFFFFF" />

                    <circle cx={archetype === 'owl' ? 68 : 70} cy="94" r="5" fill="#FB7185" opacity="0.3" />
                    <circle cx={archetype === 'owl' ? 132 : 130} cy="94" r="5" fill="#FB7185" opacity="0.3" />

                    {archetype === 'fox' ? (
                      <line x1="94" y1="120" x2="106" y2="120" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                    ) : archetype !== 'owl' ? (
                      <path d="M 91 105 Q 100 108 109 105" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    ) : null}
                  </>
                )}
              </g>
            )}
          </g>

          {/* 5. ACCESSORIES */}
          <g id="accessory">
            {accessory === 'glasses' && (
              <g stroke="#1E293B" strokeWidth="2.2" fill="none">
                <circle cx="82" cy="86" r="15" />
                <circle cx="118" cy="86" r="15" />
                <line x1="97" y1="86" x2="103" y2="86" strokeWidth="2.5" />
                {/* Clean discrete reflection highlight away from pupil and brow */}
                <path d="M 88 75 L 93 72" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M 124 75 L 129 72" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
              </g>
            )}

            {accessory === 'heart_glasses' && (
              <g stroke="#EC4899" strokeWidth="2.2" fill="none">
                {/* Left Heart */}
                <path d="M 82 96 C 68 85, 62 72, 74 68 C 80 66, 82 72, 82 72 C 82 72, 84 66, 90 68 C 102 72, 96 85, 82 96 Z" />
                {/* Right Heart */}
                <path d="M 118 96 C 104 85, 98 72, 110 68 C 116 66, 118 72, 118 72 C 118 72, 120 66, 126 68 C 138 72, 132 85, 118 96 Z" />
                {/* Center bridge */}
                <line x1="93" y1="76" x2="107" y2="76" strokeWidth="2.5" />
              </g>
            )}

            {accessory === 'hair_bow' && (
              <g>
                {/* Big decorative hair bow */}
                <ellipse cx="86" cy="30" rx="14" ry="10" fill="#F43F5E" transform="rotate(-20 86 30)" />
                <ellipse cx="114" cy="30" rx="14" ry="10" fill="#F43F5E" transform="rotate(20 114 30)" />
                <circle cx="100" cy="30" r="6" fill="#FB7185" stroke="#E11D48" strokeWidth="1.5" />
              </g>
            )}

            {accessory === 'headband_stars' && (
              <g>
                {/* Headband arch */}
                <path d="M 52 75 C 54 36, 146 36, 148 75" fill="none" stroke="#F59E0B" strokeWidth="4" />
                {/* Little Spring Stars */}
                <polygon points="80,24 82,28 86,29 83,32 84,36 80,34 76,36 77,32 74,29 78,28" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
                <polygon points="120,24 122,28 126,29 123,32 124,36 120,34 116,36 117,32 114,29 118,28" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
              </g>
            )}

            {accessory === 'wizard_hat' && (
              <g>
                {/* Pointy hat cone */}
                <polygon points="100,2 62,48 138,48" fill="#581C87" stroke="#3B0764" strokeWidth="2" />
                {/* Hat Brim */}
                <ellipse cx="100" cy="48" rx="46" ry="10" fill="#6B21A8" stroke="#3B0764" strokeWidth="2" />
                {/* Gold Hat Ribbon & Buckle */}
                <path d="M 68 44 C 80 47, 120 47, 132 44" stroke="#F59E0B" strokeWidth="4" fill="none" />
                <rect x="94" y="40" width="12" height="8" rx="2" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
              </g>
            )}

            {accessory === 'crown' && (
              <g>
                <polygon
                  points="75,44 82,22 100,34 118,22 125,44"
                  fill="url(#goldGrad)"
                  stroke="#D97706"
                  strokeWidth="2"
                />
                <circle cx="82" cy="22" r="3" fill="#EF4444" />
                <circle cx="100" cy="34" r="3.5" fill="#3B82F6" />
                <circle cx="118" cy="22" r="3" fill="#10B981" />
              </g>
            )}

            {accessory === 'headphones' && (
              <g>
                {/* Headband arch */}
                <path d="M 44 85 C 44 35, 156 35, 156 85" fill="none" stroke="#0F172A" strokeWidth="6" />
                {/* Ear cushions */}
                <rect x="38" y="70" width="12" height="30" rx="6" fill="#F59E0B" />
                <rect x="150" y="70" width="12" height="30" rx="6" fill="#F59E0B" />
              </g>
            )}

            {accessory === 'explorer_scarf' && (
              <g>
                <path d="M 70 126 C 85 136, 115 136, 130 126 C 135 136, 115 146, 70 126 Z" fill="#EF4444" />
                <path d="M 110 134 L 118 165 L 128 165 L 122 134 Z" fill="#EF4444" />
                {/* Scarf fringes */}
                <line x1="119" y1="165" x2="119" y2="170" stroke="#EF4444" strokeWidth="2" />
                <line x1="123" y1="165" x2="123" y2="170" stroke="#EF4444" strokeWidth="2" />
                <line x1="127" y1="165" x2="127" y2="170" stroke="#EF4444" strokeWidth="2" />
              </g>
            )}

            {accessory === 'medal' && (
              <g>
                {/* Medal ribbon */}
                <path d="M 94 135 L 98 160 L 100 160 L 104 135" fill="#3B82F6" />
                {/* Gold Medal */}
                <circle cx="100" cy="166" r="10" fill="url(#goldGrad)" stroke="#D97706" strokeWidth="1.5" />
                <text x="100" y="170" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#78350F">★</text>
              </g>
            )}

            {accessory === 'magic_wand' && (
              <g className="animate-bounce-subtle">
                {/* Wand Stick */}
                <line x1="150" y1="140" x2="168" y2="110" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
                {/* Star on Wand */}
                <polygon
                  points="168,104 171,110 178,110 172,114 174,120 168,116 162,120 164,114 158,110 165,110"
                  fill="url(#goldGrad)"
                />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};
