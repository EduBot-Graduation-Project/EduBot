import { Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QueuedUploadItem } from '@/interfaces/types/lectures';

interface ProcessingQueueCardProps {
  items: QueuedUploadItem[];
}

export function ProcessingQueueCard({ items }: ProcessingQueueCardProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-base">AI Processing Queue</CardTitle>
        <CardDescription>Recent uploads & chunking status</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center py-8 text-center text-sm">
            <Clock className="mb-2 h-8 w-8 opacity-40" />
            <p>No materials uploaded in this session yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-2 rounded-lg border p-3 text-sm"
              >
                <div className="space-y-1 overflow-hidden">
                  <p className="truncate font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.academicLevel} • {item.courseId} • Week {item.weekNumber} • {item.uploadedAt}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: QueuedUploadItem['status'] }) {
  if (status === 'processing') {
    return (
      <Badge variant="secondary" className="shrink-0">
        <span className="flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Chunking
        </span>
      </Badge>
    );
  }

  if (status === 'failed') {
    return (
      <Badge variant="destructive" className="shrink-0">
        <span className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Failed
        </span>
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="shrink-0">
      <span className="flex items-center gap-1">
        <CheckCircle2 className="h-3 w-3" />
        Ready
      </span>
    </Badge>
  );
}