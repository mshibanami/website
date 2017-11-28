---
title: About Memory Leaks of Xamarin
created_at: 2015-11-01T00:00:00-09:00
kind: article
---
## How to find Memory leaks

If `Dispose()` of a instance should be called but not, then it's leaked.
Putting a breakpoint or `Console.WriteLine()` in the overrided `Dispose()` helps you to find them.

ProTip: Maybe you can find them with Xamarin Profiler.
But it's only available for users who have a
Visual Studio Enterprise subscription.
It's about 3000 USD...

## DON'T USE `+=` & `-=`!! IT IS A SOURCE OF MEMORY LEAKS!!

E.g. this causes memory leaks:

```csharp
button.TouchUpInside += (sender, e) => { ... }
```

Too easy. Too nightmare...

It doesn't avoid even if you removed `this` inside the closure.

The reason why this happens is that C# doesn't have
the Capture List for a closure like Swift.

### Workaround1: Use native style

```csharp
void SetupDismissButton()
{
    var button = new UIButton();
    button.SetTitle("Dismiss", UIControlState.Normal);
    button.AddGestureRecognizer(new UITapGestureRecognizer(this, new Selector("DidTapDismissButton:")));
}

[Export("DidTapButton:")]
protected void DidTapDismissButton(UIGestureRecognizer sender)
{
    DismissViewControllerAsync(true);
    Console.WriteLine("PlayerViewController dismissed.");
}
```

Boring. But it doesn't leak.

### Workaround2: Rx

```csharp
MyObservableVariable
    .Subscribe(so => {
        Debug.WriteLine($"MyObservableVariable: \(MyObservableVariable)");
    })
    .AddTo(DisposablePool);
```

But if you want to use `this` in `Subscribe()`

```csharp
var weakReference = new WeakReference<ClassOfThis>(this);

MyObservableVariable
    .Subscribe(so => {
        var weakThis = weakReference.Resolve();
        if (weakThis == null) { return; }

        weakThis.MyProperty.Clear();
    })
    .AddTo(DisposablePool);
```

(I and my coworkers use `weakSelf` or `weakThis`. `weakSelf`
I don't know which one is the best.
I just want to use @weakify() @strongify() of ReactiveCocoa.)

What the hell. But I don't know other solution.

I have not tried but maybe you can implement helper method to do it
`weakify`/`strongify` of ReactiveCocoa.

I wish I can do like this type-safely.:

```csharp
var weakReference = new WeakReference<ClassOfThis>(this);

MyObservableVariable
    .Subscribe(so => { [weak this]
        this?.MyProperty.Clear();
    })
    .AddTo(DisposablePool);
```
