/**
 * Add role and aria-label to each grid cell based on its type.
 * @param data The render cell data from AirDatepicker.
 * @param localeCode The BCP 47 locale code for formatting.
 * @returns An object with `attrs` to apply to the cell element.
 */
export function renderCellAccessibility(
  { date, cellType }: { date: Date; cellType: string },
  localeCode: string,
) {
  if (cellType === 'day') {
    return {
      attrs: {
        'role': 'gridcell',
        'aria-label': date.toLocaleDateString(localeCode, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    };
  } else if (cellType === 'month') {
    return {
      attrs: {
        'role': 'gridcell',
        'aria-label': date.toLocaleDateString(localeCode, {
          year: 'numeric',
          month: 'long',
        }),
      },
    };
  } else if (cellType === 'year') {
    return {
      attrs: {
        'role': 'gridcell',
        'aria-label': date.toLocaleDateString(localeCode, {
          year: 'numeric',
        }),
      },
    };
  }
}

/**
 * Merge the internal render cell (adding of role + aria-label attributes) and the user's render cell (disabling dates, etc.)
 * @param base Internal render cell
 * @param custom User render cell
 * @returns Merged render cell
 */
export function mergeRenderCellResults(base, custom) {
  if (!base) return custom;
  if (!custom) return base;

  return {
    ...base,
    ...custom,
    attrs: {
      ...(base.attrs ?? {}),
      ...(custom.attrs ?? {}),
    },
    classes: [base.classes, custom.classes].filter(Boolean).join(' '),
    disabled: base.disabled || custom.disabled,
  };
}
