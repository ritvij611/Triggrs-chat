import { PlusIcon, TrashIcon } from "lucide-react"
import { Check } from "lucide-react";

export const UpdateContactDialog = ({
    firstName, 
    lastName, 
    phoneNumber, 
    optedIn,
    country, 
    customProperties,
    setFirstName,
    setLastName,
    setOptedIn,
    addCustomProperty,
    removeCustomProperty,
    updateCustomProperty,
    
}) => {
    return (
        <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
            <div>
            <label className="block text-gray-700 text-base mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded-lg p-3 text-base"
              placeholder="Enter first name"
            />
            </div>
            <div>
            <label className="block text-gray-700 text-base mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded-lg p-3 text-base"
              placeholder="Enter last name"
            />
            </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 text-base mb-2">
              Country Code
            </label>
            <div className="flex space-between w-full border rounded-lg p-3 px-6 text-base justify-between">
            <span>{country.country}</span>
            <span>|</span>
            <span>{country.countryCode}</span>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-base mb-2">
              Phone Number
            </label>
            <div className="w-full border rounded-lg p-3 text-base">
            {phoneNumber || "XXXXX"}
            </div>
          </div>
        </div>

        <div>
            <div className="flex items-center gap-2">
              <div 
                className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer ${optedIn ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'}`}
                onClick={() => setOptedIn(!optedIn)}
              >
                {optedIn && <Check size={16} className="text-white" />}
              </div>
              <label className="text-gray-700 text-base cursor-pointer" onClick={() => setOptedIn(!optedIn)}>
                Opted In
              </label>
            </div>
          </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-700 text-base">
              Custom Properties
            </label>
            <button 
              onClick={addCustomProperty}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <PlusIcon size={20} className="mr-1" />
              Add Property
            </button>
          </div>   
          <div className="space-y-3">
            {customProperties.map((prop, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={prop.key}
                  onChange={(e) => updateCustomProperty(index, "key", e.target.value)}
                  className="border rounded-lg p-3 text-base"
                  placeholder="Property name"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prop.value}
                    onChange={(e) => updateCustomProperty(index, "value", e.target.value)}
                    className="flex-1 border rounded-lg p-3 text-base"
                    placeholder="Value"
                  />
                  {customProperties.length > 1 && (
                    <button 
                      onClick={() => removeCustomProperty(index)}
                      className="p-2 text-gray-500 hover:text-red-500"
                    >
                      <TrashIcon size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
    )
}