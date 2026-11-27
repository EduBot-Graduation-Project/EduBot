import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { useDeleteClassroom } from '../hooks/useClassroom';
import type { Classroom } from '../types/classroom.types';
import { formatGradeLabel } from './ClassroomFormDialog';

interface DeleteClassroomDialogProps {
  classroom: Classroom | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteClassroomDialog({
  classroom,
  onOpenChange,
}: DeleteClassroomDialogProps) {
  const deleteMutation = useDeleteClassroom();

  const handleConfirm = () => {
    if (!classroom) return;
    deleteMutation.mutate(classroom.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <AlertDialog open={Boolean(classroom)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Classroom</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">
              {classroom?.name}
            </span>{' '}
            ({classroom ? formatGradeLabel(classroom.gradeLevelEnum) : ''})?
            This action cannot be undone and will fail if students are
            currently assigned to this classroom.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}