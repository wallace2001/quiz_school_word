import fireb from 'firebase-admin';
import 'firebase/auth';

export const firebase_DB = fireb.apps.length ? 
    fireb.app() : 
    fireb.initializeApp({
    credential: fireb.credential.cert({
        type: "service_account",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        project_id: 'quiz-b16a3',
        private_key_id: '2718cc9956fea4b4636acdab0994db47ab8997b6',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSmizKC/JuIh7Y\nFM7QxQkOuuofNvZLrbhK6mzScTz74CGb9ZKeihO77B/qOJuDqbMYAANAiY1h3TZM\nuM3dBz/C+fvVCmz+SX03IthP1B9gOpeuqWUoV3kBrjhpsd892tqhk3gmoTJRs8qd\nRTtx6+pYp1OuMrTtBZCXK7SRktWFLJluV63ONgfCYaZggJjuBxRtqY+6ihVZ3TEa\nyG+sFQJ1tfaAGFjV+2Z7pwF8BBGur0ItDE38PxQUWLqVF2c/fsziFxjz9NEKjqZo\n4Klsp8PMKN65HNEYKskCYyWb+XBPmpbarUhSu9hHzu7Zkh5zox3yexRR2vVCziuo\nQYDSCiYVAgMBAAECggEAFnR9Y5KoB/Gn58K6NXzYxSMNXQQreTC95nD95udPiQyi\nEMK7nh9bUM1xrrPX8w8oSx4POrWf50gipsYKny9Lb2LfpNy+d9OGoBcdSM+1g7lj\nnGov4MAI5TK6DZz7UFlSN+mlJTtJRfhdWWz9FF3C6C55J+j8rQwLmW69y0rEbPU9\njgpG7dL2EBHRl8y7WRfzJZqw7+A3TiZLCw5ypwsMOs6vpJZ24c7U9KlgGfWbQt1M\nqrROWHl/qMg8ehhtHAxlbGldtE3k7T0k5o35l09bgudvz57qPVGf9CsL6664S2fN\nuy1Fde15j8XAvx213yFm5Ow/uQ/3d0zD7563U4M2AQKBgQD3gXjoyxk3MbRsE9Xt\n5SRSvZOQNOzY85XfD2PB3sErio74R4EH6uS+4M5xBS+5CZK/hGymnvtkdAGs9KKH\n9CJkr8yMNWEr48kk/cogjogLqg4VijgUurlGIk2SEYQF0PUahp+/5hR95/GFkQIB\nAgWy1X5TTag8k+Z6mALAVBMiAQKBgQDZ1HoiBFWvtgpEUvlyijnNkJ83DL95cHNU\nviNuuaNBYKn1MISmwStq2q4viFfCT+UWvUl+isMlNPvB0ynmNdQF6QvQ+yZmDQ9W\n4I4nS/o6tgXEe4kypxFHKr9cSTuriVl9SBUFFCdd/glWKhx5sqtr45VV7bAT+ndu\nhOoijEBcFQKBgCATEkUw1MK3WUdMRsP+lvd2A+KDSVJQNtLiXq4oHOZ0nVSFh64r\n/ZrS7U3uOyICoJbbJW1uWuvIsNLmHQ37UF21/o8I99/FNDLsBL61WeIRFqQp9lyR\nWiNBnMXaKT7LtofKfHdU7MDoRv9lLFpPFcf4LNfEz5GSJSMsAedEvfoBAoGAR/Wr\nSyWHcP6AMcX/ZdlH8yK9lh/9+Q4u62XMqr1ksypNuxQGHlheEXSgak9uPmDKW1K4\nvrb0dIwmRweNJeHOYw1zu9vb+YaC9L5F97Ffvpl3Gkt9LWCHkq0KfmAq+CXtjDeN\nyhm4T5KmXvKWaZWej4ulP7e/nTn2zmnWNweCE2kCgYB0K3MjsCwx9Yqq/Js2QH+r\nUKv+0ioMMhGUr7BlYu1m/oM5Ixo06di1Vy4Ag60BC7qVAN68JuUY7hrkM5q5Zmpx\ne3Nh/joLz2eL/7aplA4EVyWXtAndEjynRWsdspZMpyCFcR3GFQszxvjLIf/Zs4Vn\np7TOtnAjddwnYDFhLQLZeQ==\n-----END PRIVATE KEY-----\n',
        client_email: 'firebase-adminsdk-zdabj@quiz-b16a3.iam.gserviceaccount.com',
        client_id: '115690865182943201484',
        client_cert: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zdabj%40quiz-b16a3.iam.gserviceaccount.com',
    })
});