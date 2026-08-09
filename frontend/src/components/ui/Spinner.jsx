export function Spinner() {
  return <div className="spinner" role="status" aria-label="Loading" />;
}

export function Skeleton({ width = "100%", height = "16px", style = {} }) {
  return <div className="skeleton" style={{ width, height, ...style }} />;
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Skeleton width="60%" height="18px" />
      <Skeleton width="40%" height="30px" />
      <Skeleton width="80%" height="14px" />
    </div>
  );
}
