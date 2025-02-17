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
    
    return (
      <div className="w-full max-w-3xl mx-auto my-4">
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg bg-gray-100">
          {hasError ? (
            <a 
              href={props.link}
              className="absolute inset-0 flex items-center justify-center text-purple-600 hover:text-purple-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-center p-4">
                <div className="mb-2">⏯️</div>
                <div>Watch on YouTube</div>
              </div>
            </a>
          ) : (
            <iframe
              src={videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : undefined}
              title="Video player"
              className="absolute top-0 left-0 w-full h-full border-0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setHasError(true)}
            />
          )}
        </div>
      </div>
    );
  } else if (props.type === "Tweet") {
    // Extract tweet ID from URL
    const tweetIdMatch = props.link.match(/status\/(\d+)/);
    const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;
    
    return (
      <div className="w-full max-w-2xl mx-auto my-4">
        <a 
          href={props.link}
          className="block p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
            </svg>
            <span>View Tweet</span>
          </div>
          <div className="mt-2 text-gray-600 text-sm">
            Tweet ID: {tweetId || 'Unknown'}
          </div>
        </a>
      </div>
    );
  }
  
  return (
    <div className="w-full my-4">
      <a 
        href={props.link} 
        className="text-purple-600 hover:text-purple-700 break-words block p-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.link}
      </a>
    </div>
  );
}

export function Content(props: ContentProps) {
  return (
    <div className="w-full">
      <div className="py-2">{props.content}</div>
      {renderContent(props)}
    </div>
  );
}