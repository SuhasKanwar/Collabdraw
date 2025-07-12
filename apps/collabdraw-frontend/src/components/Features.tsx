"use client";
import {
  Check,
  MessageCircle,
  Users,
  Zap,
  Palette,
  Share2,
  Lock,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useState } from "react";

const featuresData = [
  {
    id: 1,
    badge: {
      icon: MessageCircle,
      text: "Communication",
      color: "text-blue-500",
    },
    title: "Enhanced Team Communication",
    subtitle: "Real-Time Messaging",
    description:
      "Simplify team discussions and collaboration with our efficient messaging features, enabling swift decision-making and project progress tracking.",
    content:
      "Our platform offers instantaneous messaging to keep your team connected and responsive. This ensures that all team members are aligned and can react quickly to any updates or changes.",
    features: [
      "Instant message delivery",
      "User status indicators (online, offline, busy)",
      "Group and private chat options",
    ],
    mockup: {
      type: "chat",
      title: "Team Canvas",
      onlineCount: 4,
      messages: [
        {
          user: "A",
          name: "Prosper",
          time: "2:34 PM",
          message: "wdyt about last changes?",
          gradient: "from-blue-400 to-purple-400",
        },
        {
          user: "S",
          name: "Suka",
          time: "2:35 PM",
          message: "looks great, ship it!",
          gradient: "from-pink-400 to-orange-400",
        },
        {
          user: "You",
          name: "You",
          time: "2:36 PM",
          message: "Perfect! I'll push the updates now 🚀",
          isUser: true,
        },
      ],
      typing: "Suhas Kanwar is typing...",
    },
  },
  {
    id: 2,
    badge: { icon: Palette, text: "Creative Tools", color: "text-purple-500" },
    title: "Advanced Drawing Features",
    subtitle: "Professional Art Tools",
    description:
      "Access a comprehensive suite of drawing tools designed for both beginners and professional artists to create stunning collaborative artwork.",
    content:
      "From precision brushes to advanced layer management, our tools provide everything you need to bring your creative vision to life in a collaborative environment.",
    features: [
      "Multiple brush types and sizes",
      "Layer management system",
      "Color palettes and gradients",
      "Vector and raster support",
    ],
    mockup: {
      type: "tools",
      title: "Drawing Tools",
      tools: [
        { name: "Brush", active: true },
        { name: "Pen", active: false },
        { name: "Eraser", active: false },
        { name: "Shape", active: false },
      ],
      colors: [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FECA57",
        "#FF9FF3",
      ],
    },
  },
  {
    id: 3,
    badge: { icon: Share2, text: "Collaboration", color: "text-green-500" },
    title: "Seamless Project Sharing",
    subtitle: "Share & Export",
    description:
      "Easily share your collaborative projects with team members and export in multiple formats for presentations or further editing.",
    content:
      "Our sharing system allows you to control access levels, set permissions, and export your work in various formats suitable for different use cases.",
    features: [
      "Real-time collaboration",
      "Permission-based sharing",
      "Multiple export formats",
      "Version history tracking",
    ],
    mockup: {
      type: "share",
      title: "Project Gallery",
      projects: [
        { name: "Design Sprint #1", collaborators: 4, date: "Today" },
        { name: "Brand Mockups", collaborators: 2, date: "Yesterday" },
        { name: "UI Wireframes", collaborators: 6, date: "2 days ago" },
      ],
    },
  },
  {
    id: 4,
    badge: { icon: Lock, text: "Security", color: "text-red-500" },
    title: "Enterprise Security",
    subtitle: "Secure Collaboration",
    description:
      "Your creative work is protected with enterprise-grade security features, ensuring your intellectual property remains safe.",
    content:
      "We implement industry-standard security protocols to protect your data, with encrypted connections and secure storage solutions.",
    features: [
      "End-to-end encryption",
      "Secure cloud storage",
      "Access control management",
      "Compliance certifications",
    ],
    mockup: {
      type: "security",
      title: "Security Dashboard",
      stats: [
        { label: "Encrypted Sessions", value: "100%" },
        { label: "Secure Storage", value: "256-bit" },
        { label: "Uptime", value: "99.9%" },
      ],
    },
  },
];

