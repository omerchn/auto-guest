import { HashLoader } from 'react-spinners'

// containers
import FadeIn from '../../containers/FadeIn'

export default function Loader() {
  return (
    <FadeIn duration={1000}>
      <HashLoader color="#3f51b5" />
    </FadeIn>
  )
}
