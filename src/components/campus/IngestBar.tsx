import { useState } from "react";
import { FileText, Image as ImageIcon, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMOS, parseAnnouncement } from "@/data/parse";
import type { CampusEvent } from "@/data/events";

const TABS = [
  { value: "whatsapp", label: "WhatsApp Text", icon: MessageSquare },
  { value: "poster", label: "Upload Poster", icon: ImageIcon },
  { value: "notice", label: "Upload Notice", icon: FileText },
];

export function IngestBar({ onParsed }: { onParsed: (e: CampusEvent) => void }) {
  const [tab, setTab] = useState("whatsapp");
  const [text, setText] = useState("");
  const [scanning, setScanning] = useState(false);

  const channelFor = (t: string) =>
    t === "whatsapp" ? "WhatsApp — pasted" : t === "poster" ? "Poster upload (OCR)" : "Notice upload (OCR)";

  const run = (raw: string, channel: string) => {
    if (!raw.trim() || scanning) return;
    setScanning(true);
    setTimeout(() => {
      onParsed(parseAnnouncement(raw, channel));
      setScanning(false);
      setText("");
    }, 1000);
  };

  return (
    <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" />
          Universal ingest
        </h2>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs">
                <t.icon className="mr-1.5 h-3.5 w-3.5" />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="relative mt-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder={
            tab === "whatsapp"
              ? "Paste the class group message here…"
              : "Drop the text from the poster or notice here…"
          }
          className="resize-none bg-secondary/40"
        />
        {scanning && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-md border border-primary/50 bg-background/85">
            <div className="scan-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
            <p className="mono relative text-xs text-primary">
              Parsing entity, urgency, and dates…
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button size="sm" disabled={scanning || !text.trim()} onClick={() => run(text, channelFor(tab))}>
          Parse &amp; add to feed
        </Button>
        <span className="text-xs text-muted-foreground">Quick demo:</span>
        {DEMOS.map((d) => (
          <Button
            key={d.label}
            size="sm"
            variant="outline"
            disabled={scanning}
            onClick={() => run(d.text, d.channel)}
          >
            {d.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
