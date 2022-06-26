import React from "react";
import { Button } from "../ButtonElements";
import { useHistory } from "react-router-dom";

import {
  HomeContainer,
  HomeWrapper,
  HomeInfoSection,
  HomeImageSection,
  TextWrapper,
  Heading,
  Subtitle,
  BtnWrap,
  ImgWrap,
  Img,
} from "./HomeElements";

const HomeSection = ({
  headline,
  description,
  buttonLabel1,
  buttonLabel2,
  img,
  alt,
  primary,
  dark,
  id,
  ...restProps
}) => {
  let history = useHistory();

  return (
    <>
      <HomeContainer id={id}>
        <HomeWrapper>
          <HomeInfoSection>
            <TextWrapper>
              <Heading>{headline}</Heading>
              <Subtitle>{description}</Subtitle>
              <BtnWrap>
                <Button
                  to="home"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                  primary={primary ? 1 : 0}
                  dark={dark ? 1 : 0}
                  dark2={dark ? 1 : 0}
                  onClick={restProps.connectOnClick}
                >
                  {buttonLabel1}
                </Button>{" "}
                <Button
                  to="home"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                  primary={3}
                  dark={dark ? 1 : 0}
                  dark2={dark ? 1 : 0}
                  onClick={() => history.push("/issueUserID")}
                >
                  {buttonLabel2}
                </Button>
              </BtnWrap>
            </TextWrapper>
          </HomeInfoSection>
          <HomeImageSection>
            <ImgWrap>
              <Img src={img} alt={alt} />
            </ImgWrap>
          </HomeImageSection>
        </HomeWrapper>
      </HomeContainer>
    </>
  );
};

export default HomeSection;
