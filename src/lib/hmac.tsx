import Base64 from "crypto-js/enc-base64";
import hmacSHA256 from "crypto-js/hmac-sha256";
import md5 from "crypto-js/md5";

async function signRequest(appKey: string, secretKey: string, request: Request) {
  request = request.clone()
  const secret = Base64.parse.parse(secretKey)
  const method = request.method
  const url = new URL(request.url)
  const target = url.pathname + url.search
  const timestamp = new Date().getTime()
  const nonce = Math.random().toString(36).substring(7)
  const body = await request.text()
  const body_b64 = Base64.stringify(md5(body || ""));
  const message = appKey + method + target + timestamp + nonce + body_b64
  const hmac = hmacSHA256(message, secret)
  const base64hmac = Base64.stringify(hmac)

  request.headers.set("Authentication", `epi-hmac ${appKey}:${timestamp}:${nonce}:${base64hmac}`)
}

async function sendRequest(url: string, method: string, headers: any, body: any) {
  const request = new Request(url, {
    method,
    headers,
    body: JSON.stringify(body),
  })
  
  await signRequest(request, "<appKey>", "<secret>")

  return fetch(request)
}