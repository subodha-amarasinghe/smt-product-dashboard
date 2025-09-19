import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react'
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { Category, Product } from '../../../types/dashboard';
import { darkTheme, lightTheme } from '../../../theme/highchartsThemes';

interface ProductChartProps {
    selectedCategory: Category;
    products: Product[]
    darkMode: boolean;
}

export interface ProductChartRef {
    updateData: (products: Product[], category: Category) => void;
    updateTheme: (darkMode: boolean) => void;
    getChart: () => Highcharts.Chart | undefined;
}

const ProductChart = forwardRef<ProductChartRef, ProductChartProps>(({ products, darkMode, selectedCategory }, ref) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    // Memoize base chart options (without data)
    const baseOptions = useMemo<Highcharts.Options>(() => {
        // Set initial theme once
        Highcharts.setOptions(darkMode ? darkTheme : lightTheme);
        
        return {
            chart: {
                type: 'column'
            },
            tooltip: {
                valueSuffix: ' $'
            },
            xAxis: {
                categories: [],
                crosshair: true,
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                type: 'column',
                name: "Price",
                data: []
            }]
        };
    }, [darkMode]);

    // Memoize chart options with data
    const options = useMemo<Highcharts.Options>(() => ({
        ...baseOptions,
        title: {
            text: `Products n ${selectedCategory.name}`,
        },
        xAxis: {
            ...baseOptions.xAxis,
            categories: products.length > 0 ? products.map(c => c.title) : [],
        },
        yAxis: {
            ...baseOptions.yAxis,
            title: {
                text: `${selectedCategory.name}`
            }
        },
        series: [{
            type: 'column',
            name: "Price",
            data: products.length > 0 ? products.map(c => c.price) : []
        }]
    }), [baseOptions, products, selectedCategory.name]);

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
        updateData: (newProducts: Product[], category: Category) => {
            const chart = chartComponentRef.current?.chart;
            if (chart) {
                chart.setTitle({ text: `Products n ${category.name}` });
                chart.xAxis[0].setCategories(newProducts.map(p => p.title));
                chart.yAxis[0].setTitle({ text: category.name });
                chart.series[0].setData(newProducts.map(p => p.price), true, true, true);
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

    // Theme is now handled imperatively via updateTheme method
    // No useEffect needed - theme changes are managed by parent component


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

export default React.memo(ProductChart)