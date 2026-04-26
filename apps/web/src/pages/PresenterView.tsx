import { useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_SESSION } from '../graphql/queries';
import { SESSION_UPDATED } from '../graphql/subscriptions';
import PresenterControls from '../components/PresenterControls';
import SlideCanvas from '../components/SlideCanvas';
import QuestionList from '../components/QuestionList';
import { Copy, MonitorPlay } from 'lucide-react';

export default function PresenterView() {
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(GET_SESSION, { variables: { id } });
  
  useSubscription(SESSION_UPDATED, {
    variables: { sessionId: id },
    onData: () => refetch()
  });

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center text-text font-sans">Loading...</div>;
  if (!data?.session) return <div className="min-h-screen bg-surface flex items-center justify-center text-text font-sans">Session not found</div>;

  const { session } = data;
  const currentSlide = session.slides[session.currentSlideIndex];

  return (
    <div className="h-screen bg-surface text-text flex overflow-hidden font-sans">
      {/* Left Sidebar - Slide Thumbnails & Controls */}
      <div className="w-72 bg-panel border-r border-border flex flex-col z-10 shadow-lg">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold text-lg mb-4 truncate">{session.name}</h2>
          <div className="space-y-3">
            <button 
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/view/${id}`)}
              className="w-full flex items-center justify-between px-3 py-2 bg-surface hover:bg-border border border-border rounded-lg text-sm text-muted hover:text-text transition-colors"
            >
              <span className="flex items-center gap-2"><MonitorPlay size={14} /> Viewer Link</span>
              <Copy size={14} className="opacity-50" />
            </button>
            <button 
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/audience/${id}`)}
              className="w-full flex items-center justify-between px-3 py-2 bg-surface hover:bg-border border border-border rounded-lg text-sm text-muted hover:text-text transition-colors"
            >
              <span className="flex items-center gap-2"><MonitorPlay size={14} /> Audience Link</span>
              <Copy size={14} className="opacity-50" />
            </button>
          </div>
        </div>
        <PresenterControls sessionId={id!} currentSlideIndex={session.currentSlideIndex} slides={session.slides} />
      </div>

      {/* Centre - Live Preview */}
      <div className="flex-1 flex flex-col relative bg-[#090A0F]">
        <div className="px-6 py-4 border-b border-border/50 bg-panel/80 backdrop-blur-sm flex justify-between items-center z-10 absolute top-0 w-full">
          <div className="font-mono text-sm text-muted font-medium tracking-wide">
            SLIDE {session.currentSlideIndex + 1} OF {Math.max(session.slides.length, 1)}
          </div>
          <div className="flex gap-2">
            <div className="px-2.5 py-1 bg-accent/20 text-accent border border-accent/20 rounded text-xs font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> LIVE
            </div>
          </div>
        </div>
        <div className="flex-1 p-12 overflow-hidden flex items-center justify-center pt-24">
           <div className="w-full max-w-[177.78vh] aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(108,99,255,0.15)] ring-1 ring-border/50 relative bg-black">
              <SlideCanvas slide={currentSlide} />
           </div>
        </div>
      </div>

      {/* Right Sidebar - Q&A */}
      <div className="w-[340px] bg-panel border-l border-border flex flex-col z-10 shadow-lg">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold text-text flex items-center gap-2">
            Audience Q&A
            <span className="px-2 py-0.5 bg-surface rounded text-xs text-muted font-mono ml-auto">LIVE</span>
          </h3>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <QuestionList sessionId={id!} isPresenter={true} />
        </div>
      </div>
    </div>
  );
}
