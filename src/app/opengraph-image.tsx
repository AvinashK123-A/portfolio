import { ImageResponse } from 'next/og';
import { profile } from '@/data/portfolio';

// Rendered once at build time (no dynamic APIs) with the default bundled font,
// so no network access is needed.
export const dynamic = 'force-static';
export const alt = profile.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #0a0b14 0%, #161854 55%, #430048 100%)',
        color: '#ffffff',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 96,
          height: 96,
          borderRadius: 24,
          background: 'linear-gradient(135deg, #5667ff, #d926ec)',
          fontSize: 40,
          fontWeight: 700,
          marginBottom: 48,
        }}
      >
        {profile.initials}
      </div>
      <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
        {profile.fullName}
      </div>
      <div style={{ display: 'flex', fontSize: 40, color: '#c7d7ff', marginTop: 20 }}>
        {profile.role}
      </div>
      <div style={{ display: 'flex', fontSize: 28, color: '#b1b5c9', marginTop: 36 }}>
        {`${profile.yearsOfExperience}+ years · Flutter · ${profile.location}`}
      </div>
    </div>,
    size,
  );
}
