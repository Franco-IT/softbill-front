# Softbill - FRONT

## Required versions

| Engines | Min Version   |
|---------|---------------|
| NodeJs  | 20.11.0       |
| ReactJs | 18.2.0        |
| NextJs  | 13.3.2        |
| NPM     | 10.2.4        |

# Auth Structure

...

# Environment Variables

Ensure that you set up your environment variables correctly. An example `.env.example` file is provided with the following environment variables:

```plaintext
## Database
API_URL= your_api_url
NEXT_PUBLIC_API_KEY= your_api_key
API_URL= your_api_url
NEXT_PUBLIC_API_URL= your_api_url

## CryptJS
NEXT_PUBLIC_CRYPTO_KEY= your_crypto_key

## React Image Crop
NEXT_PUBLIC_ASPECT_RATIO= your_aspect_ratio
NEXT_PUBLIC_MIN_CROP_DIMENSION= your_min_crop_dimension
NEXT_PUBLIC_MAX_DIMENSION= your_max_dimension
NEXT_PUBLIC_MIN_DIMENSION= your_min_dimension

```

# Running the Project Locally

To run the Next.js project, ensure you have Node.js and NPM installed on your system. Below are the steps to execute various commands for running and building the project.

1. **Install Dependencies**: Open a terminal window and navigate to the project directory. Run the following command to install all the necessary dependencies:

   ```bash
   npm install
   ```

2. **Start Development Server**: Once the dependencies are installed, you can start the development server using the following command:

   ```bash
   npm run dev
   ```

   This command will start a local development server at `http://localhost:3000`, where you can preview your Next.js application.

### Building the Project

To create a production-ready build of your Next.js project, follow these steps:

1. **Build the Project**: Execute the following command to build the project:

   ```bash
   npm run build
   ```

   This command will generate an optimized production build of your application.

2. **Start Production Server**: After the build process is complete, you can start a production server to serve the built files:

   ```bash
   npm start
   ```

   This will start a server hosting your production build.
