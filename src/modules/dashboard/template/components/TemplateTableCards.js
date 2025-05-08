import moment from 'moment-timezone'

export default function TemplateTableCards({ templateName, category, status, language, lastupdate, onShowDeleteModal, onShowViewModal }) {
  // console.log(status)
  return (
    <tr className="border-b text-gray-800 bg-white font-medium">
      <td className="px-4 py-3">{templateName}</td>
      <td className="px-4 py-3 text-xs">{category}</td>
      <td className="px-4 py-3">
         {status == "REJECTED" && (
          <span className="text-xs text-red-600 bg-red-600/10 rounded-full px-3 py-1.5 uppercase">Rejected</span>
        )}
        {status == "APPROVED" && (
          <span className="text-xs text-green-500 bg-green-600/10 rounded-full px-3 py-1.5 uppercase">Approved</span>
        )}
        {status == "PENDING" && (
          <span className="text-xs text-yellow-600 bg-yellow-600/10 rounded-full px-3 py-1.5 uppercase">Pending</span>
        )}
      </td>
        {/* // : <span className="text-sm text-yellow-500 bg-yellow-600/10 rounded-full px-3 py-1.5 uppercase">In-Review</span>
          //   ? <span className="text-sm text-red-600 bg-red-600/10 rounded-full px-3 py-1.5 uppercase">Rejected</span>
          //   : <span className="text-sm text-green-600 bg-green-600/10 rounded-full px-3 py-1.5 uppercase">Active - Quality pending</span>
          //     ? <span className="text-sm text-green-600 bg-green-600/10 rounded-full px-3 py-1.5 uppercase">Active - High quality</span>
          //     : <span className="text-sm text-yellow-500 bg-yellow-600/10 rounded-full px-3 py-1.5 uppercase">Active - Medium quality</span>
          //       ? <span className="text-sm text-red-600 bg-red-600/10 rounded-full px-3 py-1.5 uppercase">Active - Low quality</span>
          //       : <span className="text-sm text-red-600 bg-red-600/10 rounded-full px-3 py-1.5 uppercase">Disabled</span> */}
        {/* } */}
      <td className="px-4 py-3 text-sm">{language}</td>
      <td className="px-4 py-3 text-[13px]">{moment(lastupdate).format('DD-MMM-YY, h:mm a')}</td>
      <td className="px-4 py-3 text-sm flex gap-3 items-center">
        <button onClick={onShowViewModal} className="bg-blue-600/10 rounded-lg p-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-blue-500"> <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /> <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" /> </svg>
        </button>
        <button onClick={onShowDeleteModal} className="bg-red-500/10 rounded-lg p-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-red-500"> <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" /> </svg>
        </button>
      </td>
    </tr>
  )
}
