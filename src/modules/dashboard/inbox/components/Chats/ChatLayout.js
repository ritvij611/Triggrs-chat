import PropTypes from 'prop-types'

export default function ChatLayout({children}) {
  return (
    <div className="grid xl:grid-cols-[360px_auto] lg:grid-cols-[340px_auto]  2xl:grid-cols-[400px_auto] w-full">
        {children}
    </div>
  )
}

ChatLayout.propTypes = {
    children: PropTypes.node
}

ChatLayout.defaultProps = {
    children: <></>
}