import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { MapPin, Compass, Users } from "lucide-react";

function Hero() {
  return (
    <div className="flex items-center flex-col text-center justify-center min-h-screen py-16 bg-background text-foreground transition-colors">
      <div className="px-6 md:px-24 flex flex-col items-center justify-center gap-10 max-w-5xl w-full">
        
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="font-extrabold text-3xl md:text-5xl text-neutral-900 dark:text-neutral-100 leading-snug">
            Embark on Electrifying <br /> Adventures with
          </h1>
          <h1 className="font-extrabold text-5xl md:text-8xl text-red-600 dark:text-red-400">
              TripEase
          </h1>
        </div>

        {/* Description */}
        <p className="text-base md:text-xl font-medium text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Your trusted trip planner and adventure guide.
        </p>

        {/* CTA Button */}
        <Link to="/create-trip">
          <Button className="text-base md:text-lg px-6 py-3 shadow-lg hover:shadow-xl transition-shadow">
            Get Started – It's Free
          </Button>
        </Link>

        {/* Features Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full">
  {[
    { 
      icon: <MapPin className="h-8 w-8 text-blue-500 transition-transform group-hover:scale-110" />, 
      title: "AI-Powered Itineraries", 
      desc: "Create personalized daily travel plans tailored for you." 
    },
    { 
      icon: <Compass className="h-8 w-8 text-green-500 transition-transform group-hover:scale-110" />, 
      title: "Flight Search", 
      desc: "Find the best flight options for your next adventure." 
    },
    { 
      icon: <Users className="h-8 w-8 text-purple-500 transition-transform group-hover:scale-110" />, 
      title: "PDF Export", 
      desc: "Download and carry your itinerary anytime, anywhere." 
    }
  ].map((feature, index) => (
    <div
      key={index}
      className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md hover:shadow-lg transition-all"
    >
      {feature.icon}
      <p className="font-semibold">{feature.title}</p>
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        {feature.desc}
      </span>
    </div>
  ))}
</div>


      </div>
    </div>
  )
}

export default Hero
