import Section from "./Section"
import Home from "../Pages/Home"
import Content from "../Pages/Content"
import Footer from "../Pages/Footer"
import Nava from "../Pages/Nava"
export default  function Screen(){
    return(
        <Section>
            <Nava />
            <Home />
            <Content />
            <Footer />
        </Section>
    )
}