# Contributing to Design System Icons

## Test dependencies

Packages like jest, ts-jest and node-fetch are in the process of transforming to es-modules. At the time of writing, this lead to serious compatibility issues during setup. As of January 2023, the best way forward seems to be to downgrade to v25 of these modules and evaluate updating at a later time when documentation and support for es-modules in the node ecosystem are more mature.

Reference setup: https://gist.github.com/iRoachie/3f9b4855ee4891050c8e900ed9953773
