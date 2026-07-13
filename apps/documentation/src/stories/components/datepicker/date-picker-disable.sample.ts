window.addEventListener('DOMContentLoaded', () => {
  const datePicker: HTMLPostDatePickerElement = document.querySelector('post-date-picker');

  datePicker.cellConfig = ({ date: Date, cellType: 'day' | 'month' | 'year' }) => {
    if (cellType === 'day' && date.getDay() === 0) {
      return { disabled: true };
    }
  };
});
