import React, { useEffect, useRef, useState } from 'react'
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

    const [options, setOptions] = useState<Highcharts.Options>({
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
            categories: [],
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
            data: []
        }]
    });

    useEffect(() => {
        Highcharts.setOptions(darkMode ? darkTheme : lightTheme);
    }, [darkMode]);

    useEffect(() => {
        if (products.length > 0) {
            setOptions({
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
                    categories: products.map(c => c.title),
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
                    data: products.map(c => c.price)
                }]
            });
        }
    }, [products, darkMode, selectedCategory.name]);


    return (
        <div>
            {options &&
                <HighchartsReact
                    key={darkMode ? "dark" : "light"}
                    highcharts={Highcharts}
                    options={options}
                    ref={chartComponentRef}
                />}
        </div>
    )
}

export default ProductChart