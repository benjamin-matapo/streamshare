import { useEffect, useState } from 'react';

export default function SlideCanvas({ slide, isViewer }: { slide: any, isViewer?: boolean }) {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, [slide?.id]);

  if (!slide) return <div className="flex-1 flex items-center justify-center bg-surface text-muted w-full h-full">No slide content</div>;

  return (
    <div className={`w-full h-full flex items-center justify-center bg-black transition-opacity duration-200 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-[177.78vh] aspect-video relative flex items-center justify-center overflow-hidden bg-surface">
        {slide.type === 'TEXT' && (
          <div className="text-5xl font-semibold text-text p-16 text-center whitespace-pre-wrap">
            {slide.content}
          </div>
        )}
        {slide.type === 'IMAGE' && (
          <img src={slide.content} alt="slide" className="w-full h-full object-contain" />
        )}
        {slide.type === 'VIDEO' && (
          <video src={slide.content} autoPlay muted={isViewer} loop className="w-full h-full object-contain" />
        )}
        {slide.type === 'IFRAME' && (
          <iframe src={slide.content} className="w-full h-full border-0" />
        )}
      </div>
    </div>
  );
}
