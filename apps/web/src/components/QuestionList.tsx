import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client/react/hooks';
import { GET_QUESTIONS } from '../graphql/queries';
import { ASK_QUESTION, UPVOTE_QUESTION } from '../graphql/mutations';
import { NEW_QUESTION, QUESTION_UPVOTED } from '../graphql/subscriptions';
import { ThumbsUp, Send } from 'lucide-react';

export default function QuestionList({ sessionId, isPresenter }: { sessionId: string, isPresenter: boolean }) {
  const { data, loading, refetch } = useQuery(GET_QUESTIONS, { variables: { sessionId } });
  const [askQuestion, { loading: asking }] = useMutation(ASK_QUESTION);
  const [upvoteQuestion] = useMutation(UPVOTE_QUESTION);
  const [text, setText] = useState('');

  useSubscription(NEW_QUESTION, {
    variables: { sessionId },
    onData: () => refetch()
  });

  useSubscription(QUESTION_UPVOTED, {
    variables: { sessionId },
    onData: () => refetch()
  });

  const handleAsk = async () => {
    if (!text.trim()) return;
    await askQuestion({ variables: { sessionId, text } });
    setText('');
  };

  if (loading) return <div className="text-sm text-muted">Loading questions...</div>;

  const questions = [...(data?.questions || [])].sort((a: any, b: any) => b.upvotes - a.upvotes);

  return (
    <div className="flex flex-col h-full gap-4">
      {!isPresenter && (
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask a question..."
            className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
          />
          <button
            onClick={handleAsk}
            disabled={asking || !text.trim()}
            className="bg-accent text-white p-2.5 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send size={16} />
          </button>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {questions.length === 0 && (
          <div className="text-sm text-muted mt-4">No questions yet.</div>
        )}
        {questions.map((q: any) => (
          <div key={q.id} className="p-3.5 bg-surface border border-border rounded-xl flex gap-3 items-start transition-colors hover:border-border/80">
            <button
              onClick={() => upvoteQuestion({ variables: { questionId: q.id } })}
              className="flex flex-col items-center gap-1.5 text-muted hover:text-accent transition-colors p-1"
            >
              <ThumbsUp size={16} className="fill-current/10" />
              <span className="text-xs font-mono font-medium">{q.upvotes}</span>
            </button>
            <div className="flex-1 text-sm mt-0.5 break-words leading-relaxed text-text">
              {q.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
