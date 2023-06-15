import Settings from "@/components/Settings"
import Webhooks from "@/components/Webhooks"

export default function Home() {
  return (
    <main className="p-20">
      <div className="flex flex-col">
        <Settings />
        <Webhooks />
      </div>
    </main>
  )
}
