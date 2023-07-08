- To run the orchestartion:

```docker-compose up --build```

- Please connect to the bash container of the app and run:

```npx sequelize-cli bd:migrate```
```npx sequelize-cli bd:seed"all```

- The app will run in port 3001