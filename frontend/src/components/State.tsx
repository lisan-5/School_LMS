export const Loader = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="state state-loading">
    <div className="dot-pulse" />
    <span>{label}</span>
  </div>
)

export const ErrorState = ({ message }: { message: string }) => (
  <div className="state state-error">
    <strong>Something went wrong.</strong>
    <span>{message}</span>
  </div>
)

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) => (
  <div className="state state-empty">
    <h3>{title}</h3>
    {description && <p className="muted">{description}</p>}
    {action}
  </div>
)

