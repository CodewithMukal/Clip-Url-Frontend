import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import longvshort from "./assets/longvshort.svg";
import clip from "./assets/clip.svg";
import ft1 from "./assets/ft1.svg";
import ft2 from "./assets/ft2.svg";
import ft3 from "./assets/ft3.svg";
import clipboard from "./assets/clipboard.svg";
import link from "./assets/link.svg";
import share from "./assets/share.svg";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Slider } from "./components/Slider";
import { Accordion } from "./components/Accordion";
import logo from "./assets/logo.svg";
import yt from "./assets/yt.svg";
import x from "./assets/x.svg";
import li from "./assets/li.svg";
import fb from "./assets/fb.svg";
import insta from "./assets/insta.svg";
import hero from "./assets/hero.svg";
import growarrow from "./assets/growarrow.svg";
import shadowbox from "./assets/shadowbox.svg";
import { useNavigate } from "react-router";

export const Home = () => {
  const [url,setUrl] = useState("");
  const navigate = useNavigate();
  const [email,setEmail] = useState();

  const handleShorten = () => {
    const trimmedURL = url.trim();
  
    if (trimmedURL === "") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/${encodeURIComponent(trimmedURL)}`);
    }
  };
  

  return (
    <div>
      <Navbar />
      <section className="flex justify-between items-center py-[100px] md:px-[50px] px-[10px] lg:px-[100px]  ">
        <img
          src={hero}
          className="absolute w-[100%] md:top-4 lg:top-10 left-0 -z-10"
          alt=""
        />
        <div className="flex lg:mt-[50px] z-10 justify-center gap-[40px] flex-col">
          <h1 className="lg:text-[60px] md:text-left text-center md:text-[60px] text-3xl max-w-[650px] font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
            Transform Links, Enhance Engagement, Effortlessly
          </h1>
          <p className="font-[Inter] text-black flex max-w-[800px] lg:text-[20px]">
            Our short URL generator simplifies link sharing, making it easier
            for you to track clicks and optimize your marketing efforts.
            Experience the power of concise URLs that boost engagement and
            improve user experience.
          </p>
          <div className="flex flex-col md:flex-row md:gap-0 gap-2 w-full justify-start items-center">
            <div className="relative">
              <input
                onChange={(e)=> setUrl(e.target.value)}
                type="url"
                placeholder="Enter URL to shortern in one click!"
                className="bg-white py-[10px] lg:w-[600px] border-[1px] border-[#C5C5C5] border-r-0 rounded-full md:rounded-r-none placeholder:font-medium placeholder:text-[12px] placeholder:lg:text-[16px] text-[20px] pl-[60px] "
              />
              <img
                className="absolute top-[50%] -translate-y-[50%] w-[30px] h-auto left-[15px]"
                src={clip}
                alt=""
              />
            </div>
            <div>
              <button onClick={handleShorten} className="font-[Inter] rounded-l-full rounded-r-full md:rounded-tl-none md:rounded-bl-none text-nowrap text-[12px] lg:text-[20px] py-[10px] px-[20px] bg-[#3646F4] transition-colors border-[1px] border-[#3646F4] hover:bg-[#46A6FF] text-white font-bold">
                Shorten -{">"}
              </button>
            </div>
          </div>
        </div>
        <div className="z-10 hidden">
          <img className="w-[600px] h-auto" src={longvshort} alt="" />
        </div>
      </section>
      <section className="my-[50px] md:px-[50px] px-[10px] lg:px-[100px]">
        <div className="flex flex-col gap-[14px] justify-center items-end">
          <h3 className="text-[20px] font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8] text-right">
            Features
          </h3>
          <h1 className="md:text-[60px] text-3xl max-w-[800px] text-right font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
            Discover our Powerful URL Shortening Features
          </h1>
          <p className="text-[#707070] text-right md:text-[18px] max-w-[800px]">
            Transform long URLs into short, manageable links effortlessly. Our
            features are designed to enhance your link-sharing experience.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-around my-[50px] py-[10px] items-center">
          <div className="flex flex-col gap-[15px] justify-center items-center">
            <img className="w-[450px] h-auto" src={ft1} alt="" />
            <h1 className="font-[Inter] text-center font-bold text-[26px]">
              URL Shortening Made <br /> Simple
            </h1>
            <p className="font-[Inter]">Shorten your links in one click.</p>
          </div>
          <div className="flex flex-col gap-[15px] justify-center items-center">
            <img className="w-[450px] h-auto" src={ft2} alt="" />
            <h1 className="font-[Inter] text-center font-bold text-[26px]">
              Customizable links for
              <br /> your brand
            </h1>
            <p className="font-[Inter]">Customize the link the way you want.</p>
          </div>
          <div className="flex flex-col gap-[15px] justify-center items-center">
            <img className="w-[450px] h-auto" src={ft3} alt="" />
            <h1 className="font-[Inter] text-center font-bold text-[26px]">
              Analytics Tracking for
              <br /> Informed Decisions
            </h1>
            <p className="font-[Inter]">
              Monitor link performance with our detailed analytics.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[50px]">
          <div className="flex justify-center items-center">
            <button onClick={()=> navigate('/signup')} className="font-[Inter] hover:bg-[#3646F4] hover:text-white transition-colors cursor-pointer bg-white border-[1px] border-[#3646F4] text-[#3464f4] font-semibold md:text-[20px] py-[15px] px-[30px]">
              Learn More
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={()=> navigate('/signup')} className="hover:cursor-pointer transition-all ring-[#3464F4] py-[15px] px-[30px] hover:ring-[1px]">
              <pre className="font-[Inter] font-semibold md:text-[20px] text-[#3464f4]">
                Sign Up {">"}
              </pre>
            </button>
          </div>
        </div>
      </section>
      <section className="md:px-[50px] px-[10px] lg:px-[100px] my-[100px]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="flex flex-col gap-[14px] justify-center items-start">
            <h3 className="text-[20px] font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8] text-left">
              Simplify
            </h3>
            <h1 className="md:text-[60px] text-3xl max-w-[800px] text-left font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
              Transform Long Links into Short URL's
            </h1>
            <p className="text-[#707070] text-left text-[18px] max-w-[800px]">
              Using our URL shortening service is quick and easy. Follow these
              simple steps to create shareable links in no time.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center gap-4 flex-row-reverse">
              <img
                className="md:w-[100px] w-[40px] animate-box delay-200ms relative bottom-8"
                src={shadowbox}
                alt=""
              />
              <img
                className="md:w-[100px] w-[40px] animate-box delay-500ms relative bottom-6"
                src={shadowbox}
                alt=""
              />
              <img
                className="md:w-[100px] w-[40px] animate-box relative bottom-4"
                src={shadowbox}
                alt=""
              />
              <img
                className="md:w-[100px] w-[40px] animate-box  delay-800ms relative bottom-2"
                src={shadowbox}
                alt=""
              />
            </div>
            <div className="flex gap-4 flex-row-reverse">
              <img
                className="md:w-[100px] w-[40px] animate-box  delay-100ms relative bottom-8"
                src={shadowbox}
                alt=""
              />
              <img
                className="md:w-[100px] w-[40px] animate-box relative bottom-6"
                src={shadowbox}
                alt=""
              />
              <img
                className="md:w-[100px] w-[40px] animate-box delay-100ms relative bottom-4"
                src={shadowbox}
                alt=""
              />
              <img
                className="md:w-[100px] w-[40px] animate-box  relative bottom-2"
                src={shadowbox}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row my-[80px] justify-evenly items-center">
          <div className="flex flex-col max-w-[400px] justify-center items-center">
            <img className="" src={clipboard} alt="" />
            <h1 className="font-bold text-center text-2xl md:text-[32px]">
              Step 1: Enter your long URL
            </h1>
            <p>Type or paste your URL that you wish to shorten.</p>
          </div>
          <div className="flex flex-col text-center max-w-[400px] justify-center items-center">
            <img src={link} alt="" />
            <h1 className="font-bold text-center text-2xl md:text-[32px]">
              Step 2: Copy the generated short URL
            </h1>
            <p>Easily copy the generated URL that is now transformed.</p>
          </div>
          <div className="flex flex-col max-w-[400px] justify-center items-center">
            <img src={share} alt="" />
            <h1 className="font-bold text-center text-2xl md:text-[32px]">
              Step 3: Share the short URL easily
            </h1>
            <p>Share the link across your audience</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-[50px]">
          <div className="flex justify-center items-center">
            <button onClick={()=> navigate('/dashboard')} className="font-[Inter] hover:bg-[#3646F4] hover:text-white transition-colors cursor-pointer bg-white border-[1px] border-[#3646F4] text-[#3464f4] font-semibold text-[20px] py-[15px] px-[30px]">
              Shorten
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={()=> navigate('/signup')} className="hover:cursor-pointer transition-all ring-[#3464F4] py-[15px] px-[30px] hover:ring-[1px]">
              <pre className="font-[Inter] font-semibold text-[20px] text-[#3464f4]">
                Learn More {">"}
              </pre>
            </button>
          </div>
        </div>
      </section>
      <section className="md:px-[50px] px-[10px] lg:px-[100px]">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <img className="lg:w-[650px] w-[90%] animated-arrow" src={growarrow} alt="" />
          <div className="flex flex-col gap-[14px] justify-center items-end">
            <h1 className="text-[60px] max-w-[800px] text-left font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
              Customer Testimonials
            </h1>
            <p className="text-[#707070] text-left text-[18px] max-w-[800px]">
              Here are some reviews from our recent customers on how there
              experience was with us.
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-[50px] my-[50px] justify-center items-center">
            {/* {...reviewDiv} */}
            <Slider />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-10 my-[50px] md:px-[50px] px-[10px] lg:px-[100px]">
        <div className="">
          <h1 className="text-[60px] text-center font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
            FAQ's
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <Accordion
            que="What is a short URL?"
            ans="A short URL is a condensed version of a long web link. It makes sharing links easier, looks cleaner, and is perfect for social media, emails, or anywhere you want to avoid messy, lengthy URLs."
          />
          <Accordion
            que="How do I create one?"
            ans="Just head over to ClipURL, paste your long link into the input box, and click Shorten. Boom—your shiny new short URL is ready to use."
          />
          <Accordion
            que="Is it free to use?"
            ans="Yes! ClipURL is completely free to use. Shorten as many links as you like, without any hidden costs or subscriptions."
          />
          <Accordion
            que="Can I track the clicks?"
            ans="Absolutely! With ClipURL, you can track how many times your short link has been clicked, giving you insights into your audience's engagement."
          />
          <Accordion
            que="Are there any limits?"
            ans="Nope! With ClipURL, there are no limits on how many links you can shorten or how many clicks they can receive. Shorten away without worrying about restrictions."
          />
        </div>
        <h3 className="text-[20px] font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8] text-center">
          Still got any questions?
        </h3>
        <div className="flex justify-center items-center">
          <button className="font-[Inter] hover:bg-[#3646F4] hover:text-white transition-colors cursor-pointer bg-white border-[1px] border-[#3646F4] text-[#3464f4] font-semibold text-[20px] py-[15px] px-[30px]">
            Contact Us -{">"}
          </button>
        </div>
      </section>
      <section className="text-white flex flex-col gap-10 bg-[#3646f4] font-[inter] md:px-[50px] px-[10px] lg:px-[100px] w-full">
  {/* Top CTA Section */}
  <div className="flex flex-col md:flex-row justify-between py-8 gap-6 md:gap-0">
    <div className="flex flex-col justify-center items-start">
      <h1 className="font-bold text-xl">Login Now to Begin</h1>
      <p className="text-sm">
        Access features like analytics and unlimited link generation.
      </p>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4">
        <input
          type="email"
          onChange={(e)=> setEmail(e.target.value)}
          className="bg-white px-4 py-2 h-14 text-black font-[Inter] placeholder:font-medium flex-1"
          placeholder="Enter your email here"
        />
        <button onClick={()=> navigate(`/signup/${encodeURI(email)}`)} className="bg-white h-14 text-[#3646f4] font-[Inter] font-semibold px-6">
          Join
        </button>
      </div>
      <p className="text-xs text-center sm:text-left">
        By joining you accept our T&C and Privacy Policy.
      </p>
    </div>
  </div>

  {/* Footer Links Section */}
  <div className="flex flex-wrap justify-between items-start gap-y-8">
    {/* Logo */}
    <div className="w-full sm:w-1/2 lg:w-auto flex justify-center sm:justify-start">
      <a href="">
        <img
          className="invert-[98%] sepia-[2%] saturate-[9%] hue-rotate-[5deg] brightness-0 contrast-[105%] w-[150px]"
          src={logo}
          alt="logo"
        />
      </a>
    </div>

    {/* Reusable Link Group */}
    {[
      {
        title: "Useful Links",
        links: ["About Us", "Contact Us", "Help Center", "Blog Posts", "FAQ's"],
      },
      {
        title: "Social Links",
        links: [
          "Facebook Page",
          "Twitter Feed",
          "Instagram Profile",
          "LinkedIn Page",
          "YouTube Channel",
        ],
      },
      {
        title: "Legal Info",
        links: [
          "User Agreement",
          "Cookie Policy",
          "Privacy Policy",
          "Terms & Conditions",
          "Feedback Form",
        ],
      },
      {
        title: "Contact Info",
        links: ["Email Us", "Call Us", "Visit Center"],
      },
    ].map((group, idx) => (
      <div
        key={idx}
        className="w-1/2 sm:w-1/3 lg:w-auto flex flex-col items-start gap-2"
      >
        <h1 className="font-bold text-[18px]">{group.title}</h1>
        <div className="flex flex-col gap-1 text-sm">
          {group.links.map((link, i) => (
            <a
              key={i}
              className="text-white hover:text-[#46A6FF]"
              href=""
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>

  {/* Bottom Section */}
  <div className="text-sm my-10 flex flex-col sm:flex-row justify-between items-center gap-4">
    <p className="text-center sm:text-left">
      © ClipURL {new Date().getFullYear()}, All rights Reserved
    </p>
    <div className="flex gap-3 justify-center items-center">
      {[insta, fb, x, li, yt].map((icon, i) => (
        <a key={i} href="">
          <img className="w-8" src={icon} alt="icon" />
        </a>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};
