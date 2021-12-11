FROM python:3.9.5-slim

WORKDIR /home/app

COPY . /home/app

RUN pip install pipenv
COPY Pipfile Pipfile.lock /home/app/
RUN pipenv install --system --dev && alembic upgrade head

VOLUME [ "/home" ]


EXPOSE 5000
CMD [ "python3", "app.py", "-h", "0.0.0.0" ]