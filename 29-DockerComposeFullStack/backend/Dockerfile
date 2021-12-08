# Pull base image
FROM python:3.7-slim

WORKDIR /code/

RUN apt update
COPY requirements.txt .
RUN pip install --trusted-host pypi.python.org -r requirements.txt

COPY . .

# EXPOSE 5000

# CMD ["uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]