# ScreenerNode

## Docker

The Dockerfile with one stage (build + run) in alpine distribution.
Run the following commands to launch local container.

```console
docker build -t screenernode .
```

For building a container for local testing purposes.

```console
docker run -p 6060:6060 --rm -it screenernode:latest
```
