import { useRef, useState } from "react";

type Props = {
  onFile: (file: File) => Promise<void> | void;
};

export default function FileDropzone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) await onFile(f);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      className={`rounded-2xl border-2 border-dashed p-10 text-center ${drag ? "border-brand-500 bg-brand-50" : "border-slate-300 bg-white"}`}
    >
      <p className="text-slate-600">Drag & drop a meeting audio/video file here</p>
      <p className="text-xs text-slate-500 mt-1">MP3, WAV, MP4, MKV up to 500MB</p>
      <div className="mt-4">
        <button
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          Choose file
        </button>
        <input ref={inputRef} type="file" className="hidden" onChange={async (e) => {
          const f = e.target.files?.[0];
          if (f) await onFile(f);
        }} />
      </div>
    </div>
  );
}
