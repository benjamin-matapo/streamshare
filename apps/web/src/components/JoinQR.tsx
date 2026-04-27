import React from 'react'
import QRCode from 'qrcode.react'

export default function JoinQR({ sessionId }: { sessionId: string }) {
  const viewerUrl = `${window.location.origin}/view/${sessionId}`
  const audienceUrl = `${window.location.origin}/audience/${sessionId}`

  return (
    <div className="grid grid-cols-2 gap-6 p-4 bg-surface border border-border rounded-md mt-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm text-muted">Viewer</div>
        <QRCode value={viewerUrl} size={180} />
        <a href={viewerUrl} className="text-xs text-accent" target="_blank" rel="noreferrer">{viewerUrl}</a>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm text-muted">Audience</div>
        <QRCode value={audienceUrl} size={180} />
        <a href={audienceUrl} className="text-xs text-accent" target="_blank" rel="noreferrer">{audienceUrl}</a>
      </div>
    </div>
  )
}
