import Webhook from "./Webhook";
export default function Webhooks({ hooksData }){
    return(
        <div className="mt-5 flex flex-wrap">
          {hooksData.length == 0 && (<h2 className="text-xl text-amber-600">No webhooks found, are you sure you have registered any?</h2>)}
          {hooksData.length > 0 && hooksData.map((hook: any) => <Webhook data={hook} />)}
        </div>
    );
}