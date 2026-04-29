export function Button({ children, className, ...props }: any) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

export function CardContent({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

export function Badge({ children }: any) {
  return (
    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
      {children}
    </span>
  );
}
