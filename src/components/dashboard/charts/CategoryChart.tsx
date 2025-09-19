import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react'
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { Category } from '../../../types/dashboard';
import { darkTheme, lightTheme } from '../../../theme/highchartsThemes';

interface CategoryChartProps {
    categories: Category[]
    darkMode: boolean;
}

export interface CategoryChartRef {
    updateData: (categories: Category[]) => void;
    updateTheme: (darkMode: boolean) => void;
    getChart: () => Highcharts.Chart | undefined;
}

const CategoryChart = forwardRef<CategoryChartRef, CategoryChartProps>(({ categories, darkMode }, ref) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    // Memoize base chart options (without data)
    const baseOptions = useMemo<Highcharts.Options>(() => {
        // Set initial theme once
        Highcharts.setOptions(darkMode ? darkTheme : lightTheme);
        
        return {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Categories'
            },
            tooltip: {
                pointFormat: ' '
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                }
            },
            series: [{
                name: 'Category',
                type: 'pie',
                data: []
            }]
        };
    }, [darkMode]);

    // Memoize chart options with data
    const options = useMemo<Highcharts.Options>(() => ({
        ...baseOptions,
        series: [{
            name: 'Category',
            type: 'pie',
            data: categories.length > 0 ? categories.map(c => ({
                name: c.name,
                y: 1
            })) : []
        }]
    }), [baseOptions, categories]);

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
        updateData: (newCategories: Category[]) => {
            const chart = chartComponentRef.current?.chart;
            if (chart) {
                chart.series[0].setData(
                    newCategories.map(c => ({ name: c.name, y: 1 })),
                    true, // redraw
                    true, // animation

                );
            }
        },
        updateTheme: (isDarkMode: boolean) => {
            Highcharts.setOptions(isDarkMode ? darkTheme : lightTheme);
            const chart = chartComponentRef.current?.chart;
            if (chart) {
                chart.update({
                    chart: { backgroundColor: isDarkMode ? darkTheme.chart?.backgroundColor : lightTheme.chart?.backgroundColor }
                });
            }
        },
        getChart: () => chartComponentRef.current?.chart
    }), []);

    return (
        <div>
            <HighchartsReact
                key={darkMode ? "dark" : "light"}
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </div>
    )
});

export default React.memo(CategoryChart)