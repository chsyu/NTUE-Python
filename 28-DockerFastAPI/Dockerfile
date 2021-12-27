FROM python:3.10.1-slim

WORKDIR /code

COPY . .
RUN pip install -r requirements.txt && \
    alembic upgrade head


EXPOSE 5000
CMD [ "python", "app.py"]

