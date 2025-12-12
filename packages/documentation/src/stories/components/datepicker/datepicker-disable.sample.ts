window.addEventListener('DOMContentLoaded', () => {
  const dp = document.querySelector('post-datepicker');
  dp.renderCellCallback = ({ date, cellType }) => {
    if (cellType === 'day' && date.getDay() === 0) {
      return { disabled: true };
    }
  };
});
