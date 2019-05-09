# ZEIT

Install [now CLI](https://github.com/zeit/now-cli)

```bash
npm i -g --unsafe-perm now
```

Login

```bash
now login
```

Add a [secret](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/#securing-environment-variables-using-secrets)

```bash
now secret add pyv-mapbox-api-key INSERT_YOUR_KEY_HERE
```

Assign the secret to an environment variable

```bash
now -e PYV_MAPBOX_API_KEY=@pyv-mapbox-api-key
```
