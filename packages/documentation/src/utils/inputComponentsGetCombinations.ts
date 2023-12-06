const SHORT_HINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.';
const LONG_HINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi. Quia quod eligendi ab voluptas modi id distinctio iure vel possimus deserunt, amet, dolores laboriosam quas qui aut laborum? Et numquam esse laboriosam totam quod sapiente recusandae consectetur optio, quaerat quia.';
const SHORT_LABEL = 'Label';
const LONG_TEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi';

export const COMBINATIONS = [
  {
    title: true, // This property is true when a heading should be rendered above the story
    label: `${SHORT_LABEL} - no Hint`,
    hint: null,
  },
  {
    label: `${SHORT_LABEL} - short Hint`,
    hint: SHORT_HINT,
  },
  {
    label: `${SHORT_LABEL} - long - ${LONG_TEXT}`,
    hint: LONG_HINT,
  },
  {
    label: `${SHORT_LABEL} - Disabled`,
    disabled: true,
  },
  {
    label: `${SHORT_LABEL} - Success`,
    success: true,
  },
  {
    label: `${SHORT_LABEL} - Valid`,
    validation: 'is-valid',
  },
  {
    label: `${SHORT_LABEL} - Valid with success`,
    validation: 'is-valid',
    success: true,
  },
  {
    label: `${SHORT_LABEL} - Invalid`,
    validation: 'is-invalid',
  },
];

export function getCombinations(
  argumentName: string,
  argumentValues: Array<unknown>,
  combinations: Array<{
    label: string;
    [propName: string]: any;
  }>,
) {
  let result: Array<Object> = [];
  for (const argumentValue of argumentValues) {
    result = [
      ...result,
      ...combinations.map(c => ({
        ...c,
        [argumentName]: argumentValue,
      })),
    ];
  }
  return result;
}
