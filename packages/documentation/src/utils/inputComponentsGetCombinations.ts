const SHORTHINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.';
const LONGHINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi. Quia quod eligendi ab voluptas modi id distinctio iure vel possimus deserunt, amet, dolores laboriosam quas qui aut laborum? Et numquam esse laboriosam totam quod sapiente recusandae consectetur optio, quaerat quia.';
const SHORTLABEL = 'Label';
const LONGTEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi';

export const COMBINATIONS = [
  {
    title: true, // This property is true when a heading should be rendered above the story
    label: `${SHORTLABEL} - no Hint`,
    hint: null,
  },
  {
    label: `${SHORTLABEL} - short Hint`,
    hint: SHORTHINT,
  },
  {
    label: `$Label - long - ${LONGTEXT}`,
    hint: LONGHINT,
  },
  {
    label: `${SHORTLABEL} - Disabled`,
    disabled: true,
  },
  {
    label: `${SHORTLABEL} - Valid`,
    validation: 'is-valid',
  },
  {
    label: `${SHORTLABEL} - Invalid`,
    validation: 'is-invalid',
  },
];

export function getCombinations(
  argumentName: string,
  argumentValues: Array<unknown>,
  combinations: Array<{ label: string; [propName: string]: any }>,
) {
  let result: Array<Object> = [];
  for (const argumentValue of argumentValues) {
    const labelExtension: string = `[ ${argumentName} : ${argumentValue} ] `;

    result = [
      ...result,
      ...combinations.map(c => ({
        ...c,
        [argumentName]: argumentValue,
        label: `${labelExtension}  ${c.label}`,
      })),
    ];
  }
  return result;
}
