'use client'

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import {BoxReveal} from "@/components/ui/BoxReveal";

export default function ContactUs() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <>
      <Navbar />
        <div className="min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
            <BoxReveal boxColor={"#fcfcfc"} duration={0.5}>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 py- text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                    qui officia deserunt mollit anim id est laborum.
                </p>
            </BoxReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Contact Us</h2>
                    <form className="space-y-6">
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        </div>
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        </div>
                        <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                        </div>
                        <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send Message
                        </button>
                        </div>
                    </form>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Team</h2>
                <div className="space-y-6">
                    <div>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.6}>
                        <h3 className="block text-lg font-semibold text-gray-800">
                            Lance
                        </h3>
                    </BoxReveal>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.7}>
                        <p className="mt-1 text-gray-600">
                            Full Stack Developer
                        </p>
                    </BoxReveal>
                    </div>
                    
                    <div>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.6}>
                        <h3 className="block text-lg font-semibold text-gray-800">
                            Lynn
                        </h3>
                    </BoxReveal>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.7}>
                        <p className="mt-1 text-gray-600">
                            Full Stack Developer
                        </p>
                    </BoxReveal>
                    </div>
                    
                    <div>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.7}>
                        <h3 className="block text-lg font-semibold text-gray-800">
                            Assem
                        </h3>
                    </BoxReveal>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.7}>
                        <p className="mt-1 text-gray-600">
                            Full Stack Developer
                        </p>
                    </BoxReveal>
                    </div>
                    
                    <div>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.7}>
                        <h3 className="block text-lg font-semibold text-gray-800">
                            Majed
                        </h3>
                    </BoxReveal>
                    <BoxReveal boxColor={"#fcfcfc"} duration={0.7}>
                        <p className="mt-1 text-gray-600">
                            Full Stack Developer
                        </p>
                    </BoxReveal>
                    </div>
                </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                    Contact us at{' '}
                    <a href="mailto:team@example.com" className="font-medium text-indigo-600 hover:text-indigo-500">
                    team@example.com
                    </a>
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
      <Footer />
    </>
  )
}