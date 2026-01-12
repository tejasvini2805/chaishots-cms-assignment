import { useEffect, useState } from 'react'

function App() {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    fetch('/catalog/programs')

      .then(res => res.json())
      .then(data => {
  console.log('API DATA:', data)
  setPrograms(data)
})

      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Chai Shots – Programs</h1>

      {programs.length === 0 && <p>No programs found.</p>}

      {programs.map(program => (
        <div key={program.id} style={{ marginBottom: 20 }}>
          <h2>{program.title}</h2>
          <p>{program.description}</p>

          {program.terms.map(term => (
            <div key={term.id} style={{ marginLeft: 20 }}>
              <h4>{term.title}</h4>
              <ul>
                {term.lessons.map(lesson => (
                  <li key={lesson.id}>
                    {lesson.title} ({lesson.status})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
