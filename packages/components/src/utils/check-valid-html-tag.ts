/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

export function checkValidHTMLTag(tag: string, message?: string) {
  if (document.createElement(tag) instanceof window.HTMLUnknownElement) {
    throw new Error(message);
  } else {
    return tag;
  }
}
