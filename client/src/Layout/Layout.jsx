import Section from "./Section"
import Home from "../Pages/Home"
import Content from "../Pages/Content"
import Footer from "../Pages/Footer"
export default  function Screen(){
    return(
        <Section>
            <Home />
            <Content />
            <Footer />
        </Section>
    )
}