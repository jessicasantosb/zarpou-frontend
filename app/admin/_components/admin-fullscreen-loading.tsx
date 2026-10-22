import { LoadingScreen } from "@/components/shared/loading-screen";

interface AdminFullscreenLoadingProps {
  title: string;
  subtitle: string;
}

export function AdminFullscreenLoading({
  title,
  subtitle,
}: AdminFullscreenLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 min-h-screen min-h-[100dvh] h-screen w-full bg-surface-dark flex flex-col items-center justify-center">
      <LoadingScreen
        title={title}
        subtitle={subtitle}
        theme="dark"
        type="admin"
        fullScreen={true}
      />
    </div>
  );
}
