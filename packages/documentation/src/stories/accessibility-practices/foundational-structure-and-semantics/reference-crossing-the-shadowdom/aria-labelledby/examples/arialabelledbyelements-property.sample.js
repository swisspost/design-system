// Get the element that will serve as the label
const label = document.getElementById('labelId');

// Get the element that needs an accessible name
const element = document.getElementById('elementId');

// Assign one or more label elements directly to the target element `ariaLabelledByElements` property
element.ariaLabelledByElements = [label];
