import React from "react";
import { PieChart } from '@mui/x-charts';

export default function ExpenseOverview({data}) {
    return (
        <section className="overviews">
            <h2>Expenses Overview</h2>
            <PieChart
                series={[
                    {
                        paddingAngle: 5,
                        innerRadius: 60,
                        outerRadius: 80,
                        data,
                    },
                ]}
                margin={{ right: 5 }}
                width={250}
                height={235}
                legend={{ hidden: false }}
                slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'left' },
                      padding: 0,
                    },
                  }}
            />
        </section>
    )
}