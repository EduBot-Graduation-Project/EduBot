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
import { useDeleteStudent } from '../hooks/useStudent';
import type { Student } from '../types/student.types';

interface DeleteStudentDialogProps {
  student: Student | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteStudentDialog({
  student,
  onOpenChange,
}: DeleteStudentDialogProps) {
  const deleteMutation = useDeleteStudent();

  const handleConfirm = () => {
    if (!student) return;
    deleteMutation.mutate(student.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <AlertDialog open={Boolean(student)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Student</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove{' '}
            <span className="font-semibold text-foreground">
              {student?.name}
            </span>{' '}
            ({student?.studentCode})? This action cannot be undone.
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