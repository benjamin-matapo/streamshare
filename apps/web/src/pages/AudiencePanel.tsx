import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SESSION } from '../graphql/queries';
import EmojiBar from '../components/EmojiBar';
import QuestionList from '../components/QuestionList';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function AudiencePanel() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_SESSION, { variables: { id } });

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center text-text font-sans">Loading...</div>;
  if (!data?.session) return <div className="min-h-screen bg-surface flex items-center justify-center text-text font-sans">Session not found</div>;

  return (
    <div className="min-h-screen bg-surface text-text flex flex-col w-full max-w-md mx-auto border-x border-border shadow-2xl font-sans relative">
      <div className="p-5 border-b border-border bg-panel flex items-center gap-3 sticky top-0 z-10">
         <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent">
            <Sparkles size={16} />
         </div>
         <div>
           <h2 className="font-semibold leading-tight">{data.session.name}</h2>
           <div className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Now
           </div>
         </div>
      </div>
      
      <div className="p-5 border-b border-border bg-surface">
        <h3 className="font-medium text-muted mb-4 uppercase tracking-wider text-xs">Send Reaction</h3>
        <EmojiBar sessionId={id!} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-panel">
        <div className="p-5 border-b border-border flex items-center gap-2">
           <MessageSquare size={16} className="text-muted" />
           <h3 className="font-medium">Live Q&A</h3>
        </div>
        <div className="flex-1 overflow-hidden p-5">
           <QuestionList sessionId={id!} isPresenter={false} />
        </div>
      </div>
    </div>
  );
}
