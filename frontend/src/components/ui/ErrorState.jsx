import Button from "./Button";

export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="state">
      <div className="state-icon">⚠️</div>
      <div className="state-title">{title}</div>
      <div className="state-desc">{message}</div>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
