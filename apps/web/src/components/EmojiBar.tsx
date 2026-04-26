import { useMutation } from '@apollo/client/react/hooks';
import { SEND_REACTION } from '../graphql/mutations';

const EMOJIS = ['🔥', '👏', '❤️', '🤯', '😂', '🎉'];

export default function EmojiBar({ sessionId }: { sessionId: string }) {
  const [sendReaction] = useMutation(SEND_REACTION);

  return (
    <div className="flex gap-3 justify-between">
      {EMOJIS.map(emoji => (
        <button
          key={emoji}
          onClick={() => sendReaction({ variables: { sessionId, emoji } })}
          className="w-12 h-12 flex items-center justify-center text-2xl bg-surface border border-border rounded-full hover:border-accent hover:bg-accent/10 transition-colors shadow-sm transform active:scale-95"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
