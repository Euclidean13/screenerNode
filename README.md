# ScreenerNode

Automated analyst where the user could upload the companies they were currently considering to invest in (a.k.a, their
deal flow or pipeline). This API provides statistical data of these companies cross-referenced with the investment
criteria stipulated by the user.

## DataBase

<span style="color:orange">Firebase</span> has been used as the database in this project for convenience and speed,
using Firestore as the store of NoSql database.

[firebase](https://firebase.google.com/)

[firebase console](https://console.firebase.google.com/u/0/)

## Endpoints

The basic endpoint paths are as follows. <span style="color:red">Important!</span> Parameters and bodies are not
included. For more information, see the swagger API.

### Crud controller

```console
http://localhost:8080/createUser
```

```console
http://localhost:8080/deleteUser
```

```console
http://localhost:8080/getUser
```

```console
http://localhost:8080/updateUser
```

### Criteria controller

```console
http://localhost:8080/addCriteria
```

```console
http://localhost:8080/deleteCriteria
```

```console
http://localhost:8080/userCriteria
```

### Investment controller

```console
http://localhost:8080/addUserCompany
```

```console
http://localhost:8080/decision
```

```console
http://localhost:8080/getUserCompaniesFunnel
```

```console
http://localhost:8080/updateCompanyHaves
```

```console
http://localhost:8080/userCompanies
```

```console
http://localhost:8080/userCompanyDetails
```

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
