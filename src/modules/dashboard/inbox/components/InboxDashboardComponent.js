import Chatview from "./Chats/Chatview";

export default function InboxDashboardComponent() {
  return (
    <>
    <div className="w-full grid grid-cols-[400px_auto] p-1 max-w-[1320px] mx-auto">
      <Chatview phoneID={"100315306037297"} companyID={'6804ded6bfe35d908ea0d489'} />
    </div>
    </>
  )
}