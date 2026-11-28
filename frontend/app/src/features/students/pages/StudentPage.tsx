import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { formatGradeLabel } from '@/features/classrooms/components/ClassroomFormDialog';
import {
  GRADE_LEVELS,
  type GradeLevel,
} from '@/features/classrooms/types/classroom.types';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { DeleteStudentDialog } from '../components/DeleteStudentDialog';
import { StudentFormDialog } from '../components/StudentFormDialog';
import { StudentsTable } from '../components/StudentsTable';
import { useStudents } from '../hooks/useStudent';
import type { Student } from '../types/student.types';

type GradeFilter = GradeLevel | 'ALL';

export default function StudentsPage() {
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  const selectedGrade = gradeFilter === 'ALL' ? undefined : gradeFilter;
  const { data: students = [], isLoading } = useStudents(selectedGrade);

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      student.name.toLowerCase().includes(query) ||
      student.studentCode.toLowerCase().includes(query) ||
      student.classroomName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Students
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage enrolled students, generated student codes, and classroom assignments.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>All Students</CardTitle>
            <CardDescription>
              {isLoading
                ? 'Loading students...'
                : `Showing ${filteredStudents.length} of ${students.length} student${students.length === 1 ? '' : 's'}`}
            </CardDescription>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, code, or class..."
                className="pl-9"
              />
            </div>

            <div className="w-full sm:w-48">
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
          </div>
        </CardHeader>

        <CardContent>
          <StudentsTable
            students={filteredStudents}
            isLoading={isLoading}
            onEdit={(student) => setEditingStudent(student)}
            onDelete={(student) => setDeletingStudent(student)}
          />
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <StudentFormDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      {/* Edit Dialog */}
      <StudentFormDialog
        open={Boolean(editingStudent)}
        onOpenChange={(open) => {
          if (!open) setEditingStudent(null);
        }}
        student={editingStudent}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteStudentDialog
        student={deletingStudent}
        onOpenChange={(open) => {
          if (!open) setDeletingStudent(null);
        }}
      />
    </div>
  );
}