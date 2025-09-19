import React, { useEffect, useRef, useMemo } from 'react'
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { Category } from '../../../types/dashboard';
import { darkTheme, lightTheme } from '../../../theme/highchartsThemes';

interface CategoryChartProps {
    categories: Category[]
    darkMode: boolean;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ categories, darkMode }) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    // Memoize chart options to prevent unnecessary rerenders
    const options = useMemo<Highcharts.Options>(() => ({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Categories'
        },
        tooltip: {
            pointFormat: ''
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
            data: categories.length > 0 ? categories.map(c => ({
                name: c.name,
                y: 1
            })) : []
        }]
    }), [categories]);

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

export default React.memo(CategoryChart)