import { useState, useEffect } from 'react';

interface ContentProps {
  type: string;
  content: string;
  link: string;
}

function renderContent(props: ContentProps) {
  const [tweetHtml, setTweetHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.type === "Tweet") {
      // Using Twitter's oEmbed API through a CORS proxy
      const tweetUrl = encodeURIComponent(props.link);
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://publish.twitter.com/oembed?url=${tweetUrl}&omit_script=true`)}`)
        .then(response => response.json())
        .then(data => {
          const parsedData = JSON.parse(data.contents);
          setTweetHtml(parsedData.html);
          // Inject Twitter's widget script
          const script = document.createElement('script');
          script.src = "https://platform.twitter.com/widgets.js";
          script.async = true;
          document.body.appendChild(script);
        })
        .catch(error => console.error('Error:', error))
        .finally(() => setIsLoading(false));
    }
  }, [props.link, props.type]);

  if (props.type === "Video") {
    const getYoutubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(props.link);
    // Using a privacy-enhanced URL and adding origin parameter
    const embedUrl = videoId ? 
      `https://www.youtube-nocookie.com/embed/${videoId}?origin=${window.location.origin}` : 
      props.link;

    return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
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
        />
      </div>
    );
  } else if (props.type === "Tweet") {
    return (
      <div style={{ minHeight: '200px' }}>
        {isLoading ? (
          <div style={{ padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
            Loading tweet...
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: tweetHtml }} />
        )}
      </div>
    );
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

export function Content(props: ContentProps) {
  return (
    <div className="flex flex-col justify-between p-2">
      <div className="py-2">{props.content}</div>
      {renderContent(props)}
    </div>
  );
}