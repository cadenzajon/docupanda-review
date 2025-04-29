import { DocupandaReview } from './src'
import r2wc from '@r2wc/react-to-web-component'

const WebReview = r2wc(DocupandaReview, { props: { apiKey: 'string' } })

customElements.define('docupanda-review', WebReview)
