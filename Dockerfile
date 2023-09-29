FROM python:3.10-alpine

WORKDIR /pomoduro

COPY . .

EXPOSE 8000

CMD [ "python3", "-m", "http.server" ]
