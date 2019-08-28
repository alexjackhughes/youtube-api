# YOUTUBE API

_Expose an API endpoint, that when hit will store youtube video titles and **publishedAt** dates for the **GlobalCyclingNetwork** and **globalmtb** YouTube channels to a database. We only want to store videos that match the filter criteria_

This API is built with Node/Express + Amazon's RDS (running MySQL) for the database.

## Getting Started

After installing the dependencies `npm install` in _root_, you can run the application from the console using:

```
npm start
```

The **Backend API** will be available on:
[localhost:5000](http://localhost:5000/ "http://localhost:5000/")

## Documentation

**GET**

```
GET /youtube
```

_Fetch any YouTube videos meta data that has been stored._

```
GET /youtube/:id
```

_Fetch any YouTube video by it's ID._

```
GET /youtube/search/:search
```

_Fetch all videos that match the provided search query._

**POST**

```
POST /youtube
```

_Finds and stores the titles and publishedAt for the YouTube channels GlobalCyclingNetwork and globalmtb._

**DELETE**

```
DELETE /youtube/:id
```

_Finds and deletes a YouTube video's meta data by it's id._

## Author

#### **Alexander Jack Hughes**

[@alexjackhughes](https://twitter.com/alexjackhughes "Twitter")
