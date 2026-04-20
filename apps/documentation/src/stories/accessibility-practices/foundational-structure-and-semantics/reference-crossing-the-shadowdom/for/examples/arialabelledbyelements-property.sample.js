// Get the element that will serve as the label
const label = document.getElementById('labelId');

// Get the input that needs a label
const input = document.getElementById('inputId');

// Assign one or more label elements directly to the target element `ariaLabelledByElements` property
input.ariaLabelledByElements = [label];
