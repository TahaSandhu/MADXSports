import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '@/core/constants';

const AUTO_PLAY_TIME = 5000;

const HeroCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveStep((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, AUTO_PLAY_TIME);
    return () => clearInterval(timer);
  }, [handleNext]);

  const slide = HERO_SLIDES[activeStep];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-950 font-sans selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
        >
          <div className="absolute inset-0 md:hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="flex flex-col justify-center px-6 md:px-16 lg:px-24 bg-transparent md:bg-neutral-900 md:border-r md:border-neutral-800 relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl"
            >
              {slide.tag && (
                <span className="inline-block px-3 py-1 mb-6 text-[10px] font-semibold tracking-[0.2em] uppercase border border-neutral-700 text-neutral-300 rounded-full">
                  {slide.tag}
                </span>
              )}

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight text-white mb-6">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-md">
                {slide.description}
              </p>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 text-neutral-400 hover:text-white transition-colors border border-neutral-700 rounded-full"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-3 text-neutral-400 hover:text-white transition-colors border border-neutral-700 rounded-full"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative overflow-hidden hidden md:block">
            <motion.img
              key={`${activeStep}-img`}
              src={slide.image}
              alt={slide.title}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 flex items-center gap-3 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className="group relative h-1 w-12 bg-neutral-800 overflow-hidden rounded-full"
          >
            {activeStep === index && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_PLAY_TIME / 1000, ease: "linear" }}
                className="absolute inset-0 bg-white origin-left"
              />
            )}
          </button>
        ))}
        <span className="ml-4 font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
          0{activeStep + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </div>
  );
};

export default HeroCarousel;