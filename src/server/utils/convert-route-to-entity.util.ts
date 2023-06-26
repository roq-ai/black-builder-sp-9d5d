const mapping: Record<string, string> = {
  collaborators: 'collaborator',
  events: 'event',
  'event-attendees': 'event_attendee',
  mentorships: 'mentorship',
  profiles: 'profile',
  projects: 'project',
  'project-collaborators': 'project_collaborator',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
