FROM gcc:latest

WORKDIR /HelloWorld/

COPY . .

RUN gcc -o HelloWorld hello.c
ENTRYPOINT ["./HelloWorld"]


