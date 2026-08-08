import React from 'react';

export const HollowMaskLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-11' }) => {
  return (
    <div className={`relative inline-block ${className} group-hover:scale-105 transition-transform duration-300`}>
      <svg
        viewBox="0 0 300 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_12px_rgba(204,0,0,0.7)] group-hover:drop-shadow-[0_0_20px_rgba(239,68,68,1)] transition-all duration-300"
      >
        <defs>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffb00" />
            <stop offset="50%" stopColor="#ff5500" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>
        </defs>

        {/* Outer White Silhouette of Ichigo's Half Hollow Mask */}
        <path
          d="M 125 10
             C 120 25, 110 45, 98 62
             C 85 45, 70 30, 48 60
             C 38 74, 50 95, 40 115
             C 30 130, 42 150, 52 170
             C 62 190, 85 220, 110 240
             C 118 248, 122 280, 128 320
             C 130 332, 140 348, 150 348
             C 155 348, 158 335, 160 325
             C 162 315, 165 325, 172 325
             C 178 325, 180 305, 184 295
             C 188 285, 195 295, 202 295
             C 208 295, 212 275, 218 262
             C 225 248, 235 258, 240 248
             C 246 235, 255 190, 255 150
             C 255 110, 248 80, 232 60
             C 215 40, 185 30, 168 50
             C 155 30, 140 15, 125 10 Z"
          fill="#ffffff"
        />

        {/* Black Slash Shadow / Left Inner Hollow Cutout */}
        <path
          d="M 125 10
             C 110 45, 95 80, 75 110
             C 60 132, 70 160, 95 190
             C 110 208, 122 240, 128 320
             L 120 280
             C 100 240, 70 200, 52 170
             C 42 150, 30 130, 40 115
             C 50 95, 38 74, 48 60
             C 70 30, 85 45, 98 62
             C 110 45, 120 25, 125 10 Z"
          fill="#0a0a0a"
        />

        {/* Black Diagonal Visored Stripes across right side */}
        <path
          d="M 132 50
             C 150 75, 185 110, 248 100
             C 230 80, 195 60, 160 42 Z"
          fill="#0d0d0d"
        />
        <path
          d="M 138 82
             C 160 105, 198 135, 252 130
             C 235 110, 195 90, 162 70 Z"
          fill="#0d0d0d"
        />
        <path
          d="M 142 118
             C 165 138, 202 162, 254 160
             C 238 140, 198 120, 164 102 Z"
          fill="#0d0d0d"
        />

        {/* Slashed Eye Socket */}
        <path
          d="M 135 170
             C 165 160, 212 165, 245 195
             C 218 222, 172 225, 138 198
             C 132 188, 130 178, 135 170 Z"
          fill="#050505"
        />

        {/* Glowing Orange/Yellow Eye Core */}
        <path
          d="M 152 182
             C 172 176, 202 180, 225 198
             C 205 212, 178 214, 152 198
             C 148 190, 148 185, 152 182 Z"
          fill="url(#eyeGradient)"
        />

        {/* Slanted Cheek Stripe */}
        <path
          d="M 142 225
             C 172 232, 215 242, 238 232
             C 210 248, 170 244, 142 232 Z"
          fill="#0d0d0d"
        />

        {/* Jaw Teeth Outlines */}
        <path
          d="M 145 285 L 145 320 M 165 285 L 165 320 M 185 285 L 185 305 M 205 275 L 205 290"
          stroke="#0a0a0a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
