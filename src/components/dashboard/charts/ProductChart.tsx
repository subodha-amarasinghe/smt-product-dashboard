import React, { useEffect, useRef, useMemo } from 'react'
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { Category, Product } from '../../../types/dashboard';
import { darkTheme, lightTheme } from '../../../theme/highchartsThemes';

interface ProductChartProps {
    selectedCategory: Category;
    products: Product[]
    darkMode: boolean;
}

const ProductChart: React.FC<ProductChartProps> = ({ products, darkMode, selectedCategory }) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    // Memoize chart options to prevent unnecessary rerenders
    const options = useMemo<Highcharts.Options>(() => ({
        chart: {
            type: 'column'
        },
        title: {
            text: `Products n ${selectedCategory.name}`,
        },
        tooltip: {
            valueSuffix: ' $'
        },
        xAxis: {
            categories: products.length > 0 ? products.map(c => c.title) : [],
            crosshair: true,
        },
        yAxis: {
            title: {
                text: `${selectedCategory.name}`
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
            data: products.length > 0 ? products.map(c => c.price) : []
        }]
    }), [products, selectedCategory.name]);

    // Single useEffect to handle theme changes
    useEffect(() => {
        Highcharts.setOptions(darkMode ? darkTheme : lightTheme);
    }, [darkMode]);


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
}

export default React.memo(ProductChart)