---
title: Error Domain=CNErrorDomain Code=2 "(null)"
---

> fatal error: 'try!' expression unexpectedly raised an error: Error Domain=CNErrorDomain Code=2 "(null)": file /Library/Caches/com.apple.xbs/Sources/swiftlang/swiftlang-900.0.59/src/swift/stdlib/public/core/ErrorType.swift, line 181
> 2017-08-28 15:51:15.417855+0900 iOSNativeContactsDemo[46331:1865065] fatal error: 'try!' expression unexpectedly raised an error: Error Domain=CNErrorDomain Code=2 "(null)": file /Library/Caches/com.apple.xbs/Sources/swiftlang/swiftlang-900.0.59/src/swift/stdlib/public/core/ErrorType.swift, line 181

I got this error when I execute the following from [the documentation of Contacts.Framework](https://developer.apple.com/documentation/contacts?changes=latest_major):

```swift
import Contacts

// Creating a mutable object to add to the contact
let contact = CNMutableContact()

contact.imageData = NSData() // The profile picture as a NSData object

contact.givenName = "John"
contact.familyName = "Appleseed"

let homeEmail = CNLabeledValue(label:CNLabelHome, value:"john@example.com")
let workEmail = CNLabeledValue(label:CNLabelWork, value:"j.appleseed@icloud.com")
contact.emailAddresses = [homeEmail, workEmail]

contact.phoneNumbers = [CNLabeledValue(
    label:CNLabelPhoneNumberiPhone,
    value:CNPhoneNumber(stringValue:"(408) 555-0126"))]

let homeAddress = CNMutablePostalAddress()
homeAddress.street = "1 Infinite Loop"
homeAddress.city = "Cupertino"
homeAddress.state = "CA"
homeAddress.postalCode = "95014"
contact.postalAddresses = [CNLabeledValue(label:CNLabelHome, value:homeAddress)]

let birthday = NSDateComponents()
birthday.day = 1
birthday.month = 4
birthday.year = 1988  // You can omit the year value for a yearless birthday
contact.birthday = birthday

// Saving the newly created contact
let store = CNContactStore()
let saveRequest = CNSaveRequest()
saveRequest.addContact(contact, toContainerWithIdentifier:nil)
try! store.executeSaveRequest(saveRequest)
```

```swift
contact.imageData = NSData() // The profile picture as a NSData object
```

This was the problem for me.
