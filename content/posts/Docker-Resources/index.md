---
title: 'Docker Resources'
slug: docker-resources
date: 2019-03-07
language: english
category: Others
tags:
  - Docker
published: true
description: "I listed awesome learning resources for Docker in this post. I'll keep adding more and more resources as I learn more about Docker. "
---

# Great Resources

# Great introductory posts about Docker

- [Docker 101: Fundamentals & The Dockerfile – Paige Niedringhaus – Medium](https://medium.com/@paigen11/docker-101-fundamentals-the-dockerfile-b33b59d0f14b)
- [Docker 102: Docker-Compose – Paige Niedringhaus – Medium](https://medium.com/@paigen11/docker-102-docker-compose-6bec46f18a0e)
- [Dockerfile Explained](https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images)

# Official docker documents

- [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Dockerfile Documentation](https://docs.docker.com/engine/reference/builder/)
- [Docker CLI Documentation](https://docs.docker.com/engine/reference/run/)
- [Docker Compose Documentation](https://docs.docker.com/compose/overview/)

# Docker Commands

- `docker images` – Check the images on your system.
- `docker ps` – Check a list of your running containers.
- `docker search <image>` – Searching an image in the Docker Hub.
- `docker run` – Runs a command in a new container.
- `docker start` – Starts one or more stopped containers
- `docker stop` – Stops one or more running containers
- `docker build` – Builds an image form a Docker file
- `docker pull` – Pulls an image or a repository from a registry
- `docker push` – Pushes an image or a repository to a registry
- `docker export` – Exports a container’s filesystem as a tar archive
- `docker exec` – Runs a command in a run-time container
- `docker search` – Searches the Docker Hub for images
- `docker attach` – Attaches to a running container
- `docker commit` – Creates a new image from a container’s changes
- `docker rmi -f $(docker images -q)` – Delete all the existing images on your system. (`-f` is the `force` option.)
- `docker image rm [OPTIONS] IMAGE [IMAGE...]` - Delete specific images.
- `docker prune` - Remove unused data

- [A Guide to Docker Commands with Examples](https://afourtech.com/guide-docker-commands-examples/)
- [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/)
- [Docker Base Commands](https://docs.docker.com/engine/reference/commandline/docker/)
- [How To Remove Docker Images, Containers, and Volumes](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes)
- [How to remove old and unused Docker images - Stack Overflow](https://stackoverflow.com/questions/32723111/how-to-remove-old-and-unused-docker-images)

# Docker Compose commands

- `docker-compose ps` — lists all the services in a network.
- `docker-compose build` — generates any needed images from custom Dockerfiles. It will not pull images from the Docker hub, only generate custom images.
- `docker-compose up` — brings up the network for the services to run in
- `docker-compose stop` — stops the network and saves the state of all the services
- `docker-compose start` — restarts the services and brings them back up with the state they had when they were stopped
- `docker-compose down` — burns the entire Docker network with fire. The network and all the services contained within are totally destroyed. (edited)

### Other commands

- [docker-compose コマンドまとめ](https://qiita.com/wasanx25/items/d47caf37b79e855af95f)
- [Overview of docker-compose CLI | Docker Documentation](https://docs.docker.com/compose/reference/overview/)

# Docker for rails applications

- [Quickstart: Compose and Rails \| Docker Documentation](https://docs.docker.com/compose/rails/)
- [Developing a Ruby on Rails app with Docker Compose – FireHydrant – Medium](https://medium.com/firehydrant-io/developing-a-ruby-on-rails-app-with-docker-compose-d75b20334634)
- [GitHub - K-Sato1995/docker_practice](https://github.com/K-Sato1995/docker_practice)

# Small gotchas

## Image and Container

- An `image` is an executable package that includes everything needed to run an application--the code, a runtime, libraries, environment variables, and configuration files. (you can create an image from a `Dockerfile` by running `docker build`).
- A`container` is a runtime instance of an image. A `container` is launched by running an image.

## docker `build`

`docker build -t container_name` would make a tag which you can use to refer to the container.

## docker-compose `ports`

```yml
ports:
  - '4000:80'
```

means you are mapping your **machine’s port 4000** to the **container’s published port 80**.

## `apk` command in Dockerfile.

- [Alpine Linux package management](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management)

## docker-compose `volumes`

- [Understanding Volumes in Docker](https://container-solutions.com/understanding-volumes-docker/)
- [docker-compose.yml の volumes って何してるの？](https://www.nyamucoro.com/entry/2018/08/13/222617)
- [Docker Volumes and Networks with Compose](https://www.linux.com/learn/docker-volumes-and-networks-compose)

**Main uses of volumes**

- (1) Immediate reflection of changes that are made in mounted files.
- (2) The other use of volumes in Docker is for persistent data

**Mounting files.**

```yml
volumes:
  - ./:/app
```

means to mount the current local directory (./) into the container's /app directory.

**Data persistance**

We can create a Docker volume and mount it in `/var/lib/mysql` of the database container. The life of this volume would be totally separate from the container lifecycle.  
Compose can help us with managing these so-called `named volumes`.  
They need to be defined under the `volumes` key in a compose file and can be used in a service definition.

```yml
version: "2"
services:
  mysql:
    image: mysql
    container_name: mysql
    volumes:
      - mysql:/var/lib/mysql
---
volumes: mysql:
```

## .dockerignore

- [.dockerignore アンチパターン](https://qiita.com/munisystem/items/b0f08b28e8cc26132212)

## docker-compose `down` vs `stop` & `up` vs `start`

- [Docker Tip #45: Docker Compose Stop vs Down](https://nickjanetakis.com/blog/docker-tip-45-docker-compose-stop-vs-down)

## Run shell commands in containers

- [Run bash or any command in a Docker container](https://medium.com/the-code-review/run-bash-or-any-command-in-a-docker-container-9a1e7f0ec204)

## Networking in Compose

- [Docker Official: Networking in Compose](https://docs.docker.com/compose/networking/)
- [Stackoverflow: docker-compose make requests between containers](https://stackoverflow.com/questions/52010778/docker-compose-make-requests-between-containers)

## docker-compose up for only certain containers

- [docker-compose up for only certain containers](https://stackoverflow.com/questions/30233105/docker-compose-up-for-only-certain-containers)

## Syntax of RUN in Dockerfile

In the shell form you can use a `\ (backslash)` to continue a single `RUN` instruction onto the next line. For example, consider these two lines.

```sh
RUN /bin/bash -c 'source $HOME/.bashrc; \
echo $HOME'
```

Together they are equivalent to this single line:

```sh
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
```

- [Dockerfile reference (RUN)](https://docs.docker.com/engine/reference/builder/#run)

## Using attach

Use docker attach to attach your terminal’s standard input, output, and error (or any combination of the three) to a running container using the container’s ID or name.

```
$ docker attach <container_name/container_id>
$(docker-compose ps -q your-service)
```

## Mount node_modules

I'll leave an answer I found on StackOverflow here.

> This happens because you have added your worker directory as a volume to your docker-compose.yml, as the volume is not mounted during the build.

> When docker builds the image, the node_modules directory is created within the worker directory, and all the dependencies are installed there. Then on runtime the worker directory from outside docker is mounted into the docker instance (which does not have the installed node_modules), hiding the node_modules you just installed. You can verify this by removing the mounted volume from your docker-compose.yml.

> A workaround is to use a data volume to store all the node_modules, as data volumes copy in the data from the built docker image before the worker directory is mounted. This can be done in the docker-compose.yml like this:

```yml
redis:
  image: redis
worker:
  build: ./worker
  command: npm start
  ports:
    - '9730:9730'
  volumes:
    - worker/:/worker/
    - /worker/node_modules
  links:
    - redis
```

> I'm not entirely certain whether this imposes any issues for the portability of the image, but as it seems you are primarily using docker to provide a runtime environment, this should not be an issue.

- [node.js - Docker-compose: node_modules not present in a volume after npm install succeeds - Stack Overflow](https://stackoverflow.com/questions/30043872/docker-compose-node-modules-not-present-in-a-volume-after-npm-install-succeeds)

## Execute shell commands in containers

```
// Show the existing containers
$ docker-compose ps

// Execute the command the below with the container's name you want to run the shell commands in.
$ docker exec -i -t CONTAINER_NAME /bin/sh
```

# Use binding pry in a docker container

- [Using pry-rails with Docker · GitHub](https://gist.github.com/briankung/ebfb567d149209d2d308576a6a34e5d8)

# Get into a running container

```
$ docker-compose run container-name bash
```

# Edit files in a docker container

```
$ docker exec -u 0 -it <container_name> bash
$ apt-get update
$ apt-get install vim // Install the editor
```

Or use the following Dockerfile:

```
FROM  confluent/postgres-bw:0.1

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
```

- [How to run vi on docker container?](https://stackoverflow.com/questions/30853247/how-do-i-edit-a-file-after-i-shell-to-a-docker-container)
