import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { CustomerReview } from './CustomerReview'  // Your component
import prathvi from '../assets/prathvi.svg'
import arav from '../assets/arav.svg'
import krish from '../assets/krish.svg'
import mukal from '../assets/self.svg'
import sumit from '../assets/sumit.svg'
import vedant from '../assets/vedant.svg'

export const Slider = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 5,
      spacing: 15,
    },
    created(slider) {
      setInterval(() => {
        slider.next()
      }, 3000)
    }
  })
  

  const reviews = [
    {
      name: "Mukal Markanda",
      rating: 4,
      quote:
        "This URL shortner literally saved my life when i was dieing from cancer. Due to this shortner I am living to write this review right now. Thank you clip URL, without you my life might have got clipped.",
      imge: mukal
    },
    {
      name: "Ankush Kharb",
      rating: 4,
      quote:
      "After using this URL shortner i was easily able to share links with my friends and get some clean looking links instead of some big hefty links.",
      imge: null
    },
    {
      name: "Krish Negi",
      rating: 5,
      quote:
      "I never heard of a concept like this that i can change the look of my link and still get to same destination! And even can customize it. Loved Using this shortner, great experience.",
      imge: krish
    },
    {
      name: "Prathvi Gupta",
      rating: 4,
      quote:
      "Was able to quickly short my big links in matter of seconds and was also able to track how many clicks I got and at what time I got them. Really great site!",
      imge: prathvi
    },
    {
      name: "Sumit Kumar",
      rating: 5,
      quote:
      "One of the best URL shortners out there, I was easily able to track all my links and manage them accordingly!. And all of this for at 0 cost!!!, love this platform.",
      imge: sumit
    },
    {
      name: "Arav Tyagi",
      rating: 4,
      quote:
      "Great experience, was able to instantly short my links. 10/10 recommended",
      imge: arav
    },
    {
      name: "Vedant Lootera",
      rating: 5,
      quote:
      "One of a kind website. I can now finally share compact URL's along with my audience. Thanks ClipURL",
      imge: vedant
    },
  ];

  return (
    <div ref={sliderRef} className="keen-slider w-fit mx-auto py-8">
      {reviews.map((item, index) => (
        <div key={index} className="keen-slider__slide py-[50px] flex justify-center">
          <CustomerReview 
            name={item.name} 
            rating={item.rating} 
            review={item.quote} 
            imge={item.imge} 
          />
        </div>
      ))}
    </div>
  )
}
