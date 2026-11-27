import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  ClassroomFormDialog,
  formatGradeLabel,
} from '../components/ClassroomFormDialog';
import { ClassroomsTable } from '../components/ClassroomsTable';
import { DeleteClassroomDialog } from '../components/DeleteClassroomDialog';
import { useClassrooms } from '../hooks/useClassroom';
import {
  GRADE_LEVELS,
  type Classroom,
  type GradeLevel,
} from '../types/classroom.types';

type GradeFilter = GradeLevel | 'ALL';

export default function ClassroomsPage() {
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(
    null,
  );
  const [deletingClassroom, setDeletingClassroom] = useState<Classroom | null>(
    null,
  );

  const selectedGrade = gradeFilter === 'ALL' ? undefined : gradeFilter;
  const { data: classrooms = [], isLoading } = useClassrooms(selectedGrade);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Classrooms
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage school classrooms and organize them by grade level.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Classroom
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>All Classrooms</CardTitle>
            <CardDescription>
              {isLoading
                ? 'Loading classrooms...'
                : `Showing ${classrooms.length} classroom${classrooms.length === 1 ? '' : 's'}`}
            </CardDescription>
          </div>

          <div className="w-full sm:w-52">
            <Select
              value={gradeFilter}
              onValueChange={(value) => setGradeFilter(value as GradeFilter)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Grade Levels</SelectItem>
                {GRADE_LEVELS.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {formatGradeLabel(grade)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <ClassroomsTable
            classrooms={classrooms}
            isLoading={isLoading}
            onEdit={(classroom) => setEditingClassroom(classroom)}
            onDelete={(classroom) => setDeletingClassroom(classroom)}
          />
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <ClassroomFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      {/* Edit Dialog */}
      <ClassroomFormDialog
        open={Boolean(editingClassroom)}
        onOpenChange={(open) => {
          if (!open) setEditingClassroom(null);
        }}
        classroom={editingClassroom}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteClassroomDialog
        classroom={deletingClassroom}
        onOpenChange={(open) => {
          if (!open) setDeletingClassroom(null);
        }}
      />
    </div>
  );
}