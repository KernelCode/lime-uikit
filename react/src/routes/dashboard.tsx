import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Container } from "../components/container";
import { Avatar } from "../components/data-display";
import { StatCards } from "../blocks/stat-cards";
import { useI18n } from "../i18n";

function AreaChart({ series }: { series: number[] }) {
  const max = Math.max(...series);
  const w = 320, h = 90, pad = 6;
  const pts = series.map((v, i) => [pad + (i / (series.length - 1)) * (w - pad * 2), h - pad - (v / max) * (h - pad * 2)]);
  const line = pts.map((p) => p.join(",")).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full text-primary-ink" preserveAspectRatio="none">
      <polygon points={`${pad},${h - pad} ${line} ${w - pad},${h - pad}`} fill="currentColor" opacity="0.15" />
      <polyline points={line} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function Dashboard() {
  const { t } = useI18n();
  const d = t.dashboard;
  const trafficMax = Math.max(...d.traffic.map((x) => x.value));
  const top = d.users[0];

  return (
    <Container className="space-y-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">{d.title}</h1>
          <p className="text-muted-foreground">{d.subtitle}</p>
        </div>
        <Button>{d.action}</Button>
      </div>

      <StatCards stats={d.stats} />

      {/* Inbox (list) + detail (card preview + analytics) */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Contacts inbox */}
        <Card className="p-0">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{d.usersTitle}</CardTitle>
            <div className="flex gap-1.5">
              {d.tabs.map((tab, i) => (
                <button key={tab} className={"rounded-full px-3 py-1 text-xs font-medium " + (i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>{tab}</button>
              ))}
            </div>
          </CardHeader>
          <div className="divide-y divide-border border-t border-border">
            {[...d.users, ...d.users.slice(0, 2)].map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3.5 hover:bg-muted/50">
                <Avatar name={u.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{u.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{u.org}</p>
                </div>
                <Badge variant={u.status === d.trial ? "outline" : "success"}>{u.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Detail column */}
        <div className="space-y-6">
          {/* Digital card preview */}
          <div className="rounded-[var(--radius-lg)] bg-ink p-6 text-ink-foreground">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">{top.name.split(" ").map((w) => w[0]).join("")}</span>
              <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] uppercase">{d.active}</span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold">{top.name}</p>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-foreground/60">{top.org}</p>
            <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-3">
              <Button size="sm">{d.action}</Button>
              <div className="grid h-12 w-12 place-items-center rounded-[var(--radius)] bg-white text-ink">▦</div>
            </div>
          </div>

          {/* Taps chart */}
          <Card>
            <CardHeader className="flex-row items-end justify-between">
              <div><CardTitle className="text-base">{d.chartTitle}</CardTitle><p className="text-xs text-muted-foreground">{d.chartCaption}</p></div>
              <p className="font-display text-2xl font-bold">{d.chartTotal}</p>
            </CardHeader>
            <CardContent><AreaChart series={d.series} /></CardContent>
          </Card>

          {/* Taps by source */}
          <Card>
            <CardHeader><CardTitle className="text-base">{d.trafficTitle}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {d.traffic.map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-medium">{row.value}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(row.value / trafficMax) * 100}%` }} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
