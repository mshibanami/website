---
title: "\"subscriptions:insert\" returns an error"
created_at: 2018-08-23T00:00:00-09:00
kind: article
language: en
---

Today I noticed that the [subscriptions:insert](https://developers.google.com/youtube/v3/docs/subscriptions/insert)method of YouTube Data API V3 returns this error:

```json
{
 "error": {
  "errors": [
   {
    "domain": "youtube.subscription",
    "reason": "publisherNotFound",
    "message": "The resource specified by the requests <code>snippet.resourceId</code> property cannot be found."
   }
  ],
  "code": 404,
  "message": "The resource specified by the requests <code>snippet.resourceId</code> property cannot be found."
 }
}
```

This is the request body that I sent:

```json
{
 "snippet": {
  "resourceId": {
   "channelId": "UCa90xqK2odw1KV5wHU9WRhg"
  }
 }
}
```

The above request was valid before. But now, it seems that we need a `kind`
property for `snippet.resourceId` see below:

```json
{
 "snippet": {
  "resourceId": {
   "channelId": "UCa90xqK2odw1KV5wHU9WRhg",
   "kind": "youtube#channel"
  }
 }
}
```

It would appear that subscribing to channels without this step
is regarded as an invalid request.
