# Product Service

## Service Plan Diagram

![image](assets/product-service-plan.png)

## Run MongoDb locally

Spin up docker container using docker-compose:

```
docker-compose up -d
```

Exec into the container:

```
docker exec -it <containername> bash
```

Container can be found by running `docker ps -a`

Once inside the container, launch mongodb by running:

```
mongo admin -u root -p rootpassword
```
