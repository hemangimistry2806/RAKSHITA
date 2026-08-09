export default function EmptyState({ icon = "📭", title, description, action }) {
  return (
    <div className="state">
      <div className="state-icon">{icon}</div>
      <div className="state-title">{title}</div>
      {description && <div className="state-desc">{description}</div>}
      {action}
    </div>
  );
}
