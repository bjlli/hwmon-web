# app.py

from flask import Flask, render_template, jsonify

app = Flask(__name__, static_folder='assets')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/read_hwmon_data')
def read_hwmon_data():
    try:
        with open('/sys/class/hwmon/hwmon1/curr1_input', 'r') as file:
            content = file.read().strip()

        return jsonify(content)
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)



