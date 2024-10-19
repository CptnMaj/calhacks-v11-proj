// pages/about.tsx


'use client';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

import Image from 'next/image'

const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>About -</title>
        <meta
          name="description"
          content="Learn more about the project, our mission to enhance your presentation skills through interactive training and real-time feedback."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <Container className="py-16">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              is dedicated to empowering individuals to deliver impactful presentations through AI-driven feedback and interactive training tools.
            </p>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card>
                <CardHeader className="flex items-center justify-center mb-4">
                <Image src="/icons/feedback.svg" alt="Feedback Icon" width={48} height={48} className="w-12 h-12" />
                </CardHeader>
                <CardContent>
                  <CardTitle>AI-Driven Feedback</CardTitle>
                  <p className="text-gray-600">
                    Receive instant, personalized feedback on your presentation skills to continuously improve.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card>
                <CardHeader className="flex items-center justify-center mb-4">
                  <Image src="/icons/transcript.svg" alt="Transcript Icon" className="w-12 h-12" />
                </CardHeader>
                <CardContent>
                  <CardTitle>Real-Time Transcription</CardTitle>
                  <p className="text-gray-600">
                    Access accurate transcriptions of your presentations to review and analyze your performance.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card>
                <CardHeader className="flex items-center justify-center mb-4">
                  <Image src="/icons/slides.svg" alt="Slides Icon" className="w-12 h-12" />
                </CardHeader>
                <CardContent>
                  <CardTitle>Interactive Slide Viewer</CardTitle>
                  <p className="text-gray-600">
                    Seamlessly integrate your slides to enhance your presentation experience and visual storytelling.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card>
                <CardHeader className="flex items-center justify-center mb-4">
                  <Image src="/icons/analytics.svg" alt="Analytics Icon" className="w-12 h-12" />
                </CardHeader>
                <CardContent>
                  <CardTitle>Performance Analytics</CardTitle>
                  <p className="text-gray-600">
                    Gain insights into your presentation patterns and track your improvement over time with detailed analytics.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 5 */}
              <Card>
                <CardHeader className="flex items-center justify-center mb-4">
                  <Image src="/icons/team.svg" alt="Team Icon" className="w-12 h-12" />
                </CardHeader>
                <CardContent>
                  <CardTitle>Collaborative Tools</CardTitle>
                  <p className="text-gray-600">
                    Work together with peers and mentors to refine your presentation skills through collaborative sessions.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6 */}
              <Card>
                <CardHeader className="flex items-center justify-center mb-4">
                  <Image src="/icons/support.svg" alt="Support Icon" className="w-12 h-12" />
                </CardHeader>
                <CardContent>
                  <CardTitle>24/7 Support</CardTitle>
                  <p className="text-gray-600">
                    Our dedicated support team is always here to help you with any questions or technical issues.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Our Mission</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto">
              At , our mission is to democratize effective communication by providing accessible and intelligent tools that help individuals excel in their presentations, whether in professional settings, academic environments, or personal endeavors.
            </p>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Meet Our CEOs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* CEO 1 */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/team/assem-alghaithi.jpg"
                  alt="Assem Alghaithi"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-800">Assem Alghaithi</h3>
                <p className="text-gray-600">Chief Operating Officer</p>
              </div>

              {/* CEO 2 */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/team/majed-elqossari.jpg"
                  alt="Majed Elqossari"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-800">Majed Elqossari</h3>
                <p className="text-gray-600">Chief Operating Officer</p>
              </div>

              {/* CEO 3 */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/team/lynn-aung.jpg"
                  alt="Lynn Aung"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-800">Lynn Aung</h3>
                <p className="text-gray-600">Chief Operating Officer</p>
              </div>

              {/* CEO 4 */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/team/lance-ruiz.jpg"
                  alt="Lance Ruiz"
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-800">Lance Ruiz</h3>
                <p className="text-gray-600">Chief Technology Officer</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Ready to Enhance Your Presentation Skills?</h2>
            <p className="text-gray-600 mb-8">Join thousands of users who have transformed their presentations with .</p>
            <Link href="/get-started">
              <Button variant="primary" size="lg">
                Get Started Now
              </Button>
            </Link>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default About;
