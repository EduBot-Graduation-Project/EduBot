/* eslint-disable react-refresh/only-export-components */
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import {
  useCreateClassroom,
  useUpdateClassroom,
} from '../hooks/useClassroom';
import {
  classroomSchema,
  type ClassroomFormValues,
} from '../schemas/classroom.schema';
import { GRADE_LEVELS, type Classroom } from '../types/classroom.types';

interface ClassroomFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classroom?: Classroom | null;
}

export function formatGradeLabel(grade: string) {
  return grade.replace('Grade', 'Grade ');
}

export function ClassroomFormDialog({
  open,
  onOpenChange,
  classroom,
}: ClassroomFormDialogProps) {
  const isEditing = Boolean(classroom);
  const createMutation = useCreateClassroom();
  const updateMutation = useUpdateClassroom();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<ClassroomFormValues>({
    resolver: zodResolver(classroomSchema),
    values: {
      gradeLevelEnum: classroom?.gradeLevelEnum ?? 'Grade1',
      name: classroom?.name ?? '',
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset();
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = (values: ClassroomFormValues) => {
    if (isEditing && classroom) {
      updateMutation.mutate(
        { id: classroom.id, payload: values },
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
            {isEditing ? 'Edit Classroom' : 'Add New Classroom'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the grade level or classroom name.'
              : 'Create a new classroom and assign it to a grade level.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="gradeLevelEnum"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Grade Level</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_LEVELS.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {formatGradeLabel(grade)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="classroom-name">Classroom Name</FieldLabel>
                <Input
                  id="classroom-name"
                  placeholder="e.g. A/1"
                  disabled={isPending}
                  {...field}
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
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
            <Button type="submit" disabled={isPending}>
              {isPending
                ? 'Saving...'
                : isEditing
                  ? 'Save Changes'
                  : 'Create Classroom'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}