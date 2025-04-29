import { createRoot } from 'react-dom/client'
import { DocupandaReview } from './src'

const apiKey = await fetch('/api-key').then(res => res.text())

createRoot(document.body).render(<DocupandaReview apiKey={apiKey} />)
