import { useState, useCallback } from 'react';
import { useSubscription } from '@apollo/client';
import { NEW_REACTION } from '../graphql/subscriptions';

export default function ReactionOverlay({ sessionId }: { sessionId: string }) {
  const [reactions, setReactions] = useState<any[]>([]);

  const removeReaction = useCallback((id: string) => {
    setReactions(prev => prev.filter(r => r.key !== id));
  }, []);

useSubscription(NEW_REACTION, {
    variables: { sessionId },
    onData: ({ data }: { data: any }) => {
      const reaction = data.data.newReaction;
      const xPos = Math.random() * 80 + 10; // 10% to 90%
      const key = Math.random().toString();
      setReactions(prev => [...prev, { ...reaction, xPos, key }]);
      setTimeout(() => removeReaction(key), 2500);
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {reactions.map((r) => (
        <div
          key={r.key}
          className="absolute bottom-[-60px] text-[3rem] animate-float drop-shadow-xl"
          style={{ left: `${r.xPos}%` }}
        >
          {r.emoji}
        </div>
      ))}
    </div>
  );
}
