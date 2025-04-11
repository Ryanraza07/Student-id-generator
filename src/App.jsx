import { useState, useEffect } from 'react'
import StudentForm from './components/StudentForm'
import IDCard from './components/IDCard'
import { toPng } from 'html-to-image'

function App() {
  const [studentData, setStudentData] = useState(null)
  const [template, setTemplate] = useState('template1')
  const [savedCards, setSavedCards] = useState([])

  useEffect(() => {
    const savedCardsData = localStorage.getItem('studentCards')
    if (savedCardsData) {
      setSavedCards(JSON.parse(savedCardsData))
    }
  }, [])

  const handleSubmit = (data) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const newData = {
        ...data,
        photo: reader.result,
        id: Date.now()
      }
      setStudentData(newData)
      const updatedCards = [...savedCards, newData]
      setSavedCards(updatedCards)
      localStorage.setItem('studentCards', JSON.stringify(updatedCards))
    }
    reader.readAsDataURL(data.photo)
  }

  const handleDownload = () => {
    const cardElement = document.getElementById('id-card')
    if (!cardElement) return

    toPng(cardElement)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `student-id-${studentData.rollNumber}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error('Error downloading card:', err)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
          Smart Student ID Generator
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-purple-100">
            <StudentForm onSubmit={handleSubmit} />
          </div>
          
          {studentData && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-purple-100">
              <div className="flex justify-between items-center mb-6">
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-purple-200 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="template1">Modern Design</option>
                  <option value="template2">Gradient Design</option>
                </select>
                <button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Download as PNG
                </button>
              </div>
              <IDCard data={studentData} template={template} />
            </div>
          )}
        </div>

        {savedCards.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              Saved Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedCards.map((card) => (
                <div key={card.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
                  <IDCard data={card} template={template} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
