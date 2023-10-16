const SHORT_HINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.';
const LONG_HINT =
  'Hintus ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi. Quia quod eligendi ab voluptas modi id distinctio iure vel possimus deserunt, amet, dolores laboriosam quas qui aut laborum? Et numquam esse laboriosam totam quod sapiente recusandae consectetur optio, quaerat quia.';
const SHORT_LABEL = 'Label';
const LONG_TEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi';

export const COMBINATIONS = [
  {
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
    label: `${SHORT_LABEL} - Valid`,
    validation: 'is-valid',
  },
  {
    label: `${SHORT_LABEL} - Invalid`,
    validation: 'is-invalid',
  },
  {
    label: `${SHORT_LABEL} - no Placeholder`,
    placeholder: null,
  },
  {
    label: `${SHORT_LABEL} - with Value`,
    value: 'Lorem Ipsum',
  },
];
