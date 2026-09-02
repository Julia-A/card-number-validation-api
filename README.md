# Card Number Validation API

This is a small REST API I built with Express and TypeScript. It accepts a card
number and checks if the number is valid.

## Requirements

- Node.js 20 or newer
- npm

## Getting started

First, install the dependencies:

```bash
npm install
```

The app uses port `3000` by default. If I need a different port, I can copy
`.env.example` to `.env` and change the value there.

## Running the project

For development, I run:

```bash
npm run dev
```

To build the project and start the compiled version, I run:

```bash
npm run build
npm start
```

To run the tests, I use:

```bash
npm test
```

## API endpoint

### Validating a card number

`POST /api/cards/validate`

Request body:

```json
{
  "cardNumber": "4111111111111111"
}
```

If the card number is valid, the response is `200 OK`:

```json
{
  "valid": true
}
```

If the input is a string but the card number does not pass validation, the
response is still `200 OK`, but `valid` is `false`:

```json
{
  "valid": false
}
```

If `cardNumber` is missing, empty, or not a string, the API returns
`400 Bad Request`:

```json
{
  "error": "cardNumber is required"
}
```

## Decisions I made

- I expect the card number to be a string because JavaScript cannot safely store
  every long card number as a number. Using a string also keeps leading zeroes.
- I allow spaces and hyphens because people often type card numbers that way. I
  remove them before doing the checks.
- After removing spaces and hyphens, the value must contain only digits and must
  be between 12 and 19 digits long.
- I use the Luhn algorithm for the final check. The name sounds complicated, but
  it basically doubles every second digit, adds the digits together, and checks
  if the total is divisible by 10.
- I return `200` when a card number fails validation because the request was
  still sent correctly. I use `400` when the actual input is missing or has the
  wrong type.

This API only checks the number's format and checksum. It cannot tell if the
card was actually issued, is active, or has money in the account.

## Project structure

```text
src/
  controllers/  Handles requests and responses
  routes/       Defines API routes
  services/     Contains the card validation logic
  app.ts        Configures the Express application
  server.ts     Starts the HTTP server
tests/          Tests for the card validation logic
```
