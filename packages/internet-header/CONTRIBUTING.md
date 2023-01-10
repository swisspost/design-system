# Contributing

## Header

### Search
The search knows three kind of suggestions. Search suggestions from Coveo, place results from places.post.ch and tracking numbers for parcel. Tracking numbers are identified by regex and an API call to track and trace and hitting enter will redirect to the track and trace details of the parcel. Place suggestions redirect to the location search (the URL is created with the same slugger as used by the location search, this could break URLs when the location search updates their slugger). Coveo suggestions will redirect to the regular search page.

### Login widget
The login widget is a relic of old times, adapted to work within the shadow-dom. Handle with care, it's fragile.
