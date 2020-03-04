---
title: 'JWT explained'
slug: jwt-explained
date: 2019-10-22
language: english
category: Others
tags:
  - JWT
published: true
description: 'What are JSON web tokens (JWT) and how are they used??'
---

# How it's used

The server generates a token that certifies the user identity, and sends it to the client.

The client will send the token back to the server for every subsequent request, so the server knows the request comes from a particular identity.

Here is an example with the authorization server.

![image](https://user-images.githubusercontent.com/32632542/67341736-5c476780-f56b-11e9-9906-0dd6fdfe6182.png)

# JWT consists of 3 parts

A JSON Web Token(JWT) consists of three parts: Header, Payload and Signature.

## Header

The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

## Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data.

```
{
  "name": "John Doe",
  "email": "john@johndoe.com",
  "admin": true
}
```

## Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret_key)
```

## Putting them all together

The output is three Base64-URL strings(header, payload, signature) separated by dots.

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiSldUIFJ1bGVzISIsImlhdCI6MTQ1OTQ0ODExOSwiZXhwIjoxNDU5NDU0NTE5fQ.-yIVBD5b73C75osbmwwshQNRC7frWUYrqaTjTpza2y4
```

Another example.

```
value = base64url(header) + "." + base64url(payload) + "."
signature = hash256(value, secret_key);
JWT = header + claims + signature
```

# JWT is encoded but not encrypted

A JWT is cryptographically signed (but not encrypted, hence using HTTPS is mandatory when storing user data in the JWT), so there is a guarantee we can trust it when we receive it, as no middleman can intercept and modify it, or the data it holds, without invalidating it.

# References

- [JSON Web Token を完全に理解する - Qiita](https://qiita.com/k_k_hogetaro/items/0c97f42ecb8207767db2)
- [JSON Web Token Introduction - jwt.io](https://jwt.io/introduction/)
- [JSON Web Token (JWT) explained](https://flaviocopes.com/jwt/)
- [JSON Web Token の効用 - Qiita](https://qiita.com/kaiinui/items/21ec7cc8a1130a1a103a)
