import requests
import datetime

def get_sensor_data():
    target_ids = {'440103256242854', '440103264789636'}
    url = 'https://airoco.necolico.jp/data-api/latest?id=CgETViZ2&subscription-key=6b8aa7133ece423c836c38af01c59880'

    try:
        res = requests.get(url)
        res.raise_for_status()
        json_list = res.json()
    except Exception as e:
        return [{"error": str(e)}]

    result = []
    for entry in json_list:
        sensorNumber = str(entry.get('sensorNumber'))
        if sensorNumber not in target_ids:
            continue
        if entry.get('co2') is None:
            continue

        result.append({
            "sensorName": entry.get('sensorName'),
            "co2": entry.get('co2'),
            "temperature": entry.get('temperature'),
            "relativeHumidity": entry.get('relativeHumidity'),
            "timestamp": datetime.datetime.fromtimestamp(entry.get('timestamp')).isoformat()
        })

    return result
