type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-gray-500">
      <span className="text-5xl">🗺️</span>
      <p className="text-lg font-medium text-gray-700">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}
