import { useParams } from "react-router-dom";
import { API_BASE, MeetingsAPI } from "@/lib/api";
import Loader from "@/components/Loader";
import { useFetch } from "@/hooks/useFetch";

export default function MeetingDetail() {
  const { id } = useParams();
  const { data: meeting, loading } = useFetch(
    async () => (await MeetingsAPI.get(id!)).meeting,
    [id]
  );

  console.log("{meeting}", meeting);

  if (loading) return <Loader />;
  if (!meeting) return <div className="container-app py-10">Not found.</div>;

  const summary = meeting.analysis?.summary ?? "No summary available yet.";
  const sentiment = meeting.analysis?.sentiment_analysis;
  const sentimentLabel = sentiment?.overall_sentiment ?? "Unknown";
  const sentimentScore = sentiment?.sentiment_score ?? "—";
  const sentimentExplanation = sentiment?.explanation ?? "No explanation available.";

  const sentimentColor =
    sentimentLabel === "positive"
      ? "text-green-600 bg-green-50"
      : sentimentLabel === "negative"
      ? "text-red-600 bg-red-50"
      : "text-gray-600 bg-gray-50";

  return (
    <div className="container-app py-8 space-y-6">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Meeting #{meeting.meetingId.slice(-6)}
          </h1>
          <p className="text-sm text-slate-500">
            {new Date(meeting.createdAt).toLocaleString()}
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Summary */}
        <div className="md:col-span-2 rounded-xl border bg-white p-5">
          <h2 className="font-semibold">Summary</h2>
          <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">
            {summary}
          </p>

          {/* Transcript Link */}
          <h3 className="mt-6 font-semibold">Transcript</h3>
          {meeting.meetingLink ? (
            <div className="mt-3">
              <a
                href={meeting.meetingLink?.startsWith("http") ? meeting.meetingLink : `${API_BASE}${meeting.meetingLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline text-sm"
              >
                View Transcript PDF
              </a>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Transcript not available.
            </p>
          )}

          {/* Audio Link */}
          {meeting.audioLink && (
            <div className="mt-4">
              <audio
                controls
                src={meeting.audioLink?.startsWith("http") ? meeting.audioLink : `${API_BASE}${meeting.audioLink}`}
                className="w-full mt-1 rounded"
              />
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          {/* Sentiment */}
          <div className="rounded-xl border bg-white p-5">
            <h3 className="font-semibold">Sentiment</h3>
            <div className="mt-2 text-sm space-y-2">
              <div>
                <span
                  className={`inline-block px-2 py-1 rounded-md text-xs font-medium capitalize ${sentimentColor}`}
                >
                  {sentimentLabel}
                </span>
              </div>
              <div className="text-slate-600">
                <strong>Score:</strong> {sentimentScore}
              </div>
              <div className="text-slate-500 text-xs italic">
                {sentimentExplanation}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-xl border bg-white p-5">
            <h3 className="font-semibold">Metadata</h3>
            <div className="mt-2 text-sm text-slate-600 space-y-1">
              <div>
                <strong>Created:</strong>{" "}
                {new Date(meeting.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Updated:</strong>{" "}
                {new Date(meeting.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
