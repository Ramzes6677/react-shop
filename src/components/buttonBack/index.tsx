import { Link } from 'react-router'
import './index.scss'

export default function ButtonBack() {
  return (
    <div className="button-back">
      <Link to="/">
        <div>Back</div>
      </Link>
    </div>
  )
}
