import { prisma } from '@/lib/prisma';
import { type Locale } from '@/lib/i18n/config';
import type { Comment } from '@prisma/client';

interface CommentListProps {
  lang: Locale;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export default async function CommentList({ lang }: CommentListProps) {
  let comments: Comment[] = [];
  try {
    comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No comments yet. Be the first!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment: Comment) => (
        <div
          key={comment.id}
          className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {comment.name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {comment.message}
          </p>
        </div>
      ))}
    </div>
  );
}
