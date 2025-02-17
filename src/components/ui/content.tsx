import React, { useState, Suspense } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

interface ContentProps {
  type: string;
  content: string;
  link: string;
}

function renderContent(props: ContentProps) {
  const [, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (props.type === "Video") {
    const embedUrl = props.link
      .replace("youtu.be/", "youtube.com/embed/")
      .replace("/watch?v=", "/embed/");
    return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={embedUrl}
          title="YouTube video player"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onError={() => setHasError(true)}
        />
      </div>
    );
  } else if (props.type === "Tweet") {
    const tweetIdMatch = props.link.match(/status\/(\d+)/);
    if (tweetIdMatch) {
      const tweetId = tweetIdMatch[1];
      return (
        <div style={{ minHeight: '200px' }}>
          {hasError ? (
            <a 
              href={props.link} 
              className="text-purple-600 break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Tweet on Twitter
            </a>
          ) : (
            <Suspense fallback={
              <div style={{ 
                height: '200px', 
                backgroundColor: '#f3f4f6',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}>
                Loading tweet...
              </div>
            }>
              <TwitterTweetEmbed
                tweetId={tweetId}
                onLoad={() => setIsLoading(false)}
                // @ts-ignore
                onError={() => setHasError(true)}
                options={{ width: '100%' }}
              />
            </Suspense>
          )}
        </div>
      );
    }
    return <div>Invalid Tweet URL</div>;
  }
  
  return (
    <a 
      href={props.link} 
      className="text-purple-600 w-full break-words"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="py-2">{props.link}</div>
    </a>
  );
}

class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function Content(props: ContentProps) {
  return (
    <div className="flex flex-col justify-between p-2">
      <div className="py-2">{props.content}</div>
      <ErrorBoundary fallback={
        <div>Failed to load content - <a 
          href={props.link}
          className="text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          View original content
        </a></div>
      }>
        {renderContent(props)}
      </ErrorBoundary>
    </div>
  );
}