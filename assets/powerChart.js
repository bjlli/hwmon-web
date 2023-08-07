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
                        text: "Current [mA]",
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
    async function fetchLatestData() {
        try {
            const response = await fetch('/read_hwmon_data');
            const data = await response.json();
            const value = parseFloat(data);
            console.log('Converted Value:', value);
            return value;
        } catch (error) {
            console.error('Error fetching data:', error);
            return 0; 
        }
    }

    function updatecurrentChart() {
        const newData = fetchLatestData();
    
        newData.then((value) => {
            if (currentChart.data.labels.length >= 30) {
                currentChart.data.labels.shift();
                currentChart.data.datasets[0].data.shift();
            }
    
            currentChart.data.labels.push(new Date().toLocaleTimeString());
            currentChart.data.datasets[0].data.push(value);
    
            currentChart.update();
        });
    }

    updatecurrentChart();

    // Update the current chart every 20 seconds
    setInterval(updatecurrentChart, 20000);