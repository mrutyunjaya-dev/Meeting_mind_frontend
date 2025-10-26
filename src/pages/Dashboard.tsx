import { MeetingsAPI, InsightsAPI } from "@/lib/api";
import Loader from "@/components/Loader";
import { useFetch } from "@/hooks/useFetch";
import MeetingCard from "@/components/MeetingCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data: meetings, loading: loadingMeetings } = useFetch(async () => (await MeetingsAPI.list()).meetings, []);
  const { data: insights, loading: loadingInsights } = useFetch(async () => (await InsightsAPI.overview()).insights, []);

  console.log({meetings})

  return (
    <div className="container-app py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome to MeetingMind 👋</h1>
          <p className="text-gray-500">Here's your meeting intelligence at a glance.</p>
        </div>
        <Link to="/upload" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Upload</Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {loadingInsights ? (
          <Loader />
        ) : (
          <>
            <Stat title="Meetings" value={insights?.totalMeetings ?? meetings?.length ?? 0} />
            <Stat title="Action Items" value={insights?.totalActionItems ?? 0} />
            <Stat title="Avg. Sentiment" value={insights?.avgSentiment ?? "—"} />
          </>
        )}
      </section>

      <h2 className="mt-10 mb-3 text-lg font-semibold">Recent meetings</h2>
      {loadingMeetings ? <Loader /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {(meetings || []).map((m: any) => <MeetingCard key={m.meetingId} meeting={m} />)}
        </div>
      )}
    </div>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-5">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
