# Yoga Roulette API

A REST API for the Yoga Roulette application that provides yoga pose sequences and practice generation.

Website: https://yogaroulette-bchrist110.vercel.app/

## Deployment

### Render Deployment

This API is configured for deployment on Render.com.

#### Method 1: Using render.yaml (Recommended)
1. Fork this repository
2. Connect your GitHub account to Render
3. Create a new "Blueprint" service in Render
4. Connect your forked repository
5. Render will automatically detect the `render.yaml` file and set up both the web service and PostgreSQL database

#### Method 2: Manual Setup
1. Create a new PostgreSQL database on Render
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set the following environment variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: (provided by your Render PostgreSQL database)
5. Set build command: `npm install`
6. Set start command: `npm start`

### Environment Variables

Copy `.env.example` to `.env` for local development:
```bash
cp .env.example .env
```

Required environment variables:
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 8000)
- `DATABASE_URL`: PostgreSQL connection string

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables in `.env`

3. Run database migrations:
```bash
npm run migrate
```

4. Start the development server:
```bash
npm run dev
```

## Api Documentation
### Last

```
Url : /api/lastfive
Methods: GET | POST
Data Paramaters (for POST): "ordersitting" and "orderstanding"
Success Response for GET:
  -Code: 200
  -Content: JSON of all lastfive data
Error Response for GET:
  -Code: 500
  -Content: { error: { message: 'server error' } }
Success Response for POST: 
  -Code: 201
  -Content: {id:1, ordersitting: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", orderstanding: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"} (just a sample response body)
Error Response for POST:
  -Code: 400
  -Content: {error: { message: `Missing '${key}' in request body` }
Sample Call:
  Get:    $.ajax({
            url: "/api/lastfive",
            dataType: "json",
            type : "GET",
            success : function(r) {
              console.log(r);
            }
          });
  Post:   $.ajax({
            url: "/api/lastfive",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({"ordersitting": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", "orderstanding": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"})
            success : function(r) {
              console.log(r);
            }
          });
```
          
### Sitting
```
Url : /api/sitting
Methods: GET
Success Response for GET:
  -Code: 200
  -Content: JSON of all sitting data
Error Response for GET:
  -Code: 500
  -Content: { error: { message: 'server error' } }
Sample Call:
  Get:    $.ajax({
            url: "/api/lastfive",
            dataType: "json",
            type : "GET",
            success : function(r) {
              console.log(r);
            }
          });
```
### Standing
```
Url : /api/standing
Methods: GET
Success Response for GET:
  -Code: 200
  -Content: JSON of all standing data
Error Response for GET:
  -Code: 500
  -Content: { error: { message: 'server error' } }
Sample Call:
  Get:    $.ajax({
            url: "/api/standing",
            dataType: "json",
            type : "GET",
            success : function(r) {
              console.log(r);
            }
          });
```
![Screenshot (27)](https://user-images.githubusercontent.com/70658734/113909850-041b1a00-978d-11eb-86a9-1f8f6d97957c.png)

### Summary

-Yoga Roulette is a random yoga practice generator. You can either select a random practice or a recently liked practice. The practice can either be 10, 20, or 30 minutes. The practice will be half standing poses and half sitting poses.

### Technologies Used

-React.js
-Javascript
-Node.js
-PostgreSQL
-HTML5
-CSS3
-Express
