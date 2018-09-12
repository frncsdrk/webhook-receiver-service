webhook-receiver-service
===

a node.js service to execute configured tasks when triggered by webhook-bridge-service

## usage

## routes

### /trigger

POST - trigger action

req

- query
  - id - action configuration identifier
  - hash - for some mild security

### /status

GET - service status

res

- {string} - message

## configuration

Configuration of this service is handled by `config`

### default.yml

```yaml
```

### custom default.yml example

## credits

- config
- express
- winston
