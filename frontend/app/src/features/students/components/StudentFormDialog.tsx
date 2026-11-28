import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { formatGradeLabel } from '@/features/classrooms/components/ClassroomFormDialog';
import { useClassrooms } from '@/features/classrooms/hooks/useClassroom';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useCreateStudent, useUpdateStudent } from '../hooks/useStudent';
import {
  studentSchema,
  type StudentFormValues,
} from '../schemas/student.schema';
import type { Student } from '../types/student.types';

interface StudentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
}

export function StudentFormDialog({
  open,
  onOpenChange,
  student,
}: StudentFormDialogProps) {
  const navigate = useNavigate();
  const isEditing = Boolean(student);
  const { data: classrooms = [], isLoading: isLoadingClassrooms } =
    useClassrooms();
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const isPending = createMutation.isPending || updateMutation.isPending;
  const hasNoClassrooms = !isLoadingClassrooms && classrooms.length === 0;

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    values: {
      name: student?.name ?? '',
      classroomId: student?.classroomId ?? '',
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset();
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = (values: StudentFormValues) => {
    if (isEditing && student) {
      updateMutation.mutate(
        { id: student.id, payload: values },
        { onSuccess: () => handleOpenChange(false) },
      );
      return;
    }

    createMutation.mutate(values, {
      onSuccess: () => handleOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? `Update student details or transfer (${student?.studentCode}).`
              : 'Enroll a new student and assign them to a classroom. A unique student code will be generated automatically.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="student-name">Student Name</FieldLabel>
                <Input
                  id="student-name"
                  placeholder="e.g. Ahmed Mohamed"
                  disabled={isPending}
                  {...field}
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="classroomId"
            render={({ field, fieldState }) => {
              const selectedClassroom = classrooms.find(
                (c) => c.id === field.value,
              );

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Classroom</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending || isLoadingClassrooms || hasNoClassrooms}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingClassrooms
                            ? 'Loading classrooms...'
                            : hasNoClassrooms
                              ? 'No classrooms available'
                              : 'Select a classroom'
                        }
                      >
                        {selectedClassroom
                          ? `${formatGradeLabel(selectedClassroom.gradeLevelEnum)} — ${selectedClassroom.name}`
                          : undefined}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {classrooms.map((classroom) => (
                        <SelectItem key={classroom.id} value={classroom.id}>
                          {formatGradeLabel(classroom.gradeLevelEnum)} —{' '}
                          {classroom.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {hasNoClassrooms && (
                    <p className="text-xs text-muted-foreground">
                      No classrooms found.{' '}
                      <button
                        type="button"
                        onClick={() => {
                          handleOpenChange(false);
                          navigate('/admin/classrooms');
                        }}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Create a classroom first
                      </button>
                    </p>
                  )}

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || isLoadingClassrooms || hasNoClassrooms}
            >
              {isPending
                ? 'Saving...'
                : isEditing
                  ? 'Save Changes'
                  : 'Add Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}