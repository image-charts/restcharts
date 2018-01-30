# REST Charts

Generate PNG images of charts easily through a simple REST-like API.

Powered by [Highcharts](https://www.highcharts.com/)

## API

```sh
$ curl -X GET https://api.restcharts.com/chart/:type[?parameters]
```

or

```sh
$ curl -X POST https://api.restcharts.com/chart/:type -d [JSON parameters]
```

## Parameters

### Simple

#### URL parameters

- `type`: The type of the chart you want to generate. See all types [here](https://www.highcharts.com/docs/chart-and-series-types/chart-types).

#### Body/query string parameters

- `color`: The color of the line/bar/column/etc. of the chart.
- `bg`: The background color of (default: transparent, i.e. `rgba(0, 0, 0, 0)`)
- `height`: The height of the generated chart.
- `width`: The width of the generated chart.
- `opacity`: If an area chart (or variation), will be the opacity of the area.
- `linewidth`: If a line or spline chart, the line width of the lines.

### Advanced

If you want to generate a chart using the [advanced configuration](https://api.highcharts.com/highcharts/) provided by Highcharts
(the relevant options are the ones in the `Highcharts.chart()` method),
you can provide a raw config object with any available options you'd like
to provide for the chart type desired. Any configuration you have in the raw
parameter will override the default options.

- `raw`: The JSON serialized config object

## Development

### Environment Variables

The following variables are required for the app to be deployed and
Highcharts installed correctly without problems. Please make sure you
have a Highcharts license per their requirements :)

1. ACCEPT_HIGHCHARTS_LICENSE=YES

### Build

```sh
$ gulp build
$ npm run dev
```
