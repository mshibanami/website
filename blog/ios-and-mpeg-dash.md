---
title: iOS and MPEG-DASH
createdAt: "2015-11-01"
language: en
---

The other day, I created a YouTube app for iOS.
And I tried to get my app to play 1080p videos from YouTube.
But it was not easy.

YouTube does not provide 1080p or higher resolution videos in the HLS format.
Currently, They only provide it in the MPEG-DASH format.
But iOS does not support MPEG-DASH, only HLS.

I tried to find a third party library. But I couldn't find any good ones.

So I sent a feature request to enable support from MPEG-DASH to Apple a year ago.
And finally, I got the answer from them yesterday.

```none
Hi Manabu,
This is a courtesy email regarding Bug ID# 19279150.
Engineering has the following feedback for you:
We checked with YouTube and this was their response:
“If the content is available in 1080p in DASH, it should be available in 1080p in HLS, both in the YouTube native app, and also via the HLS experiment Safari”
So, this is something we have no plans to address as the entire YouTube DASH-encoded catalog is also available on iOS.
We are now closing this bug report.
```

But actually, It looks like 1080p videos in the HLS are not available.

It probably means YouTube is preparing for 1080p HLS videos now.
I hope that day will soon come.
