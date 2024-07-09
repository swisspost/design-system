---
name: Component v2
about: For creating issues for new v2 components
title: ''
labels: "\U0001F4E6 components"
assignees: ''

---

name: Component v2
description: Add a working item for a component targeted at the new Design v2
title: "[component]: "
labels: ["📦 components"]
projects: ["swisspost/3"]
milestone: "Design v2"
assignees: []
body:
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A short description of the component, disambiguation if needed
      placeholder: A tooltip shows short, additional information on focusable elements.
    validations:
      required: false
  - type: input
    id: designurl
    attributes:
      label: Design
      description: Link to the component in Figma
    validations:
      required: true
  - type: checkboxes
    id: tokens
    attributes:
      label: Tokens
      description: Indicates whether tokens already exist for this component
      options:
        - label: Tokens for this component are ready
  - type: textarea
    id: tasks
    attributes:
      label: Tasks
      value: |
        ```[tasklist]
        ### Tasks
        - [ ] HTML/CSS implementation
        - [ ] Web component implementation
        - [ ] Documentation in Storybook
        - [ ] Unit tests
        - [ ] End to end tests
        - [ ] Visual regression tests
        - [ ] Design review
        ```
