interface Role {
  role: string;
  description: string;
}

interface Stakeholder {
  role: string;
}

interface TeamMembers {
  name: string;
  icon: string;
}

export const stakeholders: Stakeholder[] = [
  {
    role: 'Management',
  },
  {
    role: 'DevOps Team',
  },
  {
    role: 'Architecture',
  },
  {
    role: 'Project Management',
  },
  {
    role: 'Branding',
  },
];

export const roles: Role[] = [
  {
    role: 'Web & Mobile Developers',
    description: 'Utilize the system to build responsive, accessible, and consistent interfaces.',
  },
  {
    role: 'Digital Designers',
    description:
      'Rely on standardized components to create user-friendly and cohesive experiences.',
  },
  {
    role: 'Digital Product Owners',
    description:
      'Ensure product development aligns with Swiss Post’s design principles and standards.',
  },
];

export const teamMembers: TeamMembers[] = [
  { name: 'Development', icon: '2546' },
  { name: 'Visual Design', icon: '2591' },
  { name: 'User Experience', icon: '2336' },
];
