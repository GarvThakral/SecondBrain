import { TwitterTweetEmbed } from "react-twitter-embed";

interface ContentProps {
  type: string;
  content: string;
  link: string;
}

function renderContent(props: ContentProps) {
  if (props.type === "Video") {
    const embedUrl = props.link
      .replace("youtu.be/", "youtube.com/embed/")
      .replace("/watch?v=", "/embed/");
    console.log("Embed URL:", embedUrl);
    return (
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      ></iframe>
    );
  } else if (props.type === "Tweet") {
    const tweetIdMatch = props.link.match(/status\/(\d+)/);
    if (tweetIdMatch) {
      const tweetId = tweetIdMatch[1];
      return <TwitterTweetEmbed tweetId={tweetId} />;
    } else {
      return <div>Invalid Tweet URL</div>;
    }
  } else {
    return (
      <a href={props.link} className="text-purple-600 w-full break-words">
        <div className="py-2">{props.link}</div>
      </a>
    );
  }
}

export function Content(props: ContentProps) {
  return (
    <div className="flex flex-col justify-between p-2">
      <div className="py-2">{props.content}</div>
      {renderContent(props)}
    </div>
  );
}
