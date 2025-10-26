import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { MeetingsAPI } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFile = async (file: File) => {
    try {
      setLoading(true);
      setMessage("Uploading...");
      const res = await MeetingsAPI.upload(file);
      setMessage("Processing... This may take a moment.");
      // Assume backend returns created meeting id
      const id = res?.meeting?._id || res?.id;
      if (id) navigate(`/meetings/${id}`);
      else setMessage("Uploaded! Refresh your dashboard to see the new meeting.");
    } catch (e: any) {
      setMessage(e?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-semibold">Upload a meeting</h1>
      <p className="text-slate-500">We’ll transcribe, summarize, and extract action items automatically.</p>
      <div className="mt-6">
        <FileDropzone onFile={onFile} />
        {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
      </div>
    </div>
  );
}
