# Weather Report
Weather Report is a python project to fetch the current weather data and forecast weather data from Open Weather Map and to display its various parameters.

## Installation
1. Initial Setup
```
mkdir Project
cd Project
virtualenv --no-site-packages .
source bin/activate
```
2. Clone the repository
```
git clone https://github.com/priyankajain18/weather_report.git
cd weather_report/
pip install -r requirements.txt
```
3. Database setup
```
settings.py
------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': database_name,
        'USER': user,
        'PASSWORD': password,
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

mysql -uuser -ppassword -h localhost database_name < weather.sql
```
4. Set SECRET_KEY
```
SECRET_KEY = your_secret_key
```
5. Set API_KEY
```
API_KEY = your_api_key
```
6. Collect static files
```
python manage.py collectstatic
```
7. Start server
```
python manage.py runserver
Access http://127.0.0.1:8000/weather-report/
```
## Screenshots
![Current Weather Screenshot](https://github.com/priyankajain18/weather_report/blob/master/screenshots/screenshot1.png)
![Weather Parameters Chart Screenshot](https://github.com/priyankajain18/weather_report/blob/master/screenshots/screenshot2.png)
![Filtered Weather Forecast Data Screenshot](https://github.com/priyankajain18/weather_report/blob/master/screenshots/screenshot3.png)
![Add Weather Station Screenshot](https://github.com/priyankajain18/weather_report/blob/master/screenshots/screenshot4.png)
