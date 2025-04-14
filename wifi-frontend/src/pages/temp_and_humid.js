import { useState, useEffect } from "react";

export function TempAndHumid() {
    const url = "http://localhost:3000/status";
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0)

    const getData = async () => {
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setTemperature(data.temperature);
                setHumidity(data.humidity);
            })
            .catch(error => {
                console.error('Fetch error: ', error);
            });

        setTimeout(getData, 1000);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Temperature Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
                    <h2 className="text-lg font-semibold text-gray-600">Temperature</h2>
                    <p className={temperature >= 15 ? 
                        "text-4xl font-bold text-red-500 mt-2" : 
                        "text-4xl font-bold text-blue-500 mt-2"
                    }>{temperature}°C</p>
                </div>

                {/* Humidity Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-full">
                    <h2 className="text-lg font-semibold text-gray-600">Humidity</h2>
                    <p className="text-4xl font-bold text-blue-500 mt-2">{humidity}%</p>

                    {/* Slider / Progress Bar */}
                    <div className="w-full mt-4">
                        <div className="w-full h-4 bg-blue-100 rounded-full">
                            <div
                                className="h-4 bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: `${humidity}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
