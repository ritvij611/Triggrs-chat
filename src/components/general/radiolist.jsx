import PropTypes from 'prop-types'

export default function RadioList({title, description, value, onChange}) {
  return (
    <li className='w-full h-full'>
        <input type="radio" id={value} name="category" value={value} onChange={onChange} className="hidden peer" />
        <label htmlFor={value} className="inline-flex items-center justify-between w-full h-full p-3 text-slate-700 bg-white peer-checked:bg-emerald-600/20 border border-gray-300 rounded-xl cursor-pointer peer-checked:border-emerald-600 peer-checked:text-emerald-600 hover:text-gray-600 hover:bg-emerald-600/20 ">
        <div className="block">
            <div className="w-full text-sm  font-semibold">{title}</div>
            <div className="w-full text-xs">{description}</div>
        </div>
        </label>
    </li>
  )
}


RadioList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

RadioList.defaultProps = {
  title: 'Radio Title',
  description: 'Radio Description',
  value: 'Radio Value',
  onChange: () => console.log('It will work')
}