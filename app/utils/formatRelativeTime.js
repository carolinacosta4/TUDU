import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (date) => {
  let relativeTime = formatDistanceToNow(new Date(date), { addSuffix: true });
  return relativeTime.replace(/^about\s/, '');
};