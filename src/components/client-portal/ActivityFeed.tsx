import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Activity } from '@/types/client-portal';
import { formatRelativeTime } from '@/lib/utils';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">
              No recent activity
            </p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1 text-base">{activity.title}</h4>
                  <p className="text-sm text-slate-400">{activity.description}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
