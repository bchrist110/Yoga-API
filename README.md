# Yoga Roulette

Website: https://yogaroulette-bchrist110.vercel.app/

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
