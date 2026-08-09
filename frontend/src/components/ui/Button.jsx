export default function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  className = "",
  ...props
}) {
  const classes = [
    "btn",
    variant === "primary" ? "btn-primary" : "",
    variant === "ghost" ? "btn-ghost" : "",
    variant === "danger" ? "btn-danger" : "",
    variant === "success" ? "btn-success" : "",
    size === "sm" ? "btn-sm" : "",
    size === "lg" ? "btn-lg" : "",
    block ? "btn-block" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
