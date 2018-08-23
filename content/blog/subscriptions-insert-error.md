---
title: "\"subscriptions:insert\" returns an error"
created_at: 2018-08-23T00:00:00-09:00
kind: article
language: en
---

Today I noticed that [subscriptions:insert](https://developers.google.com/youtube/v3/docs/subscriptions/insert) of YouTube Data API V3 returns an error like this:

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

A Request body that I sent was here:

```json
{
 "snippet": {
  "resourceId": {
   "channelId": "UCa90xqK2odw1KV5wHU9WRhg"
  }
 }
}
```

The above request was valid before. But now, we need a `kind` property for `snippet.resourceId`, like this:

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

It seems that the subscribing to channels without it has been regarded as an invalid request.
