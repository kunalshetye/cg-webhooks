'use client';
import { useState } from "react";
import { sendRequest } from "../lib/hmac";

// @ts-ignore
export default function Settings({ url, setUrl, appKey, setAppKey, appSecret, setAppSecret, webhookHandler }){
    const [addWebhookUrl, setAddWebhookUrl] = useState("");
    const [addMethod, setAddMethod] = useState("POST");
    const [addHeaders, setAddHeaders] = useState({});

    const handleListWebhooks = async function(){
        sendRequest(url, appKey, appSecret, "GET")
        .then((res) => {
            console.log(res);
            return res.json()
        })
        .then((data) => {
            webhookHandler(data);
        })
    };

    const handleRegisterWebhook = async function(){
      const hook = {
        request:{
          url: addWebhookUrl,
          method: addMethod,
          //headers: {}
        }
      };

      sendRequest(url, appKey, appSecret, "POST", {}, hook)
      .then((res) => {
          console.log(`res.status: ${res.status}`);
          handleListWebhooks();
      });
    }

    return(
      <>
      <div className="flex flex-col m-4 md:flex-row md:space-x-8">
          <div className="m-2">
            <label htmlFor="url" className="block font-medium text-gray-700 mb-3">
              URL
            </label>

            <input
              type="text"
              id="url"
              className="h-10 w-96 rounded-md border-2 border-purple-400 shadow focus:shadow-xl"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <div className="m-2">
            <label htmlFor="appkey" className="block font-medium text-gray-700 mb-3">
              AppKey
            </label>

            <input
              type="text"
              id="appkey"
              className="h-10 w-96 rounded-md border-2 border-purple-400 shadow focus:shadow-xl"
              onChange={(e) => setAppKey(e.target.value)}
              value={appKey}
            />
          </div>
          <div className="m-2">
            <label htmlFor="appsecret" className="block font-medium text-gray-700 mb-3">
              AppSecret
            </label>

            <input
              type="text"
              id="appsecret"
              className="h-10 w-96 rounded-md border-2 border-purple-400 shadow focus:shadow-xl"
              onChange={(e) => setAppSecret(e.target.value)}
              value={appSecret}
            />
          </div>
          <button
              className="mt-8 ml-4 md:mt-0 md:ml-0 select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={handleListWebhooks}
            >
            List Webhooks
          </button>
        </div>
        <div className="flex flex-col m-4 md:flex-row md:space-x-8">
          <div className="m-2">
            <label htmlFor="webhookurl" className="block font-medium text-gray-700 mb-3">
              Webhook URL (which will be invoked by Content Graph)
            </label>

            <input
              type="text"
              id="webhookurl"
              className="h-10 w-96 rounded-md border-2 border-purple-400 shadow focus:shadow-xl"
              value={addWebhookUrl}
              onChange={(event) => setAddWebhookUrl(event.target.value)}
            />
          </div>
          {/* <div className="m-2">
            <label htmlFor="appkey" className="block font-medium text-gray-700 mb-3">
              Method
            </label>

            <input
              type="text"
              id="appkey"
              className="h-10 w-96 rounded-md border-2 border-purple-400 shadow focus:shadow-xl"
              onChange={(e) => setAddMethod(e.target.value)}
              value={addMethod}
            />
          </div> */}
          {/* <div className="m-2">
            <label htmlFor="appsecret" className="block font-medium text-gray-700 mb-3">
              AppSecret
            </label>

            <input
              type="text"
              id="appsecret"
              className="h-10 w-96 rounded-md border-2 border-purple-400 shadow focus:shadow-xl"
              onChange={(e) => setAppSecret(e.target.value)}
              value={appSecret}
            />
          </div> */}
          <button
              className="mt-8 ml-4 md:mt-0 md:ml-0 select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={handleRegisterWebhook}
            >
            Register Webhook
          </button>
        </div>
      </>
    );
}