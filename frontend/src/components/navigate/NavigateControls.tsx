"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function NavigateControls() {
  const [tracking, setTracking] = useState(false);
  const [checkpoints, setCheckpoints] = useState<string[]>(["🚩 Trailhead"]);
  const [cpName, setCpName] = useState("");
  const [voice, setVoice] = useState(true);
  const [distance, setDistance] = useState("0.0");
  const [elevation, setElevation] = useState("0");

  const addCp = () => {
    if (!cpName.trim()) return;
    setCheckpoints((c) => [...c, `📍 ${cpName.trim()}`]);
    setCpName("");
  };

  const toggleTracking = () => {
    setTracking(!tracking);
    if (!tracking) {
      // Simulate tracking
      const interval = setInterval(() => {
        setDistance(prev => (parseFloat(prev) + 0.1).toFixed(1));
        setElevation(prev => (parseInt(prev) + Math.floor(Math.random() * 10)).toString());
      }, 2000);
      
      setTimeout(() => clearInterval(interval), 30000); // Stop after 30s demo
    }
  };

  return (
    <div className="space-y-4">
      <Card padding="lg">
        <div className="mb-4 flex items-center gap-2">
          <div className="text-xl">🧭</div>
          <h2 className="text-lg font-bold">Navigation Control</h2>
        </div>
        
        <div className="mb-6 grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg bg-[var(--color-primary-50)] p-3">
            <div className="text-xs text-[color:var(--color-foreground)/0.6]">Distance</div>
            <div className="text-lg font-bold text-[var(--color-primary-600)]">{distance} km</div>
          </div>
          <div className="rounded-lg bg-[var(--color-primary-50)] p-3">
            <div className="text-xs text-[color:var(--color-foreground)/0.6]">Elevation</div>
            <div className="text-lg font-bold text-[var(--color-primary-600)]">{elevation} m</div>
          </div>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${tracking ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium">
              {tracking ? "🟢 Tracking Active" : "⚪ Tracking Stopped"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={toggleTracking}
              variant={tracking ? "danger" : "success"}
              size="sm"
            >
              {tracking ? "⏹️ Stop" : "▶️ Start"}
            </Button>
            <Button 
              onClick={() => setVoice(!voice)}
              variant={voice ? "primary" : "outline"}
              size="sm"
            >
              {voice ? "🔊 Voice On" : "🔇 Voice Off"}
            </Button>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <div className="mb-3 flex items-center gap-2">
          <div className="text-lg">📋</div>
          <h3 className="font-bold">Checkpoints</h3>
        </div>
        
        <div className="mb-4 flex gap-2">
          <input 
            className="flex-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
            placeholder="Add checkpoint name..."
            value={cpName} 
            onChange={(e) => setCpName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCp()}
          />
          <Button onClick={addCp} variant="primary" size="sm">
            ➕ Add
          </Button>
        </div>
        
        <div className="space-y-2">
          {checkpoints.map((checkpoint, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-[var(--color-primary-25)] p-2">
              <span className="text-sm">{checkpoint}</span>
              {i === 0 && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>
      
      <Card padding="lg">
        <div className="mb-3 flex items-center gap-2">
          <div className="text-lg">⚠️</div>
          <h3 className="font-bold">Safety</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>GPS signal: Strong</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Offline maps: Downloaded</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⚠</span>
            <span>Weather alert: Rain expected 3PM</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-3 w-full">
          🆘 Emergency Contact
        </Button>
      </Card>
    </div>
  );
}
