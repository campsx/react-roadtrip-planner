type BadgeProps = {
  label: string;
  variant?: 'default' | 'blue' | 'green';
};

const variantClasses = {
  default: 'bg-gray-100 text-gray-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}
