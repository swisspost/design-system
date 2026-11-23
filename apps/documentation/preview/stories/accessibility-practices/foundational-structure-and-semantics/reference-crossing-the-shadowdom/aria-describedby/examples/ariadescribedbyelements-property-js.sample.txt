// Get the element that will serve as the description
const description = document.getElementById('descriptionId');

// Get the element that needs an accessible description
const element = document.getElementById('elementId');

// Assign one or more description elements directly to the target element `ariaDescribedByElements` property
element.ariaDescribedByElements = [description];
