    // Function to generate random values for the chart data
    function generateRandomData() {
        const data = [];
        for (let i = 0; i < 7; i++) { 
            data.push(Math.floor(Math.random() * 500)); 
        }
        return data;
    }

    const currentChartCanvas = document.getElementById("currentChart");
    const currentChartCtx = currentChartCanvas.getContext("2d");

    const currentChart = new Chart(currentChartCtx, {
        type: "line", 
        data: {
            labels: [], 
            datasets: [
                {
                    data: [],
                    backgroundColor: "rgb(2, 79, 231)", 
                    borderColor: "rgb(2, 79, 231)", 
                    borderWidth: 1, 
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false, 
                },
                title: {
                    display: false, 
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time",
                        color: "black",
                    },
                    ticks: {
                        color: "black",
                    },
                    grid: {
                        color: "rgb(214, 218, 255)",
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Current [mA",
                        color: "black",
                    },
                    ticks: {
                        color: "black",
                    },
                    grid: {
                        color: "rgb(214, 218, 255)",
                    },
                },
            },
        },
    });

    // Function to fetch the latest data 
    function fetchLatestData() {
        const newData = generateRandomData(); 
        return newData;
    }

    // Function to update the current chart with new data
    function updatecurrentChart() {
        const newData = fetchLatestData();

        // Remove the oldest data point if there are more than 30 data points
        if (currentChart.data.labels.length >= 30) {
            currentChart.data.labels.shift();
            currentChart.data.datasets[0].data.shift();
        }

        // Add the new data point to the current chart
        currentChart.data.labels.push(new Date().toLocaleTimeString()); 
        currentChart.data.datasets[0].data.push(newData); 

        // Update the current chart
        currentChart.update();
    }

    // Initial current chart update
    updatecurrentChart();

    // Update the current chart every 20 seconds
    setInterval(updatecurrentChart, 20000);