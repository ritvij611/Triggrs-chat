// import { forwardRef } from 'react'
import PropTypes from 'prop-types'

// export const TemplateNameInput = forwardRef(({placeholder, label, minLength, maxLength}, ref) => {
//   return (
//     <div className='bg-white w-full rounded-xl flex flex-col gap-2 p-4 my-4 border border-gray-200 shadow-sm'>
//         <h3 className="text-sm font-medium text-gray-900">{label}</h3>
//         <div><input ref={ref} type="text" id="template_name" minLength={minLength} maxLength={maxLength} className="bg-white border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none focus:border block w-full p-2.5 lg:p-4" placeholder={placeholder} /></div>
//     </div>
//   )
// }).displayName;

// TemplateNameInput.propTypes = {
//   placeholder: PropTypes.string,
//   label: PropTypes.string,
//   minLength: PropTypes.number,
//   maxLength: PropTypes.number
// };

// TemplateNameInput.defaultProps = {
//   placeholder: 'Placeholder',
//   label: 'Label',
//   minLength: 0,
//   maxLength: 256
// }


export const TemplateFooterInput = ({value, onChange}) => {
  return (
    <div className='bg-white w-full rounded-md flex flex-col gap-2 p-4  border border-gray-200 shadow-sm'>
      <h3 className="mb-1 text-base font-semibold  text-slate-800 flex gap-1  items-center">Footer <span className='text-xs rounded font-medium capitalize text-slate-500'>(Optional)</span></h3>
      <div><input type="text" id="template_footer" value={value} onChange={onChange} minLength="3" maxLength="60" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none focus:border block w-full py-2.5 px-3" placeholder='Enter Name' /></div>
    </div>
  );
}

TemplateFooterInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

TemplateFooterInput.defaultProps = {
  value: '',
  onChange: () => console.log('It will work')
}