import Layout from '../components/Layout'
import PlayerButton from '../components/PlayerButton'
import { demoVoiceData } from '../utils/VoiceData'

const IndexPage = () => (

  <Layout>
    <div className="flex flex-wrap justify-center mx-auto md:max-w-6xl" style={{ paddingTop: '18rem' }}>
      { demoVoiceData.map((voiceData) => (<PlayerButton key={voiceData.filename} voiceData={voiceData} />)) }
    </div>
  </Layout>
)

export default IndexPage
