import { z } from 'zod';

export const projectStatusSchema = z.enum(['planning', 'in_progress', 'on_hold', 'completed']);
export const taskStatusSchema = z.enum(['todo', 'in_progress', 'completed']);
export const prioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: projectStatusSchema,
  progress: z.number().min(0).max(100),
  startDate: z.string(),
  endDate: z.string().optional(),
  clientId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: taskStatusSchema,
  priority: prioritySchema,
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const activitySchema = z.object({
  id: z.string(),
  projectId: z.string(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
  userId: z.string(),
});

export const clientSettingsSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  company: z.string().optional(),
  phone: z.string().optional(),
  notificationPreferences: z.object({
    email: z.boolean(),
    push: z.boolean(),
    slack: z.boolean(),
  }),
});

export type Project = z.infer<typeof projectSchema>;
export type Task = z.infer<typeof taskSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type ClientSettings = z.infer<typeof clientSettingsSchema>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type Priority = z.infer<typeof prioritySchema>;
