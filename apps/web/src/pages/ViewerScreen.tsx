import { useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client/react/hooks';
import { GET_SESSION } from '../graphql/queries';
import { SESSION_UPDATED } from '../graphql/subscriptions';
import SlideCanvas from '../components/SlideCanvas';
import ReactionOverlay from '../components/ReactionOverlay';

export default function ViewerScreen() {
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(GET_SESSION, { variables: { id } });
  
  useSubscription(SESSION_UPDATED, {
    variables: { sessionId: id },
    onData: () => refetch()
  });

  if (loading || !data?.session) return <div className="h-screen w-screen bg-black" />;

  const { session } = data;
  const currentSlide = session.slides[session.currentSlideIndex];

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <SlideCanvas slide={currentSlide} isViewer={true} />
      <ReactionOverlay sessionId={id!} />
    </div>
  );
}
