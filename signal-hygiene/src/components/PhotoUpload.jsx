import { useRef } from 'react'

export default function PhotoUpload({ files, setFiles }) {
  const inputRef = useRef(null)

  const addFiles = (e) => {
    const newFiles = [...files]
    for (const f of e.target.files) {
      if (newFiles.length >= 5) break
      if (f.size > 15 * 1024 * 1024) continue
      const url = URL.createObjectURL(f)
      newFiles.push({ file: f, url, type: f.type.startsWith('video') ? 'video' : 'image' })
    }
    setFiles(newFiles)
    e.target.value = ''
  }

  const remove = (i) => {
    const nf = [...files]
    URL.revokeObjectURL(nf[i].url)
    nf.splice(i, 1)
    setFiles(nf)
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {files.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {files.map((f, i) => (
            <div key={i} style={{
              position: 'relative', width: 80, height: 80, borderRadius: 10,
              overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.08)'
            }}>
              {f.type === 'image'
                ? <img src={f.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                : <div style={{ width: '100%', height: '100%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>🎬</div>
              }
              <button onClick={() => remove(i)} style={{
                position: 'absolute', top: 2, right: 2, width: 20, height: 20,
                borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: 'white',
                border: 'none', fontSize: '0.65rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1
              }}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: '2px dashed rgba(0,0,0,0.1)', borderRadius: 12,
          padding: files.length > 0 ? '1rem' : '1.5rem',
          textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
          fontFamily: 'var(--font-sans, "Work Sans", sans-serif)'
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#C41E1E'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
      >
        <div style={{ fontSize: files.length > 0 ? '1rem' : '1.5rem', marginBottom: '0.3rem' }}>📸</div>
        <div style={{ fontSize: '0.82rem', color: '#666' }}>
          {files.length > 0 ? `${files.length}/5 — Ajouter d'autres` : 'Ajouter des photos ou vidéos'}
        </div>
        <div style={{ fontSize: '0.68rem', color: '#bbb', marginTop: '0.2rem' }}>
          JPG, PNG, MP4 — max 15 Mo par fichier
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={addFiles} />
    </div>
  )
}
