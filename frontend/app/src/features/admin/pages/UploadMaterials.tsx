import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { uploadMaterialSchema, type UploadMaterialInput } from '../schemas/uploadSchema';
import { FileDropzone } from '../components/FileDropzone';
import { ProcessingQueueCard } from '../components/ProcessingQueueCard';
import type { CourseOption, QueuedUploadItem } from '@/interfaces/types/lectures';

const ACADEMIC_LEVELS = [
  { id: 'Year 1', label: 'Year 1 ' },
  { id: 'Year 2', label: 'Year 2 ' },
  { id: 'Year 3', label: 'Year 3 ' },
  { id: 'Year 4', label: 'Year 4 ' },
  { id: 'Year 5', label: 'Year 5 ' },
  { id: 'Year 6', label: 'Year 6 ' },
];

const FAKE_COURSES: CourseOption[] = [
  { id: 'CS101', name: ' Introduction to Computer Science', level: 'Year 1' },
  { id: 'MATH102', name: 'Calculus I', level: 'Year 1' },
  { id: 'SE204', name: ' Software Engineering', level: 'Year 2' },
  { id: 'DB201', name: ' Database Systems', level: 'Year 2' },
  { id: 'AI302', name: ' Machine Learning Fundamentals', level: 'Year 3' },
  { id: 'OS305', name: ' Operating Systems', level: 'Year 3' },
  { id: 'GP401', name: ' Distributed Systems', level: 'Year 4' },
];

const INITIAL_UPLOADS: QueuedUploadItem[] = [
  { id: '1', title: 'Lecture 01: Introduction to AI', academicLevel: 'Year 3', courseId: 'AI302', weekNumber: 1, status: 'ready', uploadedAt: '10:30 AM' },
  { id: '2', title: 'Lecture 02: Neural Networks', academicLevel: 'Year 3', courseId: 'AI302', weekNumber: 2, status: 'processing', uploadedAt: '11:00 AM' },
  { id: '3', title: 'Lecture 03: Deep Learning Basics', academicLevel: 'Year 3', courseId: 'AI302', weekNumber: 3, status: 'ready', uploadedAt: '11:30 AM' },
];

export default function UploadMaterials() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [recentUploads, setRecentUploads] = useState<QueuedUploadItem[]>(INITIAL_UPLOADS);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<UploadMaterialInput>({
    resolver: zodResolver(uploadMaterialSchema),
    defaultValues: {
      academicLevel: '',
      courseId: '',
      title: '',
      weekNumber: 1,
    },
  });

  const academicLevelValue = useWatch({ control, name: 'academicLevel' });
  const courseIdValue = useWatch({ control, name: 'courseId' });

  const filteredCourses = FAKE_COURSES.filter(
    (course) => course.level === academicLevelValue
  );

  const handleFileSelect = (files: FileList) => {
    setSelectedFile(files[0]);
    setValue('file', files, { shouldValidate: true });
    setUploadSuccess(false);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setValue('file', undefined as unknown as FileList, { shouldValidate: true });
  };

  const onSubmit = (data: UploadMaterialInput) => {
    const newUpload: QueuedUploadItem = {
      id: crypto.randomUUID(),
      title: data.title,
      academicLevel: data.academicLevel,
      courseId: data.courseId,
      weekNumber: data.weekNumber,
      status: 'processing',
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setRecentUploads((prev) => [newUpload, ...prev]);
    reset();
    setSelectedFile(null);
    setUploadSuccess(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Lecture Materials</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Upload lecture files and metadata to be processed by the AI system.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lecture Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {uploadSuccess && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Lecture uploaded successfully and queued for AI processing.</span>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="academicLevel">Academic Level / Year</Label>
                  <Select
                    value={academicLevelValue}
                    onValueChange={(val) => {
                      if (val) {
                        setValue('academicLevel', val, { shouldValidate: true });
                        setValue('courseId', '', { shouldValidate: false });
                        setUploadSuccess(false);
                      }
                    }}
                  >
                    <SelectTrigger id="academicLevel">
                      <SelectValue placeholder="Select Level / year" />
                    </SelectTrigger>
                    <SelectContent >
                      {ACADEMIC_LEVELS.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.academicLevel && (
                    <p className="text-destructive text-xs">{errors.academicLevel.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseId">Course</Label>
                  <Select
                    value={courseIdValue}
                    disabled={!academicLevelValue}
                    onValueChange={(val) => {
                      if (val) {
                        setValue('courseId', val, { shouldValidate: true });
                        setUploadSuccess(false);
                      }
                    }}
                  >
                    <SelectTrigger id="courseId">
                      <SelectValue
                        placeholder={
                          academicLevelValue ? 'Select a course' : 'Select level first'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="min-w-50">
                      {filteredCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.courseId && (
                    <p className="text-destructive text-xs">{errors.courseId.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="title">Lecture Title</Label>
                  <Input
                    id="title"
                    placeholder="Networks Architecture and Protocols"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-destructive text-xs">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekNumber">Week Number</Label>
                  <Input
                    id="weekNumber"
                    type="number"
                    min={1}
                    max={16}
                    {...register('weekNumber', { valueAsNumber: true })}
                  />
                  {errors.weekNumber && (
                    <p className="text-destructive text-xs">{errors.weekNumber.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Material File</Label>
                <FileDropzone
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  onClear={handleClearFile}
                  error={errors.file?.message as string | undefined}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="min-w-36">
                  Upload & Process
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <ProcessingQueueCard items={recentUploads} />
      </div>
    </div>
  );
}