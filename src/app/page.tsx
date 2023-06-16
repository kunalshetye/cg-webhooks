'use client';

import Settings from "@/components/Settings";
import Webhooks from "@/components/Webhooks";
import { sendRequest } from "@/lib/hmac";
import { useEffect, useState } from "react";

export default function Home() {
  const [webhooks, setWebhooks] = useState([]);
  const [url, setUrl] = useState("https://cg.optimizely.com/api/webhooks");
  const [appKey, setAppKey] = useState(typeof window !== "undefined" ? localStorage.getItem("appKey") || "" : "");
  const [appSecret, setAppSecret] = useState(typeof window !== "undefined" ? localStorage.getItem("appSecret") || "" : "");
  
  useEffect(() => {
    if(appKey != "") localStorage.setItem("appKey", appKey);
    if(appSecret != "") localStorage.setItem("appSecret", appSecret);
    if(url != "") localStorage.setItem("url", url);
  },[url,appKey,appSecret]);
  
  const webhookHandler = function(data: []){
    console.log(data);
    setWebhooks(data);
  }
  const webhookDeleteHandler = function(id: any){
    sendRequest(`${url}/${id}`, appKey, appSecret, "DELETE")
      .then((res) => {
          console.log(`res.status: ${res.status}`);
          sendRequest(url, appKey, appSecret, "GET")
            .then((res) => {
                console.log(res);
                return res.json()
            })
            .then((data) => {
                webhookHandler(data);
          })
      });
  }
  return (
    <main className="p-20">
      <div className="flex flex-col">
        <Settings 
          url={url}
          setUrl={setUrl} 
          appKey={appKey}
          setAppKey={setAppKey}
          appSecret={appSecret}
          setAppSecret={setAppSecret}
          webhookHandler={webhookHandler}/>
        <Webhooks hooksData={webhooks} webhookDeleteHandler={webhookDeleteHandler} />
      </div>
    </main>
  )
}
