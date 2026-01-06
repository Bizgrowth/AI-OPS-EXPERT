import { Folder } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Project } from '@/types/client-portal';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const statusVariants = {
  planning: { variant: 'default' as const, label: 'Planning' },
  in_progress: { variant: 'success' as const, label: 'In Progress' },
  on_hold: { variant: 'warning' as const, label: 'On Hold' },
  completed: { variant: 'secondary' as const, label: 'Completed' },
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const status = statusVariants[project.status];

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10",
        onClick && "active:scale-[0.98]"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <Folder className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1 truncate">{project.name}</h3>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Progress</span>
            <span className="text-slate-300 font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
        </div>
      </CardContent>
    </Card>
  );
}
