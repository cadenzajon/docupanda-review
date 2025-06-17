import { createRoot } from 'react-dom/client'
import { DocupandaReview } from './src'
import { BrowserRouter } from 'react-router'

createRoot(document.body).render(
	<BrowserRouter>
		<DocupandaReview />
	</BrowserRouter>
)
