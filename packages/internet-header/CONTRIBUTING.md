# Contributing to the Internet Header

## Design Principles

The header is designed to load a configuration file from the Post Portal Sitecore CMS and render Header, Breadcrumbs and Footer from that information. Implementing projects can add information at certain points, but not override the configuration provided by the portal (except for the language switch).

The header is designed to work with as few settings as possible, so the only required setting is the project ID, needed to load the config. Many options are available for customization, but are not required for the basic setup.

The header should work on any device, any screen, any framework that can render HTML. It should never leak styles to the page or be altered by the page except for inheritable styles like `font-family`. This is to ensure maximum compatibility with as many implementations as possible.

## Portal config

The config file is a large json object containing configuration for all four languages (or as many as defined) and the header, breadcrumbs and footer components. This config is a runtime dependency. Therefore, breaking changes to the config may break older header versions. When planning breaking changes to the config, the config path should be versioned and the current version has to stay online as long as there are older header versions online.

### Main navigation

Main navigation items can either have a flyout or are plain links.

### Search

The search knows three kind of suggestions. Search suggestions from Coveo, place results from places.post.ch and tracking numbers for parcel. Tracking numbers are identified by regex and an API call to track and trace and hitting enter will redirect to the track and trace details of the parcel. Place suggestions redirect to the location search. Coveo suggestions will redirect to the regular search page.

### Login widget

The login widget is a relic of old times, adapted to work within the shadow-dom. Handle with care, it's fragile.

### Breadcrumbs

The breadcrumbs can easily be too long to be displayed on one line on small screens. A mechanism using an invisible second breadcrumb element is used to determine if there is enough space to render the breadcrumbs fully or not. If there is not, breadcrumbs will be shortened and a dropdown provides the middle steps.

### Help & Contact overlays

These overlays are iFrames hosted by the portal. The iframe-resizer plugin is active on both pages and used to determine the height of the overlays and a focus-trap is active for keyboard users.

### Footer

The only special thing about the footer is the screen sharing functionality. This is a script loaded for online services. On the docs, this script is not being loaded. A polling function in the footer waits for the script for 5 seconds. If the global initialize function is found, the footer entry for screen sharing is rendered, otherwise it stays hidden.

## Future projects

- Make the config file obsolete by splitting the header up in many small components and providing implementors with a way to completely customize the header. This would enable projects with their own CMS to use the header
- Rewriting the KLP login widget as a web-component
