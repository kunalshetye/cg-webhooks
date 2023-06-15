'use client';
import { useState } from "react";

export default function Settings(){
    const [url, setUrl] = useState("https://cg.optimizely.com/api/webhooks");
    const [appKey, setAppKey] = useState("");
    const [appSecret, setAppSecret] = useState("");
    const handleListWebhooks = function(){
        console.log("list webhooks called");
    }

    return(
        <div className="flex flex-col md:flex-row md:space-x-8">
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
    );
}