import { Link } from "react-router-dom";
import { API_BASE } from "@/lib/api";

type Props = {
  meeting: {
    meetingId: string;
    meetingLink: string;
    audioLink?: string;
    createdAt: string;
    updatedAt?: string;
    analysis?: {
      summary?: string;
      sentiment_analysis?: {
        overall_sentiment?: string;
        sentiment_score?: number;
        explanation?: string;
      };
    };
  };
};

export default function MeetingCard({ meeting }: Props) {
  const { meetingId, meetingLink, createdAt, analysis } = meeting;

  const summary = analysis?.summary || "No summary available yet.";
  const sentiment =
    analysis?.sentiment_analysis?.overall_sentiment || "unknown";
  const sentimentScore = analysis?.sentiment_analysis?.sentiment_score ?? 0;

  // Choose sentiment color
  const sentimentColor =
    sentiment === "positive"
      ? "bg-green-100 text-green-700"
      : sentiment === "negative"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-700";

  return (
    <Link
      to={`/meetings/${meetingId}`}
      className="block rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-800 mb-1">
            Meeting #{meetingId.slice(-6)}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2">{summary}</p>
        </div>
        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
          {new Date(createdAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center text-xs gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 capitalize ${sentimentColor}`}
        >
          Sentiment: {sentiment}
        </span>

        <span className="rounded-full bg-blue-100 text-blue-700 px-2.5 py-0.5">
          Score: {sentimentScore}
        </span>

        {meetingLink && (
          <a
            href={meetingLink.startsWith("http") ? meetingLink : `${API_BASE}${meetingLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-blue-600 hover:underline"
          >
            View Transcript
          </a>
        )}
      </div>
    </Link>
  );
}
