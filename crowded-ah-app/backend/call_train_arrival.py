"""
This script fetches train arrival data for a given station by name and outputs it as a JSON string.

Functions:
    - main: The main function that processes command-line arguments, fetches the train arrival data,
    and outputs it in JSON format.

Author: Meagan Eng Pei Ying
"""
import sys
import json
from train_arrival import get_train_arrival_time_by_id  # Adjust the import according to your file structure

def main():
    """
    Main function that processes command-line arguments and fetches train arrival data for a given station.

    The function checks if exactly one argument (station name) is provided. If not, it outputs an error message
    in JSON format. Otherwise, it fetches the train arrival times using `get_train_arrival_time_by_id` and prints
    the result as a JSON string.
    
    Arguments:
    <station_name> (str): The name of the station for which train arrival times are requested.

    """
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

