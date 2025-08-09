"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function NavigateControls() {
  const [tracking, setTracking] = useState(false);
  const [checkpoints, setCheckpoints] = useState<string[]>(["Trailhead"]);
  const [cpName, setCpName] = useState("");
  const [voice, setVoice] = useState(true);

  const addCp = () => {
    if (!cpName.trim()) return;
    setCheckpoints((c) => [...c, cpName.trim()]);
    setCpName("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[color:var(--color-foreground)/0.8]">Tracking status</div>
            <div className="text-lg font-semibold">{tracking ? "Active" : "Stopped"}</div>
          </div>
          <div className="flex gap-2">
            {tracking ? (
              <Button className="bg-red-600 text-white border-transparent hover:bg-red-700" onClick={() => setTracking(false)}>Stop</Button>
            ) : (
              <Button className="bg-[var(--color-primary-500)] text-white border-transparent hover:bg-[var(--color-primary-600)]" onClick={() => setTracking(true)}>Start</Button>
            )}
            <Button onClick={() => setVoice((v) => !v)}>{voice ? "Voice: On" : "Voice: Off"}</Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-2 flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Add checkpoint</label>
            <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={cpName} onChange={(e) => setCpName(e.target.value)} />
          </div>
          <Button onClick={addCp}>Add</Button>
        </div>
        <ol className="list-decimal pl-5 text-sm">
          {checkpoints.map((c, i) => (
            <li key={i} className="mb-1">{c}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
