interface IRole {
  role: string;
  description: string;
}

interface IStakeholder {
  role: string;
}

interface ITeamMembers {
  name: string;
  icon: string;
}

export const stakeholders: IStakeholder[] = [
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

export const roles: IRole[] = [
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

export const teamMembers: ITeamMembers[] = [
  { name: 'Development', icon: '2546' },
  { name: 'Visual Design', icon: '2591' },
  { name: 'User Experience', icon: '2336' },
];
