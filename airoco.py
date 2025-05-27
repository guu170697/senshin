import requests
import datetime
import json

def notify_node_red(sensor_name, co2_value):
    if co2_value > 600:
        try:
            res = requests.post(
                "http://localhost:1880/receive-data",  # Node-RED側のエンドポイント
                json={
                    "sensor": sensor_name,
                    "co2": co2_value
                },
                timeout=5
            )
            res.raise_for_status()
            print(f"通知送信: {sensor_name} - CO2 {co2_value} ppm")
        except Exception as e:
            print(f"Node-RED通知失敗: {e}")

def get_sensor_data():
    target_ids = {'440103256242854', '440103264789636'}
    url = 'https://airoco.necolico.jp/data-api/latest?id=CgETViZ2&subscription-key=6b8aa7133ece423c836c38af01c59880'

    try:
        res = requests.get(url, timeout=5)
        res.raise_for_status()
        json_list = res.json()
    except Exception as e:
        print(f"データ取得エラー: {e}")
        return [{"error": str(e)}]

    result = []
    for entry in json_list:
        sensorNumber = str(entry.get('sensorNumber'))
        if sensorNumber not in target_ids:
            continue
        if entry.get('co2') is None:
            continue

        sensor_name = entry.get('sensorName')
        co2 = entry.get('co2')

        # 600超えていたら通知送信
        notify_node_red(sensor_name, co2)

        result.append({
            "sensorName": sensor_name,
            "co2": co2,
            "temperature": entry.get('temperature'),
            "relativeHumidity": entry.get('relativeHumidity'),
            "timestamp": datetime.datetime.fromtimestamp(entry.get('timestamp')).isoformat()
        })

    return result

# テスト実行用：このファイルを直接実行したときに動く
if __name__ == "__main__":
    data = get_sensor_data()
    print(json.dumps(data, indent=2, ensure_ascii=False))