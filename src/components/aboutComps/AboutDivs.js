import React from "react";
import "../../styles/About.css";
import AboutDetails from "./AboutDetails";

const AboutDivs = (props) => {
  const missionArray = [
    {
      header: "OUR MISSION",
      main: "Get more people outside.",
      para: "Hipcamp is a growing community of good-natured people and the most comprehensive resource for unique outdoor stays. By connecting people with the land and each other, Hipcamp works to support those who care for the land and get more people out under the stars. We do this because we believe humans in nature bring out the best of human nature.",
    },
  ];

  const valuesArray = [
    {
      header: "OUR VALUES",
      main: "Embrace the adventure.",
      para: "We take action with the urgency that our mission deserves. We focus on learning faster so that we can invest in the most important things. We achieve more with less by creating systems at the right scale (sometimes with duct tape.) We are intentional about when we move fast and when we are more considered.",
    },
    {
      main: "Move with purposeful urgency",
      para: "We take action with the urgency that our mission deserves. We focus on learning faster so that we can invest in the most important things. We achieve more with less by creating systems at the right scale (sometimes with duct tape.) We are intentional about when we move fast and when we are more considered.",
    },
    {
      main: "Build resilient communities.",
      para: "We optimize for the good of our community and our many interconnected ecosystems. We intentionally create an environment of trust and respect. We elevate and protect diversity as a strength.",
    },
    {
      main: "Leave it better.",
      para: "We are passionate about our mission to get more people outside because we believe in biophilia and the power of love to inspire action. We believe that humanity at scale can have a positive impact on the earth. We know feedback drives growth and we constantly seek, give and receive it.",
    },
  ];

  const sharingArray = [
    {
      header: "LAND SHARING",
      main: "The sharing economy goes wild",
      para: "“The next wave of conservation has to be about engaging private landowners.” Rand Wentworth, President, Land Trust Alliance Over 60% of the United States is privately owned. It is essential to the future of our planet that much of this land remains undeveloped to maintain wilderness habitats and corridors that allow plants and animals to thrive and migrate naturally. By connecting landowners who want to keep their land undeveloped with our community of responsible, nature-loving Hipcampers, recreation can help fund the conservation of this land. And land sharing isnt just important for the environment—it also creates an entirely new way to get outside. Campers can escape the crowds, reconnect with nature and experience new land and cultures outside of the city—from organic farming, wild foraging, outdoor classrooms, group campouts and indigenous land stewardship. Join the land sharing movement! Find out more about listing your land or refer a host .",
    },
  ];

  const storyArray = [
    {
      header: "OUR STORY",
      main: "It started with a wave",
      para: "The Hipcamp story began with waves—gorgeous, glassy, barrelling waves. They were crashing on California’s Central Coast at Andrew Molera State Park as Hipcamp founder and CEO Alyssa Ravasio watched in frustration. She had spent several hours searching dozens of websites for a spot that fit what she thought was a simple request: a beach to set up camp and watch the first sunrise of 2013. Although she found the state park as a result of her work, she didn’t discover one essential detail until she got there: it was an amazing place to catch a wave. “When I arrived,” she said, “I found out that even though I’d read so much about this place, I hadn’t learned that it was home to a great surf break. I’m a surfer and hadn’t brought my board!” At the time, over 30% of the California State Park system was threatened by closure due to lack of revenue. With this fact plus her disappointing research session, Alyssa set out to build technology to help people get outside, connect with nature, and find the right spots for them. And so the idea for Hipcamp was born. Alyssa attended Dev Bootcamp, an intensive 10-week coding training, and built a basic version of Hipcamp in 2013 before co-founder Eric Bach joined later that year. Hipcamp has since grown into the most comprehensive resource for discovering and booking unique outdoor stays including tent camping, RV parks, cabins, treehouses, and glamping.",
    },
  ];
  return (
    <div id="aboutMainSection">
      <div id="aboutMission" className="aboutSection">
        {missionArray.map((value) => {
          return (
            <AboutDetails
              header={value.header}
              main={value.main}
              para={value.para}
            />
          );
        })}
      </div>
      <div id="aboutValues" className="aboutSection">
        {valuesArray.map((value) => {
          return (
            <AboutDetails
              header={value.header}
              main={value.main}
              para={value.para}
            />
          );
        })}
      </div>
      <div id="aboutLandSharing" className="aboutSection">
        {sharingArray.map((value) => {
          return (
            <AboutDetails
              header={value.header}
              main={value.main}
              para={value.para}
            />
          );
        })}
      </div>
      <div id="aboutOurStory" className="aboutSection">
        {storyArray.map((value) => {
          return (
            <AboutDetails
              header={value.header}
              main={value.main}
              para={value.para}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AboutDivs;
