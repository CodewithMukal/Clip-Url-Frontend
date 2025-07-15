import React from "react";
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
import { useNavigate } from "react-router";
import prop from "./assets/prop.svg";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="flex bg-gradient-to-b from-white justify-between items-center py-[100px] px-[100px] to-[#EFFBFD] ">
        <div className="flex mt-[50px] z-10 justify-center gap-[40px] flex-col">
          <h1 className="text-[60px] max-w-[650px] font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
            Transform Links, Enhance Engagement, Effortlessly
          </h1>
          <p className="font-[Inter] max-w-[800px] text-[20px]">
            Our short URL generator simplifies link sharing, making it easier
            for you to track clicks and optimize your marketing efforts.
            Experience the power of concise URLs that boost engagement and
            improve user experience.
          </p>
          <div className="flex w-full justify-start items-center">
            <div className="relative">
              <input
                type="url"
                placeholder="Enter URL to shortern in one click!"
                className="bg-white py-[10px] w-[600px] border-[1px] border-[#C5C5C5] border-r-0 rounded-l-full placeholder:font-medium placeholder:text-[16px] text-[20px] pl-[60px] "
              />
              <img
                className="absolute top-[50%] -translate-y-[50%] w-[30px] h-auto left-[15px]"
                src={clip}
                alt=""
              />
            </div>
            <div>
              <button className="font-[Inter] rounded-r-full text-nowrap text-[20px] py-[10px] px-[20px] bg-[#3646F4] transition-colors border-[1px] border-l-0 border-[#3646F4] hover:bg-[#46A6FF] text-white font-bold">
                Shorten -{">"}
              </button>
            </div>
          </div>
        </div>
        <div className="z-10">
          <img className="w-[600px] h-auto" src={longvshort} alt="" />
        </div>
      </section>
      <section className="my-[50px] px-[100px]">
        <div className="flex flex-col gap-[14px] justify-center items-end">
          <h3 className="text-[20px] font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8] text-right">
            Features
          </h3>
          <h1 className="text-[60px] max-w-[800px] text-right font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
            Discover our Powerful URL Shortening Features
          </h1>
          <p className="text-[#707070] text-right text-[18px] max-w-[800px]">
            Transform long URLs into short, manageable links effortlessly. Our
            features are designed to enhance your link-sharing experience.
          </p>
        </div>
        <div className="flex justify-around my-[50px] py-[10px] items-center">
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
            <button className="font-[Inter] hover:bg-[#3646F4] hover:text-white transition-colors cursor-pointer bg-white border-[1px] border-[#3646F4] text-[#3464f4] font-semibold text-[20px] py-[15px] px-[30px]">
              Learn More
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button className="hover:cursor-pointer transition-all ring-[#3464F4] py-[15px] px-[30px] hover:ring-[1px]">
              <pre className="font-[Inter] font-semibold text-[20px] text-[#3464f4]">
                Sign Up {">"}
              </pre>
            </button>
          </div>
        </div>
      </section>
      <section className="px-[100px] my-[100px]">
        <div className="flex flex-col gap-[14px] justify-center items-start">
          <h3 className="text-[20px] font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8] text-left">
            Simplify
          </h3>
          <h1 className="text-[60px] max-w-[800px] text-left font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
            Transform Long Links into Short URL's
          </h1>
          <p className="text-[#707070] text-left text-[18px] max-w-[800px]">
            Using our URL shortening service is quick and easy. Follow these
            simple steps to create shareable links in no time.
          </p>
        </div>
        <div className="flex my-[80px] justify-evenly items-center">
          <div className="flex flex-col max-w-[400px] justify-center items-center">
            <img src={clipboard} alt="" />
            <h1 className="font-bold text-center text-[32px]">
              Step 1: Enter your long URL
            </h1>
            <p>Type or paste your URL that you wish to shorten.</p>
          </div>
          <div className="flex flex-col max-w-[400px] justify-center items-center">
            <img src={link} alt="" />
            <h1 className="font-bold text-center text-[31px]">
              Step 2: Copy the generated short URL
            </h1>
            <p>Easily copy the generated URL that is now transformed.</p>
          </div>
          <div className="flex flex-col max-w-[400px] justify-center items-center">
            <img src={share} alt="" />
            <h1 className="font-bold text-center text-[32px]">
              Step 3: Share the short URL easily
            </h1>
            <p>Share the link across your audience</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-[50px]">
          <div className="flex justify-center items-center">
            <button className="font-[Inter] hover:bg-[#3646F4] hover:text-white transition-colors cursor-pointer bg-white border-[1px] border-[#3646F4] text-[#3464f4] font-semibold text-[20px] py-[15px] px-[30px]">
              Shorten
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button className="hover:cursor-pointer transition-all ring-[#3464F4] py-[15px] px-[30px] hover:ring-[1px]">
              <pre className="font-[Inter] font-semibold text-[20px] text-[#3464f4]">
                Learn More {">"}
              </pre>
            </button>
          </div>
        </div>
      </section>
      <section className="px-[100px]">
        <div className="flex flex-col gap-[14px] justify-center items-end">
          <h1 className="text-[60px] max-w-[800px] text-left font-bold font-[Inter] text-transparent bg-clip-text bg-gradient-to-br from-[#009661] to-[#51AEC8]">
            Customer Testimonials
          </h1>
          <p className="text-[#707070] text-left text-[18px] max-w-[800px]">
            Here are some reviews from our recent customers on how there
            experience was with us.
          </p>
        </div>
        <div>
          <div className="flex gap-[50px] my-[50px] justify-center items-center">
            {/* {...reviewDiv} */}
            <Slider />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-10 my-[50px] px-[100px]">
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
      <section className="text-white flex flex-col gap-10 bg-[#3646f4] font-[inter] px-[100px] w-[100%] ">
        <div className="flex justify-between py-8">
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-bold text-xl">Login Now to Begin</h1>
            <p className="text-[14px]">
              Access features like analytics and unlimited link generation.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center gap-6">
              <input
                type="email"
                className="bg-white px-10 pl-2 h-14 text-black font-[Inter] placeholder:font-medium"
                placeholder="Enter your email here"
              />
              <button className="bg-white h-14 text-[#3646f4] font-[Inter] font-semibold px-8 ">
                <p>Join</p>
              </button>
            </div>
            <div>
              <p className="text-[12px]">
                By joining you accept our T&C and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-start">
          <div>
            <a href="">
              <img
                className="invert-[98%] sepia-[2%] saturate-[9%] hue-rotate-[5deg] brightness-0  contrast-[105%]"
                src={logo}
                alt=""
              />
            </a>
          </div>
          <div className="flex justify-center gap-4 items-start flex-col">
            <h1 className="font-bold text-[18px]">Useful Links</h1>
            <div className="flex gap-4 flex-col">
              <a className="text-white hover:text-[#46A6FF]" href="">
                About Us
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Contact Us
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Help Center
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Blog Posts
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                FAQ's
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-4 items-start flex-col">
            <h1 className="font-bold text-[18px]">Social Links</h1>
            <div className="flex gap-4 flex-col">
              <a className="text-white hover:text-[#46A6FF]" href="">
                Facebook Page
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Twitter Feed
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Instagram Profile
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                LinkedIn Page
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                YouTube Channel
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-4 items-start flex-col">
            <h1 className="font-bold text-[18px]">Legal Info</h1>
            <div className="flex gap-4 flex-col">
              <a className="text-white hover:text-[#46A6FF]" href="">
                User Agreement
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Cookie Policy
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Privacy Policy
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Terms & Conditions
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Feedback Form
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-4 items-start flex-col">
            <h1 className="font-bold text-[18px]">Contact Info</h1>
            <div className="flex gap-4 flex-col">
              <a className="text-white hover:text-[#46A6FF]" href="">
                Email Us
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Call Us
              </a>
              <a className="text-white hover:text-[#46A6FF]" href="">
                Visit Center
              </a>
            </div>
          </div>
        </div>
        <div className="text-[14px] my-[40px] flex justify-between items-center">
          © ClipURL {new Date().getFullYear()}, All rights Reserved
          <div className="flex gap-3 justify-center items-center">
            <a className="blue" href="">
              <img className="w-8" src={insta} alt="" />
            </a>
            <a className="blue" href="">
              <img className="w-8" src={fb} alt="" />
            </a>
            <a className="blue" href="">
              <img className="w-8" src={x} alt="" />
            </a>
            <a className="blue" href="">
              <img className="w-8" src={li} alt="" />
            </a>
            <a className="blue" href="">
              <img className="w-8" src={yt} alt="" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
