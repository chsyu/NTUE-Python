# Pull base image
FROM python:3.10.1-slim

WORKDIR /code/

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .