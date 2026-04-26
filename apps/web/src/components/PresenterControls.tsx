import { useMutation } from '@apollo/client';
import { NEXT_SLIDE, PREV_SLIDE, GO_TO_SLIDE, ADD_SLIDE } from '../graphql/mutations';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function PresenterControls({ sessionId, currentSlideIndex, slides }: any) {
  const [nextSlide] = useMutation(NEXT_SLIDE);
  const [prevSlide] = useMutation(PREV_SLIDE);
  const [goToSlide] = useMutation(GO_TO_SLIDE);
  const [addSlide] = useMutation(ADD_SLIDE);

  const handleAddDemoSlide = () => {
    addSlide({
      variables: {
        sessionId,
        type: 'TEXT',
        content: `Welcome to Slide ${slides.length + 1}\n\nStreamShare Presentation`,
        order: slides.length
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="p-4 flex gap-2 border-b border-border">
        <button onClick={() => prevSlide({ variables: { sessionId } })} className="flex-1 flex justify-center py-2 bg-surface hover:bg-border rounded-lg border border-border transition-colors text-muted hover:text-text">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => nextSlide({ variables: { sessionId } })} className="flex-1 flex justify-center py-2 bg-surface hover:bg-border rounded-lg border border-border transition-colors text-muted hover:text-text">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {slides.map((s: any, idx: number) => (
          <div
            key={s.id}
            onClick={() => goToSlide({ variables: { sessionId, index: idx } })}
            className={`p-3 rounded-lg cursor-pointer border transition-all ${idx === currentSlideIndex ? 'bg-accent/10 border-accent/50 text-accent ring-1 ring-accent/50' : 'bg-surface border-border hover:border-muted text-muted'}`}
          >
            <div className="text-xs font-mono mb-1.5 opacity-80">Slide {idx + 1}</div>
            <div className="text-sm truncate font-medium">{s.type}: {s.content}</div>
          </div>
        ))}
        {slides.length === 0 && (
          <div className="text-sm text-muted text-center p-4">No slides yet.</div>
        )}
      </div>
      <div className="p-4 border-t border-border">
         <button onClick={handleAddDemoSlide} className="w-full flex items-center justify-center gap-2 py-2.5 bg-surface hover:bg-border border border-border rounded-lg text-sm font-medium transition-colors">
           <Plus size={16} /> Add Demo Slide
         </button>
      </div>
    </div>
  );
}
