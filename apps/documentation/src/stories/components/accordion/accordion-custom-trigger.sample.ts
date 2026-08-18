const accordion = document.querySelector('post-accordion') as HTMLPostAccordionElement;
accordion.expandAll();
accordion.collapseAll();
accordion.toggle('my-item'); // id must match the one set on the item
