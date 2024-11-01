import json
from datetime import datetime, timedelta
import os

# Function to generate crowd levels based on specific time intervals
def generate_crowd_levels():
    base_time = datetime(2024, 10, 31, 0, 0)
    crowd_levels = []
    
    for i in range(48):  # 48 half-hour intervals
        start_time = base_time + timedelta(minutes=30 * i)
        hour = start_time.hour
        
        # Determine crowd level based on time intervals
        if hour < 7:
            crowd_level = "l"
        elif 7 <= hour < 8:
            crowd_level = "m"
        elif 8 <= hour < 10:
            crowd_level = "h"
        elif 10 <= hour < 11:
            crowd_level = "m"
        elif 11 <= hour < 14:
            crowd_level = "h"
        elif 14 <= hour < 17:
            crowd_level = "m"
        elif 17 <= hour < 20:
            crowd_level = "h"
        elif 20 <= hour < 21:
            crowd_level = "m"
        else:
            crowd_level = "l"
        
        entry = {
            "Start": start_time.strftime("%Y-%m-%dT%H:%M:%S+08:00"),
            "CrowdLevel": crowd_level
        }
        crowd_levels.append(entry)
    
    return crowd_levels

# Define lines and stations
lines = {
    "EW": [f"EW{i}" for i in range(1, 34)] + ["CG1", "CG2"],
    "CC": [f"CC{i}" for i in range(1, 30) if i != 18] + ["CE1", "CE2"],
    "DT": [f"DT{i}" for i in range(1, 36)],
    "NE": [f"NE{i}" for i in range(1, 18) if i != 2],
    "NS": [f"NS{i}" for i in range(1, 29)],
    "BP": [f"BP{i}" for i in range(1, 14)],
    "SE": [f"SE{i}" for i in range(1, 6)],
    "SW": [f"SW{i}" for i in range(1, 9)],
    "PE": [f"PE{i}" for i in range(1, 8)],
    "TE": [f"TE{i}" for i in range(1, 30)]
}

# Create JSON files for each line
for line_code, stations in lines.items():
    stations_data = {
        "odata.metadata": "https://datamall2.mytransport.sg/ltaodataservice/PCDForecast",
        "value": []
    }
    
    for station_id in stations:
        station_entry = {station_id: generate_crowd_levels()}
        stations_data["value"].append(station_entry)
    
    # Define the filename based on the line code with the format "mockFC-<line_code>.json"
    filename = f"mockFC-{line_code}L.json"
    output_path = os.path.abspath(filename)

    # Print the output path for debugging
    print(f"Attempting to write to: {output_path}")
    
    # Write the data to the JSON file, overwriting if it exists
    try:
        with open(output_path, "w") as json_file:
            json.dump(stations_data, json_file, indent=4)
        print(f"Data successfully saved to {output_path}")
    except IOError as e:
        print(f"Failed to write file at {output_path}: {e}")
