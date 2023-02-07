# Contributing to Design System Icons

These contribution guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md) found at the root of this repository.

## Adding new icons

To add a new icon to this package, please contact [corpdesign@post.ch](mailto:corpdesign@post.ch). There is an automated workflow in place that will grab the new icon from the sharing platform and issue a pull request to this repository. After review through maintainers of the Design System, the new icon(s) can be published.

## Setup

Apart from the regular setup described in the general [contribution guidelines](../../CONTRIBUTING.md), you need three environment secrets in order to be able to run the `pnpm --filter design-system-icons fetchSVGs` command. You can find the keys required in the [.template.env](./.template.env) file. Please contact a maintainer of this repository in order to get the values required for the `.env` file.

## Downloading icons

In order to start the workflow, run

```shell
  pnpm --filter design-system-icons fetchSVGs
```

This will call the API sequentially and download SVGs in batches of 100. Icons are named in numbers and each 1000 block has a different theme. There is a filter ignoring some icon ranges because they are not targeted at the web.

## The report

After downloading the whole set, a `report.json` is generated containing information about all the downloaded icons such as name, description, dates and some other meta information. The report is part of the published package, so consumers can use it to create a search for example.

## Transforming icons

We're using [SVGO]() in order to normalize and minify SVG icons.

## Reading the report

Published along with the report is also a tiny website consuming the `report.json` and listing all the icons and the errors per category. This simple page uses [alpine.js](https://alpinejs.dev/) in order to keep it as simple as possible. For security reasons, an integrity hash has been generated with the [SRI Hash Generator](https://www.srihash.org/). When upgrading alpine versions, don't forget to also update the hash.

## Debugging broken icons

The report also contains information about failed downloads, corrupted files and additionally SVGs that don't have a `viewBox` of `0 0 32 32`. This is useful information for debugging icons together with the Corp Design team.

## The post-icon component

The `post-icon` component published as a part of the `@swisspost/design-system-components` package is designed to consume icons from this package either through the [unpkg CDN](https://unpkg.com/) or from an independently hosted source, configurable through a meta tag or prop on the component itself.

## Automating the workflow

A GitHub action is responsible for automating the above workflow and creating pull requests on a regular basis in order to keep the icon base up to date.

## Test dependencies

Packages like jest, ts-jest and node-fetch are in the process of transforming to es-modules. At the time of writing, this lead to serious compatibility issues during setup. As of January 2023, the best way forward seems to be to downgrade to v25 of these modules and evaluate updating at a later time when documentation and support for es-modules in the node ecosystem are more mature.

Reference setup: https://gist.github.com/iRoachie/3f9b4855ee4891050c8e900ed9953773
