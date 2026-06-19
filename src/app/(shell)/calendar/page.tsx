import { Suspense } from "react";

import { CalendarView } from "@/components/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Loading calendar…
        </div>
      }
    >
      <CalendarView />
    </Suspense>
  );
}
