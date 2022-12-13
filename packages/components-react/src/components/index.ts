import React from "react";
import * as Components from "./stencil-generated/index";

Object.entries(Components).forEach(([name, component]: [string, React.NamedExoticComponent]) => {
  component.displayName = name.replace(/\B([A-Z])/g, '-$1').toLowerCase();
});

export * from "./stencil-generated/index";
