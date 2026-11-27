import { Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import type { Classroom } from '../types/classroom.types';
import { formatGradeLabel } from './ClassroomFormDialog';

interface ClassroomsTableProps {
  classrooms: Classroom[];
  isLoading: boolean;
  onEdit: (classroom: Classroom) => void;
  onDelete: (classroom: Classroom) => void;
}

export function ClassroomsTable({
  classrooms,
  isLoading,
  onEdit,
  onDelete,
}: ClassroomsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (classrooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-base font-medium text-foreground">
          No classrooms found
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try changing the grade filter or create a new classroom to get started.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Classroom Name</TableHead>
          <TableHead>Grade Level</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classrooms.map((classroom) => (
          <TableRow key={classroom.id}>
            <TableCell className="font-medium text-foreground">
              {classroom.name}
            </TableCell>
            <TableCell>
              <Badge variant="secondary">
                {formatGradeLabel(classroom.gradeLevelEnum)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(classroom)}
                  aria-label={`Edit ${classroom.name}`}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(classroom)}
                  aria-label={`Delete ${classroom.name}`}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}