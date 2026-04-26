import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_SESSION } from '../graphql/mutations';
import { Play } from 'lucide-react';

export default function Home() {
  const [name, setName] = useState('');
  const [createSession, { loading }] = useMutation(CREATE_SESSION);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      const { data } = await createSession({ variables: { name } });
      navigate(`/present/${data.createSession.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface text-text font-sans">
      <div className="bg-panel p-8 rounded-xl border border-border w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Play className="text-accent" fill="currentColor" /> StreamShare
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Session Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent text-text transition-colors"
              placeholder="e.g. Q4 All Hands"
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={loading || !name.trim()}
            className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg px-4 py-2.5 font-medium disabled:opacity-50 transition-colors shadow-lg shadow-accent/20"
          >
            {loading ? 'Creating...' : 'Create Session'}
          </button>
        </div>
      </div>
    </div>
  );
}
