# Vacation Now

Proxy server for Vacation Now, a vacation rental booking website.

## Related Projects

  - https://github.com/HRR47-SDC-Burke/carousel-service
  - https://github.com/HRR47-SDC-Burke/booking-service
  - https://github.com/HRR47-SDC-Burke/reviews-service
  - https://github.com/HRR47-SDC-Burke/moreplacestostay-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

A proxy server for Vacation Now, a vacation rental booking website. Once the server is running, directing the browser to http://localhost:3000/:id will render location data for the associated id. 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- Express

Please clone all repos listed under Related Projects and follow each ReadMe carefully before running the proxy server.

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## Running the Proxy

Once all services are ready and databases and servers are up an running, from within the root directory:

```sh
npm start
```

Direct the browser to http://localhost:3000/:id, passing in 1, 2, or 3 to see data associated with the particular location id. 
