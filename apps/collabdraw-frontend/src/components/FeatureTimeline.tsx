"use client";
import { motion } from "motion/react";
import {
  MessageSquare,
  Zap,
  BarChart3,
  Users,
  Shield,
  Clock,
  Palette,
  Globe,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Real-time Messaging",
    description:
      "Instantly communicate with your team, ensuring swift decision-making and seamless collaboration on project tasks and updates.",
  },
  {
    id: 2,
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together in real-time with multiple users on the same canvas, seeing live cursors and changes as they happen.",
  },
  {
    id: 3,
    icon: Palette,
    title: "Advanced Drawing Tools",
    description:
      "Access professional-grade drawing tools including brushes, shapes, layers, and color palettes for creating stunning artwork.",
  },
  {
    id: 4,
    icon: Zap,
    title: "Task Management",
    description:
      "Organize and prioritize tasks effectively, assigning responsibilities and tracking progress to keep projects on schedule and within scope.",
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Get detailed insights into team productivity, project progress, and collaboration patterns with comprehensive analytics dashboard.",
  },
  {
    id: 6,
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Protect your work with enterprise-grade security features including end-to-end encryption and secure cloud storage.",
  },
  {
    id: 7,
    icon: Clock,
    title: "Version History",
    description:
      "Track all changes with automatic version control, allowing you to restore previous versions and see project evolution over time.",
  },
  {
    id: 8,
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Access your projects from anywhere in the world with cloud synchronization and cross-platform compatibility.",
  },
];

export default function FeatureTimeline() {
  return (
    <section className="text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300 mb-8">
              Productivity
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Supercharge Team Productivity
            </h2>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Keep your team focused and productive as they collaborate on
              building and shipping products swiftly.
            </p>

            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Get started
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                See more
              </button>
            </div>
          </motion.div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 ml-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}