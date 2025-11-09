'use client';
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PainPointsSection = () => {
  const painPoints = [
    "You freeze during real interviews and forget your answers.",
    "You struggle to practice because you don’t have realistic interview scenarios.",
    "You get minimal feedback and don’t know how to improve.",
    "You feel nervous and unprepared despite studying hard."
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Pain points */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="from-primary/10 via-foreground/85 to-foreground/50 bg-gradient-to-tl bg-clip-text text-center text-4xl tracking-tighter text-balance text-transparent py-4 sm:text-5xl md:text-5xl lg:text-6xl mb-6"
            >
              Do You Face These Challenges?
            </motion.h1>

            <div className="space-y-6">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md p-6 flex items-start space-x-4 transition-all duration-300 hover:shadow-purple-200/30 group"
                >
                  <CheckCircle className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                  <p className="text-gray-900 text-lg font-inter">{point}</p>

                  {/* Decorative blurred circles: lower opacity so card looks fully white */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-700/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Optional subtle gradient hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-transparent to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hidden cost card */}
          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md p-8 max-w-md transition-all duration-300 hover:shadow-purple-200/30 group">
              <h3 className="text-2xl font-bold text-purple-700 mb-4 font-poppins">
                The Cost of Not Practicing
              </h3>
              <p className="text-lg text-gray-900 mb-4">
                Candidates <span className="font-bold">lose confidence, miss job opportunities</span>, and underperform in real interviews.
              </p>
              <p className="text-sm text-gray-600">
                Practicing with AI mock interviews can save time and increase your chances of landing your dream job.
              </p>

              {/* Decorative blurred circles with reduced opacity */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-700/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-700/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
