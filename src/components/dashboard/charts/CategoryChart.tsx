import React, { useEffect, useRef, useState } from 'react'
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

    const [options, setOptions] = useState<Highcharts.Options>({
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
                    data: []
                }]
            });

    useEffect(() => {
        Highcharts.setOptions(darkMode ? darkTheme : lightTheme);
    }, [darkMode]);

    useEffect(() => {
        if (categories.length > 0) {
            setOptions({
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
                    data: categories.map(c => ({
                        name: c.name,
                        y: 1
                    }))
                }]
            });
        }
    }, [categories, darkMode]);


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

export default CategoryChart