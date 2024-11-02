import sys
import json
from train_arrival import get_train_arrival_time_by_id  # Adjust the import according to your file structure

def main():
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Station name argument is required."}))
        return
    
    station_name = sys.argv[1]
    
    # Fetch the train arrival data for the given station
    try:
        arrival_data = get_train_arrival_time_by_id(station_name)

        # Output only the JSON data without any additional text
        print(arrival_data)  # Ensure this is a valid JSON string

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == '__main__':
    main()

