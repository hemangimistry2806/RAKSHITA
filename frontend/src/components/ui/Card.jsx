export default function Card({ title, icon, action, hover = false, children, className = "" }) {
  return (
    <div className={`card ${hover ? "hover" : ""} ${className}`}>
      {(title || action) && (
        <div className="card-head">
          <div className="card-title">
            {icon && <span>{icon}</span>}
            {title}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
