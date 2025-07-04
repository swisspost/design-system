const SHORT_HINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.';
const LONG_HINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi. Quia quod eligendi ab voluptas modi id distinctio iure vel possimus deserunt, amet, dolores laboriosam quas qui aut laborum? Et numquam esse laboriosam totam quod sapiente recusandae consectetur optio, quaerat quia.';
const SHORT_LABEL = 'Label';
const LONG_TEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi';

export const COMBINATIONS = [
  {
    title: 'No hint',
    label: SHORT_LABEL,
    hint: null,
  },
  {
    title: 'Short hint, optional',
    label: SHORT_LABEL,
    hint: SHORT_HINT,
    requiredOptional: 'optional',
  },
  {
    title: 'Long label, long hint',
    label: LONG_TEXT,
    hint: LONG_HINT,
  },
  {
    title: 'Disabled',
    label: SHORT_LABEL,
    disabled: true,
  },
  {
    title: 'Valid',
    label: SHORT_LABEL,
    validation: 'is-valid',
  },
  {
    title: 'Invalid, required',
    label: SHORT_LABEL,
    validation: 'is-invalid',
    requiredOptional: 'required',
  },
];

export function getCombinations(
  argumentName: string,
  argumentValues: unknown[] | undefined,
  combinations: Array<{
    label: string;
    [propName: string]: unknown;
  }>,
) {
  let result: Array<object> = [];
  for (const argumentValue of argumentValues ?? []) {
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
