---
title: "Firebase+React+Railsでの認証の流れ"
slug: firebase-react-rails
date: 2019-12-10
language: japanese
category: Rails
tags:
  - Rails
  - JWT
  - Firebase
published: true
description: "Firebase+React+Railsでの認証の流れまとめ。"
---
# 認証流れ整理

```
(1) クライアントでEmail, Passwrordを入力し、Firebaseでユーザー検証 (Email, Passwordが違ったらログインできない)
→
(2) Email, PasswordがOKならTokenがFirebaseから渡される。
(この時点でアプリケーションはユーザーが存在する事を保証)
→
(3) 受け取ったTokenと共にリクエストをRailsに送る。
→
(4) RailsでTokenの検証(受け取ったTokenが変更されてないか検証)
(JWTのヘッダー、ペイロードが改変されていると、発行元Firebaseの署名と不一致になる)
= 
!!! Tokenが正しい秘密鍵から作られているか公開鍵で検証(この場合はFirebaseの秘密鍵から作られたTokenか、Firebaseの公開鍵から検証) !!
```

# Firebaseから受け取るトークンの検証
RubyはFirebaseの公式AdminSDKが存在しないので、下記の記事内のような方法でトークンの検証を行う。
記事を見ればわかるが、トークンの検証方法自体はそこまで複雑ではない。

[RubyでFirebaseのidトークンを認証に使ってみる - Qiita](https://qiita.com/otakky/items/b7582202f5cde8f2dd21)

ちなみに公式AdminSDK(Node)の認証箇所は下記。

https://github.com/firebase/firebase-admin-node/blob/master/src/auth/auth.ts

```ruby
require 'jwt'
require 'yaml'

module FirebaseUtils
  CONFIG = YAML.load_file("firebase_config.yml")

  module Auth
    ALGORITHM = 'RS256'
    ISSUER_BASE_URL = 'https://securetoken.google.com/'
    CLIENT_CERT_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
    class << self
      def verify_id_token(token)
        raise 'id token must be a String' unless token.is_a?(String)

        full_decoded_token = _decode_token(token)

        err_msg = _validate_jwt(full_decoded_token)
        raise err_msg if err_msg

        public_key = _fetch_public_keys[full_decoded_token[:header]['kid']]
        unless public_key
          raise 'Firebase ID token has "kid" claim which does not correspond to ' +
            'a known public key. Most likely the ID token is expired, so get a fresh token from your client ' +
            'app and try again.'
        end

        certificate = OpenSSL::X509::Certificate.new(public_key)
        decoded_token = _decode_token(token, certificate.public_key, true, { algorithm: ALGORITHM, verify_iat: true })

        {
          'uid' => decoded_token[:payload]['sub'],
          'decoded_token' => decoded_token
        }
      end

      private
      def _decode_token(token, key=nil, verify=false, options={})
        begin
          decoded_token = JWT.decode(token, key, verify, options)
        rescue JWT::ExpiredSignature => e
          raise 'Firebase ID token has expired. Get a fresh token from your client app and try again.'
        rescue => e
          raise "Firebase ID token has invalid signature. #{e.message}"
        end

        {
          payload: decoded_token[0],
          header: decoded_token[1]
        }
      end

      def _fetch_public_keys
        uri = URI.parse(CLIENT_CERT_URL)
        https = Net::HTTP.new(uri.host, uri.port)
        https.use_ssl = true

        res = https.start {
          https.get(uri.request_uri)
        }
        data = JSON.parse(res.body)

        if (data['error']) then
          msg = 'Error fetching public keys for Google certs: ' + data['error']
          msg += " (#{res['error_description']})" if (data['error_description'])

          raise msg
        end

        data
      end

      def _validate_jwt(json)
        project_id = FirebaseUtils::CONFIG[:project_info][:project_id]
        payload = json[:payload]
        header = json[:header]

        return 'Firebase ID token has no "kid" claim.' unless header['kid']
        return "Firebase ID token has incorrect algorithm. Expected \"#{ALGORITHM}\" but got \"#{header['alg']}\"." unless header['alg'] == ALGORITHM
        return "Firebase ID token has incorrect \"aud\" (audience) claim. Expected \"#{project_id}\" but got \"#{payload['aud']}\"." unless payload['aud'] == project_id

        issuer = ISSUER_BASE_URL + project_id
        return "Firebase ID token has incorrect \"iss\" (issuer) claim. Expected \"#{issuer}\" but got \"#{payload['iss']}\"."  unless payload['iss'] == issuer

        return 'Firebase ID token has no "sub" (subject) claim.' unless payload['sub'].is_a?(String)
        return 'Firebase ID token has an empty string "sub" (subject) claim.'  if payload['sub'].empty?
        return 'Firebase ID token has "sub" (subject) claim longer than 128 characters.' if payload['sub'].size > 128

        nil
      end
    end
  end
end
```

# 参考

- [Nuxt.js + GraphQL + Ruby on Railsで作ったアプリにJWT認証を追加する方法 - Qiita](https://qiita.com/Y_uuu/items/96f85682625fb5f35760)
- [RubyでFirebaseのidトークンを認証に使ってみる - Qiita](https://qiita.com/otakky/items/b7582202f5cde8f2dd21)
