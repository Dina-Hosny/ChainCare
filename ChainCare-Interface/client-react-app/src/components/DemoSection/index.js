import {
  CardContainer,
  CardGrid,
  CardVideoSection,
  VideoWraper,
  CardInfoSection,
  VideoTitle,
  VideoSubtitle,
  VideoAvatar,
  VideoThumbnail,
  GoogleAvatar,
  DemoSectionContainer,
  DemoSectionWrapper,
  SliderSection,
  DemoTitleSection,
  DemoSectionTitle,
  DemoSectionSubtitle,
  Divider,
} from "./DemoElements";

import IMG1 from "../../assets/images/img1.png";
import IMG2 from "../../assets/images/img2.png";
import IMG3 from "../../assets/images/img3.png";

import SVG1 from "../../assets/images/svg-1.svg";

import React, { Component } from "react";

import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";

// import { config } from "react-spring";

import { config } from "react-spring";

// import "react-modal-video/scss/modal-video.scss";
// import "node_modules/react-modal-video/scss/modal-video.scss";
import "./modal-video.scss";

import ModalVideo from "react-modal-video";

function VideoCard(props) {
  return (
    <CardContainer>
      <CardGrid>
        <CardVideoSection>
          <VideoWraper>
            <VideoThumbnail src={props.image} alt="p1" />
          </VideoWraper>
        </CardVideoSection>
        <CardInfoSection>
          {" "}
          <VideoTitle>{props.title}</VideoTitle>{" "}
          <VideoSubtitle>{props.description}</VideoSubtitle>{" "}
          <VideoAvatar>
            {" "}
            <GoogleAvatar src={SVG1} alt="google-avatar" /> Mohammed Fajer
          </VideoAvatar>
        </CardInfoSection>
      </CardGrid>
    </CardContainer>
  );
}

export default class DemoSection extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: false,
    config: config.gentle,
    isOpen: false,
  };

  componentDidMount() {
    window.addEventListener("resize", this.showNav);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.showNav);
  }

  showNav = () => {
    if (window.innerWidth >= 1100) {
      this.state({ showNavigation: false });
    } else {
      this.state({ showNavigation: true });
    }
  };

  handleOpen = (value) => {
    let v = !this.state.isOpen;
    this.setState({ isOpen: v });
  };

  slides = [
    {
      key: uuidv4(),
      content: (
        <CardContainer>
          <CardGrid>
            <CardVideoSection>
              <VideoWraper>
                <VideoThumbnail src={IMG1} alt="p1" onClick={this.handleOpen} />
              </VideoWraper>
            </CardVideoSection>
            <CardInfoSection>
              {" "}
              <VideoTitle>App Presentation</VideoTitle>{" "}
              <VideoSubtitle>
                describing the project and the technology behind it
              </VideoSubtitle>{" "}
              
            </CardInfoSection>
          </CardGrid>
        </CardContainer>
      ),
    },
    
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
  });

  showNav = () => {
    if (window.innerWidth >= 1100) {
      this.setState({ showNavigation: false });
    } else {
      this.setState({ showNavigation: true });
    }
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    });
  };

  render() {
    return (
      <DemoSectionContainer id="demo">
        <DemoSectionWrapper>
          <DemoTitleSection>
            <DemoSectionTitle>
              <Divider>Demo</Divider>
            </DemoSectionTitle>{" "}
          </DemoTitleSection>
          <DemoSectionSubtitle>
            <p>
              This video explains the technology behind this
              application and walk through for how to use it.
            </p>
          </DemoSectionSubtitle>
          <SliderSection>
            <Carousel
              slides={this.slides}
              goToSlide={this.state.goToSlide}
              offsetRadius={this.state.offsetRadius}
              showNavigation={this.state.showNavigation}
              animationConfig={this.state.config}
            />
          </SliderSection>
        </DemoSectionWrapper>
        <React.Fragment>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={this.state.isOpen}
            videoId="JLywGmCGGK0"
            onClose={() => this.setState({ isOpen: false })}
          />
        </React.Fragment>
      </DemoSectionContainer>
    );
  }
}