export default function Features() {
  const [activeTools, setActiveTools] = useState<{ [key: number]: string }>({
    2: "Brush"
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const handleToolClick = (featureId: number, toolName: string) => {
    setActiveTools((prev) => ({
      ...prev,
      [featureId]: toolName,
    }));
  };

  const renderMockup = (mockup: any, featureId?: number) => {
    switch (mockup.type) {
      case "chat":
        return (
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-2xl">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">{mockup.title}</span>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-400">
                  {mockup.onlineCount} online
                </span>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {mockup.messages.map((msg: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.isUser ? "justify-end" : "items-start gap-3"
                  }`}
                >
                  {!msg.isUser && (
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${msg.gradient} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {msg.user}
                    </div>
                  )}
                  <div className={msg.isUser ? "max-w-xs" : ""}>
                    <div
                      className={`text-xs text-gray-400 mb-1 ${
                        msg.isUser ? "text-right" : ""
                      }`}
                    >
                      {msg.name} • {msg.time}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 max-w-xs ${
                        msg.isUser
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-200"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span>{mockup.typing}</span>
            </div>
          </div>
        );

      case "tools":
        return (
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-2xl">
            <div className="text-white font-semibold mb-6">{mockup.title}</div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {mockup.tools.map((tool: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() =>
                      featureId && handleToolClick(featureId, tool.name)
                    }
                    className={`p-3 rounded-lg border transition-all duration-200 transform hover:scale-101 ${
                      activeTools[featureId || 2] === tool.name
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg"
                        : "bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700"
                    }`}
                  >
                    {tool.name}
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <div className="text-sm text-gray-400 mb-3">Color Palette</div>
                <div className="flex gap-2">
                  {mockup.colors.map((color: string, idx: number) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border-2 border-gray-600"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "share":
        return (
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-2xl">
            <div className="text-white font-semibold mb-6">{mockup.title}</div>
            <div className="space-y-3">
              {mockup.projects.map((project: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-white font-medium">{project.name}</div>
                    <div className="text-xs text-gray-400">{project.date}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    {project.collaborators} collaborators
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-2xl">
            <div className="text-white font-semibold mb-6">{mockup.title}</div>
            <div className="space-y-4">
              {mockup.stats.map((stat: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-600"
                >
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="container mx-auto py-20 px-4">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-200 shadow-lg border border-gray-700 mb-6">
          <Zap className="w-4 h-4 text-green-500" />
          Features
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Powerful Collaboration Tools
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Experience seamless teamwork with our comprehensive suite of
          collaborative drawing and communication tools designed for modern
          teams.
        </p>
      </motion.div>

      <motion.div
        className="space-y-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {featuresData.map((feature, index) => {
          const isReversed = index % 2 === 1;

          return (
            <motion.div
              key={feature.id}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.1,
                },
              }}
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.95,
              }}
              viewport={{
                once: false,
                amount: 0.2,
                margin: "0px 0px -100px 0px",
              }}
              className="max-w-8xl mx-auto bg-gray-900/80 backdrop-blur-sm rounded-2xl px-16 py-18 shadow-lg"
            >
              <div
                className={`grid lg:grid-cols-2 gap-36 items-center ${
                  isReversed ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <motion.div
                  className={`space-y-8 ${
                    isReversed ? "lg:col-start-2" : ""
                  }`}
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {feature.content}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {feature.features.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.3 + idx * 0.1,
                          },
                        }}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className={`relative ${isReversed ? "lg:col-start-1" : ""}`}
                  initial={{
                    opacity: 0,
                    x: isReversed ? -50 : 50,
                    rotateY: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.3 },
                  }}
                >
                  {renderMockup(feature.mockup, feature.id)}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}