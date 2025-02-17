import  { useState } from 'react';

interface ContentProps {
  type: string;
  content: string;
  link: string;
}

function renderContent(props: ContentProps) {
  const [hasError, setHasError] = useState(false);

  if (props.type === "Video") {
    // Extract video ID from YouTube URL
    const getYoutubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(props.link);
    const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : props.link;

    return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        {hasError ? (
          <a 
            href={props.link}
            className="text-purple-600 absolute inset-0 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch video on YouTube
          </a>
        ) : (
          <iframe
            src={embedUrl}
            title="Video player"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => setHasError(true)}
          />
        )}
      </div>
    );
  } else if (props.type === "Tweet") {
    return (
      <div className="min-h-[100px] p-4 border rounded">
        <a 
          href={props.link}
          className="text-purple-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Tweet on Twitter
        </a>
      </div>
    );
  }
  
  return (
    <a 
      href={props.link} 
      className="text-purple-600 w-full break-words hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="py-2">{props.link}</div>
    </a>
  );
}

export function Content(props: ContentProps) {
  return (
    <div className="flex flex-col justify-between p-2">
      <div className="py-2">{props.content}</div>
      {renderContent(props)}
    </div>
  );
}