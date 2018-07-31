import React from 'react';
import Adapter from './Adapter'
import {Button, Grid, Image, Transition, Container, Header, Icon, Segment,} from 'semantic-ui-react'
import logo  from '../assets/logo.png'

const transition = "fly left"

class Homepage extends React.Component {
    state = {
        visible: true
    }

    transition = () => {
        this.animation = setInterval( () => this.setState({visible: !this.state.visible}), 2500)
      }
    
      componentWillUnmount() {
        clearInterval(this.animation)
        
      }
    
      componentDidMount() {
        this.transition()
      }
    

    handleClick = () => {
        Adapter.isLoggedIn() 
        ?     
        this.props.history.push("/upload")
        :
        this.props.history.push("/register")
    }
    render(){
    return (
        <Segment
            textAlign='center'
            style={{ backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwoICAcHCA0QBwgHBw0HBwcHDQ8ICQcKFREWFhURExMYHSggGBoxGxMfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NFSsZFRk3KysrLTcrLS0rKysrKzcrKysrKystLSsrLSsrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAAAQIDBAb/xAAaEAEBAQEBAQEAAAAAAAAAAAAAEQESAhMD/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD2/I5b8Dh3riw5HLfgcFGHI5b8Dgow5HLfgcFGHI5b8Dgow5PhvnhWeCq5+Dzw6c/NWfmlI5vmfzdPzP5lI5fmfzdXzHzKRyfMfN1/MfMpHH8y383Z807+ZSOTfBcOvfzTv5rSOXguXTvhPBRhyOW/A4KjDkct+BwUYcjlvwOCjDkct+BwUYcjlvwOCjbkctYIjTLkctYIDLkctYIDLkctYIgz4PPDXMVnkGWeFZ4bZis8lGOeFZ4a5hxFZcDlrBAZcny0ggMuRy1ggMuS4bQQGG+E7+bohb5Bzb4Tvh1b5Tvlajl4Lh0b5TuAx5HLWCKMuRy1ggMuRy1ggMuRy1ggKgi4IgiCLggIgi4ICIrMPMVmClmKzyrMVmIFmHDhgmCKAJgigCYIoAmCKAJgigCYIoAiFvlpC3AY75TuNtxO4DHcKNNwoqIgi4ICIIuCAiCLggKgioIipgioICYIqDMAsxeYMxeYBZioeYcQSFQQVJw4cBMOKzyfIIgjTkcgzgjTkuQZwRpyXIM4FwoCRFQQEbidxpC3FRjuFGm4ncBEEVBATBFQQEwRUEBUEVBATBFQQEw8w4eYAzFZgzFZiKIFCAk4cVmIJzFZisw4CYcMwSFAEiKAJhbihAZ7hbjWJ3AZkuFFEluLhQGe4ncabidwRnBFbgiiYIqCAmCKggKgioIipgioICYeYcPMAZiswZisxAocOHmAWYrMGYrMFIKggJCoICQqCAkKggJCoICRuKhQEbidxpuJ3ATCioIIz3E7jTcTuKI3CitwQEwRUEBMEVBAVBFQRBMEVBATDhw8wBiswsxWAIeYIYozDPMMCBhAgYAgYAgYAgYAgYBJbi06ojcKL3CBGp3F6W4IiFFQQEwRUEBMEVBAXBFQQEwRUEBMEVBAI8EPBRiswZh4BwQ8wRAgcEAgcEAgcEAgcEAgcEAgcEAoW4qFuAjSXqdUSncXCgJgioIImCKggJgioICoIqCCpgioICYIqCAmHDggAxDxAzGHAIHBAIHBAIHBAIHBAIHBAIHBASWqIE6nVlARBFQRRMEVBATBFQQEwRUEAvp5H08uTsdkSuv6eR9PLk7HZCuv6YPpjl7HZCur6YPpjl7HZCuv6YM/THJ2f0Irsz3h9Y5M/ReewdPWDrGGez6QbdYOsZdDoGvWCsuh0Daisui6BtRWPQ6BrR1jLpO+wbb6wt94w32nfawdHeF3jm7HZB094O8c3Y7IOnvB3jm7HZB09YO8c3Y7IOnrB1jn7HZBx9jtzfQfRtl09jpz/QfRIOjs+3N9B9Fg6ex25voO0iOnsdub6H9CDqz2rP0cfZ5+hFrvz9FZ7cOfo0z9EhXXns+3Ln6K+hFro7Ptz9jsK6Ox25+x2Qrfou2G/onf0IV0b7Rv6Off0Rv6ESujf0T259/Qu1hXT2O3P2Owro7Hbn7HZB0djtz9jsHR2O3P2OwdHY7c/Y7BxABpkYYAAACjDMARgADIAvy08gILxWAIqsMBUBAAnU6Aio9J9AKhAAAAAAAAAADwAAAAD//Z')",
            minHeight: 700, 
            padding: '1em 0em',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
         }}
            vertical
        >
            <Container text>
            <img src={logo} alt=""/>
            <Header
            as='h2'
            content='Convert Image of Text into Audio'
            inverted
            style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
                marginTop: '1.5em',
                color: "blue",
            }}
            /><br/>
            <Button onClick={() => this.handleClick()} primary size='huge'>
            Get Started
            <Icon name='right arrow' />
            </Button>
        </Container>

        {/* <Grid.Column>
          <Transition.Group animation='fly left' duration={1000}>
            {this.state.visible && <Image className="home-animation-1" centered size='small' src={logo} />}
          </Transition.Group>
          <Transition.Group animation='scale' duration={1300}>
            {!this.state.visible && <Image className="home-animation-2" centered size='small' src={logo} />}
          </Transition.Group>
        </Grid.Column> */}
    </Segment>
    )
    }
}

export default Homepage;