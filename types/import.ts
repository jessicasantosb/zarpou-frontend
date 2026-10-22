export interface ImportRowError {
  row: number;
  code?: string | null;
  error: string;
}

export interface ImportJob {
  id: string;
  resource: string;
  mode: string;
  status: "pending" | "processing" | "completed" | "failed";
  original_filename?: string | null;
  total_rows: number;
  processed_rows: number;
  success_count: number;
  error_count: number;
  message?: string | null;
  report?: {
    errors: ImportRowError[];
    errors_truncated?: boolean;
  } | null;
  created_by?: string | null;
  created_at?: string | null;
  started_at?: string | null;
  finished_at?: string | null;
}

export interface ImportJobCreated {
  job: ImportJob;
  detail?: string;
}
