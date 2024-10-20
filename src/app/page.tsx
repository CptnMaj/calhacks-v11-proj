"use client";

// pages/index.tsx
import { motion } from "framer-motion";
import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";

import Image from "next/image";

// import styled from 'styled-components';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Interactive Q&A Sessions",
    description:
      "Engage with AI-driven questions based on your presentation content to prepare for any audience.",
    icon: "🗣️",
  },
  {
    title: "Heckling and De-escalation Training",
    description:
      "Learn effective strategies to handle aggressive viewers and maintain composure during presentations.",
    icon: "🛡️",
  },
  {
    title: "Real-Time Feedback",
    description:
      "Receive instant tips and guidance to improve your delivery and performance on the fly.",
    icon: "⏱️",
  },
  {
    title: "Presentation Timer",
    description:
      "Manage your presentation time efficiently with a built-in countdown and warnings.",
    icon: "⏰",
  },
  {
    title: "Extended Communication Skills",
    description:
      "Enhance your ability to hold longer conversations, initiate dialogues, and resolve conflicts.",
    icon: "💬",
  },
  {
    title: "Voice and Video Recording",
    description:
      "Record your presentations to review and analyze your performance for continuous improvement.",
    icon: "🎥",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// const Marquee = styled.div`
//     position: absolute;
//     width: 100%;
//     bottom: -58.5em;
//     margin: 0 auto;
//     white-space: nowrap;
//     overflow: hidden;
//     z-index: 3;
//     display: flex;

//   span {
//     text-transform: uppercase;
//     font-weight: 350;
//     color: ##cfcbc4;
//     font-size: 4em;
//     text-transform: uppercase;
//     padding-left: -10%;
//     animation: marquee-animation 75s linear infinite;
//     @media (max-width: 900px) {
//       font-size: 2.4em;
//     }
//     @media (max-width: 468px) {
//       font-size: 1.3em;
//     }
//   }

//   @keyframes marquee-animation {
//     0% {
//       transform: translate(0, 0);
//     }
//     100% {
//       transform: translate(-100%, 0);
//     }
//   }
// `

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Vocis - Master Your Presentation Skills</title>
        <meta
          name="description"
          content="Vocis is an AI-powered platform that enhances your presentation and speech skills through interactive training and real-time feedback."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <Container className="flex flex-col items-center justify-center py-20 text-center">
            <motion.h1
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Elevate Your Presentation Skills with Vocis
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Overcome public speaking anxiety, master interactive Q&A sessions,
              handle hecklers, and receive real-time feedback to deliver
              impactful presentations every time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/get-started">
                <Button size="lg" variant="default">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </Container>{" "}
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100">
          <Container>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl font-semibold"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Key Features
              </motion.h2>
              <motion.p
                className="text-gray-600 mt-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Vocis offers a comprehensive suite of tools designed to enhance
                every aspect of your presentation skills.
              </motion.p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex items-center justify-center text-4xl">
                      {feature.icon}
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-xl font-semibold mb-2">
                        {feature.title}
                      </CardTitle>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* Call to Action Section */}
        <section className="py-20">
          <Container className="text-center">
            <motion.h2
              className="text-3xl font-semibold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Ready to Transform Your Presentation Skills?
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join Vocis today and start your journey towards becoming a
              confident and effective presenter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/get-started">
                <Button size="lg" variant="primary">
                  Get Presenting!!
                </Button>
              </Link>
            </motion.div>
          </Container>
        </section>

        <Image
          src="https://thispersondoesnotexist.com"
          width={300}
          height={300}
          alt=""
        ></Image>
        {/* Upload Slides Section */}
        {/* <section className="py-20 bg-white">
          <Container>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-semibold">Slide Technology</h2>
              <p className="text-gray-600 mt-4">
                Cal-Hacks 11.0 Project 📋
              </p>
            </motion.div>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              
            </motion.div>
          </Container>
        </section> */}
      </main>
      {/* <Marquee>
        <span>
          &nbsp; CalHacks 11.0 &nbsp; / &nbsp; Skyline College
          &nbsp; / &nbsp; Vosic Team &nbsp; / &nbsp; Presentation Skills &nbsp; /
          &nbsp; Lucent Saba&apos;a Studios &nbsp; / &nbsp; Community Partnership &nbsp; /
          &nbsp; Hackathon &nbsp; / &nbsp; Lynn &nbsp; / &nbsp; Lance &nbsp; / &nbsp; 
          Majed &nbsp; /  &nbsp; Assem
        </span>
      </Marquee> */}

      <Footer />
    </>
  );
};

export default Home;
