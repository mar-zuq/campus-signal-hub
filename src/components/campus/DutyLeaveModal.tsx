import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { USER, fmtDate, fmtRange, type CampusEvent } from "@/data/events";

export function DutyLeaveModal({
  event,
  onClose,
}: {
  event: CampusEvent | null;
  onClose: () => void;
}) {
  if (!event) return null;
  return (
    <Dialog open={!!event} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Duty Leave Letter</DialogTitle>
        </DialogHeader>
        <div className="mono space-y-4 rounded-lg border border-border bg-secondary/40 p-5 text-[13px] leading-relaxed">
          <p>To,</p>
          <p>
            The Head of the Department,
            <br />
            Department of Computer Science &amp; Engineering,
            <br />
            College of Engineering Trivandrum
          </p>
          <p>Respected Sir/Madam,</p>
          <p className="font-semibold">Sub: Request for Duty Leave — {event.title}</p>
          <p>
            I, {USER.name} ({USER.short}), Student ID {USER.studentId}, am serving as{" "}
            {USER.role} for the event <span className="font-semibold">{event.title}</span> organised
            by {event.organizer}. The event is scheduled on {fmtDate(event.date)}
            {event.endDate ? ` to ${fmtDate(event.endDate)}` : ""} from {fmtRange(event)} at{" "}
            {event.venue}.
          </p>
          <p>
            I request you to kindly grant me duty leave for the above-mentioned duration so that I
            may carry out my coordination responsibilities. I assure you that I will make up for the
            academic work missed during this period.
          </p>
          <p>Thanking you,</p>
          <p>
            Yours sincerely,
            <br />
            {USER.name}
            <br />
            {USER.short} · {USER.studentId}
            <br />
            {USER.role}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
