import { useState } from 'react'

const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const divisions = ['A', 'B', 'C', 'D']
const busRoutes = ['Route 1', 'Route 2', 'Route 3', 'Route 4', 'Route 5']
const allergies = ['Peanuts', 'Dairy', 'Gluten', 'Eggs', 'Shellfish', 'None']

const StudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: '',
    division: '',
    allergies: [],
    photo: null,
    rackNumber: '',
    busRoute: '',
  })

  const [photoPreview, setPhotoPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAllergyChange = (e) => {
    const { value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      allergies: checked
        ? [...prev.allergies, value]
        : prev.allergies.filter(allergy => allergy !== value)
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
        Student Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter roll number"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select Class</option>
              {classes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select Division</option>
              {divisions.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rack Number</label>
          <input
            type="text"
            name="rackNumber"
            value={formData.rackNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter rack number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bus Route</label>
          <select
            name="busRoute"
            value={formData.busRoute}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Bus Route</option>
            {busRoutes.map(route => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100"
            />
            {photoPreview && (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200">
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
          <div className="grid grid-cols-2 gap-2">
            {allergies.map(allergy => (
              <label key={allergy} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={allergy}
                  checked={formData.allergies.includes(allergy)}
                  onChange={handleAllergyChange}
                  className="rounded border-purple-200 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{allergy}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Generate ID Card
      </button>
    </form>
  )
}

export default StudentForm 