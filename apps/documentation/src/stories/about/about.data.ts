interface DesignPrinciple {
  icon: string;
  iconClassName?: string;
  statement: string;
  highlight: string;
}

type DiagramPosition = 'top' | 'left' | 'right' | 'bottom';

interface PourPrinciple {
  title: string;
  description: string;
  position: DiagramPosition;
}

// The four ETIC principles (Ease of use, Trustworthy, Inclusive, Cordial).
export const designPrinciples: DesignPrinciple[] = [
  {
    icon: 'handpoint',
    iconClassName: 'about-principle-icon-tilted',
    statement: 'The design system and the patterns it contains must be',
    highlight: 'easy to use.',
  },
  {
    icon: 'handshake',
    statement: 'The design system and the patterns it contains must be',
    highlight: 'trustworthy.',
  },
  {
    icon: 'accessibility',
    statement: 'The design system and the patterns it contains must',
    highlight: 'promote inclusion.',
  },
  {
    icon: 'heart',
    statement: 'The language of the design system must be',
    highlight: 'cordial.',
  },
];

export const etic: { initial: string; rest: string }[] = [
  { initial: 'E', rest: 'ase of use' },
  { initial: 'T', rest: 'rustworthy' },
  { initial: 'I', rest: 'nclusive' },
  { initial: 'C', rest: 'ordial' },
];

// Listed in reading order; the stylesheet lays them out in two columns (P + O, U + R).
export const pourPrinciples: PourPrinciple[] = [
  {
    title: 'Perceivable',
    position: 'top',
    description:
      'Information and user interface components shall be presented to users in such a way that they can be perceived. This means that users must understand the information provided; they must not be invisible to them.',
  },
  {
    title: 'Operable',
    position: 'left',
    description:
      'The user interface components and navigation must be operable. This means that users must be able to use the interface and there must be no interaction that a user cannot perform.',
  },
  {
    title: 'Understandable',
    position: 'right',
    description:
      'The information and user interfaces must be easy to understand. This means that users must be able to understand the information and operation of the interface.',
  },
  {
    title: 'Robust',
    position: 'bottom',
    description:
      'Content must be robust enough to be interpreted reliably by the majority of users, including assistive technologies. This means that content should remain accessible as technology and agents evolve.',
  },
];

// Decorative POUR Venn diagram. Positions are derived from a few values (in SVG units) so the
// spacing can be tuned in one place. The left and right circles sit far enough apart for the
// longest label ("Understandable") to fit inside its own circle.
const RADIUS = 108;
const STROKE_WIDTH = 4;
const OFFSET_X = 100; // distance from the centre to the left and right circles
const OFFSET_Y = 128; // distance from the centre to the top and bottom circles
const EXTENT = RADIUS + STROKE_WIDTH / 2;

const directions: Record<DiagramPosition, [number, number]> = {
  top: [0, -1],
  left: [-1, 0],
  right: [1, 0],
  bottom: [0, 1],
};

const width = 2 * (OFFSET_X + EXTENT);
const height = 2 * (OFFSET_Y + EXTENT);

export const pourDiagram = {
  width,
  height,
  radius: RADIUS,
  strokeWidth: STROKE_WIDTH,
  circles: pourPrinciples.map(({ title, position }) => {
    const [dx, dy] = directions[position];
    return { title, cx: width / 2 + dx * OFFSET_X, cy: height / 2 + dy * OFFSET_Y };
  }),
};
