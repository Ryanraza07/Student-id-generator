import QRCode from 'qrcode.react'

const IDCard = ({ data, template }) => {
  const studentData = {
    name: data.name,
    rollNumber: data.rollNumber,
    class: data.class,
    division: data.division,
    allergies: data.allergies,
    rackNumber: data.rackNumber,
    busRoute: data.busRoute,
  }

  if (template === 'template1') {
    return (
      <div id="id-card" className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-xl p-6 w-96 border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
            {data.photo && (
              <img
                src={data.photo}
                alt="Student"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">{data.name}</h2>
            <p className="text-gray-600">Roll No: {data.rollNumber}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span className="font-semibold text-purple-700">Class:</span>
            <span className="text-gray-700">{data.class}-{data.division}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span className="font-semibold text-purple-700">Rack No:</span>
            <span className="text-gray-700">{data.rackNumber}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <span className="font-semibold text-purple-700">Bus Route:</span>
            <span className="text-gray-700">{data.busRoute}</span>
          </div>
        </div>

        {data.allergies && data.allergies.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-purple-700 mb-2">Allergies:</h3>
            <div className="flex flex-wrap gap-2">
              {data.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center p-4 bg-purple-50 rounded-lg">
          <QRCode
            value={JSON.stringify(studentData)}
            size={128}
            level="H"
            includeMargin={true}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    )
  }

  return (
    <div id="id-card" className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-xl p-6 w-96 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
          {data.photo && (
            <img
              src={data.photo}
              alt="Student"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-purple-100">Roll No: {data.rollNumber}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <span className="font-semibold">Class:</span>
          <span>{data.class}-{data.division}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <span className="font-semibold">Rack No:</span>
          <span>{data.rackNumber}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
          <span className="font-semibold">Bus Route:</span>
          <span>{data.busRoute}</span>
        </div>
      </div>

      {data.allergies && data.allergies.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Allergies:</h3>
          <div className="flex flex-wrap gap-2">
            {data.allergies.map((allergy, index) => (
              <span
                key={index}
                className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <QRCode
          value={JSON.stringify(studentData)}
          size={128}
          level="H"
          includeMargin={true}
          className="rounded-lg shadow-lg"
          bgColor="transparent"
          fgColor="white"
        />
      </div>
    </div>
  )
}

export default IDCard 