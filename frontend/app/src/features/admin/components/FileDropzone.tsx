import { useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileDropzoneProps {
  selectedFile: File | null;
  onFileSelect: (files: FileList) => void;
  onClear: () => void;
  error?: string;
  disabled?: boolean;
}

export function FileDropzone({
  selectedFile,
  onFileSelect,
  onClear,
  error,
  disabled = false,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <div className="space-y-2">
      {!selectedFile ? (
        <label
          htmlFor="file-upload"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
          }`}
        >
          <UploadCloud
            className={`mb-3 h-10 w-10 transition-colors ${
              isDragging ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
          <p className="text-sm font-medium">
            {isDragging ? 'Drop your file here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            PDF, PPTX, or DOCX (Max 20MB)
          </p>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.pptx,.docx"
            onChange={handleFileChange}
            disabled={disabled}
          />
        </label>
      ) : (
        <div className="bg-muted/40 flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-primary/10 text-primary rounded-md p-2">
              <FileText className="h-5 w-5" />
            </div>
            <div className="truncate">
              <p className="truncate text-sm font-medium">{selectedFile.name}</p>
              <p className="text-muted-foreground text-xs">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClear}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}