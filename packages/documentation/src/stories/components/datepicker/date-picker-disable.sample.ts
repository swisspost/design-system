window.addEventListener('DOMContentLoaded', () => {
  const dp: HTMLPostDatePickerElement = document.querySelector('post-date-picker');
  dp.renderCellCallback = ({ date, cellType }) => {
    if (cellType === 'day' && date.getDay() === 0) {
      return { disabled: true };
    }
  };
});
