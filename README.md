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
service:
  bridge:
    id: webhook_bridge_service
    hash: wbs_hash
  server:
    logger:
      logs_path: /path/to/webhook-receiver-service/logs/
      error_log_file: error.log
      combined_log_file: combined.log
    port: 9000
  triggers:
    example:
      shell: '"./path/to/shell-script"'
```

### custom default.yml example

```yaml
service:
  bridge:
    id: webhook_bridge_service
    hash: wbs_hash
  server:
    logger:
      logs_path: /home/server_user/webhook-receiver-service/logs/
      error_log_file: error.log
      combined_log_file: combined.log
    port: 9000
  triggers:
    deploy:
      shell: '"./deploy.sh"'
    update:
      shell: '"./update.sh"'

```

## credits

- config
- express
- winston
