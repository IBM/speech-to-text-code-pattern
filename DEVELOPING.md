
# Developing

## Directory structure

```none
├── app.js                      // Express routes
├── config                      // Express configuration
├── doc                         // Documentation
├── public                      // Static resources
├── scripts                     // Selenium tests
├── server.js                   // Node.js server entry point
├── src                         // React client
│   └── index.js                // React App entry point
└── test                        // Puppet tests
```

## Running locally for debugging

1. Install the dependencies

   ```bash
   npm install
   ```

1. Build the application

   ```bash
   npm run build
   ```

1. Run the application

   ```bash
   npm run dev
   ```