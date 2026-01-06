interface CommentIndicatorProps {
  comment: string;
  timestamp?: string;
}

export function CommentIndicator({
  comment,
  timestamp,
}: CommentIndicatorProps) {
  // Component disabled - no annotation circles will be rendered
  return null;
}
