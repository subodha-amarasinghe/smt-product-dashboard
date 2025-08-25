import Highcharts from "highcharts";
import palette from "./palette";

export const lightTheme: Highcharts.Options = {
  chart: {
    backgroundColor: palette.background.paperLight,
    style: { color: palette.text.light },
  },
  title: { style: { color: palette.text.light } },
  tooltip: {
    backgroundColor: palette.background.light,
    style: { color: palette.text.light },
  },
  legend: { itemStyle: { color: palette.text.light } },
  colors: [
    palette.primary.main,
    palette.secondary.main,
    palette.success.main,
    palette.warning.main,
    palette.info.main,
    palette.error.main,
  ],
};

export const darkTheme: Highcharts.Options = {
  chart: {
    backgroundColor: palette.background.paperDark,
    style: { color: palette.text.dark },
  },
  title: { style: { color: palette.text.dark } },
  tooltip: {
    backgroundColor: palette.background.dark,
    style: { color: palette.text.dark },
  },
  legend: { itemStyle: { color: palette.text.dark } },
  colors: [
    palette.primary.light,
    palette.secondary.light,
    palette.success.light,
    palette.warning.light,
    palette.info.light,
    palette.error.light,
  ],
};
