# Pull base image
FROM python:3.7

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code/

# Install dependencies
# RUN pip install pipenv
# COPY Pipfile Pipfile.lock /code/
# RUN pipenv install --system --dev

ADD requirements.txt .
RUN pip install --trusted-host pypi.python.org -r requirements.txt

COPY . /code/

EXPOSE 5000

# CMD ["uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]