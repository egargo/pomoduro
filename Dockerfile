FROM python:3.13.0a3-alpine

WORKDIR /pomoduro

COPY . .

EXPOSE 8000

CMD [ "python3", "-m", "http.server" ]
