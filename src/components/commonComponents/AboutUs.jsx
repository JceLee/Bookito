import React from "react";
import { Image } from "antd";
import sampleImg from "../../assets/images/mobile.png";

const ourTeam = [
  {
    img: sampleImg,
    name: "Kangmin Lee",
    email: "kangmin@gmail.com",
    description: "Hello. I'm Kangmin!",
  },
  {
    img: sampleImg,
    name: "Joshua Shin",
    email: "Joshua@gmail.com",
    description: "Hello. I'm Joshua!",
  },
  {
    img: sampleImg,
    name: "Gina Kim",
    email: "Gina@gmail.com",
    description: "Hello. I'm Gina!",
  },
  {
    img: sampleImg,
    name: "Yongju Kwon",
    email: "Yongju@gmail.com",
    description: "Hello. I'm Yongju!",
  },
  {
    img: sampleImg,
    name: "Jaewhee Seo",
    email: "Jaewhee@gmail.com",
    description: "Hello. I'm Jaewhee!",
  },
  {
    img: sampleImg,
    name: "Heeja Jeong",
    email: "Heeja@gmail.com",
    description: "Hello. I'm Heeja!",
  },
];

export default function AboutUs() {
  return (
    <div className="aboutUsPage">
      <h3 className="aboutUsTitle">ABOUT US</h3>
      <div className="aboutUsCard">
        {ourTeam.map((member) => {
          return (
            <div className="aboutUsMemberInfo">
              <section className="img">
                <Image className="memberImg" src={member.img} />
              </section>
              <section className="memberIntro">
                <h4 id="memberName">{member.name}</h4>
                <p>{member.email}</p>
                <p>{member.description}</p>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}
