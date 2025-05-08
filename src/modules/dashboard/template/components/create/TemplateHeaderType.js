import PropTypes from 'prop-types'

export default function TemplateHeaderType({value, onChange}) {
  return (
    <select value={value} onChange={onChange} id="headerType" className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none  focus:border block py-2.5 px-3  mt-4">
        <option value='' >Select option</option>
        <option value="Text">Text</option>
        <option value="Media">Media</option>
    </select>
  )
}

TemplateHeaderType.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

TemplateHeaderType.defaultProps = {
  value: '',
  onChange: () => console.log('It will work')
}